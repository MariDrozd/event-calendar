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
import { Button } from '@/src/shared/ui/button';

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

type CreateEventFormProps = {
  onCancel: () => void;
};

export const CreateEventForm = ({ onCancel }: CreateEventFormProps) => {
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
      className="
        w-full
        rounded-xl
        border border-slate-200
        bg-white
        p-5
        shadow-sm
        flex flex-col gap-4
      "
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
      <div className="flex flex-col gap-1">
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            type="submit"
            disabled={isSubmitting || createEvent.isPending}
            className="min-w-25"
          >
            {createEvent.isPending ? 'Creating...' : 'Create'}
          </Button>

          <Button
            size="sm"
            variant="secondary"
            type="button"
            onClick={onClear}
            className="min-w-25"
          >
            Clear
          </Button>

          <Button
            size="sm"
            variant="secondary"
            type="button"
            onClick={onCancel}
            className="min-w-25"
          >
            Cancel
          </Button>
        </div>
        {createEvent.isError && (
          <p className="text-sm text-rose-400">{createEvent.error.message}</p>
        )}
        {successMessage && (
          <p className="text-sm text-cyan-400">{successMessage}</p>
        )}
      </div>
    </form>
  );
};
