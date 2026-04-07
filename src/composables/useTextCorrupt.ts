import { computed } from 'vue'
import { useVisitorStore } from '@/stores/visitorStore'

/**
 * Returns the current alien-text corruption intensity based on visit count.
 *
 *   0 = light  (visits 1-6)  — default, barely noticeable
 *   1 = medium (visits 7-12) — status codes, unit terminology, slight drift
 *   2 = heavy  (visits 13+)  — full breakdown, repetition, memory-file errors
 *
 * Post-2001-03-17 content written by alien impersonators (Mia Harlow, alien-Kai-Chun,
 * "Administrator") should use this to escalate how broken the language looks.
 * Human-authored entries (Thomas Lin, Jun, Sonia) are NOT affected.
 */
export function useTextCorrupt() {
  const store = useVisitorStore()

  const intensity = computed((): 0 | 1 | 2 => {
    if (store.visitCount >= 13) return 2
    if (store.visitCount >= 7) return 1
    return 0
  })

  return { intensity }
}
