// #Task route solution
const packageModel = require("../models/packages");
const { default: mongoose } = require("mongoose");

const createPackage = async (req, res) => {
  //add a new Package to the database with
  const { Name, Price, Session_Discount, Medicine_Discount, Family_Discount } =
    req.body;
  const newPackage = new packageModel({
    Name: Name,
    Price: Price,
    Session_Discount: Session_Discount,
    Medicine_Discount: Medicine_Discount,
    Family_Discount: Family_Discount,
  });

  try {
    await newPackage.save();
    res.status(200).json(newPackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPackages = async (req, res) => {
  //retrieve all Packages from the database
  try {
    const Packages = await packageModel.find();
    res.status(200).json(Packages);
  } catch (err) {
    res.status(404).json({ message: "No Packages found" });
  }
};

const getPackage = async (req, res) => {
  // retrieve a specific Package by Name
  try {
    const { Name } = req.params;
    const package = await packageModel.find({ Name: Name });
    res.status(200).json(package);
  } catch (err) {
    res.status(404).json({ message: "No Package found" });
  }
};

// Update a Package
const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Name,
      Price,
      Session_Discount,
      Medicine_Discount,
      Family_Discount,
    } = req.body;

    if (
      Price < 0 ||
      Session_Discount < 0 ||
      Medicine_Discount < 0 ||
      Family_Discount < 0
    )
      return res
        .status(404)
        .send({ message: "Discounts and Price must be positive" });

    if (
      Session_Discount > 100 ||
      Medicine_Discount > 100 ||
      Family_Discount > 100
    )
      return res
        .status(404)
        .send({ message: "Discounts must be less or equal than 100" });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: `No Package with id: ${id}` });

    const updatedPackage = {
      Name,
      Price,
      Session_Discount,
      Medicine_Discount,
      Family_Discount,
      _id: id,
    };
    await packageModel.findByIdAndUpdate(id, updatedPackage, { new: true });
    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a Package
const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const package = await packageModel.findOneAndDelete({ _id: id });
    if (!package) throw new Error("No Package  with that id");
    res.status(200).json(package);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPackage,
  getPackages,
  getPackage,
  updatePackage,
  deletePackage,
};
