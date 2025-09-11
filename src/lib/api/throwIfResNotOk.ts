export const throwIfResNotOk = async (res: Response) => {
  if (!res.ok) {
    const error = (await res.json()) as Error;
    const text = error.message || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
};
