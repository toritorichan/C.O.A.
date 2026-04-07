<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function toggle() {
  const next = locale.value === 'zh-TW' ? 'en' : 'zh-TW'
  locale.value = next
  localStorage.setItem('coa-lang', next)
}
</script>

<template>
  <button class="lang-switch" @click.stop="toggle" :title="locale === 'zh-TW' ? 'Switch to English' : '切換為中文'">
    {{ locale === 'zh-TW' ? 'EN' : '中' }}
  </button>
</template>

<style scoped>
.lang-switch {
  font-size: 9px;
  font-family: "Tahoma", "Arial", sans-serif;
  font-weight: bold;
  padding: 1px 4px;
  border: 1px solid;
  border-top-color: #ffffff;
  border-left-color: #ffffff;
  border-right-color: #404040;
  border-bottom-color: #404040;
  background: linear-gradient(to bottom, #e0deda 0%, #c0bdb8 50%, #a0a09a 100%);
  color: #000;
  cursor: pointer;
  line-height: 1;
  height: 13px;
  min-width: 18px;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}
.lang-switch:hover {
  background: linear-gradient(to bottom, #eeebe8 0%, #d0cdc8 50%, #b0b0aa 100%);
}
.lang-switch:active {
  border-top-color: #404040;
  border-left-color: #404040;
  border-right-color: #ffffff;
  border-bottom-color: #ffffff;
}
</style>
