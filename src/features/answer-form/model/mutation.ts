import { eventQueryKeys, fetchCheckAnswer } from '@/src/entities/event';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCheckAnswer = (start: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (answer: string) => fetchCheckAnswer(start, answer),

    onSuccess: (res) => {
      if (!res.isCorrectAnswer) {
        return;
      }
      qc.invalidateQueries({
        queryKey: eventQueryKeys.publicList,
      });
      qc.invalidateQueries({
        queryKey: eventQueryKeys.publicDetails(start),
      });
      qc.invalidateQueries({
        queryKey: eventQueryKeys.adminList,
      });
      qc.invalidateQueries({
        queryKey: eventQueryKeys.adminDetails(start),
      });
    },
  });
};
