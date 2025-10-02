---
keyword: IntegrationPage
---

Imported from `@ngmd/translate`

---

### Integration

- Create a directory with the file *translate/index.ts* in the project root

Add a translation object `TranslateDB` with the default locale to the file, in our case **en** (*1)

```ts name="./translate/index.ts" {2}
export const TranslateDB = {
    en: { // *1
      greeting: "Hello world!",
      auth: {
        'registration-btn': 'Registration'
      }
      // ... some keys for your translate map
    },
} as const; 
```

> **WARNING**
> Note that by default only one locale is added (in our case **en**), which will be used during development on the dev server. Files with other locales will be loaded during **CI/CD** processes

- Add an *alias* path in `tsconfig.json` to the file with `TranslateDB`

```json name="tsconfig.json" {3}
{
  "compilerOptions": {
    "@app-i18n": ["./translate"],
  }
}
```

- Create a file *types/i18n/index.d.ts* in the root directory to connect the declarative module with the type

```ts name="types/i18n/index.d.ts"
declare module 'i18n' {
  import { TranslateDB } from '@app-i18n';
  import { TObjectKeyPaths } from '@ngmd/translate';

  export type TranslateKey = TObjectKeyPaths<(typeof TranslateDB)['en']>;
}
```

- In the application configuration file *app.config.ts*, connect the library with the created translation object `TranslateDB`

```ts
import { provideHttpClient } from '@angular/common/http';
import { provideTranslate } from '@ngmd/translate';
import { TranslateDB } from '@app-i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    // ....
    provideHttpClient(), //* Inject HttpClient
    provideTranslate(TranslateDB, { //* Inject library
      baseUrl: '/static/assets/i18n',
      defaultLang: 'en',
      fallbackLang: 'en',
      availableLangs: [
        'en',
        'fr',
        'de',
        // list of available languages in production
      ],
    }),
  ],
};
```

> **WARNING**
> Note that for proper library operation, the `provideHttpClient` function injection is required

- Connect the functional parts of the library (components, pipes) and use them in the project

```ts name="app.component.ts" {10-11}
import { TranslateComponent, TranslateAsyncPipe } from '@ngmd/translate';

@Component({
  /*...*/
  imports: [
    TranslateComponent,
    TranslateAsyncPipe
  ],
  template: `
    <i18n-translate key="greeting" />
    {%raw%}{{ 'auth.registration-btn' | translate$ }}{%endraw%}
  `,
})
export class ExampleComponent {}
```

### CI/CD

As you can see from the library integration example described above, the translation object **TranslateDB** contains only one locale (**en**). This is needed to generate the type of all available keys `TranslateKey`, as well as to use the values of these keys in development mode. This allows avoiding storing and maintaining files of other languages in the git repository during development. The delivery of files with other languages is delegated to CI/CD processes.

The CI/CD process within the pipeline can be described step by step as follows:

  - Before building the project, you need to download an archive with all the languages that you specified in the **availableLangs** field of the `provideTranslate` provider (downloading the locale stored in **TranslateDB** is optional)

  ![Translate json](assets/images/translate-json.png)

  - Extract language files to the path *./public/i18n*

  ![Public](assets/images/public.png)

  - Remove the archive with translation files

  - At the stage of preparing the project for CI/CD, in the *angular.json* file in the *assets* field, an object for including the *public* folder in the build should be added

  ```json name="angular.json" {5-10}
    {
      "architect": {
        "build": {
          "assets": [
            {
              "glob": "**/*",
              "input": "public",
              "ignore": ["**/i18n/index.ts"],
              "output": "/static/assets/"
            }
          ]
        }
      }
    }
  ```

  > **WARNING**
  > Note that the **output** field should correspond to the value of the `baseUrl` field that you specified when registering the `provideTranslate` provider

  - Run the project build using the `ng build` command
    
    Ultimately, the build directory should look as follows:
  
    ![Dist](assets/images/dist.png)

  - Then your build artifact can be sent to the required environment