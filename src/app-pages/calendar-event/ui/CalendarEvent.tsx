'use client';

import Link from 'next/link';
import { EventCardBase, eventQueryKeys } from '@/src/entities/event';
import { fetchEventByDate } from '@/src/entities/event/api/client';
import { EventDetails } from '@/src/entities/event/model/types';
import { AnswerForm } from '@/src/features/answer-form';
import { useQuery } from '@tanstack/react-query';
import { useMeQuery } from '@/src/entities/user';

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

  const { data: user, isLoading: isUserLoading } = useMeQuery();

  const isChild = user?.role === 'child';
  const isParent = user?.role === 'parent';

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
        cl="
        gap-4
        rounded-2xl
        border border-slate-200
        bg-white
        p-6
        shadow-sm
        "
      >
        <div className="flex flex-col gap-8">
          <p>
            <span className="font-bold">Task: </span>
            {event.description}
          </p>
          <p>
            <span className="font-bold">Gift: </span>
            {event.isDone ? (
              <span>{event.gift}</span>
            ) : (
              <span className="text-slate-500">
                The gift will be available after the correct answer.
              </span>
            )}
          </p>
        </div>
      </EventCardBase>
      {isUserLoading && (
        <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
          Checking user role...
        </p>
      )}

      {isChild &&
        (event.isDone ? (
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 text-sm text-cyan-800">
            Congratulations! You unlocked your gift.
          </div>
        ) : (
          <AnswerForm start={start} />
        ))}

      {isParent && (
        <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          You are viewing this task as a parent. Answers can be submitted only
          by child users.
        </p>
      )}

      {!isUserLoading && !user && (
        <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          Login as child to submit an answer.
        </p>
      )}
    </div>
  );
};
