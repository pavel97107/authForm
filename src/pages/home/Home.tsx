import React, { useState } from "react";
import { HomePage, HomePageContent } from "./Home.styles";
import { useAuthState } from "../../context/AuthProvider/AuthProvider";
import { Button, Spinner } from "../../components/common";
import { RouteComponentProps } from "react-router-dom";
import api from "../../api/api";

export const logOut = () => {
  return api.logOut();
};

export default function Home(props: RouteComponentProps) {
  const [loading, setLoading] = useState(false);
  const [logOutError, setLogOutError] = useState(null);
  const authState = useAuthState();
  const name = authState.user?.name || null;
  const email = authState.user?.email || null;

  function onClick() {
    setLoading(true);
    logOut()
      .then(() => {
        authState.logOut();
      })
      .catch((err) => {
        setLoading(false);
        setLogOutError(err.message);
      });
  }

  return (
    <HomePage>
      <HomePageContent>
        <h1>Name: {name}</h1>
        <h1>Email: {email}</h1>
        {loading ? <Spinner /> : <Button onClick={onClick} title="Log Out" />}
        {logOutError && <h3>{logOutError}</h3>}
      </HomePageContent>
    </HomePage>
  );
}
