import type { NoticeData } from '../../types/notice';

export const ROUTE_NOTICE_REASON = {
  FORBIDDEN: 'forbidden',
} as const;

export const ROUTE_NOTICE_SOURCE = {
  ADMIN: 'admin',
} as const;

type GetRouteNoticeParams = {
  reason?: string;
  source?: string;
};

export const getRouteNotice = ({
  reason,
  source,
}: GetRouteNoticeParams): NoticeData | null => {
  if (
    reason === ROUTE_NOTICE_REASON.FORBIDDEN &&
    source === ROUTE_NOTICE_SOURCE.ADMIN
  ) {
    return {
      title: 'Access denied',
      message: 'You do not have access to the admin panel.',
      variant: 'error',
    };
  }

  if (reason === ROUTE_NOTICE_REASON.FORBIDDEN) {
    return {
      title: 'Access denied',
      message: 'You do not have permission to open this page.',
      variant: 'error',
    };
  }

  return null;
};
