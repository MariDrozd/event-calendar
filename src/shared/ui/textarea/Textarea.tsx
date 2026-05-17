import { forwardRef, type TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`min-h-24 border border-gray-400 p-3 resize-none text-sm outline-none focus:border-green-600 ${className}`}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
