require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//const socketIo = require("socket.io");
// const {  getAllMessages,
//   createMessage,
  
// } = require ("../controllers/messageController");
//const messageModel = require("../models/messages.js");

// file upload
// but seems that express has a better way
//const bodyParser = require("body-parser");
//const methodOverride = require("method-override"); // to delete files







// Route Variables
const guestRoutes = require("./routes/guests");
const appointmentRoutes = require("./routes/appointments");
const doctorRoutes = require("./routes/doctors");
const patientRoutes = require("./routes/patients");
const adminRoutes = require("./routes/admins");
const testRoutes = require("./routes/tests");
const packageRoutes = require("./routes/package");
const paymentRoutes = require("./routes/payments");
const messageRoutes = require("./routes/messages");
const conversationRoutes = require ("./routes/conversations")
// Middleware Variables
const requireAuth = require("./common/middleware/requireAuth");

// ENV Variables
const port = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;

// App Variables
const app = express();

// Middleware (applied on all routes)
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json());
//app.use(methodOverride("_method"));

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
app.use((req, res, next) => {
  console.log(req.query);
  next();
});

// no auth required for these routes
app.use("/guest", guestRoutes);
app.use("/test", testRoutes);

//TODO: Change it to the require auth route
//app.use("/message", messageRoutes);
app.use("/convo", conversationRoutes);
app.use("/message", messageRoutes);

// Middleware (not applied on test or guest routes)
// all routes require user to be logged in except for guest routes
// that's why we apply this middleware after guest routes
app.use(requireAuth);

// other routes
app.use("/appointment", appointmentRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/admin", adminRoutes);
app.use("/package", packageRoutes);
app.use("/payment", paymentRoutes);

// Server
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    // Listen for requests
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


// const io = socketIo(server);

// // Set up WebSocket connection
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Send chat history to the connected client
//   Message.find().exec((err, messages) => {
//     if (err) throw err;
//     socket.emit('chatHistory', messages);
//   });

//   // Listen for new messages from clients
//   socket.on('sendMessage', async (data) => {
//     try {
//       const message = await createMessage(data);
//       // Broadcast the new message to all connected clients
//       io.emit('newMessage', message);
//     } catch (err) {
//       console.error(err);
//       // Handle the error (e.g., emit an error event to the client)
//     }
//   });

//   // Handle disconnect
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });
