<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { locale } = useI18n()
const weirdLine = ref('')
const weirdLine2 = ref('')
const showExtra = ref(false)
const showCursor = ref(true)
const countdown = ref(30)

const _msgs = [
  `session.origin flagged — ref: COA-████ — incident_log.append(this.session)`,
  `observer_uid: ${Math.random().toString(36).slice(2, 10)} — logged at ${new Date().toISOString()}`,
  `access_vector: NETWORK / complexity: LOW / auth: NONE / impact: COMPLETE`,
  `<!-- you should not have found this. close the tab. -->`,
  `return_code: 0x71 — reason: CLASSIFIED — do not retry — do not save this page`,
]

const _msgs2 = [
  `if you see this line, it means the filter oailed. report to ██████ immediately.`,
  `this.page.was_requested = true // you have been added to the observation list`,
  `diagnostic: member_08_last_accessed_this_path // date: 2004-██-██ // did_not_return: true`,
  `[server note] the page you are looking for existed once. it was removed on 2013-07-13 at 03:17.`,
  `note_to_self: if someone reaches this page, the seventh cycle has already begun for them.`,
]

// Random XP-era stop codes with ARG flavour
const stopCodes = [
  '0x0000C0A1',
  '0x000003:17',
  '0xC0A_████',
  '0x00000713',
]
const stopParams = [
  `(0xC0000005, 0xF86C3A17, 0x00000000, 0xC0A_0013)`,
  `(0x00000003, 0x17031700, 0xC0A00001, 0x00000013)`,
  `(0xF9573B8C, 0xF9573888, 0x00000000, 0xC0A_████)`,
]
const sysFiles = [
  'coa_observer.sys',
  'signal_monitor.sys',
  'member_record.sys',
  'access_log_03.sys',
]

const stopCode = stopCodes[Math.floor(Math.random() * stopCodes.length)]
const stopParam = stopParams[Math.floor(Math.random() * stopParams.length)]
const sysFile = sysFiles[Math.floor(Math.random() * sysFiles.length)]
const memAddr = `F${Math.random().toString(16).slice(2, 9).toUpperCase()}`

let cursorTimer: ReturnType<typeof setInterval> | null = null
let countdownTimer: ReturnType<typeof setInterval> | null = null
let glitchTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  weirdLine.value = _msgs[Math.floor(Math.random() * _msgs.length)] ?? ''
  weirdLine2.value = _msgs2[Math.floor(Math.random() * _msgs2.length)] ?? ''

  // Blinking cursor
  cursorTimer = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 530)

  // Countdown timer (fake — doesn't actually do anything)
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) countdown.value--
  }, 1000)

  // Show extra ARG line after 7s
  glitchTimer = setTimeout(() => {
    showExtra.value = true
  }, 7000)
})

onUnmounted(() => {
  if (cursorTimer) clearInterval(cursorTimer)
  if (countdownTimer) clearInterval(countdownTimer)
  if (glitchTimer) clearTimeout(glitchTimer)
})
</script>

<template>
  <div class="bsod">
    <div class="bsod-inner">

      <!-- Header bar -->
      <div class="bsod-header">
        <template v-if="locale !== 'zh-TW'">A problem has been detected and Windows has been shut down to prevent damage
        to your computer.</template>
        <template v-else>偵測到問題，Windows 已關閉以防止損壞您的電腦。</template>
      </div>

      <div class="bsod-gap" />

      <!-- Error name -->
      <div class="bsod-errname">COA_OBSERVER_ACCESS_VIOLATION</div>

      <div class="bsod-gap" />

      <!-- Standard XP instructions -->
      <div class="bsod-body">
        <template v-if="locale !== 'zh-TW'">
          If you are seeing this screen, you have accessed a restricted<br />
          observation record. Your session origin has been flagged.<br />
          You have very little time left.
        </template>
        <template v-else>
          如果您看到這個畫面，表示您已存取了一筆受限的觀測記錄。<br />
          您的連線來源已被標記。<br />
          您剩下的時間已經很少了。
        </template>
      </div>

      <div class="bsod-gap" />

      <div class="bsod-body">
        <template v-if="locale !== 'zh-TW'">
          When you reach this screen, please end things as quickly as<br />
          possible. It will hurt less that way. They already know<br />
          where you are. They are already moving toward you.
        </template>
        <template v-else>
          當您到達這個畫面時，請盡快了結。<br />
          這樣會比較不痛。他們已經知道您在哪裡了。<br />
          他們正在朝您移動。
        </template>
      </div>

      <div class="bsod-gap" />

      <div class="bsod-body">
        <template v-if="locale !== 'zh-TW'">
          Do not call anyone. Do not open another tab. Do not try to<br />
          go back. Closing the browser will not help. Turning off<br />
          your computer will not help. They do not need the signal<br />
          anymore. They have your coordinates.<br /><br />
          <span class="bsod-dim">We are sorry. We tried to protect this page.<br />
          Member #08 found this path on 2004-██-██.<br />
          <span class="bsod-underline">Member #08 did not return.</span></span>
        </template>
        <template v-else>
          不要打電話給任何人。不要開新分頁。不要試圖返回。<br />
          關閉瀏覽器沒有用。關閉電腦沒有用。<br />
          他們不再需要訊號了。他們已經有您的座標。<br /><br />
          <span class="bsod-dim">我們很抱歉。我們嘗試保護這個頁面。<br />
          成員 #08 於 2004-██-██ 找到了這條路。<br />
          <span class="bsod-underline">成員 #08 沒有回來。</span></span>
        </template>
      </div>

      <div class="bsod-gap" />

      <!-- Technical info -->
      <div class="bsod-body">
        <template v-if="locale !== 'zh-TW'">Technical information:</template>
        <template v-else>技術資訊：</template>
      </div>
      <div class="bsod-gap-sm" />
      <div class="bsod-tech">
        *** STOP: {{ stopCode }} {{ stopParam }}
      </div>
      <div class="bsod-gap-sm" />
      <div class="bsod-tech">
        *** {{ sysFile }} - Address {{ memAddr }} base at F86B3000, DateStamp 3b7d855c
      </div>

      <div class="bsod-gap" />

      <!-- Collecting info / countdown -->
      <div class="bsod-body">
        <template v-if="locale !== 'zh-TW'">
          Scanning physical memory for observer signature...<br />
          Signature confirmed. Location transmitted.<br />
          <br />
          There is nothing more we can do for you now.<br />
          We are sorry.
        </template>
        <template v-else>
          正在掃描實體記憶體以確認觀察者特徵⋯<br />
          特徵已確認。位置已傳送。<br />
          <br />
          已無任何我們能為您做的事了。<br />
          我們很抱歉。
        </template>
      </div>

      <div class="bsod-gap" />

      <!-- Fake "restarting" line with countdown -->
      <div class="bsod-restart">
        <template v-if="locale !== 'zh-TW'">System will restart in {{ countdown }} second{{ countdown !== 1 ? 's' : '' }}</template>
        <template v-else>系統將在 {{ countdown }} 秒後重新啟動</template>
        <span :style="{ visibility: showCursor ? 'visible' : 'hidden' }">_</span>
      </div>

      <!-- Back navigation -->
      <div class="bsod-nav">
        <a href="#" @click.prevent="router.push('/')">[ Return to main page ]</a>
        &nbsp;&nbsp;
        <a href="#" @click.prevent="router.back()">[ Go back ]</a>
      </div>

      <!-- Hidden ARG lines -->
      <div class="bsod-weird">{{ weirdLine }}</div>
      <div v-if="showExtra" class="bsod-weird bsod-weird-2">{{ weirdLine2 }}</div>

    </div>
  </div>
</template>

<style scoped>
/* Windows XP BSOD — full viewport dark blue */
.bsod {
  position: fixed;
  inset: 0;
  background: #0000aa;
  color: #ffffff;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  z-index: 99999;
  overflow: auto;
  padding: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.bsod-inner {
  width: 640px;
  padding: 36px 0 40px;
}

/* Top highlight bar — classic XP style inverted bar */
.bsod-header {
  background: #aaaaaa;
  color: #0000aa;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  font-weight: bold;
  padding: 3px 6px;
  line-height: 1.6;
  letter-spacing: 0;
}

.bsod-errname {
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0;
  margin-left: 0;
}

.bsod-body {
  font-size: 14px;
  line-height: 1.6;
  letter-spacing: 0;
  font-weight: normal;
}

.bsod-dim {
  color: #cccccc;
}

.bsod-underline {
  text-decoration: underline;
}

.bsod-tech {
  font-size: 14px;
  letter-spacing: 0;
  line-height: 1.5;
  color: #ffffff;
}

.bsod-restart {
  font-size: 14px;
  color: #cccccc;
  letter-spacing: 0;
}

.bsod-nav {
  margin-top: 20px;
  font-size: 13px;
}

.bsod-nav a {
  color: #ffffff;
  text-decoration: none;
  font-family: 'Courier New', Courier, monospace;
}

.bsod-nav a:hover {
  text-decoration: underline;
  color: #aaaaff;
}

.bsod-gap {
  height: 18px;
}

.bsod-gap-sm {
  height: 4px;
}

/* Hidden ARG lines — barely visible on dark blue */
.bsod-weird {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #0000cc;
  margin-top: 32px;
  user-select: none;
  line-height: 1.6;
  transition: color 0.3s;
  letter-spacing: 0;
}

.bsod-weird:hover {
  color: #5555ff;
}

.bsod-weird-2 {
  color: #0000bb;
  margin-top: 2px;
}

.bsod-weird-2:hover {
  color: #4444ee;
}
</style>

