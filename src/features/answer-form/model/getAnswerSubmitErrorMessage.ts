import { ApiError } from '@/src/shared/lib/fetch';

export type AnswerSubmitErrorMessage = {
  title: string;
  message: string;
};

export const getAnswerSubmitErrorMessage = (
  errorInfo: unknown,
): AnswerSubmitErrorMessage => {
  if (!(errorInfo instanceof ApiError)) {
    return {
      title: 'Oops!',
      message: 'Something went wrong. Try again',
    };
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
      return {
        title: 'Oops!',
        message: 'Something went wrong. Try again',
      };
  }
};
