import api from "../api";
import { AuthenticationData, ResponseProfileUser } from "../api/api";
import { handleError, setItemInLocalStorage } from "../helpers";
import { setHeadersForClientApi } from "../helpers/setHeadersForClientApi";

export const authenticatedUser = async (
  AuthenticationData: AuthenticationData
) => {
  try {
    const authResponse = await api.authenticatedUser(AuthenticationData);
    const { tokenType, accessToken, expiresAt } = authResponse.data;
    const token = `${tokenType} ${accessToken}`;
    setItemInLocalStorage("accessToken", token);
    setItemInLocalStorage("expiresAt", expiresAt);
    setHeadersForClientApi("Authorization", token);
  } catch (e) {
    return handleError(e.message);
  }
};

export const getUserData = (): Promise<ResponseProfileUser> => {
  try {
    return api.getProfileUser();
  } catch (e) {
    return handleError(e.message);
  }
};

export const logOut = () => {
  try {
    return api.logOut();
  } catch (e) {
    return handleError(e.message);
  }
};

export const checkingUserAuthentication = (): Promise<ResponseProfileUser> => {
  const accessToken = localStorage.getItem("accessToken");
  const expiresAt = localStorage.getItem("expiresAt");

  if (accessToken && expiresAt) {
    const isNotExpired = Date.parse(expiresAt) > Date.now();
    if (isNotExpired) {
      try {
        setHeadersForClientApi("Authorization", accessToken);
        return api.getProfileUser();
      } catch (e) {
        return handleError(e.message);
      }
    } else {
      return handleError("Token is expired");
    }
  } else {
    return handleError("No authentication token");
  }
};
