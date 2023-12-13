const Message = require('../models/messages');

// Get all messages of A conversation
const getMessages = async (req, res) => {
  const sender = req.user.Username;
  const receiver = req.query.Receiver;
  // console.log(sender);
  // console.log("hello rec");
  // console.log(receiver);
  try {
    const messages = await Message.find({
      $or: [
        { receiverUsername: receiver, senderUsername: sender },
        { receiverUsername: sender, senderUsername: receiver }
      ]
    }).sort({ timestamp: 'asc' });
    
    const formattedMessages = messages.map(message => ({
      sender: message.senderUsername,
      content: message.text,
      timestamp: message.timestamp,
      isCurrentUser: message.senderUsername === req.user.Username
    }));
    
    res.status(200).json(formattedMessages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new message
//TODO: change the user to be get it from req.user
const createMessage = async (req, res) => {
  try {
    const newMessageData = {
      senderUsername: req.user.Username,
      receiverUsername: req.body.Receiver,
      text: req.body.text,
    };

    const newMessage = new Message(newMessageData); // Create a new instance of the Message model
    const savedMessage = await newMessage.save(); // Save the new message to the database

    const messageData = {
      sender: savedMessage.senderUsername,
      content: savedMessage.text,
      timestamp: savedMessage.timestamp,
      isCurrentUser: savedMessage.senderUsername === req.user.Username,
    };

    res.status(200).json(messageData);


  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

module.exports = {
  getMessages,
  createMessage,
};