import { TranslateKey } from 'i18n';

import { HashMap } from '../types';

export class Translate {
  constructor(
    public key: TranslateKey,
    public params?: HashMap,
  ) {}
}
