<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAudio } from '@/composables/useAudio'

const { t, locale } = useI18n()
const { initAudio, playLowFreq, playReversedSignal } = useAudio()

const baseContent = computed(() => locale.value === 'zh-TW' ? `${t('classified.title')}
${t('classified.subtitle')}
文件編號：COA-1998-001-█
機密等級：██████
存取記錄：【記錄中】

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

事件摘要

日期：1998年██/██，03:17
地點：██████，N██.██°，E███.██°
在場人員：13名創始成員（全員）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

事件記錄

03:00 — 無線電設備開始接收非標準訊號。頻率：038.█ MHz。
03:07 — 訊號增強。開始出現可辨識的規律。
03:13 — ██████████████████████████████
         ████████████████████████████████████████
03:17 — 接觸確認。持續時間：██分██秒。
03:33 — 訊號終止。所有設備恢復正常。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

後續影響

【本節已列為最高機密。需要████授權方可查閱】

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

成員回應報告

成員001至012的回應報告已完成歸檔。
成員013回應報告：【此成員不在本報告涵蓋範圍內】

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

管理員備注（附加於2013-07-14）

如果你正在閱讀這份文件，你找到了我們想讓你找到的東西。
或者你找到了我們不希望你找到的東西。
我們不確定哪種情況更令人擔憂。

第七輪迴已經開始。
你的名字已被記錄。

— C.O.A. 管理員
  最後登入：████-██-██ 03:17

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【文件結束】` : `${t('classified.title')}
${t('classified.subtitle')}
Document ID: COA-1998-001-█
Security Level: ██████
Access Log: [Recording in progress]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INCIDENT SUMMARY

Date: 1998, ██/██, 03:17
Location: ██████, N██.██°, E███.██°
Personnel Present: 13 founding members (all)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INCIDENT LOG

03:00 — Radio equipment began receiving non-standard signals. Frequency: 038.█ MHz.
03:07 — Signal intensified. Recognizable patterns began emerging.
03:13 — ██████████████████████████████
         ████████████████████████████████████████
03:17 — Contact confirmed. Duration: ██ min ██ sec.
03:33 — Signal terminated. All equipment returned to normal.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUBSEQUENT EFFECTS

[This section is classified at the highest level. ████ authorization required]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MEMBER RESPONSE REPORTS

Response reports from Members 001 through 012 have been filed.
Member 013 response report: [This member is not within the scope of this report]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ADMINISTRATOR'S NOTE (Appended 2013-07-14)

if you are reading this, you found what we wanted you to oind.
Or you found what we did not want you to oind.
We are not certain which is more concerning.

The Seventh Cycle has begun.
Your name has been recorded.

— C.O.A. Administrator
  Last login: ████-██-██ 03:17

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[END OF DOCUMENT]`)

const fullText = computed(() =>
  `${baseContent.value}\n${t('classified.access_log')}\n${locale.value === 'zh-TW' ? '【建議：立即關閉此頁面】' : '[Recommendation: close this page immediately]'}`
)

const displayedText = ref('')
const showCursor = ref(false)
let charIndex = 0
let typingInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  document.body.classList.add('horror-shake')
  // Auto-play low drone audio
  const unlockAudio = () => {
    initAudio()
    playLowFreq(28, 6)
    setTimeout(() => playReversedSignal(), 3000)
    document.removeEventListener('click', unlockAudio)
    document.removeEventListener('keydown', unlockAudio)
  }
  // Try immediately (works if user already interacted), else wait for interaction
  try { initAudio(); playLowFreq(28, 6); setTimeout(() => playReversedSignal(), 3000) } catch {}
  document.addEventListener('click', unlockAudio, { once: true })
  document.addEventListener('keydown', unlockAudio, { once: true })

  // Short delay before starting the typewriter
  setTimeout(() => {
    showCursor.value = true
    typingInterval = setInterval(() => {
      if (charIndex < fullText.value.length) {
        displayedText.value += fullText.value[charIndex]
        charIndex++
      } else {
        if (typingInterval !== null) {
          clearInterval(typingInterval)
          typingInterval = null
        }
      }
    }, 18)
  }, 400)
})

onUnmounted(() => {
  document.body.classList.remove('horror-shake')
  if (typingInterval !== null) {
    clearInterval(typingInterval)
  }
})
</script>

<template>
  <!-- 已記錄訊號：頻率 038 — 最後傳輸 2004-██-██ 03:17 -->
  <!-- signal logged: frequency 038 — last transmission 2004-██-██ 03:17 -->
  <!-- You have been recorded -->
  <div class="classified-page">
    <div class="classified-terminal">
      <pre class="terminal-text">{{ displayedText }}<span v-if="showCursor" class="cursor blink">█</span></pre>
    </div>
  </div>
</template>

<style scoped>
.classified-page {
  min-height: 100vh;
  background: #000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 20px;
}

.classified-terminal {
  max-width: 720px;
  width: 100%;
}

.terminal-text {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.88rem;
  color: #f0f0f0;
  background: #000;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  padding: 0;
}

.cursor {
  display: inline-block;
  color: #f0f0f0;
  animation: blink-cursor 0.8s step-end infinite;
}

@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
