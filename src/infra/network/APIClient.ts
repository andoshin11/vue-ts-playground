import axios from "axios";
import { APIRequest, HTTPMethod } from "./APIRequest";
import { APIError } from "./APIError";

interface HttpError extends Error {
  response?: {
    status: number;
  };
  message: string;
}

export class APIClient {
  baseURL: string = "http://localhost:3010/api/v1";
  timeout: number = 15 * 1000;

  constructor() {}

  request<U>(request: APIRequest<U>): Promise<U> {
    const isRead = request.method === HTTPMethod.GET;

    return new Promise<U>((resolve, reject) => {
      axios
        .request<U>({
          url: request.path,
          method: request.method,
          params: isRead && request.params,
          data: !isRead && request.params,
          withCredentials: true,
          timeout: this.timeout,
          baseURL: request.baseURL || this.baseURL,
          headers: this.createHeaders()
        })
        .then(data => {
          resolve(data.data);
        })
        .catch(err => {
          const apiError = this.normalizeError(err);
          reject(apiError);
        });
    });
  }

  // Convert axios error into APIError
  private normalizeError(error: HttpError): APIError {
    return {
      status: error.response && error.response.status,
      message: error.message,
      raw: error
    };
  }

  private createHeaders() {
    let headers = {
      "Content-Type": "application/json",
      xhrFields: true
    };

    return headers;
  }
}
