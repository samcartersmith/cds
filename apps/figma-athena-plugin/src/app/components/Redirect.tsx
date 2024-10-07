import { useEffect } from 'react';

import { type Routes, useRouter } from '../hooks/useRouter';

export const Redirect = ({ to }: { to: Routes }) => {
  const router = useRouter();
  useEffect(() => router.navigate(to), [router, to]);
  return null;
};
