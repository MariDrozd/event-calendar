'use client';

import { z } from 'zod';
import { eventQueryKeys, EventTask } from '@/src/entities/event';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchPatchEvent } from '@/src/entities/event/api/client';
import { Input } from '@/src/shared/ui/input';
import { FormField } from '@/src/shared/ui/form-field';
import { Textarea } from '@/src/shared/ui/textarea';
import { Button } from '@/src/shared/ui/button';
import { toast } from 'sonner';
import { getEditErrorMessage } from '../model/getEditErrorMessage';
import { Notice } from '@/src/shared/ui/notice';
import { useRouter } from 'next/navigation';
import { getAdminAccessErrorAction } from '@/src/shared/lib/error-actions/access-error-actions';
import { useState } from 'react';
import { ErrorNotice } from '@/src/shared/types/error';

const editEventSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  answer: z.string().trim().min(1, 'Answer is required'),
  gift: z.string().trim().min(1, 'Gift is required'),
});

type EditEventFormValues = z.infer<typeof editEventSchema>;

type EditEventFormProps = {
  event: EventTask;
  onSaved: () => void;
  onCancel: () => void;
};

export const EditEventForm = ({
  event,
  onSaved,
  onCancel,
}: EditEventFormProps) => {
  const qc = useQueryClient();
  const router = useRouter();

  const [noticeError, setNoticeError] = useState<ErrorNotice | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditEventFormValues>({
    resolver: zodResolver(editEventSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      answer: event.answer,
      gift: event.gift,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const editEventMutation = useMutation({
    mutationFn: (data: EditEventFormValues) => {
      return fetchPatchEvent(event.start, data);
    },

    onSuccess: () => {
      setNoticeError(null);
      qc.invalidateQueries({
        queryKey: eventQueryKeys.adminList,
      });
      qc.invalidateQueries({
        queryKey: eventQueryKeys.publicList,
      });
      qc.invalidateQueries({
        queryKey: eventQueryKeys.adminDetails(event.start),
      });
      qc.invalidateQueries({
        queryKey: eventQueryKeys.publicDetails(event.start),
      });

      toast.success('Event updated.');
      onSaved();
    },

    onError: (error) => {
      const errorAction = getAdminAccessErrorAction(error);

      if (errorAction.type === 'redirect') {
        toast.error(errorAction.message);
        router.replace(errorAction.href);
        return;
      }
      setNoticeError(getEditErrorMessage(error));
    },
  });

  const onSubmit = (data: EditEventFormValues) => {
    if (isSubmitting || editEventMutation.isPending) {
      return;
    }
    setNoticeError(null);

    editEventMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        mt-3
        w-full
        rounded-xl
        border border-slate-200
        bg-slate-50/80
        p-5
        shadow-sm
        flex flex-col gap-4
      "
    >
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
            disabled={isSubmitting || editEventMutation.isPending}
            className="min-w-25"
          >
            {editEventMutation.isPending ? 'Saving...' : 'Save'}
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
