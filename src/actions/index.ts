import { AppDispatch } from "../store";
import {
  setUser,
  setLoading,
  setUserFailed,
  logOutUser,
} from "../reducers/user";
import { setAppStatus } from "../reducers/appStatus";
import { api, AuthResponseData, RequestBody, ProfileUserData } from "../api";
import { History } from "history";

export const SET_USER = (data: RequestBody, history: History) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading());
      const response: AuthResponseData = await api.auth.signIn(data);

      const { accessToken, tokenType, refreshToken, expiresAt } = response.data;

      const userData: ProfileUserData = await api.auth.getProfileUser(
        tokenType,
        accessToken
      );

      const { name, email } = userData.data;
      dispatch(setUser({ user: { name, email }, accessToken }));
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", refreshToken);
      window.localStorage.setItem("expiresAt", expiresAt);
      history.push("/");
    } catch (e) {
      dispatch(setUserFailed(e));
    }
  };
};

export const LOG_OUT = async (dispatch: AppDispatch) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    if (accessToken && typeof accessToken === "string") {
      const response = await api.auth.logOut("Bearer", accessToken);
      if (response.success) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expiresAt");
        dispatch(logOutUser());
      }
    }
  } catch (e) {
    dispatch(setAppStatus({ status: "error", message: e }));
  }
};

export const checkAuth = (history: History) => {
  return async (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const expiresAt: string | null = localStorage.getItem("expiresAt");

      if (accessToken && typeof expiresAt === "string") {
        if (Date.parse(expiresAt) > Date.now()) {
          const response = await api.auth.getProfileUser("Bearer", accessToken);

          const { name, email } = response.data;
          dispatch(setUser({ user: { name, email }, accessToken }));
          dispatch(setAppStatus({ status: "complete", message: null }));
        }
      }
    } else {
      dispatch(setAppStatus({ status: "complete", message: null }));
      history.push("/signin");
    }
  };
};
