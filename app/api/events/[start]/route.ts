import { toEventDetails } from '@/src/entities/event';
import { deleteEvent } from '@/src/entities/event/server';
import { loadEventDetails } from '@/src/entities/event/server/loader';
import { denyIfNotParent } from '@/src/entities/user/server';
import { NextResponse } from 'next/server';
export const runtime = 'nodejs';

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ start: string }> },
) => {
  console.log('start');
  const { start } = await params;
  console.log('start', start);

  const eventDto = await loadEventDetails(start);

  console.log('event', eventDto);

  if (!eventDto) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  return NextResponse.json(eventDto, { status: 200 });
};

export const DELETE = async (
  _req: Request,
  { params }: { params: Promise<{ start: string }> },
) => {
  const denied = await denyIfNotParent();
  if (denied) return denied;

  const { start } = await params;

  const deleted = await deleteEvent(start);

  if (!deleted) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  return NextResponse.json(toEventDetails(deleted), { status: 200 });
};
