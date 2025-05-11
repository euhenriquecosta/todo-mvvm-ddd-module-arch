export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

export interface HttpRequest<TBody> {
  endpoint: string;
  method: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export interface IHttpClient {
  sendRequest<TResponse, TBody>(props: HttpRequest<TBody>): Promise<TResponse>;
}
