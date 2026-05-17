import { EventCardBase, EventTask } from '@/src/entities/event';
import { DeleteEventButton } from '@/src/features/delete-event';
import { EditEvent } from '@/src/features/edit-event';

type AdminEventCardProps = {
  event: EventTask;
};

export const AdminEventCard = ({
  event,
}: AdminEventCardProps) => {
  return (

      <div>
        <EventCardBase
          title={event.title}
          start={event.start}
          isDone={event.isDone}
        >
          <p>Task: {event.description}</p>
          <p>Answer: {event.answer}</p>
          <p>Gift: {event.gift}</p>
        </EventCardBase>

      <div className="flex flex-col gap-2 mt-2">
        <EditEvent event={event} />
        <DeleteEventButton start={event.start} shouldRedirect={false} />
      </div>
    </div>
  );
};
