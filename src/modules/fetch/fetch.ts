export interface BaseMethodsFetchClient {
  post<T>(
    url: string,
    requestConfiguration?: IntermediateRequestConfiguration
  ): Promise<T>;

  get<T>(
    url: string,
    requestConfiguration?: IntermediateRequestConfiguration
  ): Promise<T>;
}

export interface InstanceFetch extends BaseMethodsFetchClient {
  defaults: {
    baseUrl: string;
    headers: {
      [key: string]: string;
    };
  };
}

interface IntermediateRequestConfiguration {
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  integrity?: string;
  keepalive?: boolean;
  method?: string;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  signal?: AbortSignal | null;
  window?: any;
  body?:
    | { [key: string]: any }
    | Blob
    | BufferSource
    | FormData
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | string;
}

async function ReadingStreamAndReturningData(response: Response) {
  if (!response.ok) {
    const processedResponse = await response.json();
    throw processedResponse;
  }
  return response.json();
}

function returnTheRequestConfigWithTheTransformedRequestBody(
  requestConfiguration: IntermediateRequestConfiguration
) {
  if (
    requestConfiguration.method?.toUpperCase() !== "GET" ||
    ("HEAD" && requestConfiguration.body)
  ) {
    requestConfiguration.body = JSON.stringify(requestConfiguration.body);
  }
  return requestConfiguration;
}

function createRequestConfiguration(
  instance: InstanceFetch,
  customRequestConfiguration: IntermediateRequestConfiguration
) {
  const requestConfig = {
    headers: { ...instance.defaults.headers },
    ...customRequestConfiguration,
  };
  return requestConfig;
}

function fullUrl(instance: InstanceFetch, url: string): string {
  return `${instance.defaults.baseUrl}${url}`;
}

interface BaseRequestConfiguration {
  baseUrl?: null | string;
  headers?: { [key: string]: string };
}

const initialRequestConfiguration = {
  baseUrl: "",
  headers: {
    "Content-type": "application/json",
  },
};

class Fetch {
  defaults: BaseRequestConfiguration;

  constructor(
    baseRequestConfiguration: BaseRequestConfiguration = initialRequestConfiguration
  ) {
    this.defaults = {
      baseUrl: baseRequestConfiguration.baseUrl || "",
      headers: baseRequestConfiguration.headers || {
        "Content-type": "application/json",
      },
    };
  }

  request<T>(
    url: string,
    requestConfiguration: IntermediateRequestConfiguration
  ): Promise<T> {
    const instanceFetch = this as InstanceFetch;
    const requestConfig = returnTheRequestConfigWithTheTransformedRequestBody(
      requestConfiguration
    );
    const finalRequestConfig = createRequestConfiguration(
      instanceFetch,
      requestConfig
    ) as RequestInit;

    return fetch(fullUrl(instanceFetch, url), finalRequestConfig).then<T>(
      ReadingStreamAndReturningData
    );
  }

  post<T>(
    url: string,
    requestConfiguration: IntermediateRequestConfiguration = {}
  ): Promise<T> {
    requestConfiguration.method = "post";
    return this.request(url, requestConfiguration);
  }

  get<T>(
    url: string,
    requestConfiguration: IntermediateRequestConfiguration = {}
  ): Promise<T> {
    return this.request(url, requestConfiguration);
  }

  setHeaders(name: string, value: string) {
    if (this.defaults.headers) {
      this.defaults.headers[name] = value;
    }
  }
}

export default Fetch;
