export const TranslateLibDB = {
  messages: {
    'unavailable-set-lang':
      'Warning (unavailable-set-lang): Can\'t set language to "{{lang}}". This language isn\'t available. Available langs: {{availableLangs}}. Fallback language in currently used: "{{fallbackLang}}"',
    'unavailable-default-lang':
      'Warning (unavailable-default-lang): Property "defaultLang" in translate config is incorrect. Language "{{defaultLang}}" isn\'t available. Available langs: {{availableLangs}}',
  },
} as const;
