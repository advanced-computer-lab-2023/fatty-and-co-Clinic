const express = require("express");
const {createDoctor,deleteDoctor,getAllDoctors,getDoctor } = require("../controllers/doctorController");

const router = express.Router();

router.post("/addDoctor", createDoctor);
router.get("/getAllDoctors", getAllDoctors);
router.delete("/deleteDoctor/:id", deleteDoctor);
router.get("/getDoctor/:id", getDoctor);

router.get("/", (req, res) => {
  res.send("Doctors");
});

module.exports = router;
