'use client'

import type { Candidate } from "@/src/entities/user"
import { fetchLogin } from "@/src/entities/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const LoginForm = () => {

	const [name, setName] = useState('');
	const [pass, setPass] = useState('');

	const qc = useQueryClient();
	const router = useRouter();

	const login = useMutation({
		mutationFn: fetchLogin,
		onSuccess: (user) => {
			qc.setQueryData(['me'], user);
			router.replace('/calendar')
		}
	})


	const onLoginHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (login.isPending) return;
		const candidate: Candidate = {
			name: name.trim(),
			pin: pass
		};
		login.mutate(candidate)
	}

	return (
		<form
			className="flex flex-col gap-4"
			 onSubmit={onLoginHandler}
		>
			<label htmlFor="name">Имя</label>
			<input
				type="text"
				id="name"
				placeholder="Имя"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<label htmlFor="pass">Пароль</label>
			<input
				type="password"
				id="pass"
				placeholder="Пароль"
				value={pass}
				onChange={(e) => setPass(e.target.value)}
			/>
			{login.isError && (
        <p className="text-sm text-red-600">
          Неверные данные
        </p>
      )}
			<button
				type='submit'
			disabled={login.isPending}
			>{login.isPending ? "Выполняется..." : "Войти"}</button>
		</form>
	)
}