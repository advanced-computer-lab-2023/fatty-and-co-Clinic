const express = require("express");
const { createRequest } = require("../controllers/guestController");

const router = express.Router();

// use this for login page and such
router.get("/", (req, res) => {
  res.send("Guests");
});

router.post("/addRequest", createRequest);

router.post("/reg", createRequest);

module.exports = router;
