import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface GenericMutationOptions<TData> {
  invalidateKeys?: string[];
  toastMessage?: string;
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
}

export function useGenericMutation<TData = any, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  mutationKey: string,
  options: GenericMutationOptions<TData> = {},
) {
  const queryClient = useQueryClient();

  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    onSuccess: (data) => {
      if (options.toastMessage) {
        toast.success(options.toastMessage);
      }

      if (options.invalidateKeys) {
        options.invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }

      options.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(`${mutationKey} error:`, error);
      toast.error(`Error in ${mutationKey}`);
      options.onError?.(error);
    },
  });
}
