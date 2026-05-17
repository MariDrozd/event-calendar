'use client';

import { useMeQuery } from '@/src/entities/user';
import Link from 'next/link';

export const Header = () => {
	const { data, isError, isLoading } = useMeQuery();

  return (
		<header className="flex w-full h-14 fixed border-2 border-b-blue-500 gap-4 mb-10">
			{isLoading && <span>Loading...</span>}
			{isError && <span>Login failed</span>}
			{data ? (
				<>
				<span>{data.name} - {data.role}</span>
					{data?.role === 'parent' && <Link href="/admin">Admin</Link>}
					</>
			) : <Link href="/login">Login</Link>}
    </header>
  );
};
