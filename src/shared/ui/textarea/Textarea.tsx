import clsx from 'clsx';
import { forwardRef, type TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          'w-full',
          'min-h-30',
          'rounded-md',
          'border border-slate-300',
          'bg-white',
          'px-3 py-2',
          'text-sm',
          'outline-none',
          'transition',
          'resize-y',
          'focus:border-indigo-500',
          'focus:ring-2 focus:ring-indigo-100',
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
