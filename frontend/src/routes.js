// import
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
// <<<<<<< HEAD
import UpdateEmail from "views/Doctors/UpdateEmail.js"  //Zawedna de
import createFamilymember from "views/Patient/createFamilymember";
import Package from "views/Admin/Package/package";
import viewDoctors from "views/Patient/viewDoctors";
import Viewmembers from "views/Patient/viewmembers";




// ======

// >>>>>>> 941a373669f5126473758cc34a32e5d0857e25f4

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
    ],
  },
  {
    name: "UPDATE ACCOUNT",
    category: "update",
    rtlName: "صفحات",
    state: "pageCollapse",  //not sure
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component:UpdateEmail ,
        layout: "/updateEmail",     //Not sure men ay 7aga
      }]
  },
  {
    name: "Create family member ",
    category: "create",
    rtlName: "صفحات",
    state: "pageCollapse",  //not sure
    views: [
      {
        path: "/Add",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component:createFamilymember ,
        layout: "/Createfamilymem",     //Not sure men ay 7aga
      }]
  }
];
export default dashRoutes;
