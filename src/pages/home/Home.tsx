import React, { useState } from "react";
import { HomePage, HomePageContent } from "./Home.styles";
import { useAuthState } from "../../AuthProvider/AuthProvider";
import { Button, Spinner } from "../../components";
import { logOut as logOutThunk } from "../../actions";
import { RouteComponentProps } from "react-router-dom";

export default function Home(props: RouteComponentProps) {
  const [loading, setLoading] = useState(false);
  const [logOutError, setLogOutError] = useState(null);
  const authState = useAuthState();
  const name = authState?.user?.name || null;
  const email = authState?.user?.email || null;

  function logOut() {
    setLoading(true);
    logOutThunk()
      .then(() => {
        authState?.logOut();
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
        {loading ? <Spinner /> : <Button onClick={logOut} title="Log Out" />}
        {logOutError && <h3>{logOutError}</h3>}
      </HomePageContent>
    </HomePage>
  );
}
