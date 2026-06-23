'use client';

import { z } from 'zod';
import { eventQueryKeys, fetchCreateEvent } from '@/src/entities/event';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '@/src/shared/ui/form-field';
import { Input } from '@/src/shared/ui/input';
import { Textarea } from '@/src/shared/ui/textarea';
import { Button } from '@/src/shared/ui/button';
import { Notice } from '@/src/shared/ui/notice';
import { getCreateEventErrorMessage } from '../model/getCreateEventErrorMessage';
import { toast } from 'sonner';
import { ErrorNotice } from '@/src/shared/types/error';
import { useState } from 'react';
import { getAdminAccessErrorAction } from '@/src/shared/lib/error-actions/access-error-actions';
import { useRouter } from 'next/navigation';

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

  const qc = useQueryClient();
  const [noticeError, setNoticeError] = useState<ErrorNotice | null>(null);
  const router = useRouter();

  const createEventMutation = useMutation({
    mutationFn: fetchCreateEvent,
    onSuccess: async () => {
      setNoticeError(null);
      await qc.invalidateQueries({
        queryKey: eventQueryKeys.adminList,
      });
      await qc.invalidateQueries({
        queryKey: eventQueryKeys.publicList,
      });
      reset(defaultValues);
      toast.success('Event created.');
    },

    onError: (error) => {
      const errorAction = getAdminAccessErrorAction(error);

      if (errorAction.type === 'redirect') {
        toast.error(errorAction.message);
        router.replace(errorAction.href);
        return;
      }
      setNoticeError(getCreateEventErrorMessage(error));
    },
  });

  const onSubmit = (data: CreateEventFormValues) => {
    if (isSubmitting || createEventMutation.isPending) return;
    setNoticeError(null);

    createEventMutation.mutate(data);
  };

  const onClear = () => {
    reset(defaultValues);
    createEventMutation.reset();
    setNoticeError(null);
  };

  const handleCancel = () => {
    reset(defaultValues);
    createEventMutation.reset();
    setNoticeError(null);
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
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
            disabled={isSubmitting || createEventMutation.isPending}
            className="min-w-25"
          >
            {createEventMutation.isPending ? 'Creating...' : 'Create'}
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
            onClick={handleCancel}
            className="min-w-25"
          >
            Cancel
          </Button>
        </div>
        {noticeError && (
          <Notice
            variant="error"
            title={noticeError.title}
            message={noticeError.message}
          />
        )}
      </div>
    </form>
  );
};
