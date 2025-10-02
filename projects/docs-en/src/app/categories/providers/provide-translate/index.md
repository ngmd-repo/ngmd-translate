---
keyword: ProvideTranslatePage
---

Imported from `@ngmd/translate`

---

### Description

Provider function for registering the translation library

### Interface

```ts
function provideTranslate<T extends TranslateDBType>(
  db: T,
  config: TranslateConfig,
): EnvironmentProviders;
```

### Parameters

| Name | Type | Required | Description |
|------|------|---------|-------------|
| **db** | `TranslateDBType` | `true` | Translation object with default language |
| **config** | `TranslateConfig` | `true` | Configuration object for library operation |

### Usage

```ts name="app.config.ts" group="use-provider"
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { TranslateDB } from '@app-i18n'; // typescript alias for ./translate/index.ts
import { provideTranslate } from '@ngmd/translate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), //* Inject HttpClient
    provideTranslate(TranslateDB, { //* Inject library
      baseUrl: '/static/assets/i18n',
      defaultLang: 'en',
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
```

```ts name="./translate/index.ts" group="use-provider"
export const TranslateDB = {
  en: {
    some: "value",
    nested: {
      translate: {
        key: 'value'
      },
    },
  },
} as const; 
```

> **WARNING**
> Note that for proper library operation, the `provideHttpClient` function injection is required


### Types

#### TranslateConfig

Configuration object for library operation

**Interface**

```ts
type TranslateConfig = {
  availableLangs: string[];
  fallbackLang: string;
  baseUrl: string;
  withVersion?: boolean;
}  & TranslocoOptionsConfig;
```

| Name | Type | Required | Description |
|------|------|---------|-------------|
| **availableLangs** | `string[]` | `true` | Set of language locales |
| **fallbackLang** | `string` | `true` | Locale to be used if an error occurs when requesting translation objects for any language |
| **baseUrl** | `string` | `true` | URL address where translation files will be located |
| **withVersion** | `string` | `false` | Use ***version.json*** object (should be created within CI/CD and located in the same directory as translation files) for caching translation object requests. This may be relevant for large applications. |


#### TranslocoOptionsConfig

Description of object fields can be found [here](https://jsverse.gitbook.io/transloco/getting-started/config-options#fallbacklang)
