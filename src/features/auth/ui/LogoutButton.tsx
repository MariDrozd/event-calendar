"use client"

import { fetchLogout } from '@/src/entities/user/api/client';
import { Button } from '@/src/shared/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const qc = useQueryClient();
  const router = useRouter();

  const logout = useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      qc.setQueryData(['me'], null);
      qc.removeQueries({ queryKey: ['me'] });
      router.replace('/login');
    },
  });

  const onLogoutHandler = () => {
    logout.mutate();
  };

  return (

    <Button
      type="button"
      size="sm"
      variant="secondary"
      disabled={logout.isPending}
      onClick={onLogoutHandler}>
      {logout.isPending ? "Logout..." : "Logout"}
    </Button>
  );
};
