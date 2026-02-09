import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import {
  ApprovedSchedule,
  createSchedule,
  updateSchedule,
} from 'src/actions/schedule/ScheduleAction';

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSchedule,
    onSuccess: (data) => {
      toast.success(data?.message || 'schedule create Successfully');
      queryClient.invalidateQueries({ queryKey: ['Myschedules'] });
      queryClient.invalidateQueries({ queryKey: ['all-schedules'] });
      queryClient.invalidateQueries({ queryKey: ['todays'] });
    },
    onError: (error) => {
      console.log('create schedule error :', error);
      const message = isAxiosError(error)
        ? (error.response?.data as any)?.message || 'create schedule error'
        : 'create schedule error';
      toast.error(message);
    },
  });
};

export const useApproveSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ scheduleId, userId }: { scheduleId: number; userId: number }) =>
      ApprovedSchedule(scheduleId, userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todays'] });
      queryClient.invalidateQueries({ queryKey: ['all-schedules'] });
    },
    onError: (error) => {
      console.log('Approve schedule Error :', error);
    },
  });
};

export const useUpadateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSchedule,
    onSuccess: (data) => {
      toast.success('Schedule Update ');
      queryClient.invalidateQueries({ queryKey: ['todays'] });
      queryClient.invalidateQueries({ queryKey: ['all-schedules'] });
      queryClient.invalidateQueries({ queryKey: ['Myschedules'] });
      queryClient.refetchQueries({ queryKey: ['Myschedules'] });
    },
    onError: (error) => {
      console.log('update schedule data :', error);
      toast.error('Update schedule error');
    },
  });
};
