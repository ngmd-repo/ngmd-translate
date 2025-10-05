---
keyword: ProvideTranslatePage
---

Импортируется из `@ngmd/translate`

---

### Описание

Функция-провайдер для регистрации библиотеки переводов. Под капотом использует библиотеку [transloco](https://jsverse.gitbook.io/transloco/) для работы с переводами.

### Интерфейс

```ts
function provideTranslate<T extends TranslateDBType>(
  db: T,
  config: TranslateConfig,
): EnvironmentProviders;
```

### Параметры

| Name | Type | Required | Description |
|------|------|---------|-------------|
| **db** | `TranslateDBType` | `true` | Объект переводов с дефолтным языком |
| **config** | `TranslateConfig` | `true` | Объект конфигурации для работы библиотеки |

### Использование

#### Браузерная среда

```ts name="app.config.ts" group="use-provider"
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { getBrowserLang } from '@jsverse/transloco';
import { TranslateDB } from '@app-i18n'; // typescript alias for ./translate/index.ts
import { provideTranslate } from '@ngmd/translate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), //* Внедрить HttpClient
    provideTranslate(TranslateDB, { //* Внедрить библиотеку
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

Для приложений с SSR используйте функцию `getPlatformLanguage`:

```ts name="app.config.ts" group="use-provider-ssr"
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { TranslateDB } from '@app-i18n'; // typescript alias for ./translate/index.ts
import { provideTranslate, getPlatformLanguage } from '@ngmd/translate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), //* Внедрить HttpClient
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

**Объяснение `(globalThis as any).process?.env?.ACCEPT_LANGUAGE`:**

В SSR среде сервер определяет язык пользователя из HTTP заголовка `Accept-Language` и передает его через переменную окружения `process.env.ACCEPT_LANGUAGE`. Функция `getPlatformLanguage` автоматически определяет, работает ли приложение в браузерной или серверной среде:
- В браузерной среде возвращает язык из `navigator.language`
- В серверной среде возвращает переданное значение из переменной окружения

#### Настройка server.ts для SSR

Для корректной работы SSR необходимо настроить сервер для определения языка из HTTP заголовков:

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

  //Тут мы передаем в переменку чтобы использовать ее в приложении
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

**Как это работает:**

1. Сервер получает HTTP заголовок `Accept-Language` от браузера
2. Функция `detectLanguageFromHeaders` извлекает предпочитаемый язык
3. Язык устанавливается в переменную окружения `process.env.ACCEPT_LANGUAGE`
4. Angular приложение использует эту переменную через `getPlatformLanguage`

#### Настройка SSR для SEO с языковыми тегами

Для корректной SEO-оптимизации и таргетирования языков необходимо также настроить HTML-тег `<html lang="">` на сервере:

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

**Зачем это нужно:**

- **SEO-оптимизация**: Поисковые системы используют атрибут `lang` для определения языка контента
- **Таргетирование**: Позволяет поисковикам правильно индексировать страницы для разных языковых регионов
- **Доступность**: Скрин-ридеры используют `lang` для правильного произношения
- **Автоматический перевод**: Браузеры могут предложить перевод на основе языка страницы
- **Аналитика**: Google Analytics и другие сервисы корректно определяют язык контента

Без этого настройки HTML-тег будет содержать язык по умолчанию, что негативно скажется на SEO и пользовательском опыте.

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
> Обратите внимание, что для корректной работы библиотеки требуется внедрение функции `provideHttpClient`


### Types

#### TranslateConfig

Объект конфигурации для работы библиотеки

**Интерфейс**

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
| **availableLangs** | `string[]` | `true` | Набор локалей языков |
| **fallbackLang** | `string` | `true` | Локаль, которая будет использована, если при запросе за объектов переводов какого-либо языка произойдет ошибка  |
| **baseUrl** | `string` | `true` | *url* адрес, где будут размещены файлы с переводами |
| **withVersion** | `string` | `false` | Использовать объект ***version.json*** (должен быть создан в рамках CI/CD и находиться в одной директории с файлами переводов) для кэширования запросов за объектами переводом. Это может быть актуально для крупных приложений. |


#### TranslocoOptionsConfig

Описание полей объекта находится [здесь](https://jsverse.gitbook.io/transloco/getting-started/config-options#fallbacklang)
