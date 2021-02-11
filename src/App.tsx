import React from "react";
import { GlobalStyle } from "./globalStyle";
import { useAuthState } from "./context/AuthProvider/AuthProvider";
import { Redirect, Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

const App = () => {
  const authState = useAuthState();

  return (
    <div className="App">
      <GlobalStyle />
      <Switch>
        {authState?.isAuthenticated ? (
          <>
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </>
        ) : (
          <>
            <Route exact path="/signin" component={SignIn} />
            <Redirect to="/signin" />
          </>
        )}
      </Switch>
    </div>
  );
};
export default App;
