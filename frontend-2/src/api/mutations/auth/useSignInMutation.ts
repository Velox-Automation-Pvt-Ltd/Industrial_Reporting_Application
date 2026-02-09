import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { changePassword, signIn, signUp, updateUser } from 'src/actions/Auth/authAction';

type SignInVariables = {
  email: string;
  password: string;
  dispatch: any;
};

export function useSignInMutation(options?: UseMutationOptions<any, any, SignInVariables>) {
  return useMutation({
    mutationFn: async ({ email, password, dispatch }) => {
      return await signIn(email, password, dispatch);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
    ...options,
  });
}

export function useSignUpMutation(options?: UseMutationOptions<any, any, any>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUp,
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Sign up failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-management'] });
      queryClient.refetchQueries({ queryKey: ['user-managment'] });
    },
    ...options,
  });
}

export function useChangePasswordMutation(options?: UseMutationOptions<any, any, any>) {
  return useMutation({
    mutationFn: changePassword,
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Change Password failed');
    },
    ...options,
  });
}

export const useUpadateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, body }: { userId: number; body: any }) => updateUser(userId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-management'] });
      queryClient.refetchQueries({ queryKey: ['user-managment'] });
    },
    onError: (error) => {
      console.log('update user data :', error);
      toast.error('Update user error');
    },
  });
};
