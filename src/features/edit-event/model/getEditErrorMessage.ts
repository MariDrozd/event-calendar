import { DEFAULT_ERROR_NOTICE } from '@/src/shared/config/error-notice';
import { ApiError } from '@/src/shared/lib/fetch';
import { ErrorNotice } from '@/src/shared/types/error';

export const getEditErrorMessage = (errorInfo: unknown): ErrorNotice => {
  if (errorInfo instanceof ApiError && errorInfo.status === 400) {
    return {
      title: 'Invalid event data',
      message: 'Check the form fields and try again.',
    };
  }

  if (errorInfo instanceof ApiError && errorInfo.status === 404) {
    return {
      title: 'Event not found.',
      message: 'This event may have already been deleted.',
    };
  }

  return DEFAULT_ERROR_NOTICE;
};
