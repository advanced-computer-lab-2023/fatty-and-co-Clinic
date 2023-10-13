const API_BASE = "http://localhost:8000/";
const PACKAGE_BASE = "http://localhost:8000/package/";
const DOCTOR_BASE = "http://localhost:8000/doctor/";
const PATIENT_BASE = "http://localhost:8000/patient/";
const ADMIN_BASE = "http://localhost:8000/admin/";
const APPOINTMENT_BASE = "http://localhost:8000/appointment/";
const GUEST_BASE = "http://localhost:8000/guest/";

export const API_PATHS = {
  signup: PATIENT_BASE + "addPatient/",
  docSignUp: GUEST_BASE + "addRequest/",
  // Add comments that indicate if the path needs a param and what that param is
  viewAppointments: APPOINTMENT_BASE + "/getAppointmentsDoc/",
  packages: PACKAGE_BASE + "packages/",
  addPackage: PACKAGE_BASE + "addPackage/",
  deletePackage: PACKAGE_BASE + "deletePackage/",
  updatePackage: PACKAGE_BASE + "updatePackage/",
  getDoctorByUsername: DOCTOR_BASE + "getDoctorByUsername/", // add username as a param
  viewDoctors: PATIENT_BASE + "view/doctors/", // add patient id as a param
  getRequests: ADMIN_BASE + "",
  updateHourly: DOCTOR_BASE + "updateDoctor/",
  viewPrescriptions: PATIENT_BASE + "getPrescriptions/", // add patient username as a param
  getPrescription: PATIENT_BASE + "selectPrescription/", // add prescription id as a param

  viewPrescriptions: PATIENT_BASE + "getPrescriptions/",

  getRequests: ADMIN_BASE + "requests/",
  getRequest: ADMIN_BASE + "getRequest/",

  deleteUser: ADMIN_BASE + "deleteUser/",
  createAdmin: ADMIN_BASE + "addAdmin/",

  updateEmailDoc: GUEST_BASE + "updateEmail/",
  createfamilymember: PATIENT_BASE + "createFamilymember/",
  viewFilteredDoctors: DOCTOR_BASE + "filter/",
  viewfamilymembers: PATIENT_BASE + "getFamilymember/", // get familymember from req.params
  updateAffil: DOCTOR_BASE + "updateDoctor/",
  viewAppointPat: APPOINTMENT_BASE + "getAppointmentsPat/",

  createfamilymember: PATIENT_BASE + "createFamilymember/",
  viewFilteredDoctors: DOCTOR_BASE + "filter/",
  viewfamilymembers: PATIENT_BASE + "getFamilymember/",
  updateAffil: DOCTOR_BASE + "updateDoctor/",
};
