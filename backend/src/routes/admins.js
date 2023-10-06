const express = require("express");
const {createAdmin, getRequests, deleteUser} = require("../controllers/adminController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admins");
});

router.post("/addAdmin", createAdmin);
router.get("/requests", getRequests);
router.delete("/deleteUser", deleteUser);

module.exports = router;
