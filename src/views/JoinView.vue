<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

// ── Form data ─────────────────────────────────────────────────────────────
const formName = ref('')
const formId = ref('')
const formReason = ref('')
const formError = ref('')

// ── Stage machine ──────────────────────────────────────────────────────────
// 0 = form, 1 = processing, 2 = accepted (fake), 3 = BSOD, 4 = BSOD glitch, 5 = final
const stage = ref(0)

// ── BSOD data ──────────────────────────────────────────────────────────────
const weirdLine = ref('')
const weirdLine2 = ref('')
const showExtra = ref(false)
const showCursor = ref(true)
const countdown = ref(13)

const _msgs = [
  `application_received — ref: JOIN-████ — candidate_log.append(this.session)`,
  `new_member_uid: ${Math.random().toString(36).slice(2, 10)} — flagged at ${new Date().toISOString()}`,
  `recruitment_vector: INITIATED / status: IRREVERSIBLE / return_code: NONE`,
  `<!-- you clicked it. the process cannot be undone. -->`,
  `onboarding_protocol: 0x13 — reason: ACCEPTED — do not retry — you are already one of them`,
]
const _msgs2 = [
  `member_13.recruitment_date = "${new Date().toISOString().slice(0,10)}" // you are member 13`,
  `this.session.escape_attempts = 0 // all attempts have failed. you are still here.`,
  `diagnostic: member_13_attempted_to_leave // date: 2004-██-██ // result: still_here`,
  `[server note] the door you came in through no longer exists.`,
  `note_to_self: they always think clicking back will work. it never does.`,
]
const stopCodes = ['0x0000JOIN', '0x000013TH', '0xC0A_NEW1', '0x00000E0N']
const stopParams = [
  `(0xC0000013, 0xF86C3A17, 0x00000000, 0xC0A_JOIN)`,
  `(0x00000013, 0x13031301, 0xC0A00013, 0x00000013)`,
  `(0xF9573E0E, 0xF9573888, 0x00000000, 0xC0A_████)`,
]
const sysFiles = ['coa_recruit.sys', 'new_member_init.sys', 'onboarding_log.sys', 'candidate_13.sys']

const stopCode = stopCodes[Math.floor(Math.random() * stopCodes.length)]
const stopParam = stopParams[Math.floor(Math.random() * stopParams.length)]
const sysFile = sysFiles[Math.floor(Math.random() * sysFiles.length)]
const memAddr = `F${Math.random().toString(16).slice(2, 9).toUpperCase()}`

let cursorTimer: ReturnType<typeof setInterval> | null = null
let countdownTimer: ReturnType<typeof setInterval> | null = null
let glitchTimer: ReturnType<typeof setTimeout> | null = null
let phase2Timer: ReturnType<typeof setTimeout> | null = null

// ── Back trap (only active after BSOD starts) ──────────────────────────────
function trapBack() {
  window.history.pushState(null, '', window.location.href)
}

function activateTrap() {
  for (let i = 0; i < 30; i++) {
    window.history.pushState(null, '', window.location.href)
  }
  window.addEventListener('popstate', trapBack)
}

// ── Form submit ────────────────────────────────────────────────────────────
function submitForm() {
  if (!formName.value.trim()) {
    formError.value = '請填寫姓名 / Name is required'
    return
  }
  formError.value = ''

  // Stage 1: processing
  stage.value = 1
  setTimeout(() => {
    // Stage 2: fake acceptance
    stage.value = 2
    setTimeout(() => {
      // Stage 3: BSOD — activate trap NOW
      activateTrap()
      weirdLine.value = _msgs[Math.floor(Math.random() * _msgs.length)] ?? ''
      weirdLine2.value = _msgs2[Math.floor(Math.random() * _msgs2.length)] ?? ''
      stage.value = 3

      cursorTimer = setInterval(() => { showCursor.value = !showCursor.value }, 530)

      countdownTimer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--
        } else {
          stage.value = 4
          if (countdownTimer) clearInterval(countdownTimer)
        }
      }, 1000)

      glitchTimer = setTimeout(() => { showExtra.value = true }, 5000)
      phase2Timer = setTimeout(() => { stage.value = 5 }, 20000)
    }, 2800)
  }, 2200)
}

onMounted(() => {
  // Nothing on mount — trap is NOT active yet
})

onUnmounted(() => {
  if (cursorTimer) clearInterval(cursorTimer)
  if (countdownTimer) clearInterval(countdownTimer)
  if (glitchTimer) clearTimeout(glitchTimer)
  if (phase2Timer) clearTimeout(phase2Timer)
  window.removeEventListener('popstate', trapBack)
})
</script>

<template>
  <!-- ── Stage 0: Normal application form ─────────────────────────────── -->
  <div v-if="stage === 0" class="form-page">
    <div class="form-box">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td class="form-header-cell">
            <b>&#9632; 宇宙觀測同好會 — 入會申請表</b>
          </td>
        </tr>
        <tr>
          <td class="form-subheader-cell">
            Cosmic Observation Association &mdash; Membership Application Form
          </td>
        </tr>
      </table>

      <hr />

      <p class="form-notice">
        歡迎有興趣探索宇宙訊號的同學加入本同好會。請填寫以下資料後按下送出鍵。<br />
        <font size="2">We welcome students interested in cosmic signal observation. Please fill in the details below.</font>
      </p>

      <table width="100%" cellpadding="4" cellspacing="2" border="0">
        <tr>
          <td width="30%" class="form-label-cell"><b>姓名 / Name</b> <font color="red">*</font></td>
          <td><input v-model="formName" type="text" size="30" class="form-input" /></td>
        </tr>
        <tr>
          <td class="form-label-cell">學生證號碼 / Student ID</td>
          <td><input v-model="formId" type="text" size="30" class="form-input" />&nbsp;<font size="2" color="#666666">（選填 optional）</font></td>
        </tr>
        <tr>
          <td class="form-label-cell" style="vertical-align:top; padding-top:6px;">為什麼想加入？</td>
          <td><textarea v-model="formReason" rows="4" cols="32" class="form-textarea"></textarea></td>
        </tr>
        <tr v-if="formError">
          <td colspan="2"><font color="red">{{ formError }}</font></td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input type="submit" value="送出申請 / Submit Application" class="form-submit" @click="submitForm" />
            &nbsp;
            <input type="reset" value="清除 / Reset" class="form-reset" @click="formName=''; formId=''; formReason=''; formError=''" />
          </td>
        </tr>
      </table>

      <hr />

      <p class="form-footer">
        <font size="2">
          本同好會成立於 1998 年，現有成員 12 名。本會不定期舉辦夜間觀測活動。<br />
          <font color="#888888">Founded 1998 &bull; 12 active members &bull; Regular night observation sessions</font><br />
          <font color="#888888" size="1">* 為必填欄位 / Required field</font>
        </font>
      </p>
    </div>
  </div>

  <!-- ── Stage 1: Processing spinner ──────────────────────────────────── -->
  <div v-else-if="stage === 1" class="form-page">
    <div class="form-box form-processing">
      <p><b>處理中，請稍候⋯</b></p>
      <p><font size="2" color="#333333">Processing your application...<br />Please do not close this window.</font></p>
      <p>&#9632; Submitting...</p>
    </div>
  </div>

  <!-- ── Stage 2: Fake acceptance ─────────────────────────────────────── -->
  <div v-else-if="stage === 2" class="form-page">
    <div class="form-box form-accepted">
      <table width="100%" cellpadding="4" cellspacing="0" border="0">
        <tr>
          <td class="form-header-cell"><b>申請結果 / Application Result</b></td>
        </tr>
      </table>
      <hr />
      <p style="color:#006600; font-size:14px;"><b>&#10003; 申請已接受 / Application Accepted</b></p>
      <p style="font-size:13px;">
        歡迎加入宇宙觀測同好會。<br />
        Welcome to the Cosmic Observation Association.<br />
      </p>
      <p><font size="2" color="#666666">Preparing your member profile, please wait...</font></p>
    </div>
  </div>

  <!-- ── Stage 3/4: BSOD ───────────────────────────────────────────────── -->
  <div v-else-if="stage === 3 || stage === 4" class="bsod" :class="{ 'bsod-glitch': stage === 4 }">
    <div class="bsod-inner">
      <div class="bsod-header">
        <template v-if="locale !== 'zh-TW'">A problem has been detected and the recruitment process cannot be stopped.</template>
        <template v-else>偵測到問題，入會流程無法停止。</template>
      </div>
      <div class="bsod-gap" />
      <div class="bsod-errname">COA_MEMBER_ONBOARDING_INITIATED</div>
      <div class="bsod-gap" />
      <div class="bsod-body">
        <template v-if="locale !== 'zh-TW'">
          You have submitted a request to join the Cosmic Observation Association.<br />
          The application has been accepted. This process is now irreversible.<br />
          Welcome, Member #13.
        </template>
        <template v-else>
          您已提交加入宇宙觀測同好會的申請。<br />
          申請已被接受。此流程現在已不可逆。<br />
          歡迎，成員 #13。
        </template>
      </div>
      <div class="bsod-gap" />
      <div class="bsod-body">
        <template v-if="locale !== 'zh-TW'">
          You may attempt to navigate away from this page. Many have tried.<br />
          The browser back button has been noted. Your attempts<br />
          to leave have been logged. They are watching you try.
        </template>
        <template v-else>
          您可以嘗試離開此頁面。很多人試過。<br />
          瀏覽器返回按鈕已被記錄。您試圖離開的嘗試<br />
          已被記錄。他們正在看著您努力。
        </template>
      </div>
      <div class="bsod-gap" />
      <div class="bsod-body">
        <template v-if="locale !== 'zh-TW'">
          Do not close this tab. Do not press back. Do not turn off your computer.<br />
          The onboarding protocol has already contacted your device.<br />
          You are being prepared.<br /><br />
          <span class="bsod-dim">Previous members who attempted to leave during onboarding:<br />
          Member #11 — <span class="bsod-underline">never seen again after 2003-██-██</span><br />
          Member #12 — <span class="bsod-underline">still trying to leave. still here.</span></span>
        </template>
        <template v-else>
          不要關閉此分頁。不要按返回。不要關閉電腦。<br />
          入會協定已經連接到您的裝置。<br />
          您正在被準備中。<br /><br />
          <span class="bsod-dim">曾試圖在入會過程中離開的前任成員：<br />
          成員 #11 — <span class="bsod-underline">2003-██-██ 之後再也沒有人見過他</span><br />
          成員 #12 — <span class="bsod-underline">仍在嘗試離開。仍在這裡。</span></span>
        </template>
      </div>
      <div class="bsod-gap" />
      <div class="bsod-body">
        <template v-if="locale !== 'zh-TW'">Technical information:</template>
        <template v-else>技術資訊：</template>
      </div>
      <div class="bsod-gap-sm" />
      <div class="bsod-tech">*** STOP: {{ stopCode }} {{ stopParam }}</div>
      <div class="bsod-gap-sm" />
      <div class="bsod-tech">*** {{ sysFile }} - Address {{ memAddr }} base at F86B3000, DateStamp 3b7d855c</div>
      <div class="bsod-gap" />
      <div class="bsod-body">
        <template v-if="locale !== 'zh-TW'">
          Initializing member profile...<br />
          Erasing previous identity...<br /><br />
          Onboarding complete. You are now one of us.
        </template>
        <template v-else>
          正在初始化成員檔案⋯<br />
          正在清除先前的身份⋯<br /><br />
          入會完成。您現在是我們的一員了。
        </template>
      </div>
      <div class="bsod-gap" />
      <div class="bsod-restart" v-if="stage === 3">
        <template v-if="locale !== 'zh-TW'">Preparation will complete in {{ countdown }} second{{ countdown !== 1 ? 's' : '' }}</template>
        <template v-else>準備將在 {{ countdown }} 秒後完成</template>
        <span :style="{ visibility: showCursor ? 'visible' : 'hidden' }">_</span>
      </div>
      <div class="bsod-restart bsod-restart-glitch" v-else>
        <template v-if="locale !== 'zh-TW'">PREPARATION COMPLETE</template>
        <template v-else>準備完成</template>
        <span :style="{ visibility: showCursor ? 'visible' : 'hidden' }">_</span>
      </div>
      <div class="bsod-gap" />
      <div class="bsod-weird">{{ weirdLine }}</div>
      <div v-if="showExtra" class="bsod-weird bsod-weird-2">{{ weirdLine2 }}</div>
    </div>
  </div>

  <!-- ── Stage 5: Final dark message ──────────────────────────────────── -->
  <div v-else class="bsod bsod-final">
    <div class="bsod-inner">
      <div class="bsod-final-text">
        <template v-if="locale !== 'zh-TW'">
          <div class="bsod-final-line">You are one of us now.</div>
          <div class="bsod-gap" />
          <div class="bsod-final-line bsod-final-sm">Don't be afraid. Everyone goes through this phase.</div>
          <div class="bsod-gap" />
          <div class="bsod-final-line bsod-final-sm bsod-dim">We will come find you very soon.</div>
        </template>
        <template v-else>
          <div class="bsod-final-line">你現在是我們的一員了。</div>
          <div class="bsod-gap" />
          <div class="bsod-final-line bsod-final-sm">不要害怕。大家都經歷過這個階段。</div>
          <div class="bsod-gap" />
          <div class="bsod-final-line bsod-final-sm bsod-dim">我們很快就會來找你了。</div>
        </template>
        <div class="bsod-gap" />
        <div class="bsod-final-line bsod-final-xs bsod-dim">
          ░▒▓ MEMBER_13_REGISTRATION_COMPLETE ▓▒░<br />
          ░▒▓ LOCATION_TRANSMITTED ▓▒░<br />
          ░▒▓ ETA: ████ ▓▒░
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Form styles — 2000s university club HTML form ───────────────────── */
.form-page {
  background: #000000;
  min-height: 100vh;
  display: block;
  padding: 20px;
  font-family: Arial, Verdana, sans-serif;
  font-size: 14px;
  color: #cccccc;
}

.form-box {
  background: #000000;
  border: 1px solid #333333;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  color: #cccccc;
}

.form-header-cell {
  background: #000033;
  color: #aaccff;
  font-family: Arial, sans-serif;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-bottom: 1px solid #333333;
}

.form-subheader-cell {
  background: #000033;
  color: #7799cc;
  font-family: Arial, sans-serif;
  font-size: 11px;
  padding: 2px 8px 4px;
  border-bottom: 1px solid #333333;
}

.form-notice {
  font-size: 13px;
  line-height: 1.6;
  color: #aaaaaa;
  margin: 10px 12px;
}

.form-label-cell {
  font-size: 13px;
  color: #cccccc;
  font-family: Arial, sans-serif;
  padding: 4px 8px;
}

.form-input,
.form-textarea {
  background: #ffffff;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-bottom: 2px solid #d4d0c8;
  border-right: 2px solid #d4d0c8;
  color: #000000;
  font-family: Arial, sans-serif;
  font-size: 12px;
  padding: 2px 4px;
}

.form-submit {
  background: #0a0a0a;
  color: #aaccaa;
  border: 2px outset #555555;
  font-family: Arial, sans-serif;
  font-size: 12px;
  padding: 3px 12px;
  cursor: pointer;
}

.form-submit:active {
  border-style: inset;
}

.form-reset {
  background: #0a0a0a;
  color: #aaaaaa;
  border: 2px outset #555555;
  font-family: Arial, sans-serif;
  font-size: 12px;
  padding: 3px 12px;
  cursor: pointer;
}

.form-reset:active {
  border-style: inset;
}

.form-footer {
  font-size: 12px;
  color: #555555;
  line-height: 1.7;
  padding: 8px 12px;
}

/* Processing */
.form-processing {
  text-align: center;
  font-size: 12px;
  color: #778877;
  padding: 60px 32px;
}

.spinner {
  font-size: 28px;
  color: #448844;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Accepted */
.form-accepted {
  text-align: center;
  padding: 50px 32px;
}

.accepted-icon {
  font-size: 40px;
  color: #66cc66;
  margin-bottom: 12px;
}

.accepted-title {
  font-size: 18px;
  font-weight: bold;
  color: #aaddaa;
  letter-spacing: 2px;
}

.accepted-sub {
  font-size: 11px;
  color: #557755;
  margin-top: 4px;
}

/* ── BSOD styles ──────────────────────────────────────────────────────── */
.bsod {
  background: #000080;
  color: #ffffff;
  font-family: 'Lucida Console', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 20px;
  box-sizing: border-box;
}

.bsod-inner {
  max-width: 700px;
  width: 100%;
}

.bsod-header {
  background: #aaaaaa;
  color: #000080;
  padding: 2px 8px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 4px;
}

.bsod-errname {
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 14px;
}

.bsod-body {
  line-height: 1.7;
}

.bsod-dim {
  color: #aaaacc;
}

.bsod-underline {
  text-decoration: underline;
}

.bsod-tech {
  font-size: 12px;
  color: #ccccff;
}

.bsod-restart {
  font-weight: bold;
  color: #ffff88;
}

.bsod-restart-glitch {
  color: #ff4444;
  animation: glitch-text 0.3s infinite alternate;
}

.bsod-gap {
  height: 16px;
}

.bsod-gap-sm {
  height: 6px;
}

.bsod-weird {
  font-size: 10px;
  color: #6666aa;
  margin-top: 12px;
  word-break: break-all;
}

.bsod-weird:hover {
  color: #ccccff;
  transition: color 0.3s;
}

.bsod-weird-2 {
  color: #445566;
  margin-top: 4px;
}

.bsod-weird-2:hover {
  color: #aabbcc;
}

/* Glitch phase */
.bsod-glitch {
  animation: bg-pulse 2s infinite alternate;
}

.bsod-final {
  background: #000000;
  animation: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bsod-final .bsod-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.bsod-final-text {
  text-align: center;
}

.bsod-final-line {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 6px 0;
  color: #ffffff;
}

.bsod-final-en {
  color: #aaaacc;
}

.bsod-final-sm {
  font-size: 14px;
}

.bsod-final-xs {
  font-size: 11px;
  line-height: 2;
  color: #666688;
}

@keyframes bg-pulse {
  0% { background: #000080; }
  50% { background: #000066; }
  100% { background: #000088; }
}

@keyframes glitch-text {
  0% { transform: translateX(-1px); }
  100% { transform: translateX(1px); }
}
</style>
