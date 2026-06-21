'use client';

import { toast } from 'sonner';
import { eventQueryKeys } from '@/src/entities/event';
import { fetchDeleteEvent } from '@/src/entities/event/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/shared/ui/button';
import { getDeleteErrorMessage } from '../model/getDeleteErrorMessage';
import { appRoutes } from '@/src/shared/config/route-path';
import { getAdminAccessErrorAction } from '@/src/shared/lib/error-actions/access-error-actions';

interface DeleteEventButtonProps {
  start: string;
  shouldRedirect?: boolean;
}

export const DeleteEventButton = (props: DeleteEventButtonProps) => {
  const { start, shouldRedirect = false } = props;

  const qc = useQueryClient();
  const router = useRouter();

  const deleteEventMutation = useMutation({
    mutationFn: (start: string) => fetchDeleteEvent(start),
    onSuccess: () => {
      toast.success('Event deleted.');

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
        router.replace(appRoutes.adminEvents);
      }
    },

    onError: (error) => {
      const errorAction = getAdminAccessErrorAction(error);

      if (errorAction.type === 'redirect') {
        toast.error(errorAction.message);
        router.replace(errorAction.href);
        return;
      }

      const deleteErrorNotice = getDeleteErrorMessage(error);
      toast.error(deleteErrorNotice.message);
    },
  });

  const handleDeleteEvent = () => {
    deleteEventMutation.mutate(start);
  };

  return (
    <Button
      onClick={handleDeleteEvent}
      disabled={deleteEventMutation.isPending}
      variant="danger"
      className="min-w-25"
    >
      {deleteEventMutation.isPending ? 'Deleting...' : 'Delete'}
    </Button>
  );
};
