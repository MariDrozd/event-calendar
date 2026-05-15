import { UserRole } from "../model/types";
import { getSession } from "./session"


export const requireUser = async () => {
	const user = await getSession();

	if (!user) {
		throw new Error("Unauthorized");
	}
	return user;
}

export const requireRole = async (role: UserRole) => {
	const user = await getSession();

	if (!user) {
    throw new Error("Unauthorized");
  }
  if (user.role !== role) {
    throw new Error("Forbidden");
  }

	return user;
}