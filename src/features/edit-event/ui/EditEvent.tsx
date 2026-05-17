'use client';

import { EventTask } from "@/src/entities/event";
import { useState } from "react";
import { EditEventForm } from "./EditEventForm";

type EditEventProps = {
	event: EventTask;
}

export const EditEvent = ({event}: EditEventProps) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	console.log('isEditing', isEditing)
	
	if (isEditing) {
		return (
			<EditEventForm
				event={event}
				onSaved={() => setIsEditing(false)}
				onCancel={() => setIsEditing(false)}
			/>
		)
	}

	return (
		<button
			type='button'
			onClick={() => setIsEditing(true)}
			className="border-2 border-green-600 w-20 h-10"
		>
			Edit
		</button>
	)

}