'use client';
import { Trash2 } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';

const TRASH_DROP_ZONE_ID = 'trash-drop-zone';

export const trashDropZoneId = TRASH_DROP_ZONE_ID;

export const TrashDropZone = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: trashDropZoneId,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-22 h-22 border-2 rounded-full flex flex-col items-center justify-cente ${isOver ? 'border-red-600 bg-red-100' : 'border-green-600'} text-sm overflow-hidden flex items-center justify-center p-0.5`}
    >
      <Trash2 size={40} />
      <span className="text-[10px]">Drop to delete</span>
    </div>
  );
};
