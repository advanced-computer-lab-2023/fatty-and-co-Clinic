const express = require("express");
const {
  createAdmin,
  getRequest,
  deleteUser,
  acceptRequest,
  rejectRequest,
  getRequests,
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
 * @route GET /admins/requests
 * @desc Returns all requests
 * @access Public
 */
router.get("/requests", getRequests);

/**
 * @route POST /admins/addAdmin
 * @desc Creates a new admin
 * @access Public
 * @prop {string} Username - The username of the admin
 * @prop {string} Password - The password of the admin
 * @prop {string} Email - The email of the admin
 */
router.post("/addAdmin", createAdmin);

/**
 * @route GET /admins/getRequest
 * @desc Gets a list of admin requests
 * @access Public
 * @prop {string} Username - The username of the requesting doctor
 */
router.get("/getRequest", getRequest);

/**
 * @route POST /admins/acceptRequest
 * @desc Accepts an admin request
 * @access Public
 * @prop {string} Username - The username of the requesting doctor
 */
router.post("/acceptRequest", acceptRequest);

/**
 * @route PUT /admins/rejectRequest
 * @desc Rejects an admin request
 * @access Public
 * @prop {string} Username - The username of the requesting doctor
 */
router.put("/rejectRequest", rejectRequest);

/**
 * @route DELETE /admins/deleteUser
 * @desc Deletes a user
 * @access Public
 * @prop {string} Username - The username of the user to be deleted
 */
router.delete("/deleteUser", deleteUser);

module.exports = router;
