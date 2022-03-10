/* eslint-disable */
import { useState } from 'react';

import { Button } from '../Button';

export const ToggleLoading = ({ compact = false }: { compact?: boolean }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div onClick={() => setLoading(!loading)}>
      <Button loading={loading} compact={compact}>
        Button
      </Button>
    </div>
  );
};
