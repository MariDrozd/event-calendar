import { ApiError } from '@/src/shared/lib/fetch';
import {
  appRoutes,
  buildForbiddenRedirectPath,
  buildLoginRedirectPath,
} from '../../config/route-path';

type AdminEventErrorWithRedirect = {
  type: 'redirect';
  href: string;
  message: string;
};

type AdminAccessNoAction = {
  type: 'none';
};

export type AdminEventErrorAction =
  | AdminEventErrorWithRedirect
  | AdminAccessNoAction;

export const getAdminAccessErrorAction = (
  errorInfo: unknown,
): AdminEventErrorAction => {
  if (errorInfo instanceof ApiError && errorInfo.status === 401) {
    const href = buildLoginRedirectPath(appRoutes.adminEvents);
    return {
      type: 'redirect',
      href,
      message: 'Your session expired. Please log in again.',
    };
  }

  if (errorInfo instanceof ApiError && errorInfo.status === 403) {
    const href = buildForbiddenRedirectPath('admin');
    return {
      type: 'redirect',
      href,
      message: 'You do not have access to the admin panel.',
    };
  }

  return {
    type: 'none',
  };
};
