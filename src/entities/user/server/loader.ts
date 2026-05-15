import { toUserDTO } from "../model/dto";
import type { UserDTO } from "../model/types";
import { getUserByName } from "./usersFileDb";


export const loadUser = async (name: string): Promise<UserDTO | null> => {
	const user = await getUserByName(name);
	if (!user) {
		return null
	};
	return toUserDTO(user)
}