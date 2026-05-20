import { loadEventList } from '@/src/entities/event/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export const GET = async () => {
  const events = await loadEventList();

  return NextResponse.json(events, { status: 200 });
};
