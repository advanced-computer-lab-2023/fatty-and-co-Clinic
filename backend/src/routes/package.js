const express = require("express");
const {
  createPackage,
  getPackages,
  updatePackage,
  deletePackage,
} = require("../controllers/packageController");

// Create the router
const router = express.Router();

// GET /workouts
router.get("/packages", getPackages);

// POST create a new workout
router.post("/addPackage", createPackage);

// DELETE /workouts/:id
router.delete("/deletePackage/:id", deletePackage);

// update a workout
router.patch("/updatePackage/:id", updatePackage);

module.exports = router;
