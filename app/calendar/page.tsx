import { loadEventList } from '@/src/entities/event/server';
import { getQueryClient } from '@/src/shared/lib/react-query';
import { CalendarList } from '@/src/widgets/calendar-list';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const CalendarPage = async () => {
 
  const qc = getQueryClient();

  await qc.prefetchQuery({
    queryKey: ['events'],
    queryFn: loadEventList,
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <CalendarList />
    </HydrationBoundary>
  );
};

export default CalendarPage;
