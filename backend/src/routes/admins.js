const express = require("express");
const { createAdmin, getRequests, deleteUser,acceptRequest,declineRequest } = require("../controllers/adminController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admins");
});

router.post("/addAdmin", createAdmin);
router.get("/requests", getRequests);
router.delete("/deleteUser", deleteUser);
router.post("/acceptRequest/:id", acceptRequest);
router.delete("/declineRequest/:id", declineRequest);

module.exports = router;
