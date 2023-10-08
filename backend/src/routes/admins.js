const express = require("express");
const { createAdmin} = require("../controllers/adminController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admins");
});

router.post("/addAdmin", createAdmin);
module.exports = router;
