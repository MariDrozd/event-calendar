import { forwardRef, type InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => {
	return (
		<input
			ref={ref}
			className={`border border-gray-400 ${className}`}
			{...props}
		/>
	);
});


Input.displayName = 'Input';