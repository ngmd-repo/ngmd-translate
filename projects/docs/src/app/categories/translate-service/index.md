---
keyword: TranslateServicePage
---

Импортируется из `@ngmd/translate`

---

### Описание

Сервис для работы с типизированным объектом переводов вашего приложения

### Интерфейс

```ts
class TranslateService {
  public lang: Signal<string>;
  public getTranslate(key: TranslateKey, params?: HashMap, lang?: string): string;
  public getTranslate$(key: TranslateKey, params?: HashMap, lang?: string): Observable<string>;
  public getOptionalTranslate(value: TOptionalTranslate, lang?: string): string;
  public setLanguage(candidateLang: string): void;
  public isTranslatePath(key: string): key is TranslateKey;
  public isTranslateKey(key: any): key is TranslateKey;
  public isOptionalTranslate(value: unknown): value is TOptionalTranslate;
}
```

### Свойства

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **lang** | `Signal<string>` | `TranslocoService[.]getActiveLang()` | Возвращает текущую локаль выбранного языка переводов (например, **'de'**, **'en'**). В отличии от `TranslocoService[.]getActiveLang()`, поле `lang` изменяется после того, как будет выполнен запрос и установлена новая карта переводов |

### Методы

#### getTranslate

Возвращает перевод по ключу. Работает идентично функции `translate-handler` из библиотеки `transloco`, но с типизированным параметром ключа.

**Интерфейс**

```ts
getTranslate(key: TranslateKey, params: HashMap = null, lang?: string): string;
```

**Использование**

Работает аналогично функции `getTranslate`

#### getTranslate$

Возвращает поток `Observable<string>` с переводом по ключу `TranslateKey`

**Интерфейс**

```ts
getTranslate$(key: TranslateKey, params?: HashMap, lang?: string): Observable<string>;
```

**Использование**

Работает аналогично функции [selectTranslate](https://jsverse.gitbook.io/transloco/core-concepts/translation-api#selecttranslate) библиотеки `transloco`

#### getOptionalTranslate

Функция работает согласно следующим правилам:

  - Если значение равно типу `TranslateKey`, возвращает строковый перевод по ключу 
  - Если значение равно типу `Translate`, возвращает строковый перевод по ключу c учетов  динамических параметров из объекта `params`
  - Если значение равно типу `string`, возвращает само значение

**Интерфейс**

```ts
getOptionalTranslate(value: TOptionalTranslate, lang?: string): string;
```

**Использование**

```ts
import { inject } from '@angular/core';
import { TranslateDB } from '@app-i18n';
import { Translate, TranslateService } from '@ngmd/translate';
import { TranslateKey } from 'i18n';

@Component({/**/})
class ExampleComponent {
  private translateService: TranslateService = inject(TranslateService);
  protected optionalKey: TranslateKey = 'greeting';
  protected optionalModel: Translate = new Translate('auth.registration-btn');
  protected optionalString: string = 'Some string value';

  private testMethod(): void {
    console.log(this.translateService.getOptionalTranslate(this.optionalKey)); // 'Hello world !'
    console.log(this.translateService.getOptionalTranslate(this.optionalModel)); // 'Registration'
    console.log(this.translateService.getOptionalTranslate(this.optionalString)); // 'Some string value'
  }
}
```

#### setLanguage

Изменяет активный язык приложения

**Интерфейс**

```ts
setLanguage(candidateLang: string): void;
```

**Использование**

Работает аналогично функции [setActiveLang](https://jsverse.gitbook.io/transloco/core-concepts/language-api#setactivelang) библиотеки `transloco`

#### isTranslatePath

Определяет, является ли передаваемое значение частью ключа `TranslateKey` объекта переводов

**Интерфейс**

```ts
isTranslatePath(key: string): key is TranslateKey;
```

**Использование**

Работает аналогично функции `isTranslatePath`, без необходимости передавать объект переводов

#### isTranslateKey

Определяет, является ли передаваемое значение типом `TranslateKey` из объекта переводов

**Интерфейс**

```ts
isTranslateKey(key: any): key is TranslateKey;
```

**Использование**

Работает аналогично функции `isTranslateKey`, без необходимости передавать объект переводов

#### isOptionalTranslate

Определяет, является ли передаваемое значение типом `TOptionalTranslate`

**Интерфейс**

```ts
isOptionalTranslate(value: unknown): value is TOptionalTranslate
```

**Использование**

Работает аналогично функции `isOptionalTranslate`

