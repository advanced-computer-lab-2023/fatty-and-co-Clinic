const express = require("express");
const { createFamilymember,GetFamilymembers} = require("../controllers/patientController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Patients");
});
router.post("/createFamilymemeber", (req, res) => {
  createFamilymember(req, res) ;
});
router.get("/getFamilymemeber", (req, res) => {
  GetFamilymembers(req,res) ;
});

module.exports = router;
