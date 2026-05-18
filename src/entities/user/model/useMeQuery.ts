import { useQuery } from '@tanstack/react-query';
import { UserDTO } from './types';
import { getMe } from '../api/client';

export const useMeQuery = () => {
  return useQuery<UserDTO | null>({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: 60_000,
  });
};
