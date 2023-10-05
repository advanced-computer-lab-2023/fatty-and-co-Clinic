// #Task route solution
const PackageModel = require("../odels/package.js");
const { default: mongoose } = require("mongoose");

const createPackage = async (req, res) => {
  //add a new Package to the database with
  const { Name, Price, Session_Discount, Medicine_Discount, Family_Discount } =
    req.body;
  const newPackage = new PackageModel({
    Name: Name,
    Price: Price,
    Session_Discount: Session_Discount,
    Medicine_Discount: Medicine_Discount,
    Family_Discount: Family_Discount,
  });

  await newPackage.save();
  res.status(200).json(newPackage);
};

const getPackages = async (req, res) => {
  //retrieve all Packages from the database
  try {
    const Packages = await PackageModel.find();
    res.status(200).json(Packages);
  } catch (err) {
    res.status(404).json({ message: "No Packages found" });
  }
};

// Update a Package
const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Price ,  Session_Discount, Medicine_Discount, Family_Discount } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Package with id: ${id}`);

    const updatedPackage = {  Name, Price ,  Session_Discount, Medicine_Discount, Family_Discount, _id: id };
    await PackageModel.findByIdAndUpdate(id, updatedPackage, { new: true });
    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a Package
const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const package = await PackageModel.findOneAndDelete({ _id: id });
    if (!package) throw new Error("No Package  with that id");
    res.status(200).json(package);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPackage, getPackages ,updatePackage, deletePackage};
