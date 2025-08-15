const BASE = "/api/v1";

type Query = Record<string, string | number | boolean | undefined | null>;

function buildUrl(path: string, query?: Query) {
  if (!query) return `${BASE}${path}`;
  const params = Object.entries(query)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
  return params ? `${BASE}${path}?${params}` : `${BASE}${path}`;
}

async function request<TRes, TReq = unknown>(
  path: string,
  method: string,
  body?: TReq,
  query?: Query,
  init?: RequestInit
): Promise<TRes> {
  const res = await fetch(buildUrl(path, query), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
    ...init
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as TRes;
}

export const rootApi = {
  get: <TRes>(path: string, query?: Query, init?: RequestInit) =>
    request<TRes>(path, "GET", undefined, query, init),
  post: <TRes, TReq = unknown>(path: string, body: TReq, init?: RequestInit) =>
    request<TRes, TReq>(path, "POST", body, undefined, init),
  put: <TRes, TReq = unknown>(path: string, body: TReq, init?: RequestInit) =>
    request<TRes, TReq>(path, "PUT", body, undefined, init),
  patch: <TRes, TReq = unknown>(path: string, body: TReq, init?: RequestInit) =>
    request<TRes, TReq>(path, "PATCH", body, undefined, init),
  del: <TRes>(path: string, init?: RequestInit) =>
    request<TRes>(path, "DELETE", undefined, undefined, init)
};