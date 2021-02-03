import React, { useEffect } from "react";
import { Home, SignIn } from "./pages";
import { Redirect, Switch, Route } from "react-router-dom";
import { RootState, useAppDispatch } from "./store";
import { useSelector } from "react-redux";
import { checkAuth } from "./actions";
import { GlobalStyle } from "./globalStyle";

const App = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector<RootState>((state) => state.user.isAuth);

  useEffect(() => {
    dispatch(checkAuth);
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <Switch>
        {isAuth && <Route exact path="/" component={Home} />}
        {!isAuth && <Route exact path="/signin" component={SignIn} />}
        <Redirect to={{ pathname: isAuth ? "/" : "/signin" }} />
      </Switch>
    </div>
  );
};

export default App;
