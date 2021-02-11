import React from "react";
import AuthProvider from "./AuthProvider";
import { BrowserRouter as Router } from "react-router-dom";

interface ApplicationProviderProperties {
  children: React.ReactNode;
}

export default function AppProvider(props: ApplicationProviderProperties) {
  return (
    <AuthProvider>
      <Router>{props.children}</Router>
    </AuthProvider>
  );
}
