import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../pages";

export default function AuthenticatedRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  );
}
