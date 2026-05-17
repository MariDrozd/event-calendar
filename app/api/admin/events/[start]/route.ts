import { deleteEvent } from "@/src/entities/event/server";
import { patchEvent } from "@/src/entities/event/server/eventsFileDb";
import { denyIfNotParent } from "@/src/entities/user/server";
import { NextResponse } from "next/server";

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
  const data = await req.json();

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

