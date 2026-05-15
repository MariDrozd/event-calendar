'use client';

import { useMeQuery } from '@/src/entities/user';
import Link from 'next/link';

export const Header = () => {
	const { data, isError, isLoading } = useMeQuery();

  return (
		<header className="flex w-full h-[50px] fixed border-2 border-b-blue-500 gap-4">
			{isLoading && <span>Загрузка…</span>}
			{isError && <span>Вход не выполнен</span>}
			{data ? (
				<>
				<span>{data.name} - {data.role}</span>
					{data?.role === 'parent' && <Link href="/admin">Админ</Link>}
					</>
			) : <Link href="/login">Войти</Link>}
    </header>
  );
};
