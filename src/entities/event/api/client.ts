import { fetchJson } from '@/src/shared/lib/fetch';
import type {
  CheckAnswerResponse,
  EventCreateRequest,
  EventDetails,
  EventListItem,
  EventPatchRequest,
  EventTask,
} from '../model/types';
import { apiRoutes } from '@/src/shared/api';

export const fetchEvents = () => {
  return fetchJson<EventListItem[]>(apiRoutes.events());
};

export const fetchAdminEvents = () => {
  return fetchJson<EventTask[]>(apiRoutes.adminEvents());
};

export const fetchEventByDate = (start: string) => {
  return fetchJson<EventDetails>(apiRoutes.eventByDate(start));
};

export const fetchCheckAnswer = (start: string, answer: string) => {
  return fetchJson<CheckAnswerResponse>(apiRoutes.checkAnswer(start), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answer }),
  });
};

export const fetchPatchEvent = (start: string, data: EventPatchRequest) => {
  return fetchJson<EventTask>(apiRoutes.adminEventByDate(start), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const fetchCreateEvent = (data: EventCreateRequest) => {
  return fetchJson<EventTask>(apiRoutes.adminEvents(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const fetchDeleteEvent = (start: string) => {
  return fetchJson(apiRoutes.adminEventByDate(start), {
    method: 'DELETE',
  });
};
