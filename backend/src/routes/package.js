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
 */
router.get("/:Name", getPackage);

/**
 * @route POST /addPackage
 * @desc Create a new package
 * @access Public
 */
router.post("/addPackage", createPackage);

/**
 * @route DELETE /deletePackage/:id
 * @desc Delete a package
 * @access Public
 */
router.delete("/deletePackage/:id", deletePackage);

/**
 * @route PATCH /updatePackage/:id
 * @desc Update a package by id
 * @access Public
 */
router.patch("/updatePackage/:id", updatePackage);

module.exports = router;
