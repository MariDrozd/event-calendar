import {
  EventDetailsDTO,
  eventQueryKeys,
  fetchCheckAnswer,
} from '@/src/entities/event';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCheckAnswer = (start: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (answer: string) => fetchCheckAnswer(start, answer),
    onMutate: async (_answer) => {
      await Promise.all([
        qc.cancelQueries({ queryKey: eventQueryKeys.publicList }),
        qc.cancelQueries({ queryKey: eventQueryKeys.publicDetails(start) }),
      ]);

      const prevDetails = qc.getQueriesData<EventDetailsDTO>({
        queryKey: ['event', start],
      });
      const prevList = qc.getQueriesData<EventDetailsDTO[]>({
        queryKey: ['events'],
      });

      return { prevDetails, prevList };
    },
    onSuccess: (res) => {
      if (!res.isCorrectAnswer) {
        return;
      }
      qc.setQueryData<EventDetailsDTO>(['event', start], (old) => {
        if (!old) {
          return old;
        }
        return {
          ...old,
          isDone: res.isDone,
        };
      });
      qc.setQueryData<EventDetailsDTO[]>(['event'], (old) => {
        if (!old) {
          return old;
        }
        return old.map((event) =>
          event.start === start ? { ...event, isDone: event.isDone } : event,
        );
      });
    },
    onError: (_err, _answer, ctx) => {
      if (ctx?.prevDetails) {
        qc.setQueryData(['event'], ctx.prevDetails);
      }
      if (ctx?.prevList) {
        qc.setQueryData(['event', start], ctx.prevDetails);
      }
    },
    onSettled: async () => {
      await Promise.all([
        qc.invalidateQueries({
          queryKey: eventQueryKeys.publicList,
        }),
        qc.invalidateQueries({
          queryKey: eventQueryKeys.adminList,
        }),
        qc.invalidateQueries({
          queryKey: eventQueryKeys.publicDetails(start),
        }),
        qc.invalidateQueries({
          queryKey: eventQueryKeys.adminDetails(start),
        }),
      ]);
    },
  });
};
