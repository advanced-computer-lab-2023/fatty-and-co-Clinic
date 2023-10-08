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

/**
 * @route GET /packages
 * @desc Get all packages
 * @access Public
 */
router.get("/packages", getPackages);

/**
 * @route GET /packages/:Name
 * @desc Get a package by Name
 * @access Public
 * @param {string} Name - The name of the package
 */
router.get("/:Name", getPackage);

/**
 * @route POST /addPackage
 * @desc Create a new package
 * @access Public
 * @prop {string} Name - The name of the package
 * @prop {number} Price - The price of the package
 * @prop {number} Session_Discount - The session discount of the package
 * @prop {number} Medicine_Discount - The medicine discount of the package
 * @prop {number} Family_Discount - The family discount of the package
 */
router.post("/addPackage", createPackage);

/**
 * @route DELETE /deletePackage/:id
 * @desc Delete a package
 * @access Public
 * @param {string} id - The id of the package
 */
router.delete("/deletePackage/:id", deletePackage);

/**
 * @route PATCH /updatePackage/:id
 * @desc Update a package by id
 * @access Public
 * @param {string} id - The id of the package
 */
router.patch("/updatePackage/:id", updatePackage);

module.exports = router;
