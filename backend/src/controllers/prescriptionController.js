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

const addMedToPrescription = async (req, res) => {
  try {
    const { appointmentId, medicines } = req.body;
    const prescription = await prescriptionsModel.findOne({
      AppointmentId: appointmentId,
    });
    prescription.Medicine.push(medicines);
    await prescription.save();
    res.status(200).json(prescription);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// const deleteMedFromPrescription = async (req, res) => {
//     try {
//         const { appointmentId, medicines } = req.body;
//         const prescription = await prescriptionsModel.findOne({
//         AppointmentId: appointmentId,
//         });
//         prescription.Medicine.pull(medicines);
//         await prescription.save();
//         res.status(200).json(prescription);
//     } catch (error) {
//         res.status(400).send({ message: error.message });
//     }
//     };

const deleteMedFromPrescription = async (req, res) => {
  const { appointmentId, medicineName } = req.body;
  try {
    const prescription = await prescriptionsModel.findOne({
      AppointmentId: appointmentId,
    });
    const medicineIndex = prescription.Medicine.findIndex(
      (medicine) => medicine.Name === medicineName
    );

    if (medicineIndex === -1) {
      return res
        .status(404)
        .json({ message: "Medicine not found in the prescription." });
    }
    prescription.Medicine.splice(medicineIndex, 1);
    const updatedPrescription = await prescription.save();
    res.status(200).json(updatedPrescription);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
module.exports = {
  addPrescription,
  addMedToPrescription,
  deleteMedFromPrescription,
};
