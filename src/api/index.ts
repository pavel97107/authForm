
export type RequestBody = {
  clientId?: string;
  email: string;
  password: string;
};

interface FetchConfig {
  body?: RequestBody;
  method: string;
  Authorization?: string;
}

interface RequestProps extends FetchConfig {
  url: string;
}

export type AuthResponseData = {
  data: {
    tokenType: string;
    expiresAt: string;
    accessToken: string;
    refreshToken: string;
    scopes: [];
  };
};

type ResponseLogOutSystem = {
  success: boolean;
};

export type ProfileUserData = {
  data: {
    name: string;
    email: string;
  };
};

function config(props: FetchConfig): RequestInit {
  const headers: {
    [key: string]: string;
  } = {};
  headers["Content-Type"] = "application/json";
  if (props.Authorization) {
    headers["Authorization"] = props.Authorization;
  }

  return {
    method: props.method,
    headers,
    body: JSON.stringify(props.body),
  };
}

interface InvalidData {
  message: string;
  errors: {
    [key: string]: any;
  };
}

const checkForError = async <T>(response: Response): Promise<T | never> => {
  if (!response.ok) {
    const data: InvalidData = await response.json();
    throw data;
  }
  return response.json().then<T>((data) => data as T);
};

function createInstance() {
  return {
    async post<T>(props: RequestProps): Promise<T | never> {
      return fetch(
        `https://tager.dev.ozitag.com/api${props.url}`,
        config({ ...props })
      )
        .then<T>(checkForError)
        .catch((err: InvalidData) => {
          throw err.message;
        });
    },

    async get<T>(props: RequestProps): Promise<T | never> {
      return fetch(
        `https://tager.dev.ozitag.com/api${props.url}`,
        config({ ...props })
      )
        .then<T>(checkForError)
        .catch((err: InvalidData) => {
          throw err.message;
        });
    },
  };
}

export const instance = createInstance();

export const api = {
  auth: {
    signIn(data: RequestBody): Promise<AuthResponseData> {
      return instance.post<AuthResponseData>({
        url: "/auth/user",
        method: "POST",
        body: data,
      });
    },
    getProfileUser(
      tokenType: string,
      accessToken: string
    ): Promise<ProfileUserData> {
      return instance.get<ProfileUserData>({
        url: "/tager/user/profile",
        method: "GET",
        Authorization: `${tokenType} ${accessToken}`,
      });
    },
    logOut(
      tokenType: string,
      accessToken: string
    ): Promise<ResponseLogOutSystem> {
      return instance.post({
        url: "/tager/user/profile/logout",
        method: "POST",
        Authorization: `${tokenType} ${accessToken}`,
      });
    },
  },
};
