import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { useAuthContext } from "hooks/useAuthContext";

//IMPORT LAYOUTS (LAZEM A CREATE COMPONENT /connected le view)
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";

// TODO: add patient and doctor layouts
function App() {
  const { user } = useAuthContext();

  if (!user)
    return (
      <BrowserRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route render={() => <Redirect to="/auth" />} />
        </Switch>
      </BrowserRouter>
    );

  if (user.userType === "Admin")
    return (
      <BrowserRouter>
        <Switch>
          <Route path={`/admin`} component={AdminLayout} />
          <Route render={() => <Redirect to="/admin" />} />
        </Switch>
      </BrowserRouter>
    );
  if (user.userType === "Doctor")
    return (
      <BrowserRouter>
        <Switch>
          <Route path={`/doctor`} component={AdminLayout} />
          <Route render={() => <Redirect to="/doctor" />} />
        </Switch>
      </BrowserRouter>
    );

  if (user.userType === "Patient")
    return (
      <BrowserRouter>
        <Switch>
          <Route path={`/patient`} component={AdminLayout} />
          <Route render={() => <Redirect to="/patient" />} />
        </Switch>
      </BrowserRouter>
    );

  return (
    <BrowserRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route render={() => <Redirect to="/auth" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
