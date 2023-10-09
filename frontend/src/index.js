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
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";


//IMPORT LAYOUTS (LAZEM A CREATE COMPONENT /connected le view)
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import UpdateDocMail from "layouts/Doctor/ChangeMail"
import UpdateAffiliation from "layouts/Doctor/ChangeAffiliation";
import UpdateHourly from "layouts/Doctor/ChangeHourly"

//NOTE: Route path hena bet represent el LAYOUT from routes.js 
//NOTE: Component hena bet represent el imported layout  
//NOTE: To test updatedocmail, redirect from '/' to 'updateEmail'
ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path={`/auth`} component={AuthLayout} />
      <Route path={`/admin`} component={AdminLayout} />
      <Route path={`/rtl`} component={RTLLayout} />
      <Route path={`/updateEmail`} component={UpdateDocMail}/>  
      <Route path={'/updateAffiliation'} component={UpdateAffiliation}/>
      <Route path={'/updateHourlyRate'} component={UpdateHourly}/>

      <Redirect from={`/`} to="/updateHourlyRate" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
