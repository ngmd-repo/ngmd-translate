---
keyword: ProvideTranslatePage
---

Imported from `@ngmd/translate`

---

### Description

Provider function for registering the translation library. Under the hood uses [transloco](https://jsverse.gitbook.io/transloco/) library for translation handling.

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

#### Browser Environment

```ts name="app.config.ts" group="use-provider"
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { getBrowserLang } from '@jsverse/transloco';
import { TranslateDB } from '@app-i18n'; // typescript alias for ./translate/index.ts
import { provideTranslate } from '@ngmd/translate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), //* Inject HttpClient
    provideTranslate(TranslateDB, { //* Inject library
      baseUrl: '/static/assets/i18n',
      defaultLang: getBrowserLang(),
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

#### SSR (Server-Side Rendering)

For SSR applications, use the `getPlatformLanguage` function:

```ts name="app.config.ts" group="use-provider-ssr"
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { TranslateDB } from '@app-i18n'; // typescript alias for ./translate/index.ts
import { provideTranslate, getPlatformLanguage } from '@ngmd/translate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), //* Inject HttpClient
    provideTranslate(TranslateDB, {
      baseUrl: '/static/assets/i18n',
      defaultLang: getPlatformLanguage((globalThis as any).process?.env?.ACCEPT_LANGUAGE),
      fallbackLang: 'en',
      withVersion: true,
      availableLangs: [
        'en',
        'ru',
        'de',
      ],
    })
  ],
};
```

**Explanation of `(globalThis as any).process?.env?.ACCEPT_LANGUAGE`:**

In SSR environment, the server determines the user's language from the HTTP `Accept-Language` header and passes it through the `process.env.ACCEPT_LANGUAGE` environment variable. The `getPlatformLanguage` function automatically detects whether the application is running in browser or server environment:
- In browser environment returns language from `navigator.language`
- In server environment returns the passed value from environment variable

#### Server.ts Configuration for SSR

For proper SSR operation, you need to configure the server to detect language from HTTP headers:

```ts name="server.ts" group="server-ssr"
const DEFAULT_LANGUAGE = 'en';
const AVAILABLE_LANGUAGE = ['en', 'ru', 'de'];

function detectLanguageFromHeaders(req: any): string {
  const acceptLanguage = req.headers['accept-language'];
  if (!acceptLanguage) return DEFAULT_LANGUAGE;

  const lang: string = acceptLanguage.split(',')[0].split(';')[0].trim().split('-')[0];

  return AVAILABLE_LANGUAGE.includes(lang) ? lang : DEFAULT_LANGUAGE;
}

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  const serverLang = detectLanguageFromHeaders(req);
  const acceptLanguage = req.headers['accept-language'] || DEFAULT_LANGUAGE;

  console.log('[SERVER] Detected language:', serverLang);
  console.log('[SERVER] Accept-Language header:', acceptLanguage);
  res.setHeader('X-Detected-Language', serverLang);

  //Here we pass the variable to use it in the application
  process.env['ACCEPT_LANGUAGE'] = serverLang;
  console.log('🔍 [SERVER] Set process.env.ACCEPT_LANGUAGE to:', serverLang);

  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});
```

**How it works:**

1. Server receives HTTP `Accept-Language` header from browser
2. `detectLanguageFromHeaders` function extracts preferred language
3. Language is set to `process.env.ACCEPT_LANGUAGE` environment variable
4. Angular application uses this variable through `getPlatformLanguage`

#### SSR Configuration for SEO with Language Tags

For proper SEO optimization and language targeting, you also need to configure the HTML `<html lang="">` tag on the server:

```ts name="main.server.ts" group="server-config"
import { ApplicationConfig, inject, mergeApplicationConfig, provideAppInitializer } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { DOCUMENT } from '@angular/common';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideAppInitializer(() => {
      const doc: Document = inject(DOCUMENT);
      doc.documentElement.lang = (globalThis as any).process?.env?.ACCEPT_LANGUAGE;
    })
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

**Why this is needed:**

- **SEO optimization**: Search engines use the `lang` attribute to determine content language
- **Targeting**: Allows search engines to properly index pages for different language regions
- **Accessibility**: Screen readers use `lang` for proper pronunciation
- **Auto-translation**: Browsers can offer translation based on page language
- **Analytics**: Google Analytics and other services correctly determine content language

Without this configuration, the HTML tag will contain the default language, which will negatively impact SEO and user experience.

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
