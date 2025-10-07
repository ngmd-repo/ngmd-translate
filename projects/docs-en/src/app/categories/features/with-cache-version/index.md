---
keyword: WithCacheVersionPage
---

Imported from `@ngmd/translate`

---

### Description

Translation caching with versioning for optimizing translation loading in large applications.

### Features

#### ✅ Main Functions

**1. Translation Versioning**

Automatically adds version to translation URLs for forced cache updates.

```ts
// Without versioning:
GET /assets/i18n/en.json

// With versioning:
GET /assets/i18n/en.json?v=1.2.3
```

**2. Version Caching**

Version is cached and reused for all translation requests.

**3. Timestamp Fallback**

If `version.json` file is unavailable, current timestamp is used.

### Usage

Enable versioning in `provideTranslate` configuration:

```ts name="app.config.ts" {7}
import { provideTranslate } from '@ngmd/translate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslate(TranslateDB, {
      baseUrl: '/assets/i18n',
      withVersion: true, // Enable versioning
      // ... rest of configuration
    }),
  ],
};
```

### Technical Details

- Version is requested once and cached
- On version loading error, timestamp is used
- Version is added as query parameter `?v=`
- Supports both static and dynamic versions

