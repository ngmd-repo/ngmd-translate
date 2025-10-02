---
keyword: TRANSLATECONFIGPage
---

Imported from `@ngmd/translate`

---

### Description

Access token to the configuration object of type `TranslateConfig`, registered in the `provideTranslate` provider

### Usage


 - Registration

  ```ts name="app.config.ts"
    import { provideTranslate, TranslateConfig } from '@ngmd/translate';
    import { TranslateDB } from '@app-i18n';

    const translateConfig: TranslateConfig = {
      baseUrl: '/static/assets/i18n',
      defaultLang: 'en',
      fallbackLang: 'en',
      availableLangs: [
        'en',
        'fr',
        'de',
      ],
    }

    export const appConfig: ApplicationConfig = {
      providers: [
        // ....
        provideTranslate(TranslateDB, translateConfig),
      ],
    };
  ```

  - Access

  ```ts {2,6}
  import { Component, inject } from '@angular/core';
  import { TRANSLATE_CONFIG, TranslateConfig } from '@ngmd/translate';

  @Component({/**/})
  export class ExampleComponent {
    private translateCfg: TranslateConfig = inject(TRANSLATE_CONFIG);
  }
  ```