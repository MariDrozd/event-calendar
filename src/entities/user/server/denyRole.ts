import { NextResponse } from 'next/server';
import { UserRole } from '../model/types';
import { requireRole } from './guards';

const denyIfNotRole = async (role: UserRole): Promise<Response | null> => {
  try {
    await requireRole(role);
    return null;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error';

    if (msg === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (msg === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ error: 'Error' }, { status: 400 });
  }
};


export const denyIfNotParent = () => denyIfNotRole("parent");

export const denyIfNotChild = () => denyIfNotRole("child");