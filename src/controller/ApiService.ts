import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class ApiService {
  private httpClient: AxiosInstance;

  constructor(baseURL: string) {
    this.httpClient = axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  async post<T>(path: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.httpClient.post(path, data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(`POST request to ${path} failed: ${error.message}`);
      } else {
        throw new Error(`POST request to ${path} failed: ${error}`);
      }
    }
  }

  async get<T>(path: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.httpClient.get(path, data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(`GET request to ${path} failed: ${error.message}`);
      } else {
        throw new Error(`GET request to ${path} failed: ${error}`);
      }
    }
  }
}
