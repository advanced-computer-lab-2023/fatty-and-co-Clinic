/*!

=========================================================
* Purity UI Dashboard - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/purity-ui-dashboard/blob/master/LICENSE.md)

* Design by Creative Tim & Coded by Simmmple 

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { AuthContextProvider } from "context/AuthContext";

import { useAuthContext } from "hooks/useAuthContext";

//IMPORT LAYOUTS (LAZEM A CREATE COMPONENT /connected le view)
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";

//NOTE: Route path hena bet represent el LAYOUT from routes.js
//NOTE: Component hena bet represent el imported layout
//NOTE: To test updatedocmail, redirect from '/' to 'updateEmail'

// TODO: change admin and rtl to patient, admin and doctor and add their layouts
// auth can be used for login and registration since layout is already good
const MainApp = () => {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={`/auth`}
          render={() => (!user ? <AuthLayout /> : <Redirect to={"/admin"} />)}
        />
        <Route
          path={`/admin`}
          render={() => (user ? <AdminLayout /> : <Redirect to={"/auth"} />)}
        />
        <Route path={`/rtl`} component={RTLLayout} />
        <Redirect from={`/`} to={"/auth"} />
      </Switch>
    </BrowserRouter>
  );
};
ReactDOM.render(
  <AuthContextProvider>
    <MainApp />
  </AuthContextProvider>,
  document.getElementById("root")
);
