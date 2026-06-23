import { promises as fs } from 'fs';
import path from 'path';
import type { User } from '../model/types';

const DB_PATH = path.join(
  process.cwd(),
  'src',
  'shared',
  'mocks',
  'users.mock.json',
);

export async function readUsers(): Promise<User[]> {
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw) as User[];
}

export async function getUserByName(name: string): Promise<User | null> {
  const users = await readUsers();

  return users.find((user) => user.name === name) ?? null;
}
