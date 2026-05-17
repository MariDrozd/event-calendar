'use client';

import { z } from 'zod';
import { eventQueryKeys, fetchCreateEvent } from '@/src/entities/event';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '@/src/shared/ui/form-field';
import { Input } from '@/src/shared/ui/input';
import { Textarea } from '@/src/shared/ui/textarea';

const createEventSchema = z.object({
  start: z.string().trim().min(1, 'Start date is required'),
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  answer: z.string().trim().min(1, 'Answer is required'),
  gift: z.string().trim().min(1, 'Gift is required'),
});

type CreateEventFormValues = z.infer<typeof createEventSchema>;

const defaultValues: CreateEventFormValues = {
  start: '',
  title: '',
  description: '',
  answer: '',
  gift: '',
};



export const CreateEventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {

  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
}, []);

  const qc = useQueryClient();

  const createEvent = useMutation({
    mutationFn: fetchCreateEvent,
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: eventQueryKeys.adminList,
      });
      await qc.invalidateQueries({
        queryKey: eventQueryKeys.publicList,
      });
      reset(defaultValues);
      setSuccessMessage('Event successfully created');

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    },
  });

  const onSubmit = (data: CreateEventFormValues) => {
    if (isSubmitting) return;

    createEvent.mutate(data);
  };

  const onClear = () => {
    reset(defaultValues);
    createEvent.reset();
    setSuccessMessage('');

    if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <FormField error={errors.start?.message} label="Start date">
        <Input
          {...register('start')}
          type="date"
          placeholder="Start date DD.MM.YYY"
        ></Input>
      </FormField>
      <FormField error={errors.title?.message} label="Title">
        <Input {...register('title')} placeholder="Title"></Input>
      </FormField>

      <FormField error={errors.description?.message} label="Description">
        <Textarea
          {...register('description')}
          placeholder="Description"
        ></Textarea>
      </FormField>

      <FormField error={errors.answer?.message} label="Answer">
        <Input {...register('answer')} placeholder="Answer"></Input>
      </FormField>
      <FormField error={errors.gift?.message} label="Gift">
        <Input {...register('gift')} placeholder="Gift"></Input>
      </FormField>
      <div className="flex gap-2"></div>
      <button
        className="w-20 h-5"
        type="submit"
        disabled={isSubmitting || createEvent.isPending}
      >
        {createEvent.isPending ? 'Creating...' : 'Create'}
      </button>
      <button className="w-20 h-5" type="button" onClick={onClear}>
        Clear all
      </button>
      {createEvent.isError && (
        <p className="text-sm text-red-600">{createEvent.error.message}</p>
      )}
      {successMessage && (
        <p className="text-sm text-green-600">{successMessage}</p>
      )}
    </form>
  );
};
