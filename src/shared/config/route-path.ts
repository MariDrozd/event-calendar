export const appRoutes = {
  login: '/login',
  calendar: '/calendar',
  adminEvents: '/admin/events',
} as const;

export const buildLoginRedirectPath = (from: string) => {
  return `${appRoutes.login}?from=${encodeURIComponent(from)}`;
};

export const buildForbiddenRedirectPath = (from: string) => {
  const source = from
    ? `?reason=forbidden&source=${encodeURIComponent(from)}`
    : '?reason=forbidden';

  return `${appRoutes.calendar}${source}`;
};
