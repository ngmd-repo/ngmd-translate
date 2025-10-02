---
keyword: OptionalTranslatePipePage
---

Imported from `@ngmd/translate`

---


### Description

A pipe for working with values of type `TOptionalTranslate`

### Interface

```ts
transform(value: TOptionalTranslate, lang?: string): string;
```


### Usage

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
