import { getEventByStart, patchEventEnd } from '@/src/entities/event/server';
import { NextResponse } from 'next/server';
export const runtime = 'nodejs';

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ start: string }> },
) => {
  const { start } = await params;

  let body;

  try {
    body = await req.json();
    console.log('body', body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const answer = typeof body?.answer === 'string' ? body.answer : '';
  console.log('answer', answer);
  if (!answer) {
    return NextResponse.json({ error: 'Missing answer' }, { status: 400 });
  }

  const event = await getEventByStart(start);
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  console.log('event.answer', event.answer);
  const isCorrectAnswer = answer.trim() === event.answer.trim();
  console.log('isCorrectAnswer', isCorrectAnswer);

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
