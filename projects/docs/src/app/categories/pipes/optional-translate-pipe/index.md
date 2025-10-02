---
keyword: OptionalTranslatePipePage
---

Импортируется из `@ngmd/translate`

---


### Описание

Pipe для работы с значениями типа `TOptionalTranslate`

### Интерфейс

```ts
transform(value: TOptionalTranslate, lang?: string): string;
```


### Использование

```ts
import { Component } from '@angular/core';
import { OptionalTranslatePipe, TranslateKey, Translate } from '@ngmd/translate';

@Component({
  // ...
  template: `
    {%raw%}{{ fromString | optionalTranslate }}{%endraw%}
    {%raw%}{{ fromKey | optionalTranslate }}{%endraw%}
    {%raw%}{{ fromModel | optionalTranslate }}{%endraw%}
  `,
  imports: [
    OptionalTranslatePipe,
  ],
})
export class ExampleComponent {
  protected fromString: string = 'Hello world!';
  protected fromKey: TranslateKey = 'greeting';
  protected optionalModel: Translate = new Translate('some.nested.key');
}
```
