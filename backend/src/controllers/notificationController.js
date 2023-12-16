const Notification = require('../models/notificationsChat');

// Get all messages of A conversation
const getNotifications = async (req, res) => {
  const receiver = req.user.Username;

  try {
    const notifications = await Notification.find({
         receiverUsername: receiver, seen: false ,
    });
        
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Create a new message
//TODO: change the user to be get it from req.user
const setNotificationsToSeen = async (req, res) => {
    try {
        const { senderUsername } = req.body;
        const receiverUsername = req.user.Username;

        console.log(senderUsername);
        console.log(receiverUsername);
       // Find the notifications that need to be updated
const notifsToUpdate = await Notification.find({ seen: false });
    
//console.log(notifsToUpdate);
// Update the notifications
await Notification.updateMany(
  { receiverUsername, senderUsername, seen: false },
  { seen: true }
);

// Print the notifications that got updated
//console.log("hellonotifupdate");
//console.log(notifsToUpdate);

        res.status(200).json({ message: 'Notifications updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createNotification = async (senderUsername, receiverUsername, seen) => {
    const newNotificationData = {
        senderUsername,
        receiverUsername,
        seen,
    };

    const newNotification = new Notification(newNotificationData); // Create a new instance of the Notification model
    const savedNotification = await newNotification.save(); // Save the new notification to the database

    console.log("hellonotif");
    console.log(savedNotification);

    console.log("hellonotif2");
    const findNotif = await Notification.find({ _id: savedNotification._id });
    return savedNotification;
};


module.exports = {
    getNotifications,
    setNotificationsToSeen,
    createNotification,
};