const express = require("express");
const {
  createPackage,
  getPackages,
  getPackage,
  updatePackage,
  deletePackage,
} = require("../controllers/packageController");

// Create the router
const router = express.Router();

// GET All packages
router.get("/packages", getPackages);

// GET a package by Name
router.get("/:Name", getPackage);

// POST create a new package
router.post("/addPackage", createPackage);

// DELETE a package
router.delete("/deletePackage/:id", deletePackage);

// update a package by id
router.patch("/updatePackage/:id", updatePackage);

module.exports = router;
