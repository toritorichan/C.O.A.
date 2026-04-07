import { ref, onMounted, onUnmounted } from 'vue'

export function useGlitch() {
  const isGlitching = ref(false)
  const isIdle = ref(false)
  let glitchTimer: number | null = null
  let idleTimer: number | null = null
  const IDLE_MS = 30000

  function triggerGlitch(durationMs = 300) {
    isGlitching.value = true
    document.body.classList.add('glitch-active')
    setTimeout(() => {
      isGlitching.value = false
      document.body.classList.remove('glitch-active')
    }, durationMs)
  }

  function scheduleNext() {
    const delay = Math.random() * 25000 + 12000 // 12–37s
    glitchTimer = window.setTimeout(() => {
      triggerGlitch(Math.floor(Math.random() * 600) + 100)
      scheduleNext()
    }, delay)
  }

  function resetIdle() {
    isIdle.value = false
    document.body.classList.remove('idle-mode')
    if (idleTimer) clearTimeout(idleTimer)
    idleTimer = window.setTimeout(() => {
      isIdle.value = true
      document.body.classList.add('idle-mode')
    }, IDLE_MS)
  }

  function start() {
    scheduleNext()
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
    events.forEach(e => window.addEventListener(e, resetIdle, { passive: true }))
    resetIdle()
  }

  function stop() {
    if (glitchTimer) clearTimeout(glitchTimer)
    if (idleTimer) clearTimeout(idleTimer)
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
    events.forEach(e => window.removeEventListener(e, resetIdle))
  }

  return { isGlitching, isIdle, triggerGlitch, start, stop }
}
