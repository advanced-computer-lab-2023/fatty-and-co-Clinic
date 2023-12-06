const conversationModel = require("../models/conversations");
const { default: mongoose } = require("mongoose");

const createConversation = async (req, res) => {
  const doctor = req.body.Doctor;
  const patient = req.user.Username;

  //TODO:

  //add a check that if there is no existing convo -> create a new conversation when fetching
  //otherwise do not add it to the conversation model
  //change the conversation part to fetch conversations instead of fetching doctor
  
  try {
    const newConversation = await conversationModel.create({
      Members: [patient, doctor], // Fix: Assign Members array to the key 'Members'
    });

    res.status(200).json(newConversation);
  } catch (error) {
    res.status(500).json(error);
  }
};


//TODO: 
//I THINK I SHOULD MOVE THE CREATING CONVO PART TO BE HERE INSTEAD OF PATIENT CONTROLLER

const getConversation = async (req, res) => {
  //for testing only it should be req.user.username.
  const username = req.params.Username;
  try {
    const conversations = await conversationModel.find({
      Members: { $in: username },
    });
     res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { createConversation , 
    getConversation};
