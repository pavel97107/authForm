import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Home, SignIn } from "../pages";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// eslint-disable-next-line react/display-name
export default () => {
  const isAuth = useSelector<RootState>((state) => state.user.isAuth);

  return (
    <Switch>
      {isAuth && <Route exact path="/" component={Home} />};
      {!isAuth && <Route exact path="/signin" component={SignIn} />}
      <Redirect to={{ pathname: isAuth ? "/" : "/signin" }} />
    </Switch>
  );
};
