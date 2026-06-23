export const AUTH_ERROR = {
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized',
  },
  FORBIDDEN: {
    status: 403,
    message: 'Forbidden',
  },
} as const;

type AuthErrorConfig = (typeof AUTH_ERROR)[keyof typeof AUTH_ERROR];

export type AuthErrorStatus = AuthErrorConfig['status'];
export type AuthErrorMessage = AuthErrorConfig['message'];

export class AuthError extends Error {
  status: AuthErrorStatus;
  declare message: AuthErrorMessage;

  constructor(status: AuthErrorStatus, message: AuthErrorMessage) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
  }
}
