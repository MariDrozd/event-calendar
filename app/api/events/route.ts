import { createEvent, getAllEvents } from '@/src/entities/event/server';
import { denyIfNotParent } from '@/src/entities/user/server';
import { NextResponse } from 'next/server';
export const runtime = 'nodejs';

export const GET = async () => {
  const events = await getAllEvents();

  const list = events.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.start,
    gift: event.gift,
    isDone: event.end !== null,
  }));

  return NextResponse.json(list, { status: 200 });
};

