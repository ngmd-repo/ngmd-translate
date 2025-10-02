import { TranslateDBType } from '@ngmd/translate';

export const TranslateDB: TranslateDBType = {
  en: {
    greeting: 'Hello world!',
    auth: {
      'registration-btn': 'Registration',
    },
    // ... some keys for your translate map
  },
} as const;
