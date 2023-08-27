import { init, getLocaleFromNavigator, register } from 'svelte-i18n'

const supportedLanguages = ['en', 'tr', 'de'] as const

supportedLanguages.forEach((locale) => {
  register(locale, () => import(`./locales/${locale}.json`))
})

init({
  fallbackLocale: 'tr',
  initialLocale: getLocaleFromNavigator(),
})
