'use client';

import { useState } from 'react';
import { CreateEventForm } from './CreateEventForm';

export const CreateEvent = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  if (isCreating) {
    return (
      <div className="flex flex-col gap-4 border p-4">
        <CreateEventForm onCancel={() => setIsCreating(false)} />
        <button
          type="button"
          onClick={() => setIsCreating(false)}
          className="border-2 border-amber-600 w-20 h-10"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsCreating(true)}
      className="border-2 border-green-600 w-20 h-10"
    >
      Create
    </button>
  );
};
