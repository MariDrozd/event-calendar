import { getQueryClient } from '@/src/shared/lib/react-query';
import { loadEventDetails } from '@/src/entities/event/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { eventQueryKeys } from '@/src/entities/event';
import { CalendarEvent } from '@/src/app-pages/calendar-event';

type Props = {
  params: Promise<{ start: string }>;
};

const DayEvent = async ({ params }: Props) => {
  const { start } = await params;

  const qc = getQueryClient();

  await qc.prefetchQuery({
    queryKey: eventQueryKeys.publicDetails(start),
    queryFn: () => loadEventDetails(start),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(qc)}>
        <CalendarEvent start={start} />
      </HydrationBoundary>
    </>
  );
};

export default DayEvent;
