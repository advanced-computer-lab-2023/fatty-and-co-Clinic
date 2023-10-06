const express = require("express");
const { createFamilymember} = require("../controllers/patientController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Patients");
});
router.post("/createFamilymemeber", (req, res) => {
  createFamilymember(req, res) ;
});

module.exports = router;
