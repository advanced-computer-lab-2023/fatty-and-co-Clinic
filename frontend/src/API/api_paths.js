const API_BASE = "http://localhost:8000/";
const PACKAGE_BASE = "http://localhost:8000/package/";
const DOCTOR_BASE = "http://localhost:8000/doctor/";
const PATIENT_BASE = "http://localhost:8000/patient/";
const ADMIN_BASE = "http://localhost:8000/admin/";
const APPOINTMENT_BASE = "http://localhost:8000/appointment/";
const GUEST_BASE = "http://localhost:8000/guest/";
const PAYEMENT_BASE = "http://localhost:8000/payment/";


// Add comments that indicate if the path needs a param and what that param is
export const API_PATHS = {
  // Guest
  docSignUp: GUEST_BASE + "addRequest/",
  updateEmail: GUEST_BASE + "updateEmail/",
  login: GUEST_BASE + "login/",
  signup: GUEST_BASE + "addPatient/",
  updatePass: GUEST_BASE + "updatePass/",
  resetPass: GUEST_BASE + "resetPass/",
  sendOTP: GUEST_BASE + "sendOTP/",
  validateOTP: GUEST_BASE + "validateOTP/",

  // Admin
  getRequests: ADMIN_BASE + "requests/",
  getRequest: ADMIN_BASE + "getRequest/",
  getRequestMedicalLicense: ADMIN_BASE + "getRequestMedicalLicense/",

  deleteUser: ADMIN_BASE + "deleteUser/",
  createAdmin: ADMIN_BASE + "addAdmin/",
  acceptRequest: ADMIN_BASE + "acceptRequest/",
  rejectRequest: ADMIN_BASE + "rejectRequest/",


  // Doctor
  getDoctorByUsername: DOCTOR_BASE + "getDoctorByUsername/", // add username as a param
  updateHourly: DOCTOR_BASE + "updateDoctor/",
  updateAffil: DOCTOR_BASE + "updateDoctor/",
  viewFilteredDoctors: DOCTOR_BASE + "filter/",
  viewInfoAndHealthRecords: DOCTOR_BASE + "viewPatientInfoAndHealthRecords/",
  followupAppointment: DOCTOR_BASE + "followupAppointment/",
  viewMySlotsDoc: DOCTOR_BASE + "viewMySlotsDoc/",
  addMySlotsDoc: DOCTOR_BASE + "addMySlotsDoc/",
  deleteMySlotsDoc: DOCTOR_BASE + "deleteMySlotsDoc/",
  updateMySlotsDoc: DOCTOR_BASE + "updateMySlotsDoc/",
  payDoctor: DOCTOR_BASE + "payDoctor/",

  // Patient
  viewMyPackage: PATIENT_BASE + "viewMyPackage",
  viewDoctors: PATIENT_BASE + "view/doctors/", // add patient id as a param
  viewPrescriptions: PATIENT_BASE + "getPrescriptions/", // add patient username as a param
  getPrescription: PATIENT_BASE + "selectPrescription/", // add prescription id as a param
  createFamilyMember: PATIENT_BASE + "createFamilymember/",
  viewFamilyMembers: PATIENT_BASE + "getFamilymember/", // get familymember from req.params
  getPatient: PATIENT_BASE + "selectPatient/", // get patient from req.params
  viewFamPackage: PATIENT_BASE + "viewFamilyPackage/",
  viewOptionPackages: PATIENT_BASE + "getOptionPackages/",
  viewHealthFamwithstatus: PATIENT_BASE + "viewHealthFamwithstatus",
  CancelFamilysubscribtion: PATIENT_BASE + "cancelSubscriptionfamilymember",
  subscribepackagefamilymem: PATIENT_BASE + "subscribepackagefamilymem",
  cancelSubscription: PATIENT_BASE + "/cancelSubscription",
  subscribePackageSelf: PATIENT_BASE + "payForSubscription/",
  subscribePackageFam: PATIENT_BASE + "payFamilySubscription/",
  getAmountCredit: PATIENT_BASE + "getAmountCredit/",
  getAmountCreditFam: PATIENT_BASE + "getAmountCreditFam/",
  updateFamSub: PATIENT_BASE + "updateFamSubs/",
  updateMySub: PATIENT_BASE + "updateMySubs/",
  viewHealthPackagewithstatus: PATIENT_BASE + "viewHealthPackagewithstatus",
  uploadFile: PATIENT_BASE + "uploadFile/", // upload file and note
  getMedicalHistory: PATIENT_BASE + "getMedicalHistory/", // get getMedicalHistory for patient (by username if admin)
  downloadFile: PATIENT_BASE + "downloadFile/", // get file by filename
  removeHealthRecord: PATIENT_BASE + "removeHealthRecord/", // remove file by filename
  getWalletAmount: PATIENT_BASE + "getWalletAmount/",
  viewAllAvailableSlots : DOCTOR_BASE + "viewAllAvailableSlots/", //patient views working slots of Doctor
  validateBookingDate: DOCTOR_BASE + "validateBookingDate/", // validating booking date

  // Package
  packages: PACKAGE_BASE + "packages/",
  addPackage: PACKAGE_BASE + "addPackage/",
  deletePackage: PACKAGE_BASE + "deletePackage/",
  updatePackage: PACKAGE_BASE + "updatePackage/",

  // Appointment
  viewAppointments: APPOINTMENT_BASE + "/getAppointmentsDoc/",
  viewAppointPat: APPOINTMENT_BASE + "getAppointmentsPat/",
  viewDoctorPatients: APPOINTMENT_BASE + "searchpatient/",
  viewUpcomingAppointments: APPOINTMENT_BASE + "upcoming/",
  createAppointment: APPOINTMENT_BASE + "createAppointment",

  // Payment
  cardPayment: PAYEMENT_BASE + "cardPayment",
  walletPayment: PAYEMENT_BASE + "walletPayment",
};
