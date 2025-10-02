---
keyword: IntegrationPage
---

Импортируется из `@ngmd/translate`

---

### Подключение

- В корне проекта создать директорию c файлом *translate/index.ts*

В файл добавить объект переводов `TranslateDB` c дефолтной локалью, в нашем случае **en** (*1)

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
> Обратите внимание, что по-умолчанию добавляется только одна локаль (в нашем случае **en**), которая будет использоваться в рамках разработки на dev сервере. Файлы с другими локалями будут загружаться во время процессов **CI/CD** 

- Добавить *alias* путь в `tsconfig.json` до файла с `TranslateDB`

```json name="tsconfig.json" {3}
{
  "compilerOptions": {
    "@app-i18n": ["./translate"],
  }
}
```

- В корне директории создать файл *types/i18n/index.d.ts* для подключения декларативного модуля с типом

```ts name="types/i18n/index.d.ts"
declare module 'i18n' {
  import { TranslateDB } from '@app-i18n';
  import { TObjectKeyPaths } from '@ngmd/translate';

  export type TranslateKey = TObjectKeyPaths<(typeof TranslateDB)['en']>;
}
```

- В конфигурационном файле приложения *app.config.ts* подключить библиотеку с созданным объектом переводов `TranslateDB`

```ts
import { provideHttpClient } from '@angular/common/http';
import { provideTranslate } from '@ngmd/translate';
import { TranslateDB } from '@app-i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    // ....
    provideHttpClient(), //* Внедрить HttpClient
    provideTranslate(TranslateDB, { //* Внедрить библиотеку
      baseUrl: '/static/assets/i18n',
      defaultLang: 'en',
      fallbackLang: 'en',
      availableLangs: [
        'en',
        'fr',
        'de',
        // список доступных языков в production
      ],
    }),
  ],
};
```

> **WARNING**
> Обратите внимание, что для корректной работы библиотеки требуется внедрение функции `provideHttpClient`

- Подключить функциональные части библиотеки (компоненты, пайпы) и использовать в проекте

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

Как видно из примера подключения библиотеки, описанного выше, объект переводов **TranslateDB** содержит единственную локаль (**en**). Это нужно для того, чтобы сформировать тип всех доступных ключей `TranslateKey`, а так же использовать значения этих ключей в режиме разработки. Это позволяет избегать хранение и поддержку файлов других языков в git репозитории на этапе разработки. Доставка файлов с остальными языками перекладывается на процессы CI/CD

Описать процесс CI/CD в рамках pipeline можно пошагово следующим образом: 

  - Перед сборкой проекта необходимо скачать архив со всеми языками, которые вы указали в поле **availableLangs** провайдера `provideTranslate` (скачивание локали, которая хранится в **TranslateDB** необязательно)

  ![Translate json](assets/images/translate-json.png)

  - Разархивировать файлы языков по пути *./public/i18n* 

  ![Public](assets/images/public.png)

  - Удалить архив с файлами переводов 

  - На этапе подготовки проекта к CI/CD в файле *angular.json* в поле *assets* должен быть добавлен объект включения папки *public* в билд

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
  > Обратите внимание, что поле **output** должно соответствовать значению поля `baseUrl`, которое вы указали при регистрации провайдера `provideTranslate`

  - Запустить сборку проекта при помощи команды `ng build`
    
    В конечном итоге директория билда должна выглядеть следующим образом
  
    ![Dist](assets/images/dist.png)

  - Далее артефакт вашего билда может быть отправлен на необходимый вам стенд