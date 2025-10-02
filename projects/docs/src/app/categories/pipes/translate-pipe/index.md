---
keyword: TranslatePipePage
---

Импортируется из `@ngmd/translate`

---


### Описание

Pipe для работы с ключами типа `TranslateKey`

### Интерфейс

```ts
transform(value: TranslateKey, params: HashMap = null, lang?: string): string;
```


### Использование

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