'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { EventListItem } from '../model/types';
import { EventCard } from './EventCard';

type DraggableEventCardProps = {
  event: EventListItem;
};

export const DraggableEventCard = ({ event }: DraggableEventCardProps) => {
  const { setNodeRef, isDragging, attributes, listeners, transform } =
    useDraggable({
      id: event.start,
      data: {
        start: event.start,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={isDragging ? 'opacity-50' : ''}
    >
      <EventCard event={event} />
    </div>
  );
};
