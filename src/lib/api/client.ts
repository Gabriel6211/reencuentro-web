const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

type RequestConfig = RequestInit & {
  params?: Record<string, string>;
};

async function request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
  const { params, ...init } = config;
  const url = new URL(endpoint, BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null && value !== "") url.searchParams.set(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message ?? error.error ?? "Request failed");
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: "POST", body: body ? JSON.stringify(body) : undefined }),

  put: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: "PUT", body: body ? JSON.stringify(body) : undefined }),

  patch: <T>(endpoint: string, body?: unknown, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: "PATCH", body: body ? JSON.stringify(body) : undefined }),

  delete: <T>(endpoint: string, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: "DELETE" }),
};

export { BASE_URL };
