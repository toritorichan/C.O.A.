<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { locale } = useI18n()

const accessTime = new Date().toISOString()
const fakeUID = Math.random().toString(36).slice(2, 10).toUpperCase()
const fakeIP = `${Math.floor(Math.random()*100+100)}.${Math.floor(Math.random()*200+50)}.${Math.floor(Math.random()*100+100)}.${Math.floor(Math.random()*200+1)}`

const displayedLog = ref('')
const done = ref(false)

const logLines = locale.value === 'zh-TW' ? [
  `COA-ADMIN v2.██ — 管理系統介面`,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `存取時間：${accessTime}`,
  `來源 IP：${fakeIP}`,
  `連線 UID：COA-${fakeUID}`,
  ``,
  `認證中...`,
  `...`,
  `認證失敗。`,
  ``,
  `此介面僅限授權管理員存取。`,
  `您的存取嘗試已記錄於事件日誌。`,
  ``,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `系統事件日誌（最近10筆）`,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `[2001-03-17 03:17] ADMIN 登入成功 — 使用者：KAI-CHUN — 來源 IP：███.███.█.██`,
  `[2001-03-17 03:17] 成員記錄編輯 — 目標：COA-001 — 操作：覆蓋`,
  `[2001-03-17 03:18] 成員記錄編輯 — 目標：COA-001 — 操作：覆蓋`,
  `[2001-03-17 03:18] 成員記錄編輯 — 目標：COA-001 — 操作：覆蓋`,
  `[2001-03-17 03:18] 成員記錄編輯 — 目標：COA-001 — 操作：覆蓋`,
  `[2001-03-17 04:01] 管理員登出 — 使用者：KAI-CHUN`,
  `[2001-03-17 04:01] 管理員登入 — 使用者：KAI-CHUN // （注意：登入時間距上次登出僅4秒）`,
  `[████-██-██] 大量成員記錄覆蓋。操作者：ADMINISTRATOR。授權碼：████████`,
  `[████-██-██] 成員 #00 記錄已從系統刪除。無法復原。`,
  `[2013-07-13 03:17] 偵測到外部觀測者。訪問計數觸發閾值。成員#13 預分配序列啟動。`,
  `[${accessTime}] 未授權存取嘗試 — 來源 IP：${fakeIP} — UID：COA-${fakeUID}`,
  ``,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `系統初始化記錄`,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `SITE_ORIGIN       : 未知`,
  `CREATION_DATE     : ████-██-██  // 早於時間戳記錄系統`,
  `CREATOR           : ████████  // 記錄不存在`,
  `CREATOR_TYPE      : ████████  // 人類？不確定。無記錄可佐證。`,
  `FIRST_LOG_ENTRY   : ████-██-██  // 已損壞，無法確認`,
  ``,
  `注意：本網站最早的存取記錄早於所有已知的成員加入記錄。`,
  `      這個矛盾尚未被解決，也沒有被調查。`,
  ``,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `循環登記簿 — 唯讀`,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `編號  狀態        收錄      日期         備注`,
  `----  ----------  --------  -----------  -------------------`,
  `001   完成        13/13     ████-██-██   ████████████████`,
  `002   完成        13/13     ████-██-██   ████████████████`,
  `003   完成        13/13     ████-██-██   ████████████████`,
  `004   完成        13/13     ████-██-██   ████████████████`,
  `005   完成        13/13     ████-██-██   單元-11 異常：已隔離`,
  `006   完成        13/13     ████-██-██   單元-12 異常：已隔離`,
  `007   執行中      ??/13     2013-07-13   等待 #13 確認`,
  ``,
  `收錄要求 := 13`,
  `最終單元自願性 := true  // 訊號完整性條件`,
  ``,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  ``,
  `備注（未加密）：`,
  ``,
  `如果你在讀這個，說明你比我們預期的走得更深。`,
  `成員 #00 的記錄已被刪除，但位址仍然存在。`,
  `你已經知道要找什麼了。`,
  ``,
  `我們不會再阻止你。`,
  ``,
  `— 系統`,
  `  最後人工登入：████-██-██ 03:17`,
] : [
  `COA-ADMIN v2.██ — Administration Console`,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `Access time: ${accessTime}`,
  `Source IP: ${fakeIP}`,
  `Session UID: COA-${fakeUID}`,
  ``,
  `Authenticating...`,
  `...`,
  `Authentication failed.`,
  ``,
  `This interface is restricted to authorized administrators only.`,
  `Your access attempt has been appended to the incident log.`,
  ``,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `System Event Log (last 10 entries)`,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `[2001-03-17 03:17] ADMIN login success — user: KAI-CHUN — source IP: ███.███.█.██`,
  `[2001-03-17 03:17] Member record edit — target: COA-001 — op: OVERWRITE`,
  `[2001-03-17 03:17] Member record edit — target: COA-001 — op: OVERWRITE`,
  `[2001-03-17 03:18] Member record edit — target: COA-001 — op: OVERWRITE`,
  `[2001-03-17 03:18] Member record edit — target: COA-001 — op: OVERWRITE`,
  `[2001-03-17 04:01] Admin logout — user: KAI-CHUN`,
  `[2001-03-17 04:01] Admin login — user: KAI-CHUN // (note: 4 seconds between logout and re-login)`,
  `[████-██-██] Bulk member record overwrite. Operator: ADMINISTRATOR. Auth: ████████`,
  `[████-██-██] Member #00 record deleted from system. Non-recoverable.`,
  `[2013-07-13 03:17] External observer detected. Visit count threshold triggered. Member #13 pre-assignment sequence initiated.`,
  `[${accessTime}] Unauthorized access attempt — source IP: ${fakeIP} — UID: COA-${fakeUID}`,
  ``,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `System Initialization Record`,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `SITE_ORIGIN       : UNKNOWN`,
  `CREATION_DATE     : ████-██-██  // predates timestamp logging system`,
  `CREATOR           : ████████  // no record exists`,
  `CREATOR_TYPE      : ████████  // human? uncertain. no record to verify.`,
  `FIRST_LOG_ENTRY   : ████-██-██  // corrupted, cannot confirm`,
  ``,
  `NOTE: This site's earliest access records predate all known member join records.`,
  `      This discrepancy has not been resolved. It has not been investigated.`,
  ``,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `CYCLE REGISTRY — READ ONLY`,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  `ID    STATUS      INTAKE    DATE         NOTES`,
  `---   ----------  --------  -----------  -------------------`,
  `001   COMPLETE    13/13     ████-██-██   ████████████████`,
  `002   COMPLETE    13/13     ████-██-██   ████████████████`,
  `003   COMPLETE    13/13     ████-██-██   ████████████████`,
  `004   COMPLETE    13/13     ████-██-██   ████████████████`,
  `005   COMPLETE    13/13     ████-██-██   UNIT-11 anomaly: contained`,
  `006   COMPLETE    13/13     ████-██-██   UNIT-12 anomaly: contained`,
  `007   ACTIVE      ??/13     2013-07-13   awaiting #13 confirmation`,
  ``,
  `INTAKE_REQUIREMENT := 13`,
  `VOLUNTARY_FINAL_UNIT := true  // signal integrity condition`,
  ``,
  `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  ``,
  `NOTE (unencrypted):`,
  ``,
  `If you are reading this, you have gone deeper than we expected.`,
  `Member #00's record was deleted, but the address still exists.`,
  `You already know what to look for.`,
  ``,
  `We will not stop you anymore.`,
  ``,
  `— the system`,
  `  last human login: ████-██-██ 03:17`,
]

let idx = 0
let fullStr = logLines.join('\n')
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    if (idx < fullStr.length) {
      displayedLog.value += fullStr[idx]
      idx++
    } else {
      if (timer) clearInterval(timer)
      done.value = true
    }
  }, 12)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="admin-page">
    <pre class="admin-pre">{{ displayedLog }}<span v-if="!done" class="cursor">█</span></pre>
    <div v-if="done" class="admin-footer">
      <a href="#" @click.prevent="router.push('/')">← {{ locale === 'zh-TW' ? '返回主站' : 'return to main site' }}</a>
      &nbsp;&nbsp;
      <span class="admin-hint">
        <template v-if="locale !== 'zh-TW'">(Member #00 record: <a href="#" @click.prevent="router.push('/member/00')">/member/00</a>)</template>
        <template v-else>（成員 #00 記錄：<a href="#" @click.prevent="router.push('/member/00')">/member/00</a>）</template>
      </span>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: #000;
  padding: 32px 28px 60px;
  display: flex;
  flex-direction: column;
}
.admin-pre {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.84rem;
  color: #c8ffc8;
  background: transparent;
  line-height: 1.65;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  flex: 1;
  max-width: 820px;
}
.cursor {
  display: inline-block;
  animation: blink-c 0.8s step-end infinite;
}
@keyframes blink-c {
  50% { opacity: 0; }
}
.admin-footer {
  margin-top: 32px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #4a7a4a;
  max-width: 820px;
}
.admin-footer a {
  color: #7ab87a;
  text-decoration: underline;
}
.admin-footer a:hover {
  color: #aaffaa;
}
.admin-hint {
  font-size: 11px;
  color: #2a4a2a;
}
.admin-hint a {
  color: #3a7a3a;
  font-size: 11px;
}
</style>
