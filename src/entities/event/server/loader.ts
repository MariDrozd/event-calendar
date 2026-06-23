import { toEventDetails, toEventListItem } from '../model/dto';
import { EventListItem } from '../model/types';
import { getAllEvents, getEventByStart } from './eventsFileDb';

export async function loadEventList(): Promise<EventListItem[]> {
  const events = await getAllEvents();
  return events.map(toEventListItem);
}

export async function loadEventDetails(
  start: string,
): Promise<EventListItem | null> {
  const event = await getEventByStart(start);
  if (!event) {
    return null;
  }
  return toEventDetails(event);
}
