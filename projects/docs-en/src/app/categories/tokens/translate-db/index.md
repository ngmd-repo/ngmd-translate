---
keyword: TRANSLATEDBPage
---

Imported from `@ngmd/translate`

---

### Description

Access token to the `TranslateDB` object registered in the `provideTranslate` provider

### Usage


 - Registration

  ```ts name="app.config.ts" {2, 7}
    import { provideTranslate } from '@ngmd/translate';
    import { TranslateDB } from '@app-i18n';

    export const appConfig: ApplicationConfig = {
      providers: [
        // ....
        provideTranslate(TranslateDB, {
          baseUrl: '/static/assets/i18n',
          defaultLang: 'en',
          fallbackLang: 'en',
          availableLangs: [
            'en',
            'fr',
            'de',
          ],
        }),
      ],
    };
  ```

  - Access

  ```ts {2,6}
  import { Component, inject } from '@angular/core';
  import { TRANSLATE_DB, TranslateDBType } from '@ngmd/translate';

  @Component({/**/})
  export class ExampleComponent {
    private translateDB: TranslateDBType = inject(TRANSLATE_DB);
  }
  ```
