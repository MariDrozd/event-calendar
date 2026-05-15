import { DeleteEventButton } from '@/src/features/delete-event';
import type { EventListItem } from '../model/types';

type EventCardProps = {
  event: EventListItem;
};

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <article className="text-sm flex flex-col gap-1 border p-2 rounded-md">
      <h2 className='text-lg'>{event.title}</h2>
      <p>Start: {event.start}</p>
      <p>End: {event.end ? event.end : 'Not completed'}</p>
			<p>Status: {event.isDone ? 'Done' : 'Active'}</p>
			<div className='flex justify-end'>
				<DeleteEventButton start={event.start} />
			</div>
			
    </article>
  );
};
