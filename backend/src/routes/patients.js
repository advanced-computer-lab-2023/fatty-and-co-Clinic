const express = require("express");
const { createFamilymember,GetFamilymembers} = require("../controllers/patientController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Patients");
});
router.post("/createFamilymember", (req, res) => {
  createFamilymember(req, res) ;
});
router.get("/getFamilymember", (req, res) => {
  GetFamilymembers(req,res) ;
});

module.exports = router;
