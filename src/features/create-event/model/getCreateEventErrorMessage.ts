import { DEFAULT_ERROR_NOTICE } from "@/src/shared/config/error-notice"
import { ApiError } from "@/src/shared/lib/fetch"
import { ErrorNotice } from "@/src/shared/types/error"

export const getCreateEventErrorMessage = (errorInfo: unknown): ErrorNotice => {

	if (errorInfo instanceof ApiError && errorInfo.status === 409) {
		return {
			title: 'Event already exists',
			message: 'Only one event per date is allowed.'
		}
	}

	if (errorInfo instanceof ApiError && errorInfo.status === 400) {
		return {
			title: 'Invalid event data',
			message: 'Check the form fields and try again.'
		}
	}

	return DEFAULT_ERROR_NOTICE;
}