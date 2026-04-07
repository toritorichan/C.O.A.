import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zhTW from './locales/zh-TW'

export const i18n = createI18n({
  legacy: false,
  locale: (localStorage.getItem('coa-lang') as 'zh-TW' | 'en') || 'zh-TW',
  fallbackLocale: 'en',
  messages: {
    en,
    'zh-TW': zhTW,
  },
})
