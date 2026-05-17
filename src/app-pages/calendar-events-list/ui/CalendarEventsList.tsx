'use client';

import {
  EventCardBase,
  eventQueryKeys,
  fetchEvents,
} from '@/src/entities/event';
import { useMeQuery } from '@/src/entities/user';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';

export const CalendarEventsList = () => {
  const { data, isError, error, refetch } = useQuery({
    queryKey: eventQueryKeys.publicList,
    queryFn: fetchEvents,
  });

  const { data: user } = useMeQuery();
  const isParent = user?.role === 'parent';

  if (isError) {
    return (
      <div className="p-6">
        <p>{error.message ?? 'Во время загрузки произошла ошибка...'}</p>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    );
  }

  if (!data?.length) return <div>Events not found</div>;

  console.log('data', data);

  return (
    <main className="p-6 flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Event calendar</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((event) => (
          <li
            key={event.id}
            className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm
                        transition-all duration-200
                        hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg
  `}
          >
            <EventCardBase
              title={event.title}
              start={event.start}
              isDone={event.isDone}
            />

            <div className="flex gap-5 justify-between">
              <Link
                href={`/calendar/${event.start}`}
                className="text-blue-600 hover:underline"
              >
                Открыть
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {isParent && (
        <button className="border-2 w-30 h-10">
          <Link href="/admin/events">Manage Events</Link>
        </button>
      )}
    </main>
  );
};
