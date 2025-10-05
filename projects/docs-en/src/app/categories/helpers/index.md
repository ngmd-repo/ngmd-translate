---
keyword: HelpersPage
---

Imported from `@ngmd/translate`

---

### Description

A set of helper functions for working with the library

### Function List

To demonstrate the helper functions described below, we'll use the following localization object as an example:

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

Returns translation by key. Works identically to the `translate-handler` function from the `transloco` library, but with a typed key parameter.

**Interface**

```ts
function getTranslate(key: TranslateKey, params: HashMap = null, lang?: string): string;
```

**Usage**

```ts
  getTranslate('greeting'); // 'Hello world!'
  getTranslate('auth.registration-btn'); // 'Registration'
```

#### isTranslateKey

Determines whether the passed value is of type `TranslateKey` from the translation object

**Interface**

```ts
function isTranslateKey(key: string, languageMap: TranslateMap): key is TranslateKey;
```

**Usage**

```ts
  isTranslateKey('auth.registration-btn', TranslateDB.en); // true
  isTranslateKey('greeting', TranslateDB.en); // true
  isTranslateKey('invalid.key', TranslateDB.en); // false
```

#### isTranslateModel

Determines whether the passed value is of type `Translate`

**Interface**

```ts
function isTranslateModel(object: any): object is Translate;
```

**Usage**

```ts
  const model: Translate = new Translate('auth.registration-btn');
  const object: Translate = { key: 'greeting', params: null };
  const invalid: Record<string, string> = { invalid: 'object' };

  isTranslateModel(model); // true
  isTranslateModel(object); // true
  isTranslateModel(invalid); // false
```

#### isTranslatePath

Determines whether the passed value is part of a `TranslateKey` key from the translation object

**Interface**

```ts
function isTranslatePath(path: string, languageMap: TranslateMap): boolean;
```

**Usage**

```ts
  isTranslatePath('auth', TranslateDB.en); // true
  isTranslatePath('greeting', TranslateDB.en); // true
  isTranslatePath('auth.registration-btn', TranslateDB.en); //  true
  isTranslatePath('invalid', TranslateDB.en); // false
  isTranslatePath('invalid.path', TranslateDB.en); // false
```

#### isOptionalTranslate

Determines whether the passed value is of type `TOptionalTranslate`

**Interface**

```ts
function isOptionalTranslate(value: unknown): value is TOptionalTranslate;
```

**Usage**

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

Determines language depending on the runtime environment (browser or server). In browser environment returns language from `navigator.language`, in server environment returns the passed value.

**Interface**

```ts
function getPlatformLanguage(value: string): string;
```

**Usage**

```ts
  // In server environment (SSR)
  getPlatformLanguage(process.env.ACCEPT_LANGUAGE); // returns passed value
```