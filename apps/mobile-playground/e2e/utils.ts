export function logTestStep(message: string) {
  // eslint-disable-next-line no-console
  console.log(`\tTest Step: ${message}`);
}

export async function sleep(milliseconds = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
