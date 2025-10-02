import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { TranslateDB } from '@app-i18n';
import { provideTranslate } from '@ngmd/translate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideTranslate(TranslateDB, {
      baseUrl: '/static/assets/i18n',
      defaultLang: 'de',
      fallbackLang: 'en',
      withVersion: false,
      availableLangs: [
        'en',
        'fr',
        'de',
      ],
    }),
  ],
};
