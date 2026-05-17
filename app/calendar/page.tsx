import { CalendarEventsList } from '@/src/app-pages/calendar-events-list';
import { loadEventList } from '@/src/entities/event/server';
import { getQueryClient } from '@/src/shared/lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const CalendarPage = async () => {
 
  const qc = getQueryClient();

  await qc.prefetchQuery({
    queryKey: ['events'],
    queryFn: loadEventList,
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <CalendarEventsList />
    </HydrationBoundary>
  );
};

export default CalendarPage;
