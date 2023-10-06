const express = require("express");
const { } = require("../controllers/guestController");

const router = express.Router();

// use this for login page and such
router.get("/", (req, res) => {
  res.send("Guests");
});

module.exports = router;
