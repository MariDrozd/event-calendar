import { getSession } from '@/src/entities/user/server/session';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const user = await getSession();

  if (!user) {
    return NextResponse.json(null, { status: 200 });
  }

  return NextResponse.json(user, { status: 200 });
};
