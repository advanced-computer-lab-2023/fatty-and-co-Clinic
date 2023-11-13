const { default: mongoose } = require("mongoose");

const userModel = require("../models/systemusers.js");
const requestModel = require("../models/requests");
const doctorModel = require("../models/doctors");
const patientModel = require("../models/patients");
const appointmentModel = require("../models/appointments");
const familyMemberModel = require("../models/familymembers");
const prescriptionModel = require("../models/prescriptions");
const { getFileByFilename } = require("../common/middleware/doctorUpload");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  //service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "shebeenhealthclinic@gmail.com",
    pass: "xojm teqp otis nknr",
  },
});

const createAdmin = async (req, res) => {
  const { Username, Password, Email } = req.body;
  try {
    const admin = await userModel.addEntry(Username, Password, Email, "Admin");
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRequest = async (req, res) => {
  const { Username } = req.query;
  try {
    const request = await requestModel.findOne({ Username: Username });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRequestFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const downloadStream = await getFileByFilename(filename);
    downloadStream.pipe(res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await requestModel.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const acceptRequest = async (req, res) => {
  const { Username } = req.body;
  try {
    const request = await requestModel.findOneAndUpdate(
      { Username: Username, Status: { $ne: "Accepted" } },
      { $set: { Status: "Accepted" } },
      { new: true }
    );
    var currentDate = new Date();
    var oneWeekLater = new Date(
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );
    const Email = request.Email;

    const doc = await doctorModel.create({
      Username: Username,
      Name: request.Name,
      DateOfBirth: request.DateOfBirth,
      HourlyRate: request.HourlyRate,
      Affiliation: request.Affiliation,
      EducationalBackground: request.EducationalBackground,
      Speciality: request.Speciality,
    });
    const user = await userModel.addEntry(
      Username,
      request.Password,
      request.Email,
      "Doctor"
    );

    await transporter.sendMail({
      to: Email,
      subject: "Shebeen Health Clinic Employment Contract",
      html: `
        <p>Please find the employment contract listed below.</p>
        <p>Please find the employment contract listed below. 
        EMPLOYMENT CONTRACT
  
  
  Shebeen Health Clinic
  Shebeen El Kom, Menofia
  
  (hereinafter referred to as the "Clinic")
  
  and
  
  ${request.Name}
  ${request.Affiliation}
  Shebeen El Kom, Menofia
  (hereinafter referred to as the "Doctor")
  
  1. POSITION AND DUTIES:
  
  The Clinic agrees to employ the Doctor as a ${request.Speciality} at its facilities. The Doctor agrees to perform the duties associated with the position.
  
  2. COMPENSATION:
  
  a. The Clinic agrees to pay the Doctor a base salary of $${request.HourlyRate} per hour.
  
  b. In addition to the base salary, the Clinic will provide the Doctor with the following benefits:
  
  Health insurance
  Dental insurance
  Retirement plan
  
  c. The Clinic reserves the right to review and adjust the Doctor's compensation annually.
  
  3. TERM OF EMPLOYMENT:
  
  This Contract shall commence on ${oneWeekLater} and continue until terminated by either party with a notice period of 14 days.
  
  4. TERMINATION:
  
  a. Either party may terminate this Contract with or without cause by providing written notice.
  
  b. The Clinic may terminate the Doctor's employment immediately for cause.
  
  5. NON-COMPETE AND CONFIDENTIALITY:
  
  The Doctor agrees not to engage in any competing medical practice within a 20 mile radius of the Clinic for a period of 3 years after the termination of this Contract.
  
  6. PROFIT SHARING:
  
  a. The Doctor acknowledges that a portion of the compensation outlined in Section 2 includes a markup added by the Clinic to cover operational expenses and generate profit.
  
  b. The specific details of profit sharing and the markup percentage will be outlined in an attached addendum to this Contract.
  
  7. GOVERNING LAW:
  
  This Contract shall be governed by and construed in accordance with the laws of Menofia.
  
  IN WITNESS WHEREOF, the parties have executed this Employment Contract as of the date first above written.</p>
    
        <p>To accept the contract, click the button below:</p>
        <a href="http://localhost:3000/auth/signin" class="button">Accept</a>

      `,
    });

    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const rejectRequest = async (req, res) => {
  const { Username } = req.body;
  try {
    const request = await requestModel.findOneAndUpdate(
      { Username: Username, Status: { $ne: "Rejected" } },
      { $set: { Status: "Rejected" } },
      { new: true }
    );
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { Username } = req.body;
  try {
    const user = await userModel.findOneAndDelete({ Username: Username });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    if (user && user.Type === "Patient") {
      const patient = await patientModel.findOneAndDelete({
        Username: Username,
      });
      const appointments = await appointmentModel.find({
        PatientUsername: Username,
      });
      if (appointments.length > 0) {
        await appointmentModel.deleteMany({ PatientUsername: Username });
      }
      const prescriptions = await prescriptionModel.find({
        PatientUsername: Username,
      });
      if (prescriptions.length > 0) {
        await prescriptionModel.deleteMany({ PatientUsername: Username });
      }
      const familymembers = await familyMemberModel.find({
        PatientUserName: Username,
      });
      if (familymembers.length > 0) {
        await familyMemberModel.deleteMany({ PatientUserName: Username });
      }
      res.status(200).json({ user, patient });
    } else if (user && user.Type == "Doctor") {
      const doctor = await doctorModel.findOneAndDelete({ Username: Username });
      const appointments = await appointmentModel.find({
        DoctorUsername: Username,
      });
      if (appointments.length > 0) {
        await appointmentModel.deleteMany({ DoctorUsername: Username });
      }
      const prescriptions = await prescriptionModel.find({
        DoctorUsername: Username,
      });
      if (prescriptions.length > 0) {
        await prescriptionModel.deleteMany({ DoctorUsername: Username });
      }
      res.status(200).json({ user, doctor });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAdmin,
  getRequest,
  deleteUser,
  acceptRequest,
  rejectRequest,
  getRequests,
  getRequestFile,
};
