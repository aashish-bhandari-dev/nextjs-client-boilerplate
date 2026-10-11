/**
 * Pagination metadata returned with paginated collection responses.
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  from?: number;
  to?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  nextPageUrl?: string | null;
  prevPageUrl?: string | null;
}

/**
 * Standard API envelope for normal (single-resource / non-paginated) responses.
 * (e.g. getById, create, update, delete, auth, etc.)
 */
export interface BaseApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
  statusCode?: number;
  errors?:
    | Record<string, string[]>
    | Array<{ code?: string; message?: string; [key: string]: unknown }>;
}

/**
 * Standard API envelope for paginated list responses.
 */
export interface BasePaginatedResponse<T = unknown> extends BaseApiResponse<
  T[]
> {
  meta: PaginationMeta;
}

/**
 * Standard API error response.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  statusCode?: number;
  errors?:
    | Record<string, string[]>
    | Array<{ code?: string; message?: string; [key: string]: unknown }>;
  timestamp?: string;
}

// Aliases for compatibility
export type ApiResponse<T = unknown> = BaseApiResponse<T>;
export type ApiPaginationResponse<T = unknown> = BasePaginatedResponse<T>;
export type Pagination = PaginationMeta;
