import { toEventDetails, toEventListItem } from '../model/dto';
import { EventListItem } from '../model/types';
import { getAllEvents, getEventByStart } from './eventsFileDb';

export async function loadEventList(): Promise<EventListItem[]> {
  const events = await getAllEvents();
  return events.map(toEventListItem);
}

export async function loadEventDetails(start: string): Promise<EventListItem> {
  const event = await getEventByStart(start);
  if (!event) {
    throw new Error('Event not found');
  }
  return toEventDetails(event);
}
