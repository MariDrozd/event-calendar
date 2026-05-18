import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

type LinkButtonVariant = 'primary' | 'secondary';

type LinkButtonSize = 'sm' | 'md' | 'lg';

type LinkButtonProps = LinkProps & {
  variant?: LinkButtonVariant;
  children: ReactNode;
  className?: string;
  size?: LinkButtonSize;
};

const variants = {
  primary: 'bg-indigo-400 text-white hover:bg-indigo-600',
  secondary:
    'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};
export const LinkButton = ({
  variant = 'primary',
  children,
  className,
  size = 'md',
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      {...props}
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-medium shadow-sm transition active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </Link>
  );
};
