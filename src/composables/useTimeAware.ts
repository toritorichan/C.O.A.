// Returns reactive time-based state for the analog horror effects

import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useTimeAware() {
  const now = ref(new Date())
  let timer: number | null = null

  onMounted(() => {
    // Update every minute
    timer = window.setInterval(() => {
      now.value = new Date()
    }, 60000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  const isNightMode = computed(() => {
    const h = now.value.getHours()
    const m = now.value.getMinutes()
    return h === 3 && m <= 33
  })

  const isWednesday = computed(() => now.value.getDay() === 3)

  const isSpecialDay = computed(
    () => now.value.getMonth() === 6 && now.value.getDate() === 13
  )

  const weeklyReport = computed(() => {
    if (!isWednesday.value) return null
    const weekNum = Math.floor(now.value.getTime() / (7 * 24 * 60 * 60 * 1000))
    return `Weekly Observation Report #${weekNum} — ██ anomalous signals detected. Cycle 7 progress: ██%. Detailed report transmitted [ENCRYPTED].`
  })

  const currentHourDisplay = computed(() => {
    const h = now.value.getHours().toString().padStart(2, '0')
    const m = now.value.getMinutes().toString().padStart(2, '0')
    return `${h}:${m}`
  })

  return { now, isNightMode, isWednesday, isSpecialDay, weeklyReport, currentHourDisplay }
}
