const appointmentModel = require("../models/appointments");
const patientModel = require("../models/patients")
// Get all the patients of a certain doctor.
const findDoctorPatients= async (req, res) => {
    const doctorUsername = req.params.doctorUsername;
  
    // Get all the appointments of the doctor.
    const appointments = await appointmentModel.find({ DoctorUsername: doctorUsername });
  
    // Get the names of all the patients from the appointments.
    const patientNames = appointments.map((appointment) => appointment.PatientUsername);
  
    // // Get the data of all the patients from the patient table.
    // const patients = await patientModel.find({ Username: { $in: patientNames } });
  
    // // Return the patients data.
    res.status(200).send(patientsNames);
  };
  const upcomingAppforDoc= async (req, res) => {
    const doctorUsername = req.params.doctorUsername;
  
    // Get all the appointments of the doctor.
    const appointments = await Appointment.find({ DoctorUsername: doctorUsername, Status: 0 });
  
    // Get the names of all the patients from the appointments.
    const patientNames = appointments.map((appointment) => appointment.PatientUsername);
  
    // // Get the data of all the patients from the patient table.
    // const patients = await Patient.find({ Username: { $in: patientNames } });
  
    // Return the patients data.
    res.status(200).send(patientsNames);
  };
 const  searchPatient = async (req, res) => {
    const doctorUsername = req.params.doctorUsername;
    const patientName = req.params.PatientUsername;
  
    // Get the patients of the doctor.
    const patients = await findDoctorPatients(doctorUsername);
  
    // Filter the patients to only include patients whose name matches the search query.
    const filteredPatients = patients.filter((patient) => patient.Username.includes(patientName));
  
    // Return the patients data.
    res.status(200).send(filteredPatients);
  };
  
  // Export the router.
  module.exports = router;

module.exports = {findDoctorPatients,upcomingAppforDoc,searchPatient};
