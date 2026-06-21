// import { ApiError } from '@/src/shared/lib/fetch';

// type AdminEventErrorWithRedirect = {
//   type: 'redirect';
//   href: string;
// };

// type AdminEventErrorWithNotice = {
//   type: 'notice';
//   message: string;
// };

// export type AdminEventErrorAction =
//   | AdminEventErrorWithRedirect
//   | AdminEventErrorWithNotice;

// export const getAdminEventsErrorAction = (
//   errorInfo: unknown,
// ): AdminEventErrorAction => {
//   if (errorInfo instanceof ApiError && errorInfo.status === 401) {
//     return {
//       type: 'redirect',
//       href: '/login?from=/admin/events',
//     };
//   }

//   if (errorInfo instanceof ApiError && errorInfo.status === 403) {
//     return {
//       type: 'redirect',
//       href: '/calendar?reason=forbidden&source=admin',
//     };
//   }

//   return {
//     type: 'notice',
//     message: 'Failed to load admin events.',
//   };
// };


// import { DEFAULT_ERROR_NOTICE } from '@/src/shared/config/error-notice';
// import { ApiError } from '@/src/shared/lib/fetch';
// import { ErrorNotice } from '@/src/shared/types/error';

// export const getLoadEventErrorMessage = (errorInfo: unknown): ErrorNotice => {
//   if (errorInfo instanceof ApiError && errorInfo.status === 404) {
//     return {
//       title: 'Event not found.',
//       message: 'This event may have already been deleted.',
//     };
//   }

//   return DEFAULT_ERROR_NOTICE;
// };
