import clsx from 'clsx';
import type { NoticeData, NoticeVariant } from '../../types/notice';

const NoticeVariants: Record<NoticeVariant, string> = {
  error: 'bg-rose-100 border border-rose-200 text-rose-900',
  info: 'bg-sky-100 border border-sky-200 text-sky-900',
  success: 'bg-cyan-50  border border-cyan-200  text-cyan-800',
};

export const Notice = ({ title, message, variant = 'info' }: NoticeData) => {
  return (
    <div
      className={clsx(
        `flex flex-col gap-2 rounded-md px-4 py-2`,
        NoticeVariants[variant],
      )}
    >
      {title && <p className="font-semibold">{title}</p>}
      <p className="text-sm">{message}</p>
    </div>
  );
};
