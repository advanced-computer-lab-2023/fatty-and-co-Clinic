
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn";
import SignUp from "views/Auth/SignUp";
import docSignUp from "views/Auth/docSignUp";
import UpdateEmail from "views/Doctors/updateInfo/UpdateEmail.js"  //Zawedna de
//import createFamilymember from "views/Patient/createFamilymember";
import Package from "views/Admin/Package/package";
import DeleteUser from "views/Admin/DeleteUser/DeleteUserForm"
import CreateAdmin from "views/Admin/CreateAdmin/CreateAdminForm"
import createFamilymember from "views/Patient/viewmembers/components/createFamilymember";
import viewDoctors from "views/Patient/viewDoctors";
import Viewmembers from "views/Patient/viewmembers";
import ViewAppointments from "views/Doctors/viewAppointments";
import viewPrescriptions from "views/Patient/viewPrescriptions";
import viewDoctorPatients from "views/Doctors/viewPatients";
import UpdateAffil from "views/Doctors/updateInfo/UpdateAffil";
import Requests from "views/Admin/Requests";
import UpdateHourly from "views/Doctors/updateInfo/UpdateHourly";
import PatientAppointments from "views/Patient/viewAppointPat/"



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

var dashRoutes = [
  {
    path: "/package",
    name: "Package",
    icon: <HomeIcon color="inherit" />,
    component: Package,
    layout: "/admin",
  },
  {
    path: "/viewAppointPat",
    name: "View Patient Appointments ",
    icon: <HomeIcon color="inherit" />,
    component: PatientAppointments,
    layout: "/admin",
  },
  {
        path: "/updateEmailDoc",
        name: "Update Email",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component:UpdateEmail ,
        layout: "/admin",   
      },
      {
        path: "/updateHourly",
        name: "Update Hourly Rate",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component:UpdateHourly ,
        layout: "/admin",   
      },
      {
        path: "/updateAffil",
        name: "Update Affiliation",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component:UpdateAffil ,
        layout: "/admin",   
      },
 
  {

    path: "/viewAppointments",
    name: "View Doctor Appointments",
    icon: <HomeIcon color="inherit" />,
    component: ViewAppointments,
    layout: "/admin"
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
    path: "/addFamilymember",
    name: "Add Familymember",
    icon: <HomeIcon color="inherit" />,
    component: createFamilymember,
    layout: "/admin",
  },
  {
    path: "/deleteUser",
    name: "Delete User",
    icon: <HomeIcon color="inherit" />,
    component: DeleteUser,

    layout: "/admin",
  },
  {
    path: "/viewDoctors",
    name: "View Doctors",
    icon: <HomeIcon color="inherit" />,
    component: viewDoctors,
    layout: "/admin",
  },
  {
    path: "/viewmembers",
    name: "View members",
    icon: <HomeIcon color="inherit" />,
    component: Viewmembers,
    layout: "/admin",
  },
  {
    path: "/viewPrescriptions",
    name: "View Prescriptions",
    icon: <HomeIcon color="inherit" />,
    component: viewPrescriptions,
    layout: "/admin",
  },
  {
    path: "/viewDoctorPatients",
    name: "View Doctor's Patients",
    icon: <HomeIcon color="inherit" />,
    component: viewPrescriptions,
    layout: "/admin",
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
        layout: "/admin",
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
      }
    ],
  }
  ,
 
];
export default dashRoutes;
