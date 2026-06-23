'use client';

import { z } from 'zod';
import { fetchLogin, userQueryKeys } from '@/src/entities/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FormField } from '@/src/shared/ui/form-field';
import { Input } from '@/src/shared/ui/input';
import { Button } from '@/src/shared/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Notice } from '@/src/shared/ui/notice';
import { getLoginErrorMessage } from '../model/getLoginErrorMessage';
import { getLoginRedirectPath } from '../model/getLoginRedirectPath';

const loginSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  pin: z.string().trim().min(4, 'Password must be at least 4 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const defaultValues: LoginFormValues = {
  name: '',
  pin: '',
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const qc = useQueryClient();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: fetchLogin,
    onSuccess: (user) => {
      qc.setQueryData(userQueryKeys.me, user);
      const redirectTo = getLoginRedirectPath(user);
      router.replace(redirectTo);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    if (isSubmitting) return;
    loginMutation.mutate(data);
  };

  const submitError = loginMutation.isError
    ? getLoginErrorMessage(loginMutation.error)
    : null;

  return (
    <form
      className="mx-auto mt-10 flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
        <p className="mt-1 text-sm text-slate-500">
          Enter your name and PIN to continue.
        </p>
      </div>
      <FormField error={errors.name?.message} label="Name">
        <Input {...register('name')} type="text" placeholder="Name"></Input>
      </FormField>
      <FormField error={errors.pin?.message} label="Password">
        <Input
          {...register('pin')}
          type="password"
          placeholder="Password"
        ></Input>
      </FormField>
      <Button type="submit" disabled={loginMutation.isPending || isSubmitting}>
        {loginMutation.isPending ? 'Login...' : 'Login'}
      </Button>
      {submitError && (
        <Notice
          variant="error"
          title={submitError.title}
          message={submitError.message}
        />
      )}
    </form>
  );
};
