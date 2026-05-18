'use client';

import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";


type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-400 text-white hover:bg-indigo-500',
  secondary:
    'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100',
  danger: 'bg-rose-500/80 text-white hover:bg-rose-600',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

export const Button = ({
	variant = 'primary',
	size = 'md',
	className,
	children,
	...props
}: ButtonProps) => {


	return (
		<button className={clsx(
			'inline-flex items-center justify-center rounded-md font-medium shadow-sm transition',
			'active:scale-[0.98]',
			'disabled:cursor-not-allowed disabled:opacity-50',
			buttonVariants[variant],
			buttonSizes[size],
			className
		)}
		{...props}
		>
			{children}
		</button>
	)
}