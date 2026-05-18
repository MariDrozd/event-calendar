'use client';
import { Trash2 } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';

const TRASH_DROP_ZONE_ID = 'trash-drop-zone';

export const trashDropZoneId = TRASH_DROP_ZONE_ID;

export const TrashDropZone = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: trashDropZoneId,
  });

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        'flex h-24 w-24 flex-col items-center justify-center gap-1',
        'rounded-full border-2 shadow-lg backdrop-blur',
        'text-xs font-medium transition-all duration-200',
        isOver
          ? 'scale-105 border-rose-400 bg-rose-50 text-rose-600'
          : 'border-slate-300 bg-white/90 text-slate-500 hover:border-rose-300 hover:text-rose-400'
      )}>
      <Trash2 size={40} />
      <span className="text-xs">Drop event</span>
    </div>
  );
};
