import { InstanceFetch } from "./fetch.types";
import { creatingRequestConfigAndUrl, transformData } from "./fetch.helpers";

interface FetchConstructor {
  new (baseUrl: string): InstanceFetch;
}

const Fetch = (function (this: InstanceFetch, baseUrl: null | string) {
  // eslint-disable-next-line no-invalid-this
  this.defaults = {
    baseUrl: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  };
} as unknown) as FetchConstructor;

Fetch.prototype.setHeaders = function (name: string, value: string) {
  this.defaults.headers[name] = value;
};

Fetch.prototype.removeHeaders = function (name: string) {
  delete this.defaults.headers[name];
};

Fetch.prototype.post = function <T>(
  url: string,
  CustomRequestConfig = {}
): Promise<T> {
  const _this = this as InstanceFetch;
  const { _requestConfig, _fullUrl } = creatingRequestConfigAndUrl(
    _this,
    CustomRequestConfig
  );

  return fetch(_fullUrl(url), {
    method: "POST",
    ..._requestConfig,
  }).then<T, never>(transformData);
};

Fetch.prototype.get = function <T>(
  url: string,
  CustomRequestConfig = {}
): Promise<T> {
  const _this = this as InstanceFetch;
  const { _requestConfig, _fullUrl } = creatingRequestConfigAndUrl(
    _this,
    CustomRequestConfig
  );
  console.log(_requestConfig);
  return fetch(_fullUrl(url), {
    method: "GET",
    ..._requestConfig,
  }).then<T>(transformData);
};

export default Fetch;
