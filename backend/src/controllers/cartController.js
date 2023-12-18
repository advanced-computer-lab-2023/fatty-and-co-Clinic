const patientModel = require("../models/patients");
const pharmacistModel = require("../models/pharmacists");
const orderModel = require("../models/orders");
const cartModel = require("../models/cart");
const medicineModel = require("../models/medicine");
const prescriptionModel = require("../models/prescriptions");
const subscriptionModel = require("../models/subscriptions");
const notificationModel = require("../models/notifications");
const userModel = require("../models/systemusers");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  //service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "shebeenhealthclinic@gmail.com",
    pass: "xojm teqp otis nknr",
  },
});

const addMedicineToCart = async (req, res) => {
  try {
    const Username = req.user.Username;
    const MedicineID = req.query.Medicine;
    const medicine = await medicineModel.findById(MedicineID);
    if (!medicine) {
      res.status(400).send({ message: "Medicine not found" });
      return;
    }

    // Check if the medicine is prescribed
    const prescribed = await checkPrescription(MedicineID, Username);
    if (!prescribed) {
      res.status(400).send({ message: "Medicine not prescribed" });
      return;
    }

    const cart = await cartModel.findOne({ PatientUsername: Username });

    // Check availablity of the medicine.
    let inCart = 0;
    cart.Medicine.forEach((medicineId) => {
      if (medicineId == MedicineID) {
        inCart++;
      }
    });
    if (medicine.Quantity <= inCart) {
      res.status(400).send({
        message: `Sorry, we only have ${medicine.Quantity} of ${medicine.Name} in stock.`,
      });
      return;
    }
    if (!cart) {
      res.status(400).send({ message: "Cart not found" });
      return;
    }
    // check if patient has a discount
    const current_user = req.user.Username; //changed this
    const patient = await patientModel.findOne({ Username: current_user });
    const subscription = await subscriptionModel
      .findOne({ Patient: patient, Status: "Subscribed" })
      .populate("Patient")
      .populate("Package");
    if (subscription) {
      const package = subscription.Package;
      cart.TotalCost +=
        medicine.Price - (medicine.Price * package.Medicine_Discount) / 100;
    } else {
      cart.TotalCost += medicine.Price;
    }
    cart.Medicine.push(MedicineID);
    await cart.save();

    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const checkIfMedicineIsPrescribed = async (req, res) => {
  try {
    const Username = req.user.Username;
    const MedicineID = req.query.Medicine;

    const isPrescribed = await checkPrescription(MedicineID, Username);

    res.status(200).send({ isPrescribed });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const checkPrescription = async (MedicineID, Username) => {
  const medicine = await medicineModel.findById(MedicineID);

  if (!medicine) {
    return false;
  }

  if (medicine.MedicationType == "Over the counter") {
    return true;
  }

  // get all patient's prescriptions
  const prescriptions = await prescriptionModel.find({
    PatientUsername: Username,
  });

  // Check if the medicine is prescribed
  let prescribed = false;
  prescriptions.forEach((prescription) => {
    prescription.Medicine.forEach((medicine1) => {
      if (
        medicine1.Name == medicine.Name &&
        prescription.Status == "Unfilled"
      ) {
        prescribed = true;
        return;
      }
    });
    if (prescribed) {
      return;
    }
  });

  // If not, then send an error message
  if (!prescribed) {
    return false;
  }

  return true;
};

const decrementItemCount = async (req, res) => {
  try {
    const Username = req.user.Username;
    const MedicineID = req.query.Medicine;
    const medicine = await medicineModel.findById(MedicineID);
    if (!medicine) {
      res.status(400).send({ message: "Medicine not found" });
    }
    const cart = await cartModel.findOne({ PatientUsername: Username });
    if (!cart) {
      res.status(400).send({ message: "Cart not found" });
      return;
    }
    const medicineIndex = cart.Medicine.indexOf(MedicineID);
    if (medicineIndex === -1) {
      res.status(400).send({ message: "Medicine not found in the cart" });
      return;
    }
    const current_user = req.user.Username; //changed this
    const patient = await patientModel.findOne({ Username: current_user });
    const subscription = await subscriptionModel
      .findOne({ Patient: patient, Status: "Subscribed" })
      .populate("Patient")
      .populate("Package");
    if (subscription) {
      const package = subscription.Package;
      cart.TotalCost -=
        medicine.Price - (medicine.Price * package.Medicine_Discount) / 100;
    } else {
      cart.TotalCost -= medicine.Price;
    }
    cart.Medicine.splice(medicineIndex, 1);
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const viewCart = async (req, res) => {
  const username = req.user.Username;
  try {
    const cart = await cartModel.findOne({ PatientUsername: username });
    if (!cart) {
      res.status(404).send({ message: "Cart not found for the user." });
      return;
    }
    const medicineQuantityMap = new Map();

    cart.Medicine.forEach((medicineId) => {
      const stringMedicineId = medicineId.toString();
      if (medicineQuantityMap.has(stringMedicineId)) {
        medicineQuantityMap.set(
          stringMedicineId,
          medicineQuantityMap.get(stringMedicineId) + 1
        );
      } else {
        medicineQuantityMap.set(stringMedicineId, 1);
      }
    });

    const medicine = await Promise.all(
      Array.from(medicineQuantityMap.keys()).map(async (medicineId) => {
        const medicine = await medicineModel.findById(medicineId);
        return {
          id: medicine ? medicine._id : "Unkown",
          Name: medicine ? medicine.Name : "Unknown",
          Price: medicine ? medicine.Price : 0,
          Quantity: medicineQuantityMap.get(medicineId),
          TotalPrice: medicine
            ? medicine.Price * medicineQuantityMap.get(medicineId)
            : 0,
          Image: medicine ? medicine.Image : null,
        };
      })
    );

    res.status(200).send({ cart, medicine });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const Username = req.user.Username;
    const MedicineID = req.query.Medicine;
    const cart = await cartModel.findOne({ PatientUsername: Username });

    if (!cart) {
      res.status(400).send({ message: "Cart not found" });
      return;
    }

    const updatedMedicine = cart.Medicine.filter(
      (itemID) => itemID.toString() !== MedicineID.toString()
    );
    if (updatedMedicine.length === cart.Medicine.length) {
      res.status(400).send({ message: "Medicine not found in the cart" });
      return;
    }

    // Calculate the updated TotalCost by finding the prices of removed medicines.
    const removedMedicine = cart.Medicine.filter(
      (itemID) => itemID.toString() === MedicineID.toString()
    );
    let totalPriceToRemove = 0;

    const current_user = req.user.Username; //changed this
    const patient = await patientModel.findOne({ Username: current_user });
    const subscription = await subscriptionModel
      .findOne({ Patient: patient, Status: "Subscribed" })
      .populate("Patient")
      .populate("Package");

    for (const itemID of removedMedicine) {
      const medicine = await medicineModel.findById(itemID);
      if (medicine) {
        if (subscription) {
          const package = subscription.Package;
          totalPriceToRemove +=
            medicine.Price - (medicine.Price * package.Medicine_Discount) / 100;
        } else {
          totalPriceToRemove += medicine.Price;
        }
      }
    }

    cart.TotalCost -= totalPriceToRemove;

    // Update the cart's Medicine and TotalCost.
    cart.Medicine = updatedMedicine;

    // Save the updated cart object in your database
    await cart.save();

    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  addMedicineToCart,
  decrementItemCount,
  viewCart,
  deleteItem,
  checkIfMedicineIsPrescribed,
};
