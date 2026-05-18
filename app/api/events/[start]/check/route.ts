import { getEventByStart, patchEventEnd } from '@/src/entities/event/server';
import { denyIfNotChild } from '@/src/entities/user/server';
import { NextResponse } from 'next/server';
export const runtime = 'nodejs';

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ start: string }> },
) => {
  const denied = await denyIfNotChild();
  if (denied) return denied;

  const { start } = await params;

  let body;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const answer = typeof body?.answer === 'string' ? body.answer : '';
  if (!answer) {
    return NextResponse.json({ error: 'Missing answer' }, { status: 400 });
  }

  const event = await getEventByStart(start);
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  const isCorrectAnswer = answer.trim() === event.answer.trim();

  if (isCorrectAnswer) {
    if (event.end === null) {
      const endDate = new Date();
      const formattedEndDate = `${String(endDate.getFullYear())}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
      await patchEventEnd(start, formattedEndDate);
    }
  }

  const done = isCorrectAnswer ? true : event.end !== null;

  return NextResponse.json(
    {
      isCorrectAnswer,
      done,
    },
    { status: 200 },
  );
};
