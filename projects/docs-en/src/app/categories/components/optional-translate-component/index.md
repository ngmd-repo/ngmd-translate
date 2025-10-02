---
keyword: OptionalTranslateComponentPage
---

Imported from `@ngmd/translate`

---

### Description

A component with dynamic type determination `TOptionalTranslate` for translation keys. If the `translate` parameter type is not defined, it will output its string value without throwing an error.


### Interface

```ts
import { Component, input, InputSignal } from '@angular/core';
import { TOptionalTranslate } from './types';

@Component({
  selector: 'i18n-optional-translate',
  // ...
})
export class OptionalTranslateComponent {
  public translate: InputSignal<TOptionalTranslate> = input.required();
}
```

### Usage

All values will be displayed correctly, including the string `optionalString`

```ts {2, 5}
import { Component, inject } from '@angular/core';
import { TranslateComponent, TranslateKey, Translate } from '@ngmd/translate';

@Component({
  imports: [OptionalTranslateComponent],
  template: `
    <i18n-optional-translate [translate]="optionalString" />
    <i18n-optional-translate [translate]="optionalKey" />
    <i18n-optional-translate [translate]="optionalModel" />
  `
})
export class ExampleComponent {
  protected optionalString: string = 'Hello STRING world!';
  protected optionalKey: TranslateKey = 'greeting';
  protected optionalModel: Translate = new Translate('auth.registration-btn');
}
```
