export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiServiceOptions {
  baseUrl?: string;
  getHeaders?: () => Record<string, string>;
  onError?: (error: Error) => void;
}

export interface SendOptions {
  payload?: Record<string, unknown>;
  queryParams?: Record<string, string>;
  pathParams?: Record<string, string | number>;
  withAuth?: boolean;
}
