import { User, UserDTO } from './types';

export const toUserDTO = (user: User): UserDTO => {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
  };
};
