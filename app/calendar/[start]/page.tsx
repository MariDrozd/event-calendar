import { DayEventClient } from '@/src/widgets/day-event';
import { AnswerForm } from '@/src/features/answer-form';
import { getQueryClient } from '@/src/shared/lib/react-query';
import { loadEventDetails } from '@/src/entities/event/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

type Props = {
  params: Promise<{ start: string }>;
};

const DayEvent = async ({ params }: Props) => {
  const { start } = await params;

  const qc = getQueryClient();

  await qc.prefetchQuery({
    queryKey: ['event', start],
    queryFn: () => loadEventDetails(start),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(qc)}>
        <DayEventClient start={start} />
        <AnswerForm start={start} />
      </HydrationBoundary>
    </>
  );
};

export default DayEvent;
