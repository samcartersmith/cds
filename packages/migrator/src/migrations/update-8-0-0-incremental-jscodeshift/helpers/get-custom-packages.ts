import type { Options } from 'jscodeshift';

export function getCustomPackages(options: Options): string[] {
  const raw = (options as any)['custom-packages'] ?? (options as any).customPackages;
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw.filter((pkg): pkg is string => typeof pkg === 'string' && pkg.trim().length > 0);
  }

  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (!trimmed) return [];

    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        return (JSON.parse(trimmed) as unknown[]).filter(
          (pkg): pkg is string => typeof pkg === 'string' && pkg.trim().length > 0,
        );
      } catch {
        return trimmed
          .slice(1, -1)
          .split(',')
          .map((part) => part.trim().replace(/^['"]|['"]$/g, ''))
          .filter((pkg) => pkg.length > 0);
      }
    }

    const single = trimmed.replace(/^['"]|['"]$/g, '');
    return single ? [single] : [];
  }

  return [];
}
