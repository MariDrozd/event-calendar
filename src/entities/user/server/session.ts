import { cookies } from "next/headers";
import type { UserDTO } from "../model/types";

const SESSION_COOKIE = "event_calendar_session";


export const setSession = async (user: UserDTO) => {
	const cookieStore = await cookies();


  cookieStore.set({
    name: SESSION_COOKIE,
    value: JSON.stringify(user),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}


export const getSession = async (): Promise<UserDTO | null> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE);

  if (!cookie) return null;

  try {
    return JSON.parse(cookie.value) as UserDTO;
  } catch {
    return null;
  }
}


export const clearSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}