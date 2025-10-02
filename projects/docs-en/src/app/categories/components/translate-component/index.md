---
keyword: TranslateComponentPage
---

Imported from `@ngmd/translate`

---

### Description

A component with typing for translation object keys in your application


### Interface

```ts
  import { Component, input, InputSignal } from '@angular/core';
  import { TranslateKey } from 'i18n';
  import { HashMap } from '@ngmd/translate';

  @Component({
    selector: 'i18n-translate',
    // ...
  })
  export class TranslateComponent {
    public key: InputSignal<TranslateKey> = input.required();
    public params: InputSignal<HashMap> = input(null);
  }
```

### Usage

```ts {2, 5}
import { Component, inject } from '@angular/core';
import { TranslateComponent } from '@ngmd/translate';

@Component({
  imports: [TranslateComponent],
  template: `<i18n-translate key="greeting" />`
})
export class ExampleComponent {}
```

