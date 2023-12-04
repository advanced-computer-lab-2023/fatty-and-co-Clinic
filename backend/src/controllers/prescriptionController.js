const { trusted } = require("mongoose");
const appointmentModel = require("../models/appointments");
const { default: mongoose } = require("mongoose");
const patientModel = require("../models/patients");
const subscriptionModel = require("../models/subscriptions");
const User = require("../models/systemusers");
const { isNull } = require("util");
const docSlotsModel = require("../models/docSlots");
const doctorModel = require("../models/doctors");
const { MongoClient } = require("mongodb");
const prescriptionsModel = require("../models/prescriptions");

const addPrescription = async (req, res) => {
  try {
    const { appointmentId, medicines, diagnosis } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    const newPrescription = await prescriptionsModel.create({
      AppointmentId: appointmentId,
      DoctorUsername: appointment.DoctorUsername,
      DoctorName: appointment.DoctorName,
      PatientUsername: appointment.PatientUsername,
      Date: new Date(),
      Diagnosis: diagnosis,
      Medicine: medicines,
    });
    console.log(medicines);
    res.status(200).json(newPrescription);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updatePrescription = async (req, res) => {
  try {
    const { prescriptionId, medicines } = req.body;
    const prescription = await prescriptionsModel.findById(prescriptionId);
    prescription.Medicine = medicines;
    await prescription.save();
    res.status(200).json(prescription);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { addPrescription, updatePrescription };
