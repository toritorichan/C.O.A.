import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useVisitorStore = defineStore(
  'visitor',
  () => {
    const visitCount = ref(0)
    const triggeredEggs = ref<string[]>([])
    const rawCounter = ref(0)

    const FAKE_BASE = 7412

    const displayCounter = computed(() => FAKE_BASE + rawCounter.value - 1)

    const welcomeMessage = computed(() => {
      if (visitCount.value >= 13) return 'We have always known you were here.'
      if (visitCount.value >= 7) return 'Why do you keep coming back.'
      if (visitCount.value >= 3) return 'You came back.'
      return 'Welcome to the Cosmic Observation Association'
    })

    const fakeTimestamps = computed(() => {
      const now = Date.now()
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(3, 17, 0, 0)
      return [
        new Date(now - 1000 * 60 * 7).toISOString(),
        new Date(now - 1000 * 60 * 43).toISOString(),
        new Date(now - 1000 * 60 * 60 * 2).toISOString(),
        new Date(now - 1000 * 60 * 60 * 11).toISOString(),
        tomorrow.toISOString(),
      ]
    })

    function recordVisit() {
      visitCount.value++
      rawCounter.value++
    }

    function triggerEgg(name: string) {
      if (!triggeredEggs.value.includes(name)) {
        triggeredEggs.value.push(name)
      }
    }

    function hasTriggered(name: string) {
      return triggeredEggs.value.includes(name)
    }

    return {
      visitCount,
      triggeredEggs,
      rawCounter,
      displayCounter,
      welcomeMessage,
      fakeTimestamps,
      recordVisit,
      triggerEgg,
      hasTriggered,
    }
  },
  { persist: true },
)
