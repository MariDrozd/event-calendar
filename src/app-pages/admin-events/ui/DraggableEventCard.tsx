'use client';

import { GripVertical } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { EventTask } from '../../../entities/event/model/types';
import { AdminEventCard } from './AdminEventCard';
import clsx from 'clsx';

type DraggableEventCardProps = {
  event: EventTask;
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
      className={clsx(
        isDragging && 'opacity-50',
        'text-sm flex flex-col gap-1 border p-2 rounded-md',
      )}
    >
      <button
        {...attributes}
        {...listeners}
        style={{ cursor: 'grab' }}
        className="w-fit cursor-grab active:cursor-grabbing p-1"
        aria-label="Drag event"
        title="Drag to delete"
      >
        <GripVertical size={18} />
      </button>
      <AdminEventCard event={event} />
    </div>
  );
};
