---
keyword: TypesPage
---

Импортируется из `@ngmd/translate`

---

### Описание

Набор типов, используемых в рамках работы библиотеки

Для описания представления типов возьмем следующий пример:

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

Тип, описывающий структуру объекта **TranslateDB**

**Интерфейс**

```ts
type TranslateDBType = Record<string, Record<string, TranslateMap | string>>
```

**Пример**

```ts name="./translate/index.ts"
import { TranslateDBType } from "@ngmd/translate";

export const TranslateDB: TranslateDBType = {  
  en: {/**/}
} as const; 
```

### TranslateMap

Тип, описывающий структуру объекта локали для языка

**Интерфейс**

```ts
type TranslateMap = {
  [key: string]: TranslateMap | string;
};

```

**Пример**

```ts name="./translate/index.ts" {7}
import { TranslateMap } from "@ngmd/translate";

export const TranslateDB = {  
  en: {/**/}
} as const; 

const translateByLocale: TranslateMap = TranslateDB.en;
```

### TranslateKey

Тип, описывающий все ключи объекта переводов

**Интерфейс**

```ts
type TranslateKey = TObjectKeyPaths<(typeof TranslateDB)['en']>;
```

**Использование**

```ts
import { TranslateKey } from 'i18n';

let x: TranslateKey; // 'greeting' | 'personal.greeting'
```

>**NOTE**
> Ключ регистрируется и создается в рамках всего проекта в корне приложения по пути types/i18n/index.d.ts. Подробности в гайде по подключению библиотеки [тут](/getting-started/integration)

### HashMap

Тип, описывающий объект с динамическими параметрами для строки перевода

**Интерфейс**

```ts
type HashMap<T = any> = Record<string, T>;
```

**Пример**

```ts name="./translate/index.ts" {7}
import { HashMap, getTranslate } from "@ngmd/translate";

const key: TranslateKey = 'personal.greeting';
const dynamicParams: HashMap = { name: 'Joan Doe' }
const value: string = getTranslate(key, dynamicParams); // 'Hello Joan Doe!'
```

### TOptionalTranslate

Тип, описывающий возможные значения для опционального перевода. Используется в рамках `OptionalTranslatePipe`, `OptionalTranslateComponent` и вспомогательных функций. В качестве значений может корректно использоваться модель `Translate`, ключ переводов типа `TranslateKey` или любое другое строковое значение.

**Интерфейс**

```ts
export type TOptionalTranslate = Translate | TranslateKey | string;
```
