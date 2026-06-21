import { deleteEvent } from '@/src/entities/event/server';
import { patchEvent } from '@/src/entities/event/server/eventsFileDb';
import { denyIfNotParent } from '@/src/entities/user/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

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
  return NextResponse.json(deleted, { status: 200 });
};

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ start: string }> },
) => {
  const denied = await denyIfNotParent();
  if (denied) return denied;

  const { start } = await params;

  let data;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  if (
    (data.title !== undefined && typeof data.title !== 'string') ||
    (data.description !== undefined && typeof data.description !== 'string') ||
    (data.answer !== undefined && typeof data.answer !== 'string') ||
    (data.gift !== undefined && typeof data.gift !== 'string')
  ) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const updated = await patchEvent(start, {
    title: data.title,
    description: data.description,
    answer: data.answer,
    gift: data.gift,
  });

  if (!updated) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  return NextResponse.json(updated, { status: 200 });
};
