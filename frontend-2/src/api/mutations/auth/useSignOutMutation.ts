import { useMutation } from '@tanstack/react-query';
import { handleLogout, signOut } from '@/actions/Auth/authAction';
import toast from 'react-hot-toast';

export function useSignOutMutation(onSuccessCallback?: () => void) {
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      handleLogout();
      if (onSuccessCallback) onSuccessCallback();
      toast.success('Logged out successfully');
    },
    onError: () => {
      toast.error('Logout failed');
    },
  });
}
