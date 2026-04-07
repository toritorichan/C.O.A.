import { onMounted, onUnmounted } from 'vue'

/**
 * Scroll reveal composable — adds a reveal class when elements enter the viewport.
 *
 * Effects:
 *   'fade-up'    — fade in + slide up (default, used in diary)
 *   'fade-left'  — fade in + slide from left
 *   'fade-right' — fade in + slide from right
 *   'scale-in'   — fade in + scale up from 94%
 *   'flicker'    — dramatic flicker-in (used for horror moments)
 *
 * Pair with global CSS classes defined in App.vue.
 */
export function useScrollReveal(
  selector: string,
  effect: 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in' | 'flicker' = 'fade-up',
  threshold = 0.07,
) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (records) => {
        records.forEach(r => {
          if (r.isIntersecting) {
            r.target.classList.add('sr-revealed')
            observer?.unobserve(r.target)
          }
        })
      },
      { threshold },
    )
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add(`sr-${effect}`)
      observer!.observe(el)
    })
  })

  onUnmounted(() => observer?.disconnect())
}
