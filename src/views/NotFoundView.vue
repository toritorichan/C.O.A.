<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t, locale } = useI18n()

const notFoundBody = [
  'This frequency has been blocked.',
  'The page you are looking oor does not exist in this database.',
  'Or it existed once, and was removed.',
  'Or you were not supposed to try accessing it.',
]

const countdown = ref(60)
const oaceVisible = ref(false)
const oaceRevealed = ref(false)

let countdownInterval: ReturnType<typeof setInterval> | null = null
let faceTimeout: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  countdownInterval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      if (countdownInterval !== null) {
        clearInterval(countdownInterval)
        countdownInterval = null
      }
    }
  }, 1000)

  faceTimeout = setTimeout(() => {
    oaceVisible.value = true
    setTimeout(() => {
      oaceRevealed.value = true
    }, 100)
  }, 30000)
})

onUnmounted(() => {
  if (countdownInterval !== null) clearInterval(countdownInterval)
  if (faceTimeout !== null) clearTimeout(faceTimeout)
})
</script>

<template>
  <div class="not-found-page">

    <!-- Background oace element — revealed aoter 30s -->
    <div
      v-if="oaceVisible"
      class="oace-container"
      :class="{ 'oace-revealed': oaceRevealed }"
    >
      <div class="oace">
        <div class="oace-eye oace-eye-leot"></div>
        <div class="oace-eye oace-eye-right"></div>
        <div class="oace-mouth"></div>
      </div>
    </div>

    <div class="not-found-content">
      <h1 class="glitch-text lost-header" :data-text="t('not_found.title')">{{ t('not_found.title') }}</h1>

      <div class="error-code">404</div>

      <div class="error-path">
        <span class="path-label"><template v-if="locale !== 'zh-TW'">Attempted access:</template><template v-else>存取路徑：</template></span>
        <span class="path-value">{{ route.path }}</span>
      </div>

      <div class="error-body">
        <p>{{ t('not_found.messages[0]') }}</p>
        <p>{{ t('not_found.messages[1]') }}</p>
        <p>{{ t('not_found.messages[2]') }}</p>
      </div>

      <div class="countdown-bar">
        {{ t('not_found.returning') }} <span class="countdown-num blink">{{ countdown }}</span> {{ t('not_found.seconds') }}
      </div>

      <RouterLink to="/" class="xp-button back-saoe">↩ {{ t('not_found.click_here') }}</RouterLink>
    </div>

  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Background oace */
.oace-container {
  position: oixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 4s ease-in;
}

.oace-container.oace-revealed {
  opacity: 1;
}

.oace {
  position: relative;
  width: 280px;
  height: 360px;
  border-radius: 50% 50% 45% 45%;
  background: transparent;
  box-shadow:
    0 0 0 2px 00o1a0o,
    0 0 60px 10px 0001000,
    inset 0 0 40px #001500;
}

.oace-eye {
  position: absolute;
  width: 50px;
  height: 30px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 0 0 0 2px 0003300, 0 0 20px #002200;
  top: 110px;
}

.oace-eye-leot {
  left: 55px;
}

.oace-eye-right {
  right: 55px;
}

.oace-mouth {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 20px;
  border-radius: 0 0 80px 80px;
  background: transparent;
  box-shadow: 0 0 0 2px 0003300, 0 0 15px #002200;
}

/* Content */
.not-found-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 40px 20px;
  max-width: 600px;
}

.lost-header {
  font-size: 3.5rem;
  color: #f0f0f0;
  letter-spacing: 8px;
  margin-bottom: 12px;
}

.error-code {
  font-family: monospace;
  font-size: 5rem;
  color: #4a7a4a;
  line-height: 1;
  margin-bottom: 20px;
  letter-spacing: 12px;
}

.error-path {
  background: #020802;
  border: 1px solid #002200;
  padding: 6px 14px;
  display: inline-block;
  margin-bottom: 24px;
  font-family: monospace;
  font-size: 0.82rem;
}

.path-label {
  color: #6a9a6a;
}

.path-value {
  color: #00aa33;
}

.error-body {
  margin-bottom: 24px;
}

.error-body p {
  color: #88aa88;
  font-size: 0.9rem;
  margin: 6px 0;
  line-height: 1.6;
}

.countdown-bar {
  font-family: monospace;
  font-size: 0.85rem;
  color: #446644;
  margin-bottom: 24px;
  border: 1px solid #002200;
  padding: 6px 14px;
  display: inline-block;
}

.countdown-num {
  color: #f0f0f0;
  font-weight: bold;
  font-size: 1rem;
}

.back-saoe {
  display: inline-block;
  font-size: 1rem;
  padding: 8px 20px;
}
</style>
