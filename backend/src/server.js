require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Route Variables
const guestRoutes = require("./routes/guests");
const appointmentRoutes = require("./routes/appointments");
const doctorRoutes = require("./routes/doctors");
const patientRoutes = require("./routes/patients");
const adminRoutes = require("./routes/admins");
const testRoutes = require("./routes/tests");
const packageRoutes = require("./routes/package");
const paymentRoutes = require("./routes/payments");

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
