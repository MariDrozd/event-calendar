'use client';

import { eventQueryKeys } from '@/src/entities/event';
import { fetchDeleteEvent } from '@/src/entities/event/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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
    <button
      onClick={handleDeleteEvent}
      disabled={deleteEvent.isPending}
      className="border-2 border-pink-600 w-20 h-10"
    >
      {deleteEvent.isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
};
