import clsx from "clsx";
import type { NoticeData, NoticeVariant } from "../../types/notice";

const NoticeVariants: Record<NoticeVariant, string> = {
	error: 'bg-red-100 text-red-900',
	info: 'bg-sky-100 text-sky-900'
}


export const Notice = ({ title, message, variant = 'info' }: NoticeData) => {
	return (
		<div className={clsx(`
			flex flex-col
			gap-2
			px-4 py-2
			rounded-2xl
		`,
			NoticeVariants[variant]
		)}>
			{title && <p className="font-semibold">{title}</p>}
			<p className="text-sm">{message}</p>
		</div>
		
	)
}