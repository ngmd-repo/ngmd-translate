---
keyword: TypesPage
---

Imported from `@ngmd/translate`

---

### Description

A set of types used within the library's operation

For describing type representations, let's take the following example:

```ts name="./translate/index.ts"
export const TranslateDB = {
    en: {
      greeting: "Hello world!",
      personal: {
        'greeting': 'Hello {{name}}!'
      }
      // ... some keys for your translate map
    },
} as const; 
```

### TranslateDBType

Type describing the structure of the **TranslateDB** object

**Interface**

```ts
type TranslateDBType = Record<string, Record<string, TranslateMap | string>>
```

**Example**

```ts name="./translate/index.ts"
import { TranslateDBType } from "@ngmd/translate";

export const TranslateDB: TranslateDBType = {  
  en: {/**/}
} as const; 
```

### TranslateMap

Type describing the structure of the locale object for a language

**Interface**

```ts
type TranslateMap = {
  [key: string]: TranslateMap | string;
};

```

**Example**

```ts name="./translate/index.ts" {7}
import { TranslateMap } from "@ngmd/translate";

export const TranslateDB = {  
  en: {/**/}
} as const; 

const translateByLocale: TranslateMap = TranslateDB.en;
```

### TranslateKey

Type describing all keys of the translation object

**Interface**

```ts
type TranslateKey = TObjectKeyPaths<(typeof TranslateDB)['en']>;
```

**Usage**

```ts
import { TranslateKey } from 'i18n';

let x: TranslateKey; // 'greeting' | 'personal.greeting'
```

>**NOTE**
> The key is registered and created throughout the project at the application root at types/i18n/index.d.ts. Details in the library integration guide [here](/getting-started/integration)

### HashMap

Type describing an object with dynamic parameters for a translation string

**Interface**

```ts
type HashMap<T = any> = Record<string, T>;
```

**Example**

```ts name="./translate/index.ts" {7}
import { HashMap, getTranslate } from "@ngmd/translate";

const key: TranslateKey = 'personal.greeting';
const dynamicParams: HashMap = { name: 'Joan Doe' }
const value: string = getTranslate(key, dynamicParams); // 'Hello Joan Doe!'
```

### TOptionalTranslate

Type describing possible values for optional translation. Used within `OptionalTranslatePipe`, `OptionalTranslateComponent` and helper functions. As values, the `Translate` model, translation keys of type `TranslateKey`, or any other string value can be correctly used.

**Interface**

```ts
export type TOptionalTranslate = Translate | TranslateKey | string;
```
