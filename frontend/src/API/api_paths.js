const API_BASE = "http://localhost:8000/";
const PACKAGE_BASE = "http://localhost:8000/package/";
const DOCTOR_BASE = "http://localhost:8000/doctor/";
const PATIENT_BASE = "http://localhost:8000/patient/";
const ADMIN_BASE = "http://localhost:8000/admin/";
const APPOINTMENT_BASE = "http://localhost:8000/appointment/";
const GUEST_BASE = "http://localhost:8000/guest/";

export const API_PATHS = {
  // Add comments that indicate if the path needs a param and what that param is
  viewAppointments: APPOINTMENT_BASE + "/getAppointmentsDoc/",
  viewAllAppointments: APPOINTMENT_BASE + "/getAppointments",
  packages: PACKAGE_BASE + "packages/",
  addPackage: PACKAGE_BASE + "addPackage/",
  deletePackage: PACKAGE_BASE + "deletePackage/",
  updatePackage: PACKAGE_BASE + "updatePackage/",
  getDoctorByUsername: DOCTOR_BASE + "getDoctorByUsername/", // add username as a param
  viewDoctors: PATIENT_BASE + "view/doctors/", // add patient id as a param
  getRequests: ADMIN_BASE + "",
  deleteUser: ADMIN_BASE + "deleteUser/",
  createAdmin: ADMIN_BASE + "addAdmin/",
  updateInfo: DOCTOR_BASE+ "updateDoctor/",
  createfamilymember:PATIENT_BASE+"createFamilymember/",
  viewFilteredDoctors: DOCTOR_BASE + "filter/" 
// >>>>>>> main

};
