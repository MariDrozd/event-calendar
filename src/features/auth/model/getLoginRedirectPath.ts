import { UserDTO } from '@/src/entities/user';
import { appRoutes } from '@/src/shared/config/route-path';

export const getLoginRedirectPath = (user: UserDTO): string => {
  return user.role === 'parent' ? appRoutes.adminEvents : appRoutes.calendar;
};
