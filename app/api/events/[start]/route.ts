import { loadEventDetails } from '@/src/entities/event/server/loader';
import { NextResponse } from 'next/server';
export const runtime = 'nodejs';

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ start: string }> },
) => {
  const { start } = await params;
  const eventDto = await loadEventDetails(start);

  if (!eventDto) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  return NextResponse.json(eventDto, { status: 200 });
};
