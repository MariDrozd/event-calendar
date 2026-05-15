'use client';

import { fetchEvents } from '@/src/entities/event';
import { useMeQuery } from '@/src/entities/user';
import { CreateEventForm } from '@/src/features/create-event';
import { DeleteEventButton } from '@/src/features/delete-event';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

export const CalendarList = () => {
  const { data, isError, error, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleToggleForm = () => {
    setIsFormOpen((prev) => !prev);
  };

  const { data: user } = useMeQuery();
  const isParent = user?.role === 'parent';

  if (isError) {
    return (
      <div className="p-6">
        <p>{error.message ?? 'Во время загрузки произошла ошибка...'}</p>
        <button onClick={() => refetch()}>Попробовать еще раз</button>
      </div>
    );
  }

  if (!data?.length) return <div>Нет данных</div>;

  console.log('data', data);

  return (
    <main className="p-6 flex flex-col gap-3">
      <h1 className='text-2xl font-bold'>Календарь заданий</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((event) => (
          <li
            key={event.id}
            className="border border-amber-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
          >
            <div className="text-sm opacity-80">{String(event.start)}</div>

            <div className="font-semibold my-1.5">{event.title}</div>
            <div className="text-green-700">{event.isDone && 'Выполнено'}</div>

            <div className="flex gap-5 justify-between">
              <Link
                href={`/calendar/${event.start}`}
                className="text-blue-600 hover:underline"
              >
                Открыть
              </Link>
              {isParent && <DeleteEventButton start={event.start} />}
            </div>
          </li>
        ))}
      </ul>
      {isParent && (
        <button
          className='border border-blue-500 w-50'
          onClick={handleToggleForm}>
          {isFormOpen ? 'Скрыть форму' : 'Добавить событие'}
        </button>
      )}
      {isFormOpen && <CreateEventForm />}
    </main>
  );
};
