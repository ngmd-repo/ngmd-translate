---
keyword: TranslateServicePage
---

Imported from `@ngmd/translate`

---

### Description

Service for working with typed translation objects in your application

### Interface

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

### Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **lang** | `Signal<string>` | `TranslocoService[.]getActiveLang()` | Returns the current locale of the selected translation language (e.g., **'de'**, **'en'**). Unlike `TranslocoService[.]getActiveLang()`, the `lang` field changes after the request is completed and a new translation map is set |

### Methods

#### getTranslate

Returns translation by key. Works identically to the `translate-handler` function from the `transloco` library, but with a typed key parameter.

**Interface**

```ts
getTranslate(key: TranslateKey, params: HashMap = null, lang?: string): string;
```

**Usage**

Works similarly to the `getTranslate` function

#### getTranslate$

Returns an `Observable<string>` stream with translation by `TranslateKey` key

**Interface**

```ts
getTranslate$(key: TranslateKey, params?: HashMap, lang?: string): Observable<string>;
```

**Usage**

Works similarly to the [selectTranslate](https://jsverse.gitbook.io/transloco/core-concepts/translation-api#selecttranslate) function from the `transloco` library

#### getOptionalTranslate

The function works according to the following rules:

  - If the value is of type `TranslateKey`, returns a string translation by key
  - If the value is of type `Translate`, returns a string translation by key considering dynamic parameters from the `params` object
  - If the value is of type `string`, returns the value itself

**Interface**

```ts
getOptionalTranslate(value: TOptionalTranslate, lang?: string): string;
```

**Usage**

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

Changes the active application language

**Interface**

```ts
setLanguage(candidateLang: string): void;
```

**Usage**

Works similarly to the [setActiveLang](https://jsverse.gitbook.io/transloco/core-concepts/language-api#setactivelang) function from the `transloco` library

#### isTranslatePath

Determines whether the passed value is part of a `TranslateKey` key from the translation object

**Interface**

```ts
isTranslatePath(key: string): key is TranslateKey;
```

**Usage**

Works similarly to the `isTranslatePath` function, without the need to pass the translation object

#### isTranslateKey

Determines whether the passed value is of type `TranslateKey` from the translation object

**Interface**

```ts
isTranslateKey(key: any): key is TranslateKey;
```

**Usage**

Works similarly to the `isTranslateKey` function, without the need to pass the translation object

#### isOptionalTranslate

Determines whether the passed value is of type `TOptionalTranslate`

**Interface**

```ts
isOptionalTranslate(value: unknown): value is TOptionalTranslate
```

**Usage**

Works similarly to the `isOptionalTranslate` function

