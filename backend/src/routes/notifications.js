const express = require('express');
const router = express.Router();
const { checkPatient, checkUser } = require("../common/middleware/checkType");

const {
    getNotifications,
    setNotificationsToSeen
} = require('../controllers/notificationController');
// GET /notifications
router.get('/getNotifications', checkUser, (req, res) => {
    getNotifications(req, res);
});

// update /notifications
router.put('/setNotificationsToSeen', checkUser, (req, res) => {
    // Logic to create a new notification for the authenticated user
    setNotificationsToSeen(req, res);
});

module.exports = router;
