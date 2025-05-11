import axios, { AxiosInstance, AxiosError } from 'axios';
import { IHttpClient, HttpRequest } from '@/modules/task/core/domain/contracts/http-client';

const baseURL = 'http://localhost:3000';

export class HttpClient implements IHttpClient {
  private api: AxiosInstance;

  private constructor(api: AxiosInstance) {
    this.api = api;
  }

  static create(): HttpClient {
    return new HttpClient(axios);
  }

  async sendRequest<TResponse, TBody>(props: HttpRequest<TBody>): Promise<TResponse> {
    const { endpoint, method, body, headers, params } = props;

    try {
      const { data } = await this.api.request<TResponse>({
        method,
        headers,
        data: body,
        url: `${baseURL}${endpoint}`,
        params,
      });
      return data;
    } catch (er) {
      const error = er as AxiosError;
      const status = error.response?.status || 500;
      const message = error.response?.data || error.message;
      throw new Error(`Request failed with status ${status}: ${message}`);
    }
  }
}
