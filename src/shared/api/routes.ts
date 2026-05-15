export const apiRoutes = {
  events: () => '/api/events',
  eventByDate: (start: string) => `/api/events/${encodeURIComponent(start)}`,
  checkAnswer: (start: string) =>
    `/api/events/${encodeURIComponent(start)}/check`,
  me: () => '/api/auth/me',
  login: () => '/api/auth/login',
  logout: () => '/api/auth/logout',
};
