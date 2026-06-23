import clsx from 'clsx';
import { forwardRef, type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          `w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100`,
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
