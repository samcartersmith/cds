/* eslint-disable @cbhq/consistent-test-id */
import { by, element, waitFor } from 'detox';

import { findElementById, findElementByText } from './selectors';
import { logTestStep } from './utils';

export async function pressButton(text: string, screen?: string) {
  logTestStep(`Pressing "${text}" button ${screen ? ` on ${screen}` : ''}`);

  if (screen) {
    await waitFor(element(by.text(text)))
      .toBeVisible()
      .whileElement(by.id(screen))
      .scroll(500, 'down');
  }

  const button = findElementByText(text, screen);
  await button.tap();
}

export async function pressButtonWithoutScroll(text: string, screen?: string) {
  logTestStep(`Pressing "${text}" button (without scroll)`);

  if (screen) {
    logTestStep(`Pressing screen "${screen}"`);

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await waitFor(element(by.text(text))).toBeVisible();
  }

  const button = findElementByText(text, screen);
  await button.tap();
}

export async function pressButtonByTestId(testId: string, screen?: string) {
  logTestStep(`Pressing testId:"${testId}" button`);

  if (screen) {
    await waitFor(element(by.id(testId)))
      .toBeVisible()
      .whileElement(by.id(screen))
      .scroll(500, 'down');
  }

  const button = findElementById(testId, screen);
  await button.tap();
}

export async function pressButtonByTestIdWithoutScroll(testId: string, screen?: string) {
  logTestStep(`Pressing testId:"${testId}" button (without scroll)`);

  if (screen) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await waitFor(element(by.id(testId))).toBeVisible();
  }

  const button = findElementById(testId, screen);
  await button.tap();
}
