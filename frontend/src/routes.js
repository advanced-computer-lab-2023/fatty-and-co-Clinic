import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn";
import resetPass from "views/Auth/resetPass";
import SignUp from "views/Auth/SignUp";
import DocAcc from "views/Auth/docAccepted";
import docSignUp from "views/Auth/docSignUp";
import UpdateEmail from "views/Doctors/updateInfo/UpdateEmail.js";
import ViewMyPackageswithstatus from "views/Patient/ViewMyPackagewithstatus";
import CancelSubscription from "views/Patient/CancelSubscription/cancelsubscribtion.js";
import SubscribePackage from "views/Patient/SubscribePackage/subscribePack.js";
import Package from "views/Admin/Package/package";
import Package2 from "views/Patient/viewPackagesFam/package2";
import DeleteUser from "views/Admin/DeleteUser/DeleteUserForm";
import CreateAdmin from "views/Admin/CreateAdmin/CreateAdminForm";
import createFamilymember from "views/Patient/createFamilyMember";
import viewDoctors from "views/Patient/viewDoctors";
import ViewDoctorDetails from "views/Patient/viewDoctorDetails";
import Viewmembers from "views/Patient/viewmembers";
import ViewAppointments from "views/Doctors/viewAppointments";
import viewPrescriptions from "views/Patient/viewPrescriptions";
import MedicalHistoryPatient from "views/Patient/viewMedicalHistory/medicalHistory";
import UpdateAffil from "views/Doctors/updateInfo/UpdateAffil";
import UpdatePass from "views/Doctors/updateInfo/UpdatePass";
import Requests from "views/Admin/Requests";
import UpdateHourly from "views/Doctors/updateInfo/UpdateHourly";
import PatientAppointments from "views/Patient/viewAppointPat/";
import ViewDoctorsPatients from "views/Doctors/viewPatients";
import linkPatient from "views/Patient/linkPatient";
import ViewMyPackage from "views/Patient/viewMyPackage";
import ViewFamPackages from "views/Patient/viewFamPackages";
import ViewFamPackageswithstatus from "views/Patient/viewpackagewithstatus";
import MakePayment from "views/Patient/makePayment";
import UpdateSlots from "views/Doctors/updateInfo/UpdateSlots";
import bookAptDetails from "views/Patient/bookAptDetails/bookAptDetails";
import AppointmentConfirmation from "views/Patient/appointmentConfirmation";
import WalletPayment from "views/Patient/walletPayment";
import PatientProfile from "views/Patient/viewProfile";
import chatWithDoc from "views/Patient/chatwithDoc";
import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";
import ChatWithPatient from "views/Doctors/chat/chatwithPat";

//path da el url el added lama ben doos 3ala a certain component fel ui
//icon ben7ot fe el component name
//component de 7aga fe views

// TODO: organize routes by type of user
var dashRoutes = [
  {
    path: "/package",
    name: "Package",
    icon: <HomeIcon color="inherit" />,
    component: Package,
    layout: "/admin",
  },

  {
    path: "/viewMyPackage",
    name: "My Package",
    icon: <HomeIcon color="inherit" />,
    component: ViewMyPackage,
    layout: "/patient",
  },
  {
    path: "/SubscribePackages",
    name: "Subscribe",
    icon: <HomeIcon color="inherit" />,
    component: SubscribePackage,
    layout: "/patient",
  },
  {
    path: "/viewFamPackage",
    name: "Family Packages",
    icon: <HomeIcon color="inherit" />,
    component: ViewFamPackages,
    layout: "/patient",
  },
  {
    path: "/viewMyPackageStatus",
    name: "My Subscription",
    icon: <HomeIcon color="inherit" />,
    component: ViewMyPackageswithstatus,
    layout: "/patient",
  },
  {
    path: "/ViewFamPackageswithstatus",
    name: "Family Subscriptions",
    icon: <HomeIcon color="inherit" />,
    component: ViewFamPackageswithstatus,
    layout: "/patient",
  },

  {
    path: "/package",
    name: "Packages",
    icon: <HomeIcon color="inherit" />,
    component: Package2,
    layout: "/patient",
  },

  {
    path: "/viewAppointPat",
    name: "View Patient Appointments ",
    icon: <HomeIcon color="inherit" />,
    component: PatientAppointments,
    layout: "/patient",
  },

  {
    path: "/Subscribtions/",
    name: " Cancel Subscriptions",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color="inherit" />,
    component: CancelSubscription,
    layout: "/patient",
  },
  {
    path: "/updateEmailDoc",
    name: "Update Email",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color="inherit" />,
    component: UpdateEmail,
    layout: "/doctor",
  },
  {
    path: "/updateHourly",
    name: "Update Hourly Rate",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color="inherit" />,
    component: UpdateHourly,
    layout: "/doctor",
  },
  {
    path: "/updatePass",
    name: "Change Password",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color="inherit" />,
    component: UpdatePass,
    layout: "/doctor",
  },
  {
    path: "/updatePass",
    name: "Change Password",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: UpdatePass,
    layout: "/admin",
  },
  {
    path: "/updatePass",
    name: "Change Password",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: UpdatePass,
    layout: "/patient",
  },
  {
    path: "/updateAffil",
    name: "Update Affiliation",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color="inherit" />,
    component: UpdateAffil,
    layout: "/doctor",
  },

  {
    path: "/UpdateSlots",
    name: "Update Slots",
    icon: <HomeIcon color="inherit" />,
    component: UpdateSlots,
    layout: "/doctor",
  },

  {
    path: "/viewAppointments",
    name: "View Doctor Appointments",
    icon: <HomeIcon color="inherit" />,
    component: ViewAppointments,
    layout: "/doctor",
  },

  {
    path: "/viewRequests",
    name: "View Requests",
    icon: <HomeIcon color="inherit" />,
    component: Requests,
    layout: "/admin",
  },

  {
    path: "/addAdmin",
    name: "Add Admin",
    icon: <HomeIcon color="inherit" />,
    component: CreateAdmin,
    layout: "/admin",
  },

  {
    path: "/createFamilymember/:Createparameter",
    name: "Add Family Member",
    icon: <PersonIcon color="inherit" />,
    component: createFamilymember,
    layout: "/patient",
  },

  {
    path: "/deleteUser",
    name: "Delete User",
    icon: <HomeIcon color="inherit" />,
    component: DeleteUser,
    layout: "/admin",
  },

  {
    path: "/chatWithDoctor/",
    name: "Chat With Doctor",
    icon: <HomeIcon color="inherit" />,
    component: chatWithDoc,
    layout: "/patient",
    
  },
  {
    path: "/chatWithPatient/",
    name: "Chat With Patient",
    icon: <HomeIcon color="inherit" />,
    component: ChatWithPatient,
    layout: "/doctor",
    
  },
  {
    path: "/viewDoctorDetails/:username",
    name: "View Doctor Details",
    icon: <HomeIcon color="inherit" />,
    component: ViewDoctorDetails,
    layout: "/patient",
    show: false, // Add this to hide route from sidebar
  },

  {
    path: "/bookAptDetails/:row",
    name: "Book Appointment Details",
    icon: <HomeIcon color="inherit" />,
    component: bookAptDetails,
    layout: "/patient",
    show: false, // Add this to hide route from sidebar
  },
  {
    path: "/AppointmentConfirmation",
    name: "Appointment Confirmation",
    icon: <HomeIcon color="inherit" />,
    component: AppointmentConfirmation,
    layout: "/patient",
    show: false, // Add this to hide route from sidebar
  },
  

  {
    path: "/viewDoctors",
    name: "View Doctors",
    icon: <HomeIcon color="inherit" />,
    component: viewDoctors,
    layout: "/patient",
  },
  {
    path: "/viewmembers",
    name: "View members",
    icon: <HomeIcon color="inherit" />,
    component: Viewmembers,
    layout: "/patient",
  },
  {
    path: "/medicalhistory/:patientUsername",
    name: "Medical History",
    icon: <HomeIcon color="inherit" />,
    component: MedicalHistoryPatient,
    layout: "/patient",
  },
  {
    path: "/prescriptions/:patientUsername",
    name: "My prescriptions",
    icon: <HomeIcon color="inherit" />,
    component: viewPrescriptions,
    layout: "/patient",
  },
  {
    path: "/linkPatient",
    name: "Link Patient",
    icon: <PersonIcon color="inherit" />,
    component: linkPatient,
    layout: "/patient",
    show: false
  },
  {
    path: "/doctorPatients",
    name: "View Doctor Patients",
    icon: <CreditIcon color="inherit" />,
    component: ViewDoctorsPatients,
    layout: "/doctor",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/doctor",
  },

  {
    path: "/tables",
    name: "Tables",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Billing",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: Billing,
    layout: "/admin",
  },
  {
    path: "/rtl-support-page",
    name: "RTL",
    rtlName: "آرتيإل",
    icon: <SupportIcon color="inherit" />,
    component: RTLPage,
    layout: "/rtl",
  },
  {
    path: "/payment",
    name: "Payment",
    rtlName: "لوحة القيادة",
    icon: <RocketIcon color="inherit" />,
    component: MakePayment,
    layout: "/patient",
    show: false,
  },

  {
    path: "/walletPayment",
    name: "Wallet payment",
    rtlName: "لوحة القيادة",
    icon: <RocketIcon color="inherit" />,
    component: WalletPayment,
    layout: "/patient",
    show: false,
  },
  {
    path: "/profile",
    name: "View patient profile",
    component: PatientProfile,
    layout: "/patient",
    show: false,
  },

  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        component: Profile,
        layout: "/admin", // TODO: figure out what to do with this to make it work for all user types
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        component: SignUp,
        layout: "/auth",
      },

      {
        path: "/docsignup",
        name: "Doctor Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        component: docSignUp,
        layout: "/auth",
      },
      {
        path: "/resetPass",
        name: "Password Reset",
        icon: <RocketIcon color="inherit" />,
        component: resetPass,
        layout: "/auth",
      },
      {
        path: "/docacc",
        name: "Contract Accepted",
        icon: <RocketIcon color="inherit" />,
        component: DocAcc,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
