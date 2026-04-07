import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAudio } from './useAudio'
import { useVisitorStore } from '@/stores/visitorStore'

// Keyboard sequences to detect
const SEQUENCES: Record<string, string> = {
  CONTACT: 'CONTACT',
  SIGNAL: 'SIGNAL',
  FORGET: 'FORGET',
  SEVENONE: 'SEVENONE',
  THEYKNOW: 'THEYKNOW',
}

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export function useEasterEggs() {
  const router = useRouter()
  const { initAudio, playAlarm, playLowFreq, playReversedSignal, playClickSound } = useAudio()
  const store = useVisitorStore()

  const activeEgg = ref<string | null>(null)
  const maintenanceMode = ref(false)
  const maintenanceSeconds = ref(0)
  const konamiProgress = ref(0)

  let charBuffer: string[] = []
  let konamiBuffer: string[] = []
  let maintenanceInterval: number | null = null

  // ── Glitch Text Effect ──────────────────────────────────
  function scrambleText(el: Element, durationMs = 3000) {
    const original = el.textContent || ''
    const chars = '█▓▒░▪▫◆◇○●★☆§¶@#$%&*!?~^<>{}[]'
    let frame = 0
    const maxFrames = Math.floor(durationMs / 50)
    const interval = setInterval(() => {
      frame++
      if (frame >= maxFrames) {
        el.textContent = original
        clearInterval(interval)
        return
      }
      const progress = frame / maxFrames
      el.textContent = original
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (i / original.length < progress) return ch
          return Math.random() > 0.5 ? chars[Math.floor(Math.random() * chars.length)] : ch
        })
        .join('')
    }, 50)
  }

  // ── Show overlay message ────────────────────────────────
  function showOverlay(text: string, className = 'signal-message-overlay', durationMs = 3500) {
    const existing = document.querySelector('.' + className)
    if (existing) existing.remove()
    const el = document.createElement('div')
    el.className = className
    el.textContent = text
    document.body.appendChild(el)
    setTimeout(() => el?.remove(), durationMs)
  }

  // ── CONTACT ─────────────────────────────────────────────
  function triggerContact() {
    store.triggerEgg('contact')
    activeEgg.value = 'contact'
    document.body.classList.add('invert-mode')
    playAlarm()
    showOverlay('⚠ FREQUENCY DETECTED ⚠\nSignal origin: Unknown\nDistance: █.██ light-years', 'signal-message-overlay', 3000)
    setTimeout(() => {
      document.body.classList.remove('invert-mode')
      activeEgg.value = null
    }, 3000)
  }

  // ── SIGNAL ──────────────────────────────────────────────
  function triggerSignal() {
    store.triggerEgg('signal')
    activeEgg.value = 'signal'
    playLowFreq(280, 2.5)
    // Show scrambled text then resolve to the decoded poem
    const glitchEl = document.createElement('div')
    glitchEl.className = 'signal-message-overlay'
    glitchEl.textContent = '█████████████████████'
    document.body.appendChild(glitchEl)
    setTimeout(() => {
      glitchEl.textContent = 'I found it on the third Wednesday.\nNot in the telescope — in the mirror.\nIt asked me: are you ready?'
    }, 1500)
    setTimeout(() => {
      glitchEl?.remove()
      activeEgg.value = null
    }, 5000)
  }

  // ── FORGET ──────────────────────────────────────────────
  function triggerForget() {
    store.triggerEgg('forget')
    activeEgg.value = 'forget'
    playLowFreq(60, 1)
    document.querySelectorAll('.member-photo').forEach(el => {
      el.classList.add('forgotten')
    })
    showOverlay('Memory purge in progress...\n██████████████ 100%', 'signal-message-overlay', 2000)
    setTimeout(() => {
      document.querySelectorAll('.member-photo').forEach(el => el.classList.remove('forgotten'))
      activeEgg.value = null
    }, 30000)
  }

  // ── SEVENONE ────────────────────────────────────────────
  function triggerSevenOne() {
    store.triggerEgg('sevenone')
    activeEgg.value = 'sevenone'
    maintenanceMode.value = true
    maintenanceSeconds.value = 300
    playAlarm()
    maintenanceInterval = window.setInterval(() => {
      maintenanceSeconds.value--
      if (maintenanceSeconds.value <= 0) {
        clearInterval(maintenanceInterval!)
        maintenanceMode.value = false
        activeEgg.value = null
      }
    }, 1000)
  }

  // ── THEYKNOW ────────────────────────────────────────────
  function triggerTheyKnow() {
    store.triggerEgg('theyknow')
    activeEgg.value = 'theyknow'
    document.body.classList.add('scramble-mode')
    playLowFreq(100, 0.8)
    // Scramble all visible text nodes
    document.querySelectorAll('p, h1, h2, h3, h4, span, a, li, td').forEach(el => {
      if (el.children.length === 0) scrambleText(el, 3000)
    })
    setTimeout(() => {
      document.body.classList.remove('scramble-mode')
      activeEgg.value = null
    }, 3000)
  }

  // ── KONAMI ──────────────────────────────────────────────
  function triggerKonami() {
    store.triggerEgg('konami')
    activeEgg.value = 'konami'
    playReversedSignal()
    showOverlay('Signal transmitting...\n\nEstablishing secure channel\n\nDo not close', 'transmission-overlay', 3500)
    setTimeout(() => {
      activeEgg.value = null
      router.push('/classified')
    }, 3500)
  }

  // ── Logo click counter (managed externally, called from component) ──
  let logoClicks = 0
  let logoTimer: number | null = null

  function handleLogoClick() {
    try { initAudio(); playClickSound() } catch (_) { /* ignore audio errors */ }
    logoClicks++
    if (logoTimer) clearTimeout(logoTimer)
    logoTimer = window.setTimeout(() => {
      const count = logoClicks
      logoClicks = 0
      if (count >= 7) {
        injectGhostMember()
      } else if (count >= 5) {
        triggerBSOD()
      }
    }, 3000)
  }

  // ── Global page click counter for BSOD ──────────────────
  let pageClicks = 0
  let pageClickTimer: number | null = null

  function handlePageClick() {
    pageClicks++
    if (pageClickTimer) clearTimeout(pageClickTimer)
    pageClickTimer = window.setTimeout(() => {
      pageClicks = 0
    }, 2000)
    if (pageClicks >= 20) {
      pageClicks = 0
      if (pageClickTimer) clearTimeout(pageClickTimer)
      triggerBSOD()
    }
  }

  function triggerBSOD() {
    store.triggerEgg('bsod')
    const stopCodes = ['0x000003:17', '0x0000C0A1', '0x00000713', '0xC0A_0013']
    const stopParams = [
      '(0xC0000005, 0xF86C3A17, 0x00000000, 0xC0A00013)',
      '(0x00000003, 0x17031700, 0xC0A00001, 0x00000013)',
      '(0xF9573B8C, 0xF9573888, 0xC0A00000, 0x00000713)',
    ]
    const sysFiles = ['coa_observer.sys', 'signal_monitor.sys', 'member_record.sys']
    const stopCode = stopCodes[Math.floor(Math.random() * stopCodes.length)]
    const stopParam = stopParams[Math.floor(Math.random() * stopParams.length)]
    const sysFile = sysFiles[Math.floor(Math.random() * sysFiles.length)]
    const memAddr = 'F' + Math.random().toString(16).slice(2, 9).toUpperCase()

    const bsod = document.createElement('div')
    bsod.style.cssText = `
      position:fixed;inset:0;background:#0000aa;color:#ffffff;
      font-family:'Courier New',Courier,monospace;font-size:14px;
      line-height:1.6;padding:0;z-index:99999;overflow:hidden;
      display:flex;align-items:flex-start;justify-content:center;
    `
    bsod.innerHTML = `
      <div style="width:640px;padding:36px 0 40px;">
        <div style="background:#aaaaaa;color:#0000aa;font-weight:bold;padding:3px 6px;font-size:14px;margin-bottom:18px;">
          A problem has been detected and Windows has been shut down to prevent damage<br>to your computer.
        </div>
        <div style="font-weight:bold;margin-bottom:18px;">COA_OBSERVER_ACCESS_VIOLATION</div>
        <div style="margin-bottom:18px;">
          If this is the first time you've seen this Stop error screen,<br>
          restart your computer. If this screen appears again, follow<br>
          these steps:
        </div>
        <div style="margin-bottom:18px;">
          Check that all observation logs are properly archived. If this<br>
          is a new connection, contact the Association administrator for<br>
          any required access updates you might need.
        </div>
        <div style="margin-bottom:18px;">
          If problems continue, disconnect from the signal. Disable any<br>
          active frequency monitoring. If you need to use Safe Mode to<br>
          remove your session, press F8 to select Advanced Startup<br>
          Options, then select Safe Mode.<br><br>
          <span style="color:#cccccc;">Refer to your Association documentation for details.<br>
          Contact your system administrator at <span style="text-decoration:underline;">████████████████████</span><br>
          for further assistance.</span>
        </div>
        <div>Technical information:</div>
        <div style="margin-top:4px;">*** STOP: ${stopCode} ${stopParam}</div>
        <div style="margin-top:4px;">*** ${sysFile} - Address ${memAddr} base at F86B3000, DateStamp 3b7d855c</div>
        <div style="margin-top:18px;">
          Beginning dump of physical memory.<br>
          Physical memory dump complete.<br><br>
          Contact your system administrator or technical support group<br>
          for further assistance.
        </div>
        <div style="margin-top:18px;color:#cccccc;" id="_bsod_pct">Collecting error information: 0%</div>
        <div style="margin-top:24px;font-size:11px;color:#0000cc;">They already know you are here.</div>
      </div>
    `
    document.body.appendChild(bsod)

    let pct = 0
    const pctEl = bsod.querySelector('#_bsod_pct') as HTMLElement
    const tick = setInterval(() => {
      pct += Math.floor(Math.random() * 3) + 1
      if (pct >= 100) { pct = 100; clearInterval(tick) }
      if (pctEl) pctEl.textContent = `Collecting error information: ${pct}%`
    }, 120)
    setTimeout(() => {
      clearInterval(tick)
      bsod.remove()
      window.location.reload()
    }, 6000)
  }

  function injectGhostMember() {
    store.triggerEgg('ghost')
    const lists = document.querySelectorAll('.members-list, .member-list')
    lists.forEach(list => {
      const ghost = document.createElement('div')
      ghost.className = 'member-card ghost-member'
      ghost.style.cssText = 'border-color:#ff0000;'
      ghost.innerHTML = `
        <div class="member-photo forgotten" style="background:#000;border-color:#ff0000;"></div>
        <div>
          <div style="color:#ff0000;font-size:11px;">#00 ██████ [REDACTED]</div>
          <div style="font-size:10px;color:#555;margin-top:4px;">Join Date: ████-██-██</div>
          <div style="font-size:10px;color:#cc0000;margin-top:4px;" title="You should not be here">Status: [DATA CORRUPTED]</div>
        </div>
      `
      list.prepend(ghost)
    })
  }

  // ── Copy & Context Menu Protection ──────────────────────
  function setupProtection() {
    const onCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      initAudio()
      playLowFreq(90, 0.9)
      showOverlay('They have already seen it', 'copy-warning', 3000)
      document.body.style.cursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='5' fill='%23ff0000'/%3E%3Cellipse cx='16' cy='16' rx='14' ry='7' fill='none' stroke='%23ff0000' stroke-width='1.5'/%3E%3Cline x1='16' y1='2' x2='16' y2='30' stroke='%23ff0000' stroke-width='1'/%3E%3C/svg%3E") 16 16, crosshair`
      setTimeout(() => { document.body.style.cursor = '' }, 3500)
    }

    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      initAudio()
      playClickSound()
      showOverlay('This content is under Class-3 protection', 'copy-warning', 2000)
    }

    document.addEventListener('copy', onCopy)
    document.addEventListener('contextmenu', onContextMenu)

    return () => {
      document.removeEventListener('copy', onCopy)
      document.removeEventListener('contextmenu', onContextMenu)
    }
  }

  // ── Main keyboard listener ───────────────────────────────
  function onKeydown(e: KeyboardEvent) {
    initAudio()

    // Konami tracking
    konamiBuffer.push(e.key)
    if (konamiBuffer.length > KONAMI.length) konamiBuffer.shift()
    konamiProgress.value = konamiBuffer.filter((k, i) => k === KONAMI[i]).length

    if (JSON.stringify(konamiBuffer.slice(-KONAMI.length)) === JSON.stringify(KONAMI)) {
      triggerKonami()
      konamiBuffer = []
      return
    }

    // Text sequences
    if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
      charBuffer.push(e.key.toUpperCase())
      if (charBuffer.length > 20) charBuffer.shift()

      const typed = charBuffer.join('')
      for (const seq of Object.values(SEQUENCES)) {
        if (typed.endsWith(seq)) {
          charBuffer = []
          switch (seq) {
            case 'CONTACT': triggerContact(); break
            case 'SIGNAL': triggerSignal(); break
            case 'FORGET': triggerForget(); break
            case 'SEVENONE': triggerSevenOne(); break
            case 'THEYKNOW': triggerTheyKnow(); break
          }
          break
        }
      }
    }
  }

  function install() {
    window.addEventListener('keydown', onKeydown)
    document.addEventListener('click', handlePageClick)
    const cleanup = setupProtection()
    return () => {
      window.removeEventListener('keydown', onKeydown)
      document.removeEventListener('click', handlePageClick)
      cleanup()
      if (maintenanceInterval) clearInterval(maintenanceInterval)
    }
  }

  return {
    activeEgg,
    maintenanceMode,
    maintenanceSeconds,
    konamiProgress,
    install,
    handleLogoClick,
  }
}
