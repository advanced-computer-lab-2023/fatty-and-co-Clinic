const express = require("express");
const {
  createAdmin,
  getRequest,
  deleteUser,
  acceptRequest,
  rejectRequest,
} = require("../controllers/adminController");

const router = express.Router();

/**
 * @route GET /admins
 * @desc Returns a message indicating that the route is for admins
 * @access Public
 */
router.get("/", (req, res) => {
  res.send("Admins");
});

/**
 * @route POST /admins/addAdmin
 * @desc Creates a new admin
 * @access Public
 */
router.post("/addAdmin", createAdmin);

/**
 * @route GET /admins/getRequest
 * @desc Gets a list of admin requests
 * @access Public
 */
router.get("/getRequest", getRequest);

/**
 * @route POST /admins/acceptRequest
 * @desc Accepts an admin request
 * @access Public
 */
router.post("/acceptRequest", acceptRequest);

/**
 * @route PUT /admins/rejectRequest
 * @desc Rejects an admin request
 * @access Public
 */
router.put("/rejectRequest", rejectRequest);

/**
 * @route DELETE /admins/deleteUser
 * @desc Deletes a user
 * @access Public
 */
router.delete("/deleteUser", deleteUser);

module.exports = router;
