import { UserDTO } from '@/src/entities/user';
import { appRoutes } from '@/src/shared/config/route-path';

type getLoginRedirectPathArgs = {
  user: UserDTO;
  from: string | null;
};

export const getLoginRedirectPath = ({
  user,
  from,
}: getLoginRedirectPathArgs): string => {
  if (from === appRoutes.adminEvents && user.role === 'parent') {
    return appRoutes.adminEvents;
  }

  if (user.role === 'parent') {
    return appRoutes.adminEvents;
  }

  return appRoutes.calendar;
};
