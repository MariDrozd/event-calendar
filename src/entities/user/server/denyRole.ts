import { NextResponse } from 'next/server';
import { UserRole } from '../model/types';
import { requireRole } from './guards';
import { AuthError } from '../model/auth-error';

const denyIfNotRole = async (role: UserRole): Promise<Response | null> => {
  try {
    await requireRole(role);
    return null;
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};

export const denyIfNotParent = (): Promise<Response | null> =>
  denyIfNotRole('parent');

export const denyIfNotChild = (): Promise<Response | null> =>
  denyIfNotRole('child');
