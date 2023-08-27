import { init, getLocaleFromNavigator, addMessages, locale } from 'svelte-i18n'
import localeen from '$lib/locales/en.json'
import localede from '$lib/locales/de.json'
import localetr from '$lib/locales/tr.json'

export const supportedLanguages = ['en', 'tr', 'de'] as const
export const fallbackLocale = supportedLanguages[0]
const localeData = {
  en: localeen,
  de: localede,
  tr: localetr,
}

const localeFromBrowser = getLocaleFromNavigator()?.split('-')[0]
const localeFromLocalStorage = localStorage.getItem('language')

export const initialLocale = localeFromLocalStorage || localeFromBrowser || fallbackLocale

export type Locale = (typeof supportedLanguages)[number]

supportedLanguages.forEach((locale) => {
  addMessages(locale, localeData[locale])
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
