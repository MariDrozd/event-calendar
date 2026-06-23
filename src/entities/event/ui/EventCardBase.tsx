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
      <div className="mb-2 text-sm opacity-80">
        <span>Start date: </span>
        {start}
      </div>

      <h2 className="mb-1 font-bold">{title}</h2>

      {isDone && (
        <div>
          <span className="font-bold">Status: </span>Event is done
        </div>
      )}

      {children && <div>{children}</div>}
    </article>
  );
};
