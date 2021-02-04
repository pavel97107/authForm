import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

export type RequestBody = {
  clientId?: string;
  email: string;
  password: string;
};

// type requestProps = {
//   url: string;
//   data: RequestBody;
// };

export type responseData = {
  data: {
    tokenType: string;
    expiresAt: string;
    accessToken: string;
    refreshToken: string;
    scopes: [];
  };
};

export type profileUser = {
  data: {
    name: string;
    email: string;
  };
};

// function config(props: requestProps): {
//     method: string,
//     headers: {
//         [key: string]: string,
//     },
//     mode: RequestMode,
//     body: string
// } {
//     return {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         mode: 'cors',
//         body: JSON.stringify(props.data)
//     }
//
// }

// function createInstance() {
//     return {
//         async post(props: requestProps): Promise<responseData> {
//             let rest = config(props)
//             return fetch(`https://tager.dev.ozitag.com/${
//                 props.url}`, rest)
//                 .then(response => {
//                     console.log(response)
//                     if (!response.ok) {
//                         throw new Error(response.statusText)
//                     } else {
//                         return response.json()
//                     }
//                 })
//                 .then(result => result)
//                 .catch((err) => console.log(err))
//         }
//
//     }
// }

//export const api = createInstance()

const config: AxiosRequestConfig = {
  baseURL: "https://tager.dev.ozitag.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
};

//axios
const instance: AxiosInstance = axios.create(config);

export const api = {
  auth: {
    signIn(data: RequestBody): Promise<AxiosResponse<responseData>> {
      return instance.post<responseData>("/auth/user", data);
    },
    getProfileUser(
      tokenType: string,
      accessToken: string
    ): Promise<AxiosResponse<profileUser>> {
      return instance.get("/tager/user/profile", {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      });
    },
  },
};
