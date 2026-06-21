import { DEFAULT_ERROR_NOTICE } from '@/src/shared/config/error-notice';
import { ApiError } from '@/src/shared/lib/fetch';
import type { ErrorNotice } from '@/src/shared/types/error';

export const getLoginErrorMessage = (errorInfo: unknown): ErrorNotice => {
  if (errorInfo instanceof ApiError && errorInfo.status === 401) {
    return {
      title: 'Login failed',
      message: 'Invalid name or PIN.',
    };
  }

  return DEFAULT_ERROR_NOTICE;
};
