---
keyword: TranslationTranspilerPage
---

Imported from `@ngmd/translate`

---

### Description

Custom transpiler for Transloco that supports advanced variable interpolation and ICU syntax for pluralization and selection. Works similarly to the examples described in the [official Transloco transpiler documentation](https://jsverse.gitbook.io/transloco/advanced-features/the-transpiler).

### Features

#### ✅ Supported Functions

**1. Simple Interpolation**

Replaces `{param}` placeholders with values from `params`.

**2. Plural ICU**

Handles ICU plural blocks based on numeric parameters.

**3. Select ICU**

Handles select blocks based on string values.

For detailed examples and usage instructions, see the [official Transloco transpiler documentation](https://jsverse.gitbook.io/transloco/advanced-features/the-transpiler).

### Language Support

The transpiler supports different plural rules for various languages:

- **en, de, es, it, pt, nl, et, bg** — only `one` and `other`
- **fr** — `one` (n = 0 or n = 1) and `other`
- **ro** — `one`, `few`, `other`
- **lv** — `zero`, `one`, `other`
- **lt** — `one`, `few`, `other`

### Usage

The transpiler is automatically connected when using `provideTranslate`. No additional configuration is required.

```ts
// app.config.ts
import { provideTranslate } from '@ngmd/translate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslate(TranslateDB, {
      // ... configuration
    }),
  ],
};
```

### Technical Details

The transpiler uses regular expressions to process ICU syntax and supports:

- Simple interpolation via `{param}`
- ICU plural with plural category support
- ICU select for selection based on string values
- Automatic language detection for plural rules
