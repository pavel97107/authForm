import { instance } from "../api/api";

export const setHeadersForClientApi = (name: string, value: string) => {
  instance.setHeaders(name, value);
};