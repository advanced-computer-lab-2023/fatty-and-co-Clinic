const express = require("express");
// HEAD:src/routes/doctors.js
const {createDoctor,updateDoctor} = require("../controllers/doctorController");
// main:backend/src/routes/doctors.js

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Doctors");
});

 router.post("/createDoctor",createDoctor)

 router.patch("/updateDoctor",updateDoctor)

module.exports = router;
