'use client';

import { useMeQuery } from '@/src/entities/user';
import Link from 'next/link';
import { LinkButton } from '@/src/shared/ui/link-button';
import { LogoutButton } from '@/src/features/auth';

export const Header = () => {
  const { data, isError, isLoading } = useMeQuery();

  return (
    <header
      className="
			fixed left-0 top-0 z-40
			h-16 w-full
			border-b border-slate-200
			bg-white/90 shadow-sm backdrop-blur
			"
    >
      <div className="flex h-full items-center justify-between px-6">
        <Link href="/calendar" className="font-semibold text-slate-900">
          Event Calendar
        </Link>

        <div className="flex items-center gap-3 text-sm">
          {isLoading && <span className="text-slate-500">Loading...</span>}

          {isError && <span className="text-rose-500">Login failed</span>}
          {data ? (
            <>
              <span className="text-slate-600">
                {data.name} · {data.role}
              </span>
              {data?.role === 'parent' && (
                <LinkButton href="/admin/events" size="sm" variant="secondary">
                  Admin
                </LinkButton>
              )}
              <LogoutButton />
            </>
          ) : (
            <LinkButton href="/login" size="md">
              Login
            </LinkButton>
          )}
        </div>
      </div>
    </header>
  );
};
