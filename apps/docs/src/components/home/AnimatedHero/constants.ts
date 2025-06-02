/** Total number of rows in the grid. */
export const numberOfRows = 4;
/** Total number of columns in the grid. */
export const numberOfColumns = 15;

/**
 * Characters and display values that each grid cell animation will iterate through.
 */
export const characterSet = [
  'A',
  '#F07836',
  'I',
  'G',
  'Y',
  '@',
  '+',
  'M',
  'X',
  '5',
  '9',
  '(',
  '3',
  'Q',
  '#E5CD30',
  'D',
  'E',
  '7',
  '#27AD75',
  'C',
  'B',
  '#',
  'V',
  '-',
  'L',
  'N',
  'U',
  'J',
  'S',
  '6',
  'P',
  '1',
  '!',
  '#CD99FD',
  ' ',
  '$',
  'W',
  '<',
  '/',
  ':',
  '0',
  '4',
  'H',
  '&',
  '#E175D6',
  'F',
  'R',
  'K',
  '2',
  'T',
  '#578BFA',
  ',',
  'O',
  '8',
  '%',
  '~',
  'Z',
];

/**
 * All the messages that the animated hero can display.
 */
export const messages = [
  [
    ['C', 'O', 'I', 'N', 'B', 'A', 'S', 'E', ' ', 'D', 'E', 'S', 'I', 'G', 'N'],
    ['I', 'S', ' ', 'O', 'P', 'E', 'N', ' ', 'S', 'O', 'U', 'R', 'C', 'E', ' '],
    ['F', 'O', 'R', ' ', 'C', 'R', 'E', 'A', 'T', 'I', 'N', 'G', ' ', ' ', ' '],
    ['C', 'R', 'Y', 'P', 'T', 'O', ' ', 'P', 'R', 'O', 'D', 'U', 'C', 'T', 'S'],
  ],
  [
    ['R', 'U', 'N', 'N', 'I', 'N', 'G', ' ', 'O', 'N', ':', ' ', ' ', ' ', ' '],
    ['C', 'D', 'S', ' ', 'V', 'E', 'R', 'S', 'I', 'O', 'N', ' ', '8', ' ', ' '],
    ['R', 'E', 'A', 'C', 'T', ' ', '1', '8', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ],
  [
    ['A', 'V', 'E', 'R', 'A', 'G', 'E', ' ', 'B', 'U', 'N', 'D', 'L', 'E', ' '],
    ['S', 'I', 'Z', 'E', ':', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['~', '1', '5', '0', ',', '0', '0', '0', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ],
  [
    ['N', 'E', 'W', ' ', 'C', 'O', 'M', 'P', 'O', 'N', 'E', 'N', 'T', 'S', '!'],
    ['C', 'A', 'R', 'D', ' ', 'C', 'A', 'R', 'O', 'U', 'S', 'E', 'L', ' ', ' '],
    ['I', 'C', 'O', 'N', ' ', 'B', 'U', 'T', 'T', 'O', 'N', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ],
  [
    ['I', 'N', 'S', 'T', 'A', 'L', 'L', 'S', ' ', 'T', 'H', 'I', 'S', ' ', ' '],
    ['M', 'O', 'N', 'T', 'H', ':', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['1', '5', '3', ',', '0', '0', '0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ],
];

/**
 * Maps each message's characters to its index in the characterSet.
 */
export const messagesCharSetIndices = messages.map((message) => {
  return message.map((line) => {
    return line.map((character) => {
      const index = characterSet.indexOf(character);
      return index === -1 ? 36 : index;
    });
  });
});

export const messageAccessibilityDescriptions = messages.map(
  (message) =>
    `Current message: ${message
      .map((row) => row.join('').trim())
      .filter((row) => !!row)
      .join(' ')}. Press Enter or Space to skip to the next message.`,
);

// Grid animation constants
export const autoTransitionIntervalMs = 10000; // Interval for automatic message rotation
export const gridCellDistanceDelayMs = 80; // Delay per grid unit for ripple effect
export const maxUpdatesPerSecond = 20;
