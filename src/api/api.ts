import Fetch from "../fetch";

type AuthResponseData = {
  data: {
    tokenType: string;
    expiresAt: string;
    accessToken: string;
    refreshToken: string;
    scopes: [];
  };
};

export type AuthenticationData = {
  email: string;
  password: string;
};

export type ResponseProfileUser = {
  data: {
    name: string;
    email: string;
  };
};

export type ResponseLogOut = {
  success: boolean;
};

export const instance = new Fetch("https://tager.dev.ozitag.com/api");

const api = {
  authenticatedUser(
    AuthenticationData: AuthenticationData
  ): Promise<AuthResponseData> {
    return instance.post<AuthResponseData>("/auth/user", {
      body: JSON.stringify(AuthenticationData),
    });
  },
  getProfileUser(): Promise<ResponseProfileUser> {
    return instance.get<ResponseProfileUser>("/tager/user/profile");
  },
  logOut(): Promise<ResponseLogOut> {
    return instance.post<ResponseLogOut>("/tager/user/profile/logout");
  },
};
export default api;
