'use client';

import { eventQueryKeys } from '@/src/entities/event';
import { fetchCheckAnswer } from '@/src/entities/event/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';

export const AnswerForm = ({ start }: { start: string }) => {
  const [answer, setAnswer] = useState('');
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: { start: string; answer: string }) =>
      fetchCheckAnswer(payload.start, payload.answer),

    onSuccess: (data) => {
      if (data.isCorrectAnswer) {
        qc.invalidateQueries({ queryKey: eventQueryKeys.publicList });
        qc.invalidateQueries({ queryKey: eventQueryKeys.publicDetails(start) });
        setAnswer('');
      }
    },
  });

  const onCheck = () => {
    if (!answer.trim() || mutation.isPending) return;
    mutation.mutate({ start, answer });
  };

  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);

    if (mutation.isSuccess || mutation.isError) {
      mutation.reset();
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-bold text-slate-900">Check answer:</h3>

      <div className="mt-3 flex gap-2">
        <Input value={answer} onChange={onChangeAnswer} placeholder="Answer" />
        <Button
          type="button"
          onClick={onCheck}
          disabled={mutation.isPending || !answer.trim()}
        >
          {mutation.isPending ? 'Checking...' : 'Check'}
        </Button>
      </div>

      {mutation.isError && (
        <p className="mt-3 text-sm text-rose-400">
          Error:{' '}
          {mutation.error.message ??
            'Something went wrong while checking the answer'}
        </p>
      )}

      {mutation.isSuccess && !mutation.data.isCorrectAnswer && (
        <p className="mt-2 text-xs">
          <span className="text-rose-400">Incorrect. Try again.</span>
        </p>
      )}
    </section>
  );
};
