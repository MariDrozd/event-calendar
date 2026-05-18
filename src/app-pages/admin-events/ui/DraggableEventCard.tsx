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
        'text-sm',
        'flex flex-col gap-1',
        'rounded-xl',
        'border border-slate-200',
        'bg-white',
        'p-4',
        'shadow-sm',
        'transition-colors duration-200',
        'hover:border-slate-300',
        'relative'
      )}
    >
      <button
        type='button'
        {...attributes}
        {...listeners}
        style={{ cursor: 'grab' }}
        className="
          absolute top-1 right-1
          cursor-grab
          rounded-md
          h-12 w-12 p-1
          text-slate-500
          hover:bg-slate-100
          active:cursor-grabbing
        "
        aria-label="Drag event"
        title="Drag to delete"
      >
        <GripVertical size={22} />
      </button>
      <AdminEventCard event={event} />
    </div>
  );
};
