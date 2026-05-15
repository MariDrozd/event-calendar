import { fetchJson } from '@/src/shared/lib/fetch';
import type {
  CheckAnswerResponse,
  EventCreateRequest,
  EventDetails,
  EventListItem,
  EventPatchRequest,
} from '../model/types';
import { apiRoutes } from '@/src/shared/api';

export const fetchEvents = () => {
  return fetchJson<EventListItem[]>(apiRoutes.events());
};

export const fetchEventByDate = (start: string) => {
  // console.log('fetchEventByDate start')
  // return fetchJson<EventDetails>(`/api/events/${start}`)
  // const url = `/api/events/${encodeURIComponent(start)}`;
  // console.log('fetchEventByDate URL:', url);
  return fetchJson<EventDetails>(apiRoutes.eventByDate(start));
};

export const fetchCheckAnswer = (start: string, answer: string) => {
  return fetchJson<CheckAnswerResponse>(apiRoutes.checkAnswer(start), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answer }),
  });
};

export const fetchPatchEventEnd = (start: string, end: string | null) => {
  return fetchJson<EventDetails>(apiRoutes.eventByDate(start), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ end }),
  });
};

export const fetchPatchEvent = (start: string, data: EventPatchRequest) => {
  return fetchJson<EventDetails>(apiRoutes.eventByDate(start), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const fetchCreateEvent = (data: EventCreateRequest) => {
  return fetchJson<EventDetails>(apiRoutes.events(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const fetchDeleteEvent = (start: string) => {
  return fetchJson(apiRoutes.eventByDate(start), {
    method: 'DELETE',
  });
};
