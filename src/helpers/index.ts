import api from "../api";

export const setHeadersForClientApi = (name: string, value: string) => {
  api.client.setHeaders(name, value);
};
