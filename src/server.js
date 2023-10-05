require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Route Variables
const guestRoutes = require("./routes/guests");
const appointmentRoutes = require("./routes/appointments");
const doctorRoutes = require("./routes/doctors");
const patientRoutes = require("./routes/patients");
const adminRoutes = require("./routes/admins");
const testRoutes = require("./routes/tests");

// ENV Variables
const port = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;

// App Variables
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Routes
app.use(guestRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/admin", adminRoutes);
app.use("/test", testRoutes);

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
