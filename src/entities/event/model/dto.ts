import type { EventDetails, EventListItem, EventTask } from './types';

export const toEventListItem = (event: EventTask): EventListItem => {
  return {
    id: event.id,
    start: event.start,
    title: event.title,
    isDone: event.isDone,
    end: event.end,
  };
};

export const toEventDetails = (event: EventTask): EventDetails => {
  return {
    id: event.id,
    start: event.start,
    title: event.title,
    description: event.description,
    gift: event.gift,
    isDone: event.isDone,
    end: event.end,
  };
};
