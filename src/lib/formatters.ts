const locale = navigator.language

export const dateFormatter = new Intl.DateTimeFormat(locale, {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})
