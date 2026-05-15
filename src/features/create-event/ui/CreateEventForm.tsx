'use client';

import {
  type EventCreateRequest,
  fetchCreateEvent,
} from '@/src/entities/event';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const initialState: EventCreateRequest = {
  start: '',
  title: '',
  description: '',
  answer: '',
  gift: '',
};

export const CreateEventForm = () => {
	const [form, setForm] = useState(initialState);
	const [successMessage, setSuccessMessage] = useState('');

  const onChangeField = (key: keyof EventCreateRequest, value: string) => {
    if (createEvent.isError) {
      createEvent.reset();
		};
		if (successMessage) {
      setSuccessMessage('');
		};

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const qc = useQueryClient();

  const createEvent = useMutation({
    mutationFn: (dataEvent: EventCreateRequest) => fetchCreateEvent(dataEvent),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['events'],
      });
      setForm(initialState);
      setSuccessMessage('Событие успешно добавлено');
    },

  });

  const handleCreateEvent = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (createEvent.isPending) return;

    createEvent.mutate(form);
  };

  return (
    <form onSubmit={handleCreateEvent} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <label htmlFor="start">Дата начала:</label>
        <input
          type="text"
          id="start"
          value={form.start}
          onChange={(e) => onChangeField('start', e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="title">Название:</label>
        <input
          type="text"
          id="title"
          value={form.title}
          onChange={(e) => onChangeField('title', e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="description">Описание:</label>
        <input
          type="text"
          id="description"
          value={form.description}
          onChange={(e) => onChangeField('description', e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="answer">Ответ:</label>
        <input
          type="text"
          id="answer"
          value={form.answer}
          onChange={(e) => onChangeField('answer', e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="gift">Подарок:</label>
        <input
          type="text"
          id="gift"
          value={form.gift}
          onChange={(e) => onChangeField('gift', e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        disabled={createEvent.isPending}
        className='border border-blue-500 w-50'
      >
        {createEvent.isPending ? 'Создание...' : 'Создать'}
      </button>
			{createEvent.isError && (
        <p className="text-sm text-red-600">
          {createEvent.error.message}
        </p>
      )}
			{successMessage && (
        <p className="text-sm text-green-600">
          {successMessage}
        </p>
      )}
    </form>
  );
};
