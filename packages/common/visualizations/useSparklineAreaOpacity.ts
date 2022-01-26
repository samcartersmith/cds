import { useSpectrumConditional } from '../hooks/useSpectrumConditional';

export function useSparklineAreaOpacity() {
  return useSpectrumConditional({
    light: 0.2,
    dark: 0.4,
  });
}
