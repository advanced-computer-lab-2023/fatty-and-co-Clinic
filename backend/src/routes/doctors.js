const express = require("express");
const {getDoctor } = require("../controllers/doctorController");
const doctorModel = require("../models/doctors")

const router = express.Router();

router.get("/", getDoctor);

module.exports = router;
