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

      onSaved();
    },
  });

  const onSubmit = (data: EditEventFormValues) => {
    editEventMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 border-2 p-3 w-full"
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
      <div className="flex justify-end gap-2">
        <button
          className="w-20 h-5 border-2 border-green-600"
          type="submit"
          disabled={isSubmitting || editEventMutation.isPending}
        >
          Edit
        </button>
        <button
          className="w-[80px] h-[20px] border-2 border-amber-600"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
