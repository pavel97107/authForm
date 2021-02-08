import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { SignIn } from "../pages";

export default function UnauthenticatedRoutes() {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Redirect to="/signin" />
    </Switch>
  );
}
