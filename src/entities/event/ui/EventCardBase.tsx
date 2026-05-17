import clsx from 'clsx';
import { ReactNode } from 'react';

type EventCardBaseProps = {
  title: string;
  start: string;
  isDone: boolean;
  children?: ReactNode;
  cl?: string;
};

export const EventCardBase = (props: EventCardBaseProps) => {
  const { title, start, isDone, children, cl } = props;

  return (
    <article className={clsx(cl, 'flex flex-col')}>
      <div className="text-sm opacity-80">{start}</div>
      <h2 className="font-semibold my-1.5">{title}</h2>

      {isDone && (
        <div>
          <span className="font-bold">Status: </span>Event is done
        </div>
      )}

      {children && <div className="mt-3">{children}</div>}
    </article>
  );
};
