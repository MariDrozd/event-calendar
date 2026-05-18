import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { EventCreateRequest, EventTask } from '../model/types';

const DB_PATH = path.join(
  process.cwd(),
  'src',
  'shared',
  'mocks',
  'events.mock.json',
);

export async function readEvents(): Promise<EventTask[]> {
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw) as EventTask[];
}

export async function writeEvents(events: EventTask[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(events, null, 2), 'utf-8');
}

export async function getAllEvents() {
  return readEvents();
}

export async function getEventByStart(start: string) {
  const events = await readEvents();
  return events.find((e) => e.start === start) ?? null;
}

export async function patchEvent(start: string, data: Partial<EventTask>) {
  const events = await readEvents();
  const idx = events.findIndex((e) => e.start === start);
  if (idx === -1) return null;

  const next = { ...events[idx], ...data };

  next.isDone = next.end !== null;

  events[idx] = next;
  await writeEvents(events);
  return events[idx];
}

export async function patchEventEnd(start: string, end: string | null) {
  return await patchEvent(start, { end });
}

export async function createEvent(payload: EventCreateRequest) {
  const events = await readEvents();

  const exists = events.some((event) => event.start === payload.start);
  if (exists) {
    return null;
  }

  const created: EventTask = {
    ...payload,
    id: randomUUID(),
    end: null,
    isDone: false,
  };
  events.unshift(created);
  await writeEvents(events);
  return created;
}

export async function deleteEvent(start: string) {
  const events = await readEvents();
  const idx = events.findIndex((e) => e.start === start);
  if (idx === -1) return null;

  const [deleted] = events.splice(idx, 1);
  await writeEvents(events);
  return deleted;
}
