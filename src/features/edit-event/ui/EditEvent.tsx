'use client';

import { EventTask } from '@/src/entities/event';
import { useState } from 'react';
import { EditEventForm } from './EditEventForm';
import { Button } from '@/src/shared/ui/button';

type EditEventProps = {
  event: EventTask;
  onEditingChange: (isEditing: boolean) => void;
};

export const EditEvent = ({ event, onEditingChange }: EditEventProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const openEdit = () => {
    setIsEditing(true);
    onEditingChange?.(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
    onEditingChange?.(false);
  };

  if (isEditing) {
    return (
      <EditEventForm event={event} onSaved={closeEdit} onCancel={closeEdit} />
    );
  }

  return (
    <Button type="button" onClick={openEdit} className="min-w-25">
      Edit
    </Button>
  );
};
