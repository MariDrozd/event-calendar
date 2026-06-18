'use client';

import {
  EventCardBase,
  eventQueryKeys,
  fetchEvents,
} from '@/src/entities/event';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/src/shared/ui/button';
import { LinkButton } from '@/src/shared/ui/link-button';
import { Notice } from '@/src/shared/ui/notice';
import type { NoticeData } from '@/src/shared/types/notice';

type CalendarEventsListProps = {
  notice: NoticeData | null;
};

export const CalendarEventsList = ({ notice }: CalendarEventsListProps) => {
  const { data, isError, error, refetch } = useQuery({
    queryKey: eventQueryKeys.publicList,
    queryFn: fetchEvents,
  });

  if (isError) {
    return (
      <div className="p-6">
        <p>{error.message ?? 'Error loading events'}</p>
        <Button size="sm" variant="secondary" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  if (!data?.length) return <div>Events not found</div>;

  return (
    <section className="mx-auto max-w-6xl space-y-6 flex flex-col gap-3">
      {notice && (
        <Notice
          title={notice.title}
          message={notice.message}
          variant={notice.variant}
        />
      )}
      <h1 className="text-2xl font-bold">Event calendar</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((event) => (
          <li
            key={event.id}
            className="
              flex flex-col items-start
              rounded-2xl
              border border-slate-200
              bg-white
              p-4
              shadow-sm
              transition-all duration-200
              hover:-translate-y-1
              hover:border-indigo-300
              hover:shadow-lg
            "
          >
            <EventCardBase
              title={event.title}
              start={event.start}
              isDone={event.isDone}
            />

            <LinkButton
              size="sm"
              variant="primary"
              href={`/calendar/${event.start}`}
              className="mt-auto"
            >
              Open
            </LinkButton>
          </li>
        ))}
      </ul>
    </section>
  );
};
