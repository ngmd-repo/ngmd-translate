---
keyword: ProvideTranslatePage
---

Импортируется из `@ngmd/translate`

---

### Описание

Функция-провайдер для регистрации библиотеки переводов

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

```ts name="app.config.ts" group="use-provider"
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { TranslateDB } from '@app-i18n'; // typescript alias for ./translate/index.ts
import { provideTranslate } from '@ngmd/translate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), //* Внедрить HttpClient
    provideTranslate(TranslateDB, { //* Внедрить библиотеку
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
