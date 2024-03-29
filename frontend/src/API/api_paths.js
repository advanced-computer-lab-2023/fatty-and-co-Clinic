const API_BASE = "http://localhost:8000/";
const PACKAGE_BASE = "http://localhost:8000/package/";
const DOCTOR_BASE = "http://localhost:8000/doctor/";
const PATIENT_BASE = "http://localhost:8000/patient/";
const ADMIN_BASE = "http://localhost:8000/admin/";
const APPOINTMENT_BASE = "http://localhost:8000/appointment/";
const GUEST_BASE = "http://localhost:8000/guest/";
const PAYEMENT_BASE = "http://localhost:8000/payment/";
const PRESCRIPTION_BASE = "http://localhost:8000/prescription/";
const MESSAGE_BASE = "http://localhost:8000/message/";
const NOTIFICATION_BASE = "http://localhost:8000/notification/";

// Add comments that indicate if the path needs a param and what that param is
export const API_PATHS = {
  base: API_BASE,
  // Guest
  docSignUp: GUEST_BASE + "addRequest/",
  updateEmail: GUEST_BASE + "updateEmail/",
  login: GUEST_BASE + "login/",
  signup: GUEST_BASE + "addPatient/",
  updatePass: GUEST_BASE + "updatePass/",
  resetPass: GUEST_BASE + "resetPass/",
  sendOTP: GUEST_BASE + "sendOTP/",
  validateOTP: GUEST_BASE + "validateOTP/",
  getNotifs: GUEST_BASE + "getNotifs/",
  viewNotif: GUEST_BASE + "viewNotif/",
  acceptContract: GUEST_BASE + "acceptRequestEmail/",


  // Admin
  getRequests: ADMIN_BASE + "requests/",
  getRequest: ADMIN_BASE + "getRequest/",
  getRequestFile: ADMIN_BASE + "getRequestFile/",

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
  viewAllAvailableSlots: DOCTOR_BASE + "viewAllAvailableSlots/", //patient views working slots of Doctor
  validateBookingDate: DOCTOR_BASE + "validateBookingDate/", // validating booking date
  filterDoctorSlotEdition: DOCTOR_BASE + "filterDoctorSlotEdition/",
  getPaymentAmount: DOCTOR_BASE + "getPaymentAmount/",
  getChatPatients: DOCTOR_BASE + "getChatPatients/",
  getDocUsernameSocket: DOCTOR_BASE + "getDocUsernameSocket/",
  getDoctorInfo: DOCTOR_BASE + "getDoctorInfo/",
  getDoctorByUser:DOCTOR_BASE+"getDoctorByUser/",
  viewMySlots:DOCTOR_BASE+"viewMySlots/",
  validateForDoctor:DOCTOR_BASE+"validateBookingDateDoctor/",
  getFollowUps: DOCTOR_BASE + "followUps/",
  getFollowUp: DOCTOR_BASE + "getRequest/",
  rejectFollowUp: DOCTOR_BASE + "rejectFollowUp/",
  acceptFollowUp: DOCTOR_BASE + "acceptFollowUp/",
  viewUpcomingAppointmentsDoc: DOCTOR_BASE + "viewUpcomingAppointmentsDoc",
  // Patient
  viewMyPackage: PATIENT_BASE + "viewMyPackage",
  viewSubscription: PATIENT_BASE + "viewSubscription/",
  viewDoctors: PATIENT_BASE + "view/doctors/", // add patient id as a param
  viewPrescriptions: PATIENT_BASE + "getPrescriptions/",
  getPrescription: PATIENT_BASE + "selectPrescription/", // add prescription id as a param
  createFamilyMember: PATIENT_BASE + "createFamilymember/",
  viewFamilyMembers: PATIENT_BASE + "getFamilymember/", // get familymember from req.params
  getPatient: PATIENT_BASE + "selectPatient/", // get patient from req.params
  getPatientInfo: PATIENT_BASE + "getPatientInfo",
  linkPatient: PATIENT_BASE + "linkPatient",
  uploadFile: PATIENT_BASE + "uploadFile", // upload file and note
  getMedicalHistory: PATIENT_BASE + "getMedicalHistory", // get getMedicalHistory for patient (by username if admin)
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
  getChatDoctors: PATIENT_BASE + "getChatDoctors/",
  getPatientUsernameSocket: PATIENT_BASE + "getPatientUsernameSocket/",
  requestFollowUp: PATIENT_BASE + "requestfollowupAppointment/",
  // Package
  packages: PACKAGE_BASE + "packages/",
  addPackage: PACKAGE_BASE + "addPackage/",
  deletePackage: PACKAGE_BASE + "deletePackage/",
  updatePackage: PACKAGE_BASE + "updatePackage/",

  // Appointment
  viewAppointments: APPOINTMENT_BASE + "/getAppointmentsDoc/",
  viewAppointPat: APPOINTMENT_BASE + "getAppointmentsPat/",
  viewFamAppoint:PATIENT_BASE+"viewfamilymembersappointments/",
  viewDoctorPatients: APPOINTMENT_BASE + "searchpatient/",
  viewUpcomingAppointments: APPOINTMENT_BASE + "upcoming/",
  createAppointment: APPOINTMENT_BASE + "createAppointment",
  cancellappointment:APPOINTMENT_BASE+"cancelAppointment/",
  rescheduleForDoctor: APPOINTMENT_BASE + "rescheduleForPatient/",
  getAllAppointmentsPat: APPOINTMENT_BASE + "getAllAppointmentsPat",
  getDoctorId: APPOINTMENT_BASE+ "getDoctorId/",
  rescheduleForPatient: APPOINTMENT_BASE+ "/rescheduleAppointmentPatient/",
  getAllAppointmentsPat: APPOINTMENT_BASE + "getAllAppointmentsPat",

  ///cancelAppFam
  cancellappointmentfam: APPOINTMENT_BASE + "cancelAppFam/",
  // Payment
  cardPayment: PAYEMENT_BASE + "cardPayment",
  walletPayment: PAYEMENT_BASE + "walletPayment",

  //prescription
  addPrescription: PRESCRIPTION_BASE + "addPrescription",
  addMedToPrescription: PRESCRIPTION_BASE + "addMedToPrescription",
  deleteMedFromPrescription: PRESCRIPTION_BASE + "deleteMedFromPrescription",
  updateDosage: PRESCRIPTION_BASE + "updateDosage",
  checkForPrescription: PRESCRIPTION_BASE + "checkForPrescription",
  getPrescriptionMeds: PRESCRIPTION_BASE + "getPrescriptionMeds",
  getPrescriptionAPP: PRESCRIPTION_BASE + "getPrescriptionAPP",
  addToCart: PRESCRIPTION_BASE + "orderPrescription",
  updateDescription: PRESCRIPTION_BASE + "updateDescription",

  //Message
  getMessages: MESSAGE_BASE + "getMessages",
  createMessage: MESSAGE_BASE + "createMessage",

  //notifications
  getNotifications: NOTIFICATION_BASE + "getNotifications",
  setNotificationsToSeen: NOTIFICATION_BASE + "setNotificationsToSeen",
};
