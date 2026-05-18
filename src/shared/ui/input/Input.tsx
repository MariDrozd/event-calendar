import { forwardRef, type InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => {
	return (
		<input
			ref={ref}
			className="
				w-full
				rounded-md
				border border-slate-300
				bg-white
				px-3 py-2
				text-sm
				outline-none
				transition
				focus:border-indigo-500
				focus:ring-2 focus:ring-indigo-100
			"
			{...props}
		/>
	);
});


Input.displayName = 'Input';