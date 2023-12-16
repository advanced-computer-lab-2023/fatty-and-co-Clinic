const express = require("express");
const {
  getMessages,
  createMessage,
} = require("../controllers/messageController");

const { requireAuth } = require("../common/middleware/requireAuth");
const { checkPatient, checkUser } = require("../common/middleware/checkType");


const router = express.Router();

// 
/**
 * @route GET /message/getMessages
 * @desc Get all messages
 * @access Auth patient / doctor
 * TODO: Add it later and test it for easier testing for now
 * @param none
 */
router.get("/getMessages", checkUser, getMessages);


/**
 * @route POST /message/createMessage
 * @desc  Create a new message
 * @access Auth patient / doctor
 * TODO: Add it later and test it for easier testing for now
 * @param none
 */
router.post("/createMessage", createMessage);

module.exports = router;
