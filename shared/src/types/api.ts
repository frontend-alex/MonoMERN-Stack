import { AxiosError } from "axios";

export type ApiSuccessResponse<T = undefined> = {
  success: true;
  message: string;
  data?: T;  
};

export type ApiErrorResponse<T = unknown> = {
  success: false;
  errorCode: string;
  statusCode: number;
  message: string;
  userMessage: string;
  data?: T;
  [key: string]: unknown;
} & Record<string, unknown>;

export type ApiResponse<T = undefined, E = unknown> = 
  | ApiSuccessResponse<T>
  | ApiErrorResponse<E>;

export type ApiError<T = unknown> = AxiosError<ApiErrorResponse<T>>;