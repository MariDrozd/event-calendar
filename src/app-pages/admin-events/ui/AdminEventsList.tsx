import { EventTask } from '@/src/entities/event';
import { DraggableEventCard } from './DraggableEventCard';

type EventListsProps = {
  events: EventTask[];
};

export const AdminEventsList = ({ events }: EventListsProps) => {
  return (
    <div className="flex flex-col gap-2">
      {events.map((event) => (
        <div key={event.id}>
          <DraggableEventCard event={event} />
        </div>
      ))}
    </div>
  );
};
