import axios, { AxiosInstance, AxiosError } from 'axios';
import { IHttpClient, HttpRequest } from '@/modules/task/contracts/http-client';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export class HttpAxiosClient implements IHttpClient {
  private api: AxiosInstance;

  private constructor(api: AxiosInstance) {
    this.api = api;
  }

  static create(): HttpAxiosClient {
    const instance = axios.create({
      baseURL,
    });
    return new HttpAxiosClient(instance);
  }

  async sendRequest<TResponse, TBody>(props: HttpRequest<TBody>): Promise<TResponse> {
    const { endpoint, method, body, headers, params } = props;

    try {
      const { data } = await this.api.request<TResponse>({
        method,
        headers,
        data: body,
        url: endpoint,
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
