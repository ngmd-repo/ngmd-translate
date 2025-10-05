---
keyword: HelpersPage
---

Импортируется из `@ngmd/translate`

---

### Описание

Набор вспомогательных функций для работы с библиотекой

### Список функций

Для демонстрации работы вспомогательных функций, описанных ниже, возьмем в качестве примера следующий объект с локализации:

```ts name="./translate/index.ts"
export const TranslateDB = {
  en: {
    greeting: 'Hello world!',
    auth: {
      'registration-btn': 'Registration',
    },
    // ... some keys for your translate map
  },
} as const;

```

#### getTranslate

Возвращает перевод по ключу. Работает идентично функции `translate-handler` из библиотеки `transloco`, но с типизированным параметром ключа.

**Интерфейс**

```ts
function getTranslate(key: TranslateKey, params: HashMap = null, lang?: string): string;
```

**Использование**

```ts
  getTranslate('greeting'); // 'Hello world!'
  getTranslate('auth.registration-btn'); // 'Registration'
```

#### isTranslateKey

Определяет, является ли передаваемое значение типом `TranslateKey` из объекта переводов

**Интерфейс**

```ts
function isTranslateKey(key: string, languageMap: TranslateMap): key is TranslateKey;
```

**Использование**

```ts
  isTranslateKey('auth.registration-btn', TranslateDB.en); // true
  isTranslateKey('greeting', TranslateDB.en); // true
  isTranslateKey('invalid.key', TranslateDB.en); // false
```

#### isTranslateModel

Определяет, является ли передаваемое значение типом `Translate`

**Интерфейс**

```ts
function isTranslateModel(object: any): object is Translate;
```

**Использование**

```ts
  const model: Translate = new Translate('auth.registration-btn');
  const object: Translate = { key: 'greeting', params: null };
  const invalid: Record<string, string> = { invalid: 'object' };

  isTranslateModel(model); // true
  isTranslateModel(object); // true
  isTranslateModel(invalid); // false
```

#### isTranslatePath

Определяет, является ли передаваемое значение частью ключа `TranslateKey` объекта переводов

**Интерфейс**

```ts
function isTranslatePath(path: string, languageMap: TranslateMap): boolean;
```

**Использование**

```ts
  isTranslatePath('auth', TranslateDB.en); // true
  isTranslatePath('greeting', TranslateDB.en); // true
  isTranslatePath('auth.registration-btn', TranslateDB.en); //  true
  isTranslatePath('invalid', TranslateDB.en); // false
  isTranslatePath('invalid.path', TranslateDB.en); // false
```

#### isOptionalTranslate

Определяет, является ли передаваемое значение типом `TOptionalTranslate`

**Интерфейс**

```ts
function isOptionalTranslate(value: unknown): value is TOptionalTranslate;
```

**Использование**

```ts
  const optionalString: string = 'Hello STRING world!';
  const optionalKey: TranslateKey = 'greeting';
  const optionalModel: Translate = new Translate('auth.registration-btn');

  isOptionalTranslate(this.optionalString); // true
  isOptionalTranslate(this.optionalKey); // true
  isOptionalTranslate(this.optionalModel); // true
  isOptionalTranslate(1); // false
  isOptionalTranslate(null); // false
```

#### getPlatformLanguage

Определяет язык в зависимости от среды выполнения (браузер или сервер). В браузерной среде возвращает язык из `navigator.language`, в серверной среде возвращает переданное значение.

**Интерфейс**

```ts
function getPlatformLanguage(value: string): string;
```

**Использование**

```ts
  // В серверной среде (SSR)
  getPlatformLanguage(process.env.ACCEPT_LANGUAGE); // возвращает переданное значение
```