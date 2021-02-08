import React, { ReactNode, useContext, useEffect, useState } from "react";
import { checkingUserAuthentication } from "../actions";
import { removeItemFromLocalStorage } from "../helpers/removeItemFromLocalStorage";
import { FullPageSpinner } from "../components";

const AuthContext = React.createContext<null | AuthStateAndMethodUpdateState>(
  null
);

export type AuthState = {
  status: string;
  error: null | string;
  user: null | {
    [key: string]: string;
  };
};

interface AuthStateAndMethodUpdateState {
  state: AuthState;
  setUser: (user: { name: string; email: string }) => void;
  logOut: () => void;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    status: "pending",
    error: null,
    user: null,
  });

  useEffect(() => {
    checkingUserAuthentication().then(
      (response) =>
        setState({ ...state, user: response.data, status: "success" }),
      (error) => {
        setState({ ...state, status: "failed", error: error.message });
      }
    );
  }, [setState]);

  const setUser = (user: { name: string; email: string }) => {
    setState({ ...state, user: user, status: "success", error: null });
  };
  const logOut = () => {
    removeItemFromLocalStorage("accessToken");
    removeItemFromLocalStorage("expiresAt");
    setState({ ...state, user: null, status: "success", error: null });
  };

  const providerValue = {
    state,
    setUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {state.status === "pending" ? <FullPageSpinner /> : children}
    </AuthContext.Provider>
  );
};

function useAuthState() {
  const authState = useContext(AuthContext);
  if (authState) {
    const state = authState.state;
    const isError = state.status === "error";
    const isSuccess = state.status === "success";
    const isPending = state.status === "pending";
    const isAuthenticated = state.user && isSuccess;
    const user = state.user;
    const setUser = authState.setUser;
    const logOut = authState.logOut;
    return {
      isError,
      isSuccess,
      isPending,
      isAuthenticated,
      user,
      setUser,
      logOut,
    };
  } else return null;
}

export { useAuthState };
export default AuthProvider;
