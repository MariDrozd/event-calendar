import { EventCardBase, EventTask } from '@/src/entities/event';
import { DeleteEventButton } from '@/src/features/delete-event';
import { EditEvent } from '@/src/features/edit-event';
import clsx from 'clsx';
import { useState } from 'react';

type AdminEventCardProps = {
  event: EventTask;
};

export const AdminEventCard = ({ event }: AdminEventCardProps) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  return (
    <div>
      <EventCardBase
        title={event.title}
        start={event.start}
        isDone={event.isDone}
      >
        <p className="mt-1">
          <span className="font-bold">Task: </span>
          {event.description}
        </p>
        <p className="mt-1">
          <span className="font-bold">Answer: </span>
          {event.answer}
        </p>
        <p className="mt-1">
          <span className="font-bold">Gift: </span>
          {event.gift}
        </p>
      </EventCardBase>

      <div
        className={clsx(
          'mt-2 flex justify-end gap-2',
          isFormOpen && 'flex-col items-end',
        )}
      >
        <EditEvent event={event} onEditingChange={setIsFormOpen} />
        <DeleteEventButton start={event.start} shouldRedirect={false} />
      </div>
    </div>
  );
};
