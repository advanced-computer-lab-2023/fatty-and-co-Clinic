const express = require("express");
const {createDoctor} = require("../controllers/doctorController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Doctors");
});

 router.post("/createDoctor",createDoctor)

module.exports = router;
