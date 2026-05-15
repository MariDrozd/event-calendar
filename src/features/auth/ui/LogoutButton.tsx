"use client"

import { fetchLogout } from '@/src/entities/user/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const qc = useQueryClient();
  const router = useRouter();

  const logout = useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      qc.setQueryData(['me'], null);
      router.replace('/login');
    },
  });

  const onLogoutHandler = () => {
    logout.mutate();
  };

  return (
    <button disabled={logout.isPending} onClick={onLogoutHandler}>
      {logout.isPending ? "Выход..." : "Выйти"}
    </button>
  );
};
