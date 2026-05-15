export const fetchJson = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const res = await fetch(input, init);

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error ?? `Request failed (${res.status})`);
  }

  return data as T;
};
