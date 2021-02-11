import Fetch from "../modules/fetch";

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

class Api {
  client: Fetch;

  constructor() {
    this.client = new Fetch({
      baseUrl: "https://tager.dev.ozitag.com/api/",
    });
  }

  authenticatedUser(userData: AuthenticationData): Promise<AuthResponseData> {
    return this.client.post<AuthResponseData>("/auth/user", {
      body: userData,
    });
  }

  getProfileUser(): Promise<ResponseProfileUser> {
    return this.client.get<ResponseProfileUser>("/tager/user/profile");
  }

  logOut(): Promise<ResponseLogOut> {
    return this.client.post<ResponseLogOut>("/tager/user/profile/logout");
  }
}

const api = new Api();
export default api;
