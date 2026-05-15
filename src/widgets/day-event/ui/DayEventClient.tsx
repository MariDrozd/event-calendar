'use client';

import { fetchEventByDate } from '@/src/entities/event/api/client';
import { EventDetails } from '@/src/entities/event/model/types';
import { useMeQuery } from '@/src/entities/user';
import { DeleteEventButton } from '@/src/features/delete-event';
import { useQuery } from '@tanstack/react-query';

interface DayEventProps {
  start: string;
}

export const DayEventClient = ({ start }: DayEventProps) => {
  const { data, isError, error } = useQuery<EventDetails, Error>({
    queryKey: ['event', start],
    queryFn: () => fetchEventByDate(start),
  });

  const { data: user } = useMeQuery();

  if (isError) {
    return (
      <div className="p-6">
        <p>{error?.message ?? 'Error while getting event'}</p>
      </div>
    );
  }

  if (!data) {
    return <div className="p-6">Нет данных</div>;
  }

  return (
    <main className="p-6">
      <h1>{data?.title}</h1>
      <p>
        <b>Дата:</b> {data?.start}
      </p>

      <h3>Задание</h3>
      <p>{data?.description}</p>

      <h3>Подарок</h3>
      <p>{data?.gift}</p>
      {user?.role === 'parent' && <DeleteEventButton start={start} shouldRedirect/>}
    </main>
  );
};
