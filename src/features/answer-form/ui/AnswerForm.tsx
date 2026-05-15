'use client';

import { fetchCheckAnswer } from '@/src/entities/event/api/client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const AnswerForm = ({ start }: { start: string }) => {
  const [answer, setAnswer] = useState('');

  const mutation = useMutation({
    mutationFn: (payload: { start: string; answer: string }) =>
      fetchCheckAnswer(payload.start, payload.answer),
  });

  const onCheck = () => {
    mutation.mutate({ start, answer });
  };
  console.log('mutation.data.isCorrect', mutation);

  return (
    <section className="mt-6">
      <h3>Проверка ответа</h3>

      <div className="flex gap-2 mt-2 items-center">
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Введи ответ"
          className="flex flex-1 p-2"
        />
        <button
          onClick={onCheck}
          disabled={mutation.isPending}
          className="px-2 py-3 border border-(--btn-border)"
        >
          {mutation.isPending ? 'Проверяю...' : 'Проверить'}
        </button>
      </div>

      {mutation.isError && (
        <p className="mt-2">
          Ошибка:{' '}
          {mutation.error.message ?? 'Произошла ошибка при проверке ответа'}
        </p>
      )}

      {mutation.isSuccess && (
        <p className="mt-2">
          {mutation.data.isCorrectAnswer
            ? 'Верно.'
            : 'Неверно. Попробуй ещё раз.'}
        </p>
      )}
    </section>
  );
};
