import api from "@/services/api";

import { AxiosError } from "axios";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type ApiError = AxiosError<{
  success?: boolean;
  message?: string;
  data?: unknown;
}>;

type QueryOptions<T, R = T> = {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchInterval?: number;
  select?: (data: T) => R;
  onSuccess?: (data: R) => void;
  onError?: (error: ApiError) => void;
};

type MutationOptions<T, U = unknown, R = T> = {
  invalidateQueries?: QueryKey[];
  onSuccess?: (data: R, variables: U) => void;
  onError?: (error: ApiError, variables: U) => void;
};

const fetcher = async <T>(endpoint: string): Promise<T> => {
  const response = await api.get<ApiResponse<T>>(endpoint);
  return response.data.data;
};

export const useApiQuery = <T, R = T>(
  queryKey: QueryKey,
  endpoint: string,
  options?: QueryOptions<T, R>
) => {
  return useQuery<T, ApiError, R>({
    queryKey,
    queryFn: () => fetcher<T>(endpoint),
    refetchOnWindowFocus: false,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    enabled: options?.enabled,
    select: options?.select,
    refetchInterval: options?.refetchInterval,
  });
};

export const useApiMutation = <T, U = unknown, R = T>(
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string | ((data: U) => string),
  options?: MutationOptions<T, U, R>
) => {
  const queryClient = useQueryClient();

  return useMutation<T, ApiError, U, R>({
    mutationFn: async (data: U) => {
      const resolvedEndpoint =
        typeof endpoint === "function" ? endpoint(data) : endpoint;
      let response;

      switch (method) {
        case "POST":
          response = await api.post<ApiResponse<T>>(resolvedEndpoint, data);
          break;
        case "PUT":
          response = await api.put<ApiResponse<T>>(resolvedEndpoint, data);
          break;
        case "PATCH":
          response = await api.patch<ApiResponse<T>>(resolvedEndpoint, data);
          break;
        case "DELETE":
          response = await api.delete<ApiResponse<T>>(resolvedEndpoint);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      return response.data.data;
    },
    onSuccess: (data, variables) => {
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      options?.onSuccess?.(data as unknown as R, variables);
    },
    onError: (error, variables) => {
      options?.onError?.(error, variables);
    },
  });
};
