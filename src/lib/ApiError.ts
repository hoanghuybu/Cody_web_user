export class ApiError<TData = any> extends Error {
  status: number;
  data: TData | null;
  constructor(status: number, data: TData | null) {
    super((data as any)?.message || `Request failed (${status})`);
    this.status = status;
    this.data = data;
  }
}

export function isApiError(e: unknown): e is ApiError {
  return typeof e === 'object' && e !== null && 'status' in e && 'data' in e;
}