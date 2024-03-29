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
import { AuthContextProvider } from "context/AuthContext";
import { WalletContextProvider } from "context/WalletContext";
import { NotificationsContextProvider } from "context/NotificationsContext";
import App from "./App";
import { PatientAppointmentsContextProvider } from "context/PatientAppointmentsContext";
import { FollowUpRequestsContextProvider } from "context/FollowUpRequestsContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WalletContextProvider>
        <NotificationsContextProvider>
          <PatientAppointmentsContextProvider>
            <FollowUpRequestsContextProvider>
        <App />
        </FollowUpRequestsContextProvider>
        </PatientAppointmentsContextProvider>
        </NotificationsContextProvider>
      </WalletContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
