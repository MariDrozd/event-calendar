import { CalendarEventsList } from '@/src/app-pages/calendar-events-list';
import { eventQueryKeys } from '@/src/entities/event';
import { loadEventList } from '@/src/entities/event/server';
import { getRouteNotice } from '@/src/shared/lib/get-route-notice';
import { getQueryClient } from '@/src/shared/lib/react-query';
import { NoticeData } from '@/src/shared/types/notice';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const CalendarPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; source?: string }>;
}) => {
  const { reason, source } = await searchParams;
  const notice: NoticeData | null = getRouteNotice({ reason, source });

  const qc = getQueryClient();

  await qc.prefetchQuery({
    queryKey: eventQueryKeys.publicList,
    queryFn: loadEventList,
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <CalendarEventsList notice={notice} />
    </HydrationBoundary>
  );
};

export default CalendarPage;
