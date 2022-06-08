import { by, element } from 'detox';

import { logTestStep } from './utils';

export function findElementById(id: string, screen?: string) {
  let selector = by.id(id);

  if (screen) {
    selector = selector.withAncestor(by.id(screen));
  }

  return element(selector);
}

export function findElementByText(text: string, screen?: string) {
  let selector = by.text(text);

  if (screen) {
    selector = selector.withAncestor(by.id(screen));
  }

  return element(selector);
}

export function findElementByType(type: string) {
  return element(by.type(type));
}

export async function findText(text: string, screen?: string, speed?: number) {
  logTestStep(`Finding "${text}" text`);

  if (screen) {
    await waitFor(findElementByText(text, screen))
      .toBeVisible()
      .whileElement(by.id(screen))
      .scroll(speed ?? 500, 'down');
  }
}

export function findScreen(screenName: string) {
  return findElementById(screenName);
}
