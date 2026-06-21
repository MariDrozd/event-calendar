import { DEFAULT_ERROR_NOTICE } from '@/src/shared/config/error-notice';
import { ApiError } from '@/src/shared/lib/fetch';
import type { ErrorNotice } from '@/src/shared/types/error';

export const getAnswerSubmitErrorMessage = (
  errorInfo: unknown,
): ErrorNotice => {
  if (!(errorInfo instanceof ApiError)) {
    return DEFAULT_ERROR_NOTICE;
  }

  switch (errorInfo.status) {
    case 401:
      return {
        title: 'Access denied.',
        message:
          'You do not have access to sent answer. Please, login into account',
      };

    case 403:
      return {
        title: 'Access denied.',
        message: 'For sending answer you should be login as Child',
      };

    case 400:
      return {
        title: 'Bad request.',
        message: errorInfo.message,
      };

    default:
      return DEFAULT_ERROR_NOTICE;
  }
};
