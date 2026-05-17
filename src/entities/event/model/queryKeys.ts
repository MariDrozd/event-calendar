export const eventQueryKeys = {
  publicList: ['events'] as const,
  publicDetails: (start: string) => ['events', start] as const,

  adminList: ['admin-events'] as const,
  adminDetails: (start: string) => ['admin-events', start] as const,
};
