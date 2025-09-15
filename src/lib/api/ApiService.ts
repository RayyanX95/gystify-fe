import { endPoints } from './endpoints';
import { throwIfResNotOk } from './throwIfResNotOk';

import type { EndPoints } from './endpoints';
import type { ApiServiceOptions, HTTPMethod, SendOptions } from './types';
import { useAuthStore } from '../authStore';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

class ApiServiceClass {
  private baseUrl: string;
  private getHeaders: () => Record<string, string>;
  private onError?: (error: Error) => void;

  // Used to deduplicate concurrent refresh requests
  private refreshingPromise: Promise<void> | null = null;

  constructor(options?: ApiServiceOptions) {
    this.baseUrl = options?.baseUrl || '';
    this.getHeaders = options?.getHeaders || (() => ({}));
    this.onError = options?.onError;
  }

  private buildUrl(endpoint: string, queryParams?: Record<string, string>): string {
    let url = this.baseUrl + endpoint;
    if (queryParams && Object.keys(queryParams).length > 0) {
      const params = new URLSearchParams(queryParams).toString();
      url += `?${params}`;
    }
    return url;
  }

  /**
   * Replace params in endpoint string, e.g. /posts/:id -> /posts/123
   */
  private static fillParams(endpoint: string, params?: Record<string, string | number>): string {
    if (!params) return endpoint;
    return endpoint.replaceAll(/{(\w+)}/g, (_, key) => {
      if (params[key] === undefined) {
        throw new Error(`Missing param: ${key}`);
      }
      return encodeURIComponent(String(params[key]));
    });
  }

  private async refreshTokenIfNeeded(): Promise<void> {
    // If a refresh is already in progress, wait for it.
    // if (this.refreshingPromise) return this.refreshingPromise;
    // const { tokens } = useAuthStore.getState();
    // if (!tokens?.refreshToken) {
    //   // No refresh token available
    //   throw new Error("Authentication failed");
    // }
    // this.refreshingPromise = (async () => {
    //   try {
    //     const url = this.buildUrl(endPoints.authTokenRefresh);
    //     const res = await fetch(url, {
    //       method: "POST",
    //       headers: {
    //         Authorization: "Basic Z==",
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         ...this.getHeaders(),
    //       },
    //       body: new URLSearchParams({
    //         grant_type: "refresh_token",
    //         refresh_token: tokens.refreshToken,
    //       }),
    //     });
    //     await throwIfResNotOk(res);
    //     const data = (await res.json()) ;
    //     const updatedTokens = {
    //       accessToken: data.tokenToken,
    //       refreshToken: data.refreshToken,
    //       expiresIn: data.expiresIn,
    //       tokenType: data.tokenType,
    //     };
    //     useAuthStore.getState().refreshTokens(updatedTokens);
    //   } catch (error) {
    //     // On refresh failure clear user and rethrow so callers can handle logout
    //     localStorage.removeItem("auth-storage");
    //     throw error;
    //   } finally {
    //     this.refreshingPromise = null;
    //   }
    // })();
    // return this.refreshingPromise;
  }

  private makeRequest = async (
    method: HTTPMethod,
    serviceName: EndPoints,
    options: SendOptions = {}
  ): Promise<Response> => {
    const { payload, queryParams, pathParams, withAuth } = options;
    let headers: Record<string, string> = {
      ...this.getHeaders(),
      ...(payload ? { 'Content-Type': 'application/json' } : {}),
    };

    console.log('withAuth', withAuth);

    if (withAuth) {
      const { token } = useAuthStore.getState();
      console.log('token', token);
      if (token) {
        headers = {
          ...headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    // Fill dynamic params in endpoint if needed
    const endpointWithParams = ApiServiceClass.fillParams(endPoints[serviceName], pathParams);
    const url = this.buildUrl(endpointWithParams, queryParams);

    return fetch(url, {
      method,
      headers,
      body: payload ? JSON.stringify(payload) : undefined,
      credentials: 'include',
    });
  };

  public async send<T = unknown>(
    method: HTTPMethod,
    serviceName: EndPoints,
    options: SendOptions = {}
  ): Promise<T> {
    const { withAuth = true } = options;

    try {
      let res = await this.makeRequest(method, serviceName, { ...options, withAuth });

      // If unauthorized and we used auth, try refresh once
      if (res.status === 401 && withAuth) {
        try {
          await this.refreshTokenIfNeeded();
          // retry the request once after refresh
          res = await this.makeRequest(method, serviceName, options);
        } catch (error) {
          // refresh failed -> propagate original 401-like error
          if (this.onError && error instanceof Error) this.onError(error);
          throw error;
        }
      }

      await throwIfResNotOk(res);
      return res.status === 204 ? ({} as T) : await res.json();
    } catch (error) {
      if (this.onError && error instanceof Error) {
        this.onError(error);
      }
      throw error;
    }
  }
}

export const ApiService = new ApiServiceClass({ baseUrl: BASE_URL });
