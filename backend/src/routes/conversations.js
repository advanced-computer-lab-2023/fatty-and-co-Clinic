const express = require("express");
const {
  createConversation,
  getConversation,
} = require("../controllers/conversationController");

const { requireAuth } = require("../common/middleware/requireAuth");

const router = express.Router();

// TODO: Use the requireAuth middleware if authentication is required for creating conversations
router.post("/createConversation", createConversation);
router.get("/getConversation/:Username", getConversation);

module.exports = router;
