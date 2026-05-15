import { clearSession } from '@/src/entities/user/server/session';
import { NextResponse } from 'next/server';

export const POST = async () => {
  await clearSession();
  return NextResponse.json({ success: true });
};
