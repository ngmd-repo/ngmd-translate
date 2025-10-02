---
keyword: TranslatePage
---

Импортируется из `@ngmd/translate`

---

### Описание

Модель, с типизацией ключа переводов, использующаяся в качестве параметра для компонентов и пайпов библиотеки

### Интерфейс

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