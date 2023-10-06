const express = require("express");
const {createRequest} = require("../controllers/guestController");

const router = express.Router();

router.post("/addRequest", createRequest);
// use this for login page and such
router.get("/", (req, res) => {
  res.send("Guests");
});

module.exports = router;
