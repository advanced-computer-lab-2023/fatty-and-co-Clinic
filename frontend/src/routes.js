import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn";
import SignUp from "views/Auth/SignUp";
import docSignUp from "views/Auth/docSignUp";
import UpdateEmail from "views/Doctors/updateInfo/UpdateEmail.js"; 
//Zawedna de
import CancelSubscription from "views/Patient/CancelSubscription/cancelsubscribtion.js";
import Package from "views/Admin/Package/package";
import Packagesubscibe  from "views/Patient/Package/packagesubscribe";
import Package2 from "views/Patient/viewPackagesFam/package2"
import DeleteUser from "views/Admin/DeleteUser/DeleteUserForm";
import CreateAdmin from "views/Admin/CreateAdmin/CreateAdminForm";
import createFamilymember from "views/Patient/createFamilyMember";
import viewDoctors from "views/Patient/viewDoctors";
import ViewDoctorDetails from "views/Patient/viewDoctorDetails";
import Viewmembers from "views/Patient/viewmembers";
import ViewAppointments from "views/Doctors/viewAppointments";
import viewPrescriptions from "views/Patient/viewPrescriptions";
import UpdateAffil from "views/Doctors/updateInfo/UpdateAffil";
import Requests from "views/Admin/Requests";
import UpdateHourly from "views/Doctors/updateInfo/UpdateHourly";
import PatientAppointments from "views/Patient/viewAppointPat/";
import ViewDoctorsPatients from "views/Doctors/viewPatients";
import ViewMyPackage from "views/Patient/viewMyPackage"
import ViewFamPackages from "views/Patient/viewFamPackages";
import ViewFamPackageswithstatus from "views/Patient/viewpackagewithstatus";
import MakePayment from "views/Patient/makePayment";
import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

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
    path: "/packagetest",
    name: "Packagetesting",
    icon: <HomeIcon color="inherit" />,
    component: Packagesubscibe,
    layout: "/patient",
  },
  {
    path: "/viewMyPackage",
    name: "My Package",
    icon: <HomeIcon color="inherit" />,
    component: ViewMyPackage,
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
    path: "/ViewFamPackageswithstatus",
    name: "Family Packages status",
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
    path: "/viewAppointPat/:PatientUsername",
    name: "View Patient Appointments ",
    icon: <HomeIcon color="inherit" />,
    component: PatientAppointments,
    layout: "/doctor",
  },

  {
    path: "/Subscribtions/",
    name: "Subscribtions",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: CancelSubscription,
    layout: "/patient",
  },
  {
    path: "/updateEmailDoc/:DoctorUsername",
    name: "Update Email",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: UpdateEmail,
    layout: "/doctor",
  },
  {
    path: "/updateHourly/:DoctorUsername",
    name: "Update Hourly Rate",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: UpdateHourly,
    layout: "/doctor",
  },
  {
    path: "/updateAffil/:Username",
    name: "Update Affiliation",
    rtlName: "لوحة القيادة",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: UpdateAffil,
    layout: "/doctor",
  },

  {
    path: "/viewAppointments/:DoctorUsername",
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
    icon: <HomeIcon color="inherit" />,
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
    path: "/viewDoctorDetails/:username",
    name: "View Doctor Details",
    icon: <HomeIcon color="inherit" />,
    component: ViewDoctorDetails,
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
    path: "/viewmembers/:PatientUserName",
    name: "View members",
    icon: <HomeIcon color="inherit" />,
    component: Viewmembers,
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
    path: "/doctorPatients/:doctorUsername",
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
    secondaryNavbar: true,
    component: MakePayment,
    layout: "/patient",
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
        secondaryNavbar: true,
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
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
     
      {
        path: "/docsignup",
        name: "Doctor Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: docSignUp,
        layout: "/auth",
      },
      
    ],
  },
];
export default dashRoutes;
