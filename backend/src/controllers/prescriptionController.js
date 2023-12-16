const { addMedicineToCart } = require("./cartController");
const { trusted } = require("mongoose");
const appointmentModel = require("../models/appointments");
const { default: mongoose } = require("mongoose");
const patientModel = require("../models/patients");
const subscriptionModel = require("../models/subscriptions");
const medicineModel = require("../models/medicine");
const orderModel = require("../models/orders");
const User = require("../models/systemusers");
const { isNull } = require("util");
const docSlotsModel = require("../models/docSlots");
const doctorModel = require("../models/doctors");
const { MongoClient } = require("mongodb");
const axios = require("axios");
const prescriptionsModel = require("../models/prescriptions");
const cartModel = require("../models/cart");

const addPrescription = async (req, res) => {
  try {
    const { appointmentId, medicines, diagnosis } = req.query;

    const appointment = await appointmentModel.findById(appointmentId);

    const newPrescription = await prescriptionsModel.create({
      AppointmentId: appointmentId,
      DoctorUsername: appointment.DoctorUsername,
      DoctorName: appointment.DoctorName,
      PatientUsername: appointment.PatientUsername,
      Date: new Date(),
      Diagnosis: diagnosis,
      Medicine: medicines,
    });
    console.log(medicines);
    res.status(200).json(newPrescription);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const checkForPrescription = async (req, res) => {
  try {
    const { appointmentId } = req.query;
    const prescription = await prescriptionsModel.findOne({
      AppointmentId: appointmentId,
    });

    // Check if a prescription is found
    const hasPrescription = Boolean(prescription);

    res.status(200).json({ hasPrescription });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const getPrescriptionAPP = async (req, res) => {
  try {
    const { appointmentId } = req.query;
    const prescription = await prescriptionsModel.findOne({
      AppointmentId: appointmentId,
    });

    // Check if a prescription is found
    

    res.status(200).json({ prescription });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const getPrescriptionMeds = async (req, res) => {
  try {
    const { appointmentId } = req.query;
    const prescription = await prescriptionsModel.findOne({
      AppointmentId: appointmentId,
    });
    const meds = prescription.Medicine;

    // Check if a prescription is found

    res.status(200).json({ meds });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const addMedToPrescription = async (req, res) => {
  try {
    const { appointmentId, medicine, dosage, description } = req.query;
    const prescription = await prescriptionsModel.findOne({
      AppointmentId: appointmentId,
    });
    const medicines = {
      Name: medicine,
      Dosage: dosage,
    };
    prescription.Medicine.push(medicines);
    await prescription.save();
    res.status(200).json(prescription);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// const deleteMedFromPrescription = async (req, res) => {
//     try {
//         const { appointmentId, medicines } = req.body;
//         const prescription = await prescriptionsModel.findOne({
//         AppointmentId: appointmentId,
//         });
//         prescription.Medicine.pull(medicines);
//         await prescription.save();
//         res.status(200).json(prescription);
//     } catch (error) {
//         res.status(400).send({ message: error.message });
//     }
//     };

const deleteMedFromPrescription = async (req, res) => {
  const { appointmentId, medicineName } = req.query;
  try {
    const prescription = await prescriptionsModel.findOne({
      AppointmentId: appointmentId,
    });
    const medicineIndex = prescription.Medicine.findIndex(
      (medicine) => medicine.Name === medicineName
    );

    if (medicineIndex === -1) {
      return res
        .status(404)
        .json({ message: "Medicine not found in the prescription." });
    }
    prescription.Medicine.splice(medicineIndex, 1);
    const updatedPrescription = await prescription.save();

    res.status(200).json(updatedPrescription);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const updateDosage = async (req, res) => {
  const AppointmentId = req.query.AppointmentId;
  const medicineName = req.query.medicineName;
  const newDosage = req.query.dosage;

  const prescription = await prescriptionsModel.findOne({
    AppointmentId: AppointmentId,
  });

  if (!prescription) {
    return res.status(404).json({ message: "Prescription not found." });
  }

  const medicineToUpdate = prescription.Medicine.find(
    (medicine) => medicine.Name === medicineName
  );

  if (!medicineToUpdate) {
    return res
      .status(404)
      .json({ message: "Medicine not found in the prescription." });
  }

  medicineToUpdate.Dosage = newDosage;

  const updatedPrescription = await prescription.save();

  res.status(200).json(updatedPrescription);
};
// const calculatePrescriptionCost = async (req, res) => {
//   try {
//     const { appointmentId } = req.query;
//     const prescription = await prescriptionsModel.findOne({
//       AppointmentId: appointmentId,
//     });
//     const patient = await patientModel.findOne({
//       Username: prescription.PatientUsername,
//     });
//     const package = await subscriptionModel.findOne({
//       Patient: patient._id,
//     });
//     const packageId = package.Package;
//     const packageDiscount = packageId.Discount;
//     const med = await medicineModel.find({
//       Name: { $in: prescription.Medicine.map((medicine) => medicine.Name) },
//     });
//     const priceNoDiscount = med.reduce(
//       (total, medicine) => total + medicine.Price,
//       0
//     );
//     const priceWithDiscount = priceNoDiscount * (1 - packageDiscount);
//     res.status(200).json({ priceWithDiscount });
//   } catch (error) {
//     res.status(400).send({ message: error.message });
//   }
// };

//place an order to the pharmacy using the medicine list
const updateDescription = async (req, res) => {
  const AppointmentId = req.query.AppointmentId;
  const medicineName = req.query.medicineName;
  const newDescription = req.query.description;

  const prescription = await prescriptionsModel.findOne({
    AppointmentId: AppointmentId,
  });

  if (!prescription) {
    return res.status(404).json({ message: "Prescription not found." });
  }

  const medicineToUpdate = prescription.Medicine.find(
    (medicine) => medicine.Name === medicineName
  );

  if (!medicineToUpdate) {
    return res
      .status(404)
      .json({ message: "Medicine not found in the prescription." });
  }

  medicineToUpdate.Description = newDescription;

  const updatedPrescription = await prescription.save();

  res.status(200).json(updatedPrescription);
};
const placeOrder = async (req, res) => {
  try {
    console.log(req.body);
    const { appointmentId } = req.body;
    console.log(appointmentId);
    const username = req.user.Username;
    console.log("username" + username);
    const password = req.user.Password;
    console.log("password" + password);
    const prescription = await prescriptionsModel.findOne({
      AppointmentId: appointmentId,
    });
    console.log("appointmentId" + appointmentId);
    // const TotalCost = await calculatePrescriptionCost(req, res);
    const med = await medicineModel.find({
      Name: { $in: prescription.Medicine.map((medicine) => medicine.Name) },
    });
    for (var medicine of med) {
      console.log(medicine.Name);
      console.log("quantity" + medicine.Quantity);
      if (medicine.Quantity < 1) {
        med.splice(med.indexOf(medicine), 1);
        console.log(medicine.Name + " is out of stock");
      }
    }
    console.log("med" + med + "ay 7aga");
    //find user's cart
    const cart = await cartModel.findOne({ PatientUsername: username });
    console.log("cart" + cart);
    //call add medicine to cart for each in med
    for (var medicine of med) {
      console.log("medicine" + medicine);
      cart.TotalCost += medicine.Price;
      cart.Medicine.push(medicine);
      await cart.save();
    }
    // await axios.post("http://localhost:7000/guest/cartLogin", {
    //   body: {
    //     Username: username,
    //     Password: "Pa55word!",
    //     Medicines: med,
    //   },
    // });
    res.status(200).json({ message: "Medicines added to cart successfully." });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  addPrescription,
  addMedToPrescription,
  deleteMedFromPrescription,
  updateDosage,
  checkForPrescription,
  // calculatePrescriptionCost,
  placeOrder,
  getPrescriptionMeds,
  updateDescription,
  getPrescriptionAPP,
};
