const express = require("express");
const { createAdmin, getRequest, deleteUser, acceptRequest, rejectRequest } = require("../controllers/adminController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admins");
});

router.post("/addAdmin", createAdmin);
router.get("/getRequest", getRequest);
router.post("/acceptRequest", acceptRequest);
router.put("/rejectRequest", rejectRequest);
router.delete("/deleteUser", deleteUser);

module.exports = router;
