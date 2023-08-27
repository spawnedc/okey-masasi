import { init, getLocaleFromNavigator, register, locale } from 'svelte-i18n'

export const supportedLanguages = ['en', 'tr', 'de'] as const
export const fallbackLocale = supportedLanguages[0]

const localeFromBrowser = getLocaleFromNavigator()?.split('-')[0]
const localeFromLocalStorage = localStorage.getItem('language')

export const initialLocale = localeFromLocalStorage || localeFromBrowser || fallbackLocale

export type Locale = (typeof supportedLanguages)[number]

supportedLanguages.forEach((locale) => {
  register(locale, () => import(`./locales/${locale}.json`))
})

init({
  fallbackLocale,
  initialLocale,
})

locale.subscribe((newValue) => {
  if (newValue) {
    localStorage.setItem('language', newValue)
  } else {
    localStorage.removeItem('language')
  }
})
