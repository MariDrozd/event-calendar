import { fetchJson } from '@/src/shared/lib/fetch';
import type { Candidate, UserDTO } from '../model/types';

export const getMe = () => {
  return fetchJson<UserDTO | null>('/api/auth/me');
};

export const fetchLogin = (data: Candidate) => {
  return fetchJson<UserDTO>('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const fetchLogout = () => {
  return fetchJson<{ success: true }>('/api/auth/logout', {
    method: 'POST',
  });
};
