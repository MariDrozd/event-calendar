import { toEventDetails } from '@/src/entities/event/model/dto';
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
    done: event.end !== null,
  }));

  return NextResponse.json(list, { status: 200 });
};

export const POST = async (req: Request) => {
  const denied = await denyIfNotParent();
  if (denied) return denied;

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (
    !body ||
    typeof body.title !== 'string' ||
    typeof body.description !== 'string' ||
    typeof body.answer !== 'string' ||
    typeof body.start !== 'string' ||
    typeof body.gift !== 'string'
  ) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const created = await createEvent({
    title: body.title,
    description: body.description,
    answer: body.answer,
    start: body.start,
    gift: body.gift,
  });

  if (!created) {
    return NextResponse.json(
      { error: 'Event for this date already exists' },
      { status: 409 },
    );
  }

  return NextResponse.json(toEventDetails(created), { status: 201 });
};
