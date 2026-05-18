'use client';

import { eventQueryKeys } from '@/src/entities/event';
import { fetchDeleteEvent } from '@/src/entities/event/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/shared/ui/button';

interface DeleteEventButtonProps {
  start: string;
  shouldRedirect?: boolean;
}

export const DeleteEventButton = (props: DeleteEventButtonProps) => {
  const { start, shouldRedirect = false } = props;

  const qc = useQueryClient();
  const router = useRouter();

  const deleteEvent = useMutation({
    mutationFn: (start: string) => fetchDeleteEvent(start),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: eventQueryKeys.adminList,
      });
      qc.invalidateQueries({
        queryKey: eventQueryKeys.publicList,
      });
      qc.invalidateQueries({
        queryKey: eventQueryKeys.adminDetails(start),
      });
      qc.invalidateQueries({
        queryKey: eventQueryKeys.publicDetails(start),
      });
      if (shouldRedirect) {
        router.replace('/admin/events');
      }
    },
  });

  const handleDeleteEvent = () => {
    deleteEvent.mutate(start);
  };

  return (
    <Button
      onClick={handleDeleteEvent}
      disabled={deleteEvent.isPending}
      variant='danger'
      className='min-w-25'
    >
      {deleteEvent.isPending ? 'Deleting...' : 'Delete'}
    </Button>
  );
};
