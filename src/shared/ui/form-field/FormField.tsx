import { ReactNode } from "react"


type FormFieldProps = {
	children: ReactNode;
	error?: string;
	label: string;
}

export const FormField = ({children, label, error}: FormFieldProps) => {


	return (
		<label className="flex flex-col">
			<span className="text-sm font-medium text-slate-700">{label}</span>
			{children}
			        {error && (
          <span className="text-xs text-red-600">{error}</span>
        )}
		</label>
	)
}