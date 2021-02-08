import React from "react";
import { GlobalStyle } from "./globalStyle";
import { useAuthState } from "./AuthProvider/AuthProvider";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnauthenticatedRoutes from "./UnauthenticatedRoutes";

const App = () => {
  const authState = useAuthState();

  return (
    <div className="App">
      <GlobalStyle />
      {authState?.isAuthenticated ? (
        <AuthenticatedRoutes />
      ) : (
        <UnauthenticatedRoutes />
      )}
    </div>
  );
};
export default App;
