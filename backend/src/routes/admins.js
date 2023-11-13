const express = require("express");
const {
  createAdmin,
  getRequest,
  getRequestFile,
  deleteUser,
  acceptRequest,
  rejectRequest,
  getRequests,
} = require("../controllers/adminController");

const { checkAdmin } = require("../common/middleware/checkType");

const router = express.Router();

/**
 * @route GET /admins
 * @desc Returns a message indicating that the route is for admins
 * @access Admin
 */
router.get("/", (req, res) => {
  res.send("Admins");
});

// middleware to check if user is an admin
router.use(checkAdmin);

// ALL OF THE FOLLOWING ROUTES CAN ONLY BE ACCESSED BY ADMINS

/**
 * @route GET /admins/requests
 * @desc Returns all requests
 * @access Admin
 */
router.get("/requests", getRequests);

/**
 * @route POST /admins/addAdmin
 * @desc Creates a new admin
 * @access Admin
 * @prop {string} Username - The username of the admin
 * @prop {string} Password - The password of the admin
 * @prop {string} Email - The email of the admin
 */
router.post("/addAdmin", createAdmin);

/**
 * @route GET /admins/getRequest
 * @desc Gets a list of admin requests
 * @access Admin
 * @prop {string} Username - The username of the requesting doctor
 */
router.get("/getRequest", getRequest);

/**
 * @route GET /admins/getRequestMedicalLicense
 * @desc Gets a file of the medical license of the requesting doctor
 * @access Admin
 * @prop {string} Username - The username of the requesting doctor
 */
router.get("/getRequestFile/:filename", getRequestFile);

/**
 * @route POST /admins/acceptRequest
 * @desc Accepts an admin request
 * @access Admin
 * @prop {string} Username - The username of the requesting doctor
 */
router.post("/acceptRequest", acceptRequest);

/**
 * @route PUT /admins/rejectRequest
 * @desc Rejects an admin request
 * @access Admin
 * @prop {string} Username - The username of the requesting doctor
 */
router.put("/rejectRequest", rejectRequest);

/**
 * @route DELETE /admins/deleteUser
 * @desc Deletes a user
 * @access Admin
 * @prop {string} Username - The username of the user to be deleted
 */
router.delete("/deleteUser", deleteUser);

module.exports = router;
