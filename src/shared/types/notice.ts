export type NoticeVariant = 'error' | 'info' | 'success';

export type NoticeData = {
  title?: string;
  message: string;
  variant?: NoticeVariant;
};
