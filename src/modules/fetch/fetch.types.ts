export interface BaseMethodsFetchClient {
  post<T>(url: string, CustomRequestConfig?: RequestInit): Promise<T>;

  get<T>(url: string, CustomRequestConfig?: RequestInit): Promise<T>;

  setHeaders(name: string, value: string): void;
}

export interface InstanceFetch extends BaseMethodsFetchClient {
  defaults: {
    baseUrl: null | string;
    headers: {
      [key: string]: string;
    };
  };
}
