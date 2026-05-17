'use client';

import Link from 'next/link';
import { EventCardBase, eventQueryKeys } from '@/src/entities/event';
import { fetchEventByDate } from '@/src/entities/event/api/client';
import { EventDetails } from '@/src/entities/event/model/types';
import { AnswerForm } from '@/src/features/answer-form';
import { useQuery } from '@tanstack/react-query';

interface CalendarEventProps {
  start: string;
}

export const CalendarEvent = ({ start }: CalendarEventProps) => {
  const {
    data: event,
    isError,
    error,
  } = useQuery<EventDetails, Error>({
    queryKey: eventQueryKeys.publicDetails(start),
    queryFn: () => fetchEventByDate(start),
  });

  if (isError) {
    return (
      <div className="p-6">
        <p>{error?.message ?? 'Error while getting event'}</p>
      </div>
    );
  }

  if (!event) {
    return <div className="p-6">Event not found</div>;
  }

  return (
    <div className="flex flex-col gap-12">
      <Link href="/calendar" className="text-xs text-blue-600 hover:underline">
        ← Back to list
      </Link>
      <EventCardBase
        title={event.title}
        start={event.start}
        isDone={event.isDone}
        cl="gap-4"
      >
        <div className="flex flex-col gap-8">
          <p>
            <span className="font-bold">Task: </span>
            {event.description}
          </p>
          <p>
            {' '}
            <span className="font-bold">Gift: </span>
            {event.isDone ? (
              <span>{event.gift}</span>
            ) : (
              <span className="text-slate-500">
                Подарок откроется после верного ответа
              </span>
            )}
          </p>
        </div>
      </EventCardBase>
      <AnswerForm start={start} />
    </div>
  );
};
