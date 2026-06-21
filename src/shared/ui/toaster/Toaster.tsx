'use client';

import { Toaster as SonnerToaster } from 'sonner';

const toastOptions = {
  unstyled: true,
  classNames: {
    toast:
      'rounded-md border px-4 py-3 shadow-sm flex gap-2 justify-center items-center',
    success: 'bg-cyan-50  border border-cyan-200  text-cyan-800',
    error: 'bg-rose-100 border border-rose-200 text-rose-900',
    info: 'bg-sky-100 border border-sky-200 text-sky-900',
  },
};

export const Toaster = () => {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={toastOptions}
      offset={{
        top: 80,
        right: 20,
      }}
    />
  );
};
