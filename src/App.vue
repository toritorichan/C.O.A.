<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVisitorStore } from '@/stores/visitorStore'
import { useEasterEggs } from '@/composables/useEasterEggs'
import { useGlitch } from '@/composables/useGlitch'
import { useTimeAware } from '@/composables/useTimeAware'
import { useDataSync } from '@/composables/useDataSync'
import LangSwitch from '@/components/LangSwitch.vue'

import { useVisitorMemory } from '@/composables/useVisitorMemory'

const { t } = useI18n()
const store = useVisitorStore()
const eggs = useEasterEggs()
const glitch = useGlitch()
const time = useTimeAware()
const _sync = useDataSync()
const route = useRoute()
const memory = useVisitorMemory()

let cleanupEggs: (() => void) | null = null
let titleTimer: ReturnType<typeof setTimeout> | null = null
let savedTitle = ''

function handleVisibilityChange() {
  if (document.hidden) {
    savedTitle = document.title
    const gone = ['你去哪了', 'WHERE ARE YOU GOING', '我們注意到你離開了', 'COME BACK', '不要離開', 'WE SAW YOU LEAVE']
    document.title = gone[Math.floor(Math.random() * gone.length)]!
  } else {
    if (savedTitle) {
      document.title = savedTitle
      savedTitle = ''
    }
  }
}

const CREEPY_TITLES = [
  '038', '03:17', '第13號', '#13', 'WE SEE YOU', '你還在嗎', '██████', 'SIGNAL DETECTED',
]

function scheduleTitleFlip() {
  const delay = 45000 + Math.random() * 75000 // 45–120 sec
  titleTimer = setTimeout(() => {
    if (store.visitCount >= 7) {
      const orig = document.title
      document.title = CREEPY_TITLES[Math.floor(Math.random() * CREEPY_TITLES.length)]!
      setTimeout(() => { document.title = orig }, 2200 + Math.random() * 1500)
    }
    scheduleTitleFlip()
  }, delay)
}

onMounted(() => {
  store.recordVisit()
  memory.recordVisit()
  cleanupEggs = eggs.install()
  glitch.start()
  _sync.start()
  scheduleTitleFlip()
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  cleanupEggs?.()
  glitch.stop()
  _sync.stop()
  if (titleTimer) clearTimeout(titleTimer)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <!-- Film Grain Overlay — static, pointer-events: none -->
  <div class="grain-overlay" aria-hidden="true"></div>

  <!-- Maintenance Mode Overlay (triggered by SEVENONE easter egg) -->
  <div v-if="eggs.maintenanceMode.value" class="maintenance-overlay">
    <div style="font-size:12px; margin-bottom: 24px; color: #ff0000;">⚠ Protocol 71 executing ⚠</div>
    <div class="maintenance-countdown">{{ String(Math.floor(eggs.maintenanceSeconds.value / 60)).padStart(2,'0') }}:{{ String(eggs.maintenanceSeconds.value % 60).padStart(2,'0') }}</div>
    <div style="margin-top: 24px; font-size: 9px; color: #550000;">Estimated recovery time: ████</div>
    <div style="margin-top: 8px; font-size: 8px; color: #330000;">Do not attempt to close this page</div>
  </div>

  <!-- Full-page routes (no layout wrapper) -->
  <template v-if="route.meta.fullPage">
    <RouterView :key="route.fullPath" />
  </template>

  <!-- Normal layout -->
  <template v-else>
    <!-- Night Mode Banner -->
    <div v-if="time.isNightMode.value" style="background:#110000;color:#ff0000;text-align:center;padding:4px;font-size:10px;letter-spacing:3px;" class="blink">
      {{ t('app.night_banner') }}
    </div>

    <!-- Wednesday Report Banner -->
    <div v-if="time.isWednesday.value && time.weeklyReport.value" style="background:#001100;color:#00aa00;text-align:center;padding:4px;font-size:10px;border-bottom:1px solid #003300;">
      {{ time.weeklyReport.value }}
    </div>

    <!-- XP-style Title Bar -->
    <div class="xp-window" style="margin:0;border:none;border-radius:0;">
      <div class="xp-titlebar" @click="eggs.handleLogoClick()" style="cursor:pointer;">
        <span style="display:flex;align-items:center;gap:8px;">
          <span style="font-size:16px;">👁</span>
          <span style="font-size:11px;letter-spacing:2px;">{{ t('app.title') }}</span>
        </span>
        <div class="xp-titlebar-buttons" style="display:flex;align-items:center;gap:3px;">
          <LangSwitch />
          <button class="xp-btn-min">_</button>
          <button class="xp-btn-max">□</button>
          <button class="xp-btn-close">×</button>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="xp-nav">
        <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
        <span class="nav-sep">▪</span>
        <RouterLink to="/diary">{{ t('nav.diary') }}</RouterLink>
        <span class="nav-sep">▪</span>
        <RouterLink to="/aliens">{{ t('nav.aliens') }}</RouterLink>
        <span class="nav-sep">▪</span>
        <RouterLink to="/history">{{ t('nav.history') }}</RouterLink>
        <span class="nav-sep">▪</span>
        <RouterLink to="/members">{{ t('nav.members') }}</RouterLink>
        <span class="nav-sep">▪</span>
        <RouterLink to="/guestbook">{{ t('nav.guestbook') }}</RouterLink>
        <span class="nav-sep">▪</span>
        <RouterLink to="/links">{{ t('nav.links') }}</RouterLink>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="page-container">
      <RouterView :key="route.fullPath" />
    </div>

    <!-- Status Bar -->
    <div class="xp-statusbar" style="position:fixed;bottom:0;left:0;right:0;">
      <span>{{ t('app.statusbar') }}</span>
      <span style="position:relative;" class="visitor-counter">
        {{ t('app.visitor') }} {{ store.displayCounter.toLocaleString() }}
        <div class="counter-details">Recent visitor log:
{{ store.fakeTimestamps.join('\n') }}</div>
      </span>
      <span>{{ time.currentHourDisplay.value }} | {{ t('app.frequency') }}</span>
    </div>
    <!-- Old-web notice -->
    <div style="text-align:center;font-size:9px;color:#1a2a1a;padding:2px 0 22px;letter-spacing:1px;background:#000;">
      Best viewed: Internet Explorer 5.0+ &nbsp;|&nbsp; 800×600 resolution &nbsp;|&nbsp; 最佳瀏覽：IE 5.0 以上 &nbsp;|&nbsp; 解析度 800×600
    </div>
  </template>
</template>
