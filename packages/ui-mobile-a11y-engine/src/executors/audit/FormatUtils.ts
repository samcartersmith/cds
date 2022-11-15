import ansiEscapesSerializer from 'jest-serializer-ansi-escapes';
import { format as prettyFormat } from 'pretty-format';

export const ansiToHumanText = (ansiSequence: string) => {
  return prettyFormat(ansiSequence, {
    plugins: [ansiEscapesSerializer],
  });
};
