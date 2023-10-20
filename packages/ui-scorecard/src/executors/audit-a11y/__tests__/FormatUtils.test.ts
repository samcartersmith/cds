import { format as prettyFormat } from 'pretty-format';

import { ansiToHumanText } from '../FormatUtils';

jest.mock('pretty-format');

describe('ansiToHumanText', () => {
  it('should format ansi sequence to human readable text', () => {
    (prettyFormat as jest.MockedFunction<typeof prettyFormat>).mockReturnValue('formattedAnsiText');

    const dummyAnsiSequence = '\x1B[31mHello World\x1B[0m';
    const result = ansiToHumanText(dummyAnsiSequence);

    expect(prettyFormat).toHaveBeenCalledWith(dummyAnsiSequence, {
      plugins: [expect.anything()],
    });

    expect(result).toBe('formattedAnsiText');
  });
});
