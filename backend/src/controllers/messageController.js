const Message = require('../models/messages');

// Controller functions

// Get all messages of A conversation
const getMessages = async (req, res) => {
  const conversation = req.params.conversationId;
  try {
    const messages = await Message.find({conversationId: conversation}).sort({ timestamp: 'asc' });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new message
//TODO: change the user to be get it from req.user
const createMessage = async (req, res) => {

  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    //console.log(error.message);
  }
};

module.exports = {
  getMessages,
  createMessage,
};