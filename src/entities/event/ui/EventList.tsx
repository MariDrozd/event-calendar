import type { EventListItem } from '../model/types';
import { DraggableEventCard } from './DraggableEventCard';

type EventListProps = {
  events: EventListItem[];
};

export const EventList = ({ events }: EventListProps) => {
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
