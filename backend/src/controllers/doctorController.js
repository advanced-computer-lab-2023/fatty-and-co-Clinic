const doctorModel = require("../models/doctors");
const mongoose = require("mongoose");

// get a doctor by ID
const getDoctorByID = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid ID" });
    return;
  }

  try {
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    const { Name, Speciality, Affiliation, EducationalBackground } = doctor;
    const doctorDetails = {
      Name,
      Speciality,
      Affiliation,
      EducationalBackground,
    };
    res.status(200).json(doctorDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a doctor by username
const getDoctorByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const doctor = await doctorModel.findOne({ Username: username });
    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    const { Name, Speciality, Affiliation, EducationalBackground } = doctor;
    const doctorDetails = {
      Name,
      Speciality,
      Affiliation,
      EducationalBackground,
    };
    res.status(200).json(doctorDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get doctor by name and/or speciality (search)
const getDoctorByNameAndSpeciality = async (req, res) => {
  const { Name, Speciality } = req.body;
  try {
    const doctors = await doctorModel.find({
      // Search for documents whose 'Name' field contains the 'Name' variable, if it is not empty
      ...(Name ? { Name: { $regex: Name, $options: "i" } } : {}),
      // Search for documents whose 'Speciality' field contains the 'Speciality' variable, if it is not empty
      ...(Speciality && !Name
        ? { Speciality: { $regex: Speciality, $options: "i" } }
        : {}),
    });
    if (doctors.length === 0 || !doctors) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    // TODO: uncomment this if you want to return only the fields you want
    // const doctorDetails = doctors.map((doctor) => {
    //   const { Name, Speciality, Affiliation, EducationalBackground } = doctor;
    //   return {
    //     Name,
    //     Speciality,
    //     Affiliation,
    //     EducationalBackground,
    //   };
    // });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDoctorByID,
  getDoctorByUsername,
  getDoctorByNameAndSpeciality,
};
