export type EventTask = {
  id: string;
  start: string;
  end: string | null;
  title: string;
  description: string;
  answer: string;
  gift: string;
  isDone: boolean;
};

export type EventDetails = Omit<EventTask, 'answer'>;

export type EventListItem = Pick<
  EventTask,
  'id' | 'start' | 'title' | 'isDone' | 'end'
>;

export type CheckAnswerResponse = {
  isCorrectAnswer: boolean;
  isDone: boolean;
  end: string | null;
};

export type EventDetailsDTO = {
  id: string;
  start: string;
  title: string;
  description: string;
  gift: string;
  isDone: boolean;
  end: string | null;
};

export type EventCreateRequest = Omit<EventTask, 'id' | 'end' | 'isDone'>;

export type EventPatchRequest = Partial<
  Pick<EventTask, 'title' | 'description' | 'gift' | 'answer' | 'end'>
>;
