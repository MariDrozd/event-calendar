export type UserRole = 'parent' | 'child';

export type User = {
  id: string;
  name: string;
  role: UserRole;
  pinHash: string;
};

export type UserDTO = Omit<User, 'pinHash'>;

export type Candidate = {
  name: string;
  pin: string;
};
