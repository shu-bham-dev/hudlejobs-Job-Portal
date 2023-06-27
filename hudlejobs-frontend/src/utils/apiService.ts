import axios, { AxiosInstance } from "axios";
import { isObject } from "lodash";

// const baseURL = "https://hudlejob-api.onrender.com";
const baseURL = "http://localhost:4000";

class ApiService {
  session: AxiosInstance;
  tokenGenerator: any;

  constructor() {
    this.session = axios.create({ baseURL });

    this.session.interceptors.request.use(async (config: any) => {
      const token = await this.getToken();

      if (!token) {
        return config;
      }
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    });
  }

  async setTokenGenerator(tokenGenerator: any) {
    this.tokenGenerator = tokenGenerator;
    return this;
  }

  async getToken() {
    return this.tokenGenerator;
  }

  async get(url: string, params: Record<string, any> = {}) {
    return this.session.get(url, { params });
  }

  async post(
    url: string,
    payload: Record<string, any> = {},
    params: Record<string, any> = {}
  ) {
    return this.session.post(url, payload, { params });
  }

  async put(
    url: string,
    payload: Record<string, any> = {},
    params: Record<string, any> = {}
  ) {
    return this.session.put(url, payload, { params });
  }

  async patch(
    url: string,
    payload: Record<string, any> = {},
    params: Record<string, any> = {}
  ) {
    return this.session.patch(url, payload, { params });
  }

  async delete(url: string, params: Record<string, any> = {}) {
    return this.session.delete(url, { params });
  }
}

export default new ApiService();

export const readAxiosErr = (err: any, defaultMsg?: string) => {
  if (err.response) {
    const data = err.response.data;
    if (isObject(data)) {
      // @ts-ignore
      if (data.message) {
        // @ts-ignore
        return data.message;
      }
      return Object.entries(data)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
    }
  }
  return defaultMsg || "Unable to perform this action";
};
