// Tracks visit history in localStorage — used to make the site feel like it remembers you

import { ref, computed } from 'vue'

const KEYS = {
  firstVisit: 'coa-first-visit',
  visitCount: 'coa-visit-count',
  lastVisit: 'coa-last-visit',
  sawMidnight: 'coa-saw-0317',
} as const

function getStored(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function setStored(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Silently fail — some browsers block localStorage in private mode
  }
}

export function useVisitorMemory() {
  const visitCount = ref(parseInt(getStored(KEYS.visitCount) ?? '0', 10))
  const firstVisit = ref<string | null>(getStored(KEYS.firstVisit))
  const lastVisit = ref<string | null>(getStored(KEYS.lastVisit))
  const sawMidnight = ref(getStored(KEYS.sawMidnight) === 'true')

  function recordVisit() {
    const now = new Date()
    const nowISO = now.toISOString()
    const h = now.getHours()
    const m = now.getMinutes()
    const isMidnightHour = h === 3 && m <= 33

    if (!firstVisit.value) {
      firstVisit.value = nowISO
      setStored(KEYS.firstVisit, nowISO)
    }

    lastVisit.value = nowISO
    setStored(KEYS.lastVisit, nowISO)

    visitCount.value += 1
    setStored(KEYS.visitCount, String(visitCount.value))

    if (isMidnightHour && !sawMidnight.value) {
      sawMidnight.value = true
      setStored(KEYS.sawMidnight, 'true')
    }
  }

  const isReturning = computed(() => visitCount.value > 1)
  const isFrequent = computed(() => visitCount.value >= 3)

  return { visitCount, firstVisit, lastVisit, sawMidnight, isReturning, isFrequent, recordVisit }
}
