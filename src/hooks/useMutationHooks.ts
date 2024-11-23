import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from '@tanstack/react-query';

// export const useMutationHooks = <TData, TVariables>(
//   fnCallback: (data: TVariables) => Promise<TData>,
// ): UseMutationResult<TData, unknown, TVariables, unknown> => {
//   return useMutation({
//     mutationFn: fnCallback,
//   });
// };

export const useMutationHooks = <TData, TVariables>(
  fnCallback: (data: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, unknown, TVariables, unknown>,
): UseMutationResult<TData, unknown, TVariables, unknown> => {
  return useMutation({
    mutationFn: fnCallback,
    ...options, // Cho phép truyền thêm các tùy chọn như onSuccess, onError
  });
};
