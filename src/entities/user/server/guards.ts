import { AUTH_ERROR, AuthError } from "../model/auth-error";
import { UserRole } from "../model/types";
import { getSession } from "./session"


export const requireUser = async () => {
	const user = await getSession();

	if (!user) {
		throw new AuthError(
			AUTH_ERROR.UNAUTHORIZED.status,
			AUTH_ERROR.UNAUTHORIZED.message);
	}
	return user;
}

export const requireRole = async (role: UserRole) => {
	const user = await requireUser();

  if (user.role !== role) {
    throw new AuthError(
			AUTH_ERROR.FORBIDDEN.status,
			AUTH_ERROR.FORBIDDEN.message);
  }

	return user;
}