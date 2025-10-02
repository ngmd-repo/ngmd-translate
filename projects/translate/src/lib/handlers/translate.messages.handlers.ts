import { TranslateLibDB } from '../db/translate-lib.db';
import { HashMap } from '../types';

export function replaceTags(str: string, tagsObj: Record<string, any>): string {
  if (!str || !tagsObj) return str;

  return Object.entries(tagsObj).reduce((accum: string, [key, value]) => {
    const regex: RegExp = new RegExp(`{{${key}}}`, 'gi');

    return accum.replace(regex, value as string);
  }, str);
}

export function logMessage(
  key: keyof (typeof TranslateLibDB)['messages'],
  params?: HashMap,
  type: 'error' | 'log' | 'warn' = 'warn',
): void {
  const message: string = TranslateLibDB.messages[key];

  console[type](replaceTags(message, params));
}
