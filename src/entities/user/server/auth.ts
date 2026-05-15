import bcrypt from "bcryptjs";
import type { UserDTO, Candidate } from "../model/types";
import { getUserByName } from "./usersFileDb";
import { toUserDTO } from "../model/dto";


export const verifyUser = async (candidate: Candidate): Promise<UserDTO | null> => {
	const { name, pin } = candidate;
	const user = await getUserByName(name);

	if (!user) {
		return null
	};

	const isVerified = await bcrypt.compare(pin, user.pinHash)

	return isVerified ? toUserDTO(user) : null

}