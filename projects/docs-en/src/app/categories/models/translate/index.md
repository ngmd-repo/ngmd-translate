---
keyword: TranslatePage
---

Imported from `@ngmd/translate`

---

### Description

A model with typed translation keys, used as a parameter for library components and pipes

### Interface

```ts
import { TranslateKey } from 'i18n';
import { HashMap } from '@ngmd/translate';

export class Translate {
  constructor(
    public key: TranslateKey,
    public params: HashMap = null,
  ) {}
}
```