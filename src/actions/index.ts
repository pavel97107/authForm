import { AppDispatch } from "../store";
import {
  setUser,
  logOutUser,
  setLoading,
  setUserFailed,
} from "../reducers/user";
import { setAppStatus } from "../reducers/appStatus";
import { api, responseData, RequestBody, profileUser } from "../api";
import { AxiosResponse } from "axios";
import { History } from "history";

export const SET_USER = (data: RequestBody, history: History) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading());
      const response: AxiosResponse<responseData> = await api.auth.signIn(data);
      const {
        accessToken,
        tokenType,
        refreshToken,
        expiresAt,
      } = response.data.data;
      const userData: AxiosResponse<profileUser> = await api.auth.getProfileUser(
        tokenType,
        accessToken
      );
      const { name, email } = userData.data.data;
      dispatch(setUser({ user: { name, email }, accessToken }));
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", refreshToken);
      window.localStorage.setItem("expiresAt", expiresAt);
      history.push("/");
    } catch (e) {
      dispatch(setUserFailed(e.message));
    }
  };
};

export const LOG_OUT = (dispatch: AppDispatch) => {
  if (localStorage.getItem("accessToken")) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresAt");
    dispatch(logOutUser());
    window.location.href = "/signin";
  }
};

export const checkAuth = (history: History) => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const expiresAt: string | null = localStorage.getItem("expiresAt");

      if (accessToken && typeof expiresAt === "string") {
        if (Date.parse(expiresAt) > Date.now()) {
          api.auth.getProfileUser("Bearer", accessToken).then((response) => {
            const { name, email } = response.data.data;
            dispatch(setUser({ user: { name, email }, accessToken }));
            dispatch(setAppStatus("complete"));
          });
        }
      }
    } else {
      dispatch(setAppStatus("complete"));
      history.push("/signin");
    }
  };
};
