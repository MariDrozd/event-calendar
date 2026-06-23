import { getQueryClient } from '@/src/shared/lib/react-query';
import { loadEventDetails } from '@/src/entities/event/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { eventQueryKeys } from '@/src/entities/event';
import { CalendarEvent } from '@/src/app-pages/calendar-event';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ start: string }>;
};

const DayEvent = async ({ params }: Props) => {
  const { start } = await params;

  const event = await loadEventDetails(start);

  if (!event) {
    notFound();
  }

  const qc = getQueryClient();

  qc.setQueryData(eventQueryKeys.publicDetails(start), event);

  return (
    <>
      <HydrationBoundary state={dehydrate(qc)}>
        <CalendarEvent start={start} />
      </HydrationBoundary>
    </>
  );
};

export default DayEvent;
