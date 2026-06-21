// import {
//   appRoutes,
//   buildForbiddenRedirectPath,
//   buildLoginRedirectPath,
// } from '../../config/route-path';
// import { ApiError } from '../fetch';

// export const getAuthErrorRedirectPath = (errorInfo: unknown): string | null => {
//   if (!(errorInfo instanceof ApiError)) {
//     return null;
//   }

//   if (errorInfo.status === 401) {
//     return buildLoginRedirectPath(appRoutes.adminEvents);
//   }

//   if (errorInfo.status === 403) {
//     return buildForbiddenRedirectPath('admin');
//   }

//   return null;
// };
