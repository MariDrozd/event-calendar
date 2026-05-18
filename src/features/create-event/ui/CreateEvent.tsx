'use client';

import { useState } from 'react';
import { CreateEventForm } from './CreateEventForm';
import { Button } from '@/src/shared/ui/button';

export const CreateEvent = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  if (isCreating) {
    return <CreateEventForm onCancel={() => setIsCreating(false)} />;
  }

  return (
    <Button type="button" onClick={() => setIsCreating(true)} size="lg">
      Create Event
    </Button>
  );
};
