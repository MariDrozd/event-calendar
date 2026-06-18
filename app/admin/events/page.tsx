import { AdminEventsPage } from '@/src/app-pages/admin-events';
import { AUTH_ERROR, AuthError } from '@/src/entities/user/server';
import { requireRole } from '@/src/entities/user/server';
import { redirect } from 'next/navigation';

const Page = async () => {
  let redirectTo: string | null = null;

  try {
    await requireRole('parent');
  } catch (err) {
    if (err instanceof AuthError) {
      redirectTo =
        err.status === AUTH_ERROR.UNAUTHORIZED.status
          ? '/login?from=/admin/events'
          : '/calendar?reason=forbidden&source=admin';
    } else {
      throw err;
    }
  }

  if (redirectTo) {
    redirect(redirectTo);
  }

  return <AdminEventsPage />;
};

export default Page;
