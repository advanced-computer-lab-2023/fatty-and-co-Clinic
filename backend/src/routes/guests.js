const express = require("express");
const { createRequest, updateRequest } = require("../controllers/guestController");

const router = express.Router();

// use this for login page and such
router.get("/", (req, res) => {
  res.send("Guests");
});

router.post("/addRequest", createRequest);

router.put("/updateRequest/:id", updateRequest);

module.exports = router;
