---
keyword: TranslatePipePage
---

Imported from `@ngmd/translate`

---


### Description

A pipe for working with keys of type `TranslateKey`

### Interface

```ts
transform(value: TranslateKey, params: HashMap = null, lang?: string): string;
```


### Usage

```ts
import { Component } from '@angular/core';
import { TranslatePipe, TranslateKey } from '@ngmd/translate';

@Component({
  // ...
  template: `
    {%raw%}{{ key | translate }}{%endraw%} 
    <!-- or -->
    {%raw%}{{ 'some.nested.key' | translate }}{%endraw%}
  `,
  imports: [
    TranslatePipe,
  ],
})
export class ExampleComponent {
  protected key: TranslateKey = 'greeting';
}
```