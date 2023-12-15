require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const http = require('http');
const socketIo = require('socket.io');

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
const prescriptionsRoutes = require("./routes/prescriptions");
const messageRoutes = require("./routes/messages");
const conversationRoutes = require ("./routes/conversations");
const notificationRoutes = require("./routes/notifications");


const createNotification = require("./controllers/notificationController").createNotification;
// Middleware Variables
const requireAuth = require("./common/middleware/requireAuth");



// ENV Variables
const port = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;

// App Variables
const app = express();



//socket io stuff
let users = [];

const addUsers = (username, socketId) => {
  !users.some((user) => user.username === username) &&
    users.push({ username, socketId });
};

const removeUser = (socketId) => {  
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return users.find((user) => user.username === username);
};
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin:`http://localhost:3000` }});

io.on('connection', (socket) => {

  //upon connection
  console.log('New client connected');
  console.log(users);
  //take username and socket id from client
  socket.on('addUser', (username) => {
    addUsers(username, socket.id);
    console.log(users); 
  });


  //upon sending message
  socket.on('sendMessage', async ({sendUsername, recUsername, text}) => {
    const user = getUser(recUsername);
    console.log(user);
   if(typeof user !== 'undefined')
  {console.log(users);
   { io.to(user.socketId).emit('getMessage',{
      sendUsername,
      text,
   });}}
   //this means the receiver is not currently talking to him
   else{
    const seen = false;
    const notif = await createNotification(sendUsername, recUsername, seen);
    console.log(notif);
    

      // io.emit('notification', { message: "new message" });
  // console.log("notification sent")
   }
  });

  //upon disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    removeUser(socket.id);
    console.log(users);

  });

  socket.on('changeReceiver', (username) => {
    // Disconnect the user from the socket
    const user = users.find(user => user.username === username);
    if (typeof user !== "undefined") {
      removeUser(user.socketId);
      console.log(users);
    }
  });

});


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
app.use("/prescription", prescriptionsRoutes);
app.use("/message", messageRoutes);
app.use("/convo", conversationRoutes);
app.use("/notification", notificationRoutes); 
// Server
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    // Listen for requests
    server.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

