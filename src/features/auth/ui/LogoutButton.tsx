'use client';

import { userQueryKeys } from '@/src/entities/user';
import { fetchLogout } from '@/src/entities/user/api/client';
import { DEFAULT_ERROR_NOTICE } from '@/src/shared/config/error-notice';
import { appRoutes } from '@/src/shared/config/route-path';
import { Button } from '@/src/shared/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const LogoutButton = () => {
  const qc = useQueryClient();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      qc.setQueryData(userQueryKeys.me, null);
      qc.invalidateQueries({ queryKey: userQueryKeys.me });
      router.replace(appRoutes.login);

      toast.success('Logged out.');
    },
    onError: () => {
      toast.error(DEFAULT_ERROR_NOTICE.message);
    },
  });

  const onLogoutHandler = () => {
    if (logoutMutation.isPending) return;

    logoutMutation.mutate();
  };

  return (
    <Button
      type="button"
      size="sm"
      variant="secondary"
      disabled={logoutMutation.isPending}
      onClick={onLogoutHandler}
    >
      {logoutMutation.isPending ? 'Logout...' : 'Logout'}
    </Button>
  );
};
