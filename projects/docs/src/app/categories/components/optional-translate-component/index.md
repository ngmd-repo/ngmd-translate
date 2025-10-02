---
keyword: OptionalTranslateComponentPage
---

Импортируется из `@ngmd/translate`

---

### Описание

Компонент, с динамическим определением типа `TOptionalTranslate` для ключа переводов. Если тип параметра `translate` не был определен, будет выведено его строковое значение без выброса ошибки


### Интерфейс

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

### Использование

Все значения будут выведены корректно, в том числе строковое `optionalString`

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
