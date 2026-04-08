import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import './assets/styles/main.css'
import './assets/styles/glitch.css'
import './assets/styles/xp-ui.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')

// C.O.A. system terminal boot log
const s = 'font-family:monospace;font-size:11px;'
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', `${s}color:#005500;`)
console.log('%c  C.O.A. SITE SYSTEM  //  visitor session active', `${s}color:#00aa44;font-weight:bold;`)
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', `${s}color:#005500;`)
console.log('%c  authorization  : PUBLIC', `${s}color:#448844;`)
console.log('%c  access_level   : 0x00 (standard)', `${s}color:#448844;`)
console.log('%c  clearance      : NONE', `${s}color:#448844;`)
console.log('%c  ', `${s}`)
console.log('%c  for elevated access : /admin', `${s}color:#336633;`)
console.log('%c  if you know the signal : you already know where', `${s}color:#224422;font-style:italic;`)
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', `${s}color:#005500;`)
setTimeout(() => {
  console.log('%c  ...', `${s}color:#224422;`)
  console.log('%c  one more thing.', `${s}color:#336633;`)
  console.log('%c  /classified  — restricted. access logged.', `${s}color:#004400;`)
}, 3800)
