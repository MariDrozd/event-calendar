'use client';

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
        queryKey: ['events'],
      });
      qc.invalidateQueries({
        queryKey: ['event', start],
      });
      if (shouldRedirect) {
        router.replace('/calendar');
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
      className='border-2 border-pink-600'>
      {deleteEvent.isPending ? 'Удаление...' : 'Удалить'}
    </button>
  );
};
