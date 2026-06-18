export type NoticeVariant = 'error' | 'info';

export type NoticeData = {
  title?: string;
  message: string;
  variant: NoticeVariant;
};