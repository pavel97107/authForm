import { InstanceFetch } from "./fetch.types";

export const creatingRequestConfigAndUrl = (
  _this: InstanceFetch,
  CustomRequestConfig = {}
) => {
  const _defaults = { ..._this.defaults };
  const _requestConfig = Object.assign(_defaults, CustomRequestConfig);
  const _fullUrl = requestUrl.bind(_this, _this);

  return { _fullUrl, _requestConfig };
};

export async function transformData<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const _error = await response.json();
    throw _error;
  }
  return response.json();
}

function requestUrl(_this: InstanceFetch, url: string): string {
  const _baseUrl = _this.defaults.baseUrl;
  return _baseUrl ? `${_baseUrl}${url}` : url;
}
