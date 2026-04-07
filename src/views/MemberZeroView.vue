<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const visible = ref(false)

onMounted(() => {
  setTimeout(() => { visible.value = true }, 600)
})
</script>

<template>
  <div class="page-container">
    <div class="xp-window">
      <div class="xp-window-body member-zero-body">

        <!-- Header -->
        <div class="page-header" style="text-align:center; padding-bottom:16px; border-bottom:1px solid #330000; margin-bottom:20px;">
          <h1 style="color:#cc2200; font-size:1.2rem; letter-spacing:4px;">
            <template v-if="locale !== 'zh-TW'">[ RECORD DELETED ]</template>
            <template v-else>【 記錄已刪除 】</template>
          </h1>
          <p style="color:#884444; font-size:12px;">
            <template v-if="locale !== 'zh-TW'">Member #00 — Original Record</template>
            <template v-else>成員 #00 — 原始記錄</template>
          </p>
        </div>

        <!-- Deletion notice -->
        <div class="deletion-notice">
          <p class="redacted-red">████████████████████████████████████████████████████</p>
          <p style="color:#553333; font-size:12px; margin-top:6px;">
            <template v-if="locale !== 'zh-TW'">
              This record was removed from the system on ████-██-██.<br>
              Reason: <span class="redacted-red">████████████████</span><br>
              Authorization code: <span class="redacted-red">████████</span>
            </template>
            <template v-else>
              此記錄已於 ████-██-██ 從系統中移除。<br>
              原因：<span class="redacted-red">████████████████</span><br>
              授權碼：<span class="redacted-red">████████</span>
            </template>
          </p>
        </div>

        <!-- Partial recovery -->
        <Transition name="fade">
          <div v-if="visible" class="recovered-data">
            <div class="recovered-label">
              <template v-if="locale !== 'zh-TW'">— PARTIAL RECOVERY — fragments only —</template>
              <template v-else>— 部分恢復 — 僅碎片 —</template>
            </div>

            <table class="info-table-zero">
              <tbody>
                <tr>
                  <td class="label-col">
                    <template v-if="locale !== 'zh-TW'">Codename</template>
                    <template v-else>代號</template>
                  </td>
                  <td class="value-col">
                    <template v-if="locale !== 'zh-TW'">Kai-Chun Cheng <span style="font-size:11px; color:#664444;">(original — see also: Member #01)</span></template>
                    <template v-else>鄭凱駿 <span style="font-size:11px; color:#664444;">（原始 — 另見：成員 #01）</span></template>
                  </td>
                </tr>
                <tr>
                  <td class="label-col">
                    <template v-if="locale !== 'zh-TW'">Join Date</template>
                    <template v-else>加入日期</template>
                  </td>
                  <td class="value-col">1998-03-07</td>
                </tr>
                <tr>
                  <td class="label-col">
                    <template v-if="locale !== 'zh-TW'">Last Confirmed Entry</template>
                    <template v-else>最後確認記錄</template>
                  </td>
                  <td class="value-col" style="color:#cc4400;">2001-03-17 03:14</td>
                </tr>
                <tr>
                  <td class="label-col">
                    <template v-if="locale !== 'zh-TW'">Status</template>
                    <template v-else>狀態</template>
                  </td>
                  <td class="value-col" style="color:#cc0000;">
                    <template v-if="locale !== 'zh-TW'">REMOVED FROM RECORDS</template>
                    <template v-else>已從記錄中移除</template>
                  </td>
                </tr>
                <tr>
                  <td class="label-col">
                    <template v-if="locale !== 'zh-TW'">Note</template>
                    <template v-else>備注</template>
                  </td>
                  <td class="value-col ghost-text-red" style="font-size:12px;">
                    <template v-if="locale !== 'zh-TW'">Member #01 and Member #00 share the same identification. The record was split on 2001-03-17. We do not know which one is which anymore.</template>
                    <template v-else>成員 #01 和成員 #00 使用同一個身份識別碼。記錄於 2001-03-17 被拆分。我們不再知道哪個才是真的。</template>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Fragment of last log entry -->
            <div class="last-fragment">
              <div class="fragment-label">
                <template v-if="locale !== 'zh-TW'">Last log fragment — 2001-03-17</template>
                <template v-else>最後日誌碎片 — 2001-03-17</template>
              </div>
              <blockquote class="fragment-quote">
                <template v-if="locale !== 'zh-TW'">
                  "I went out alone tonight. 03:00 observation window. The others didn't come.<br>
                  I found the signal source. It was not in the sky.<br>
                  It was [CORRUPTED]<br>
                  <br>
                  If anyone reads this — the one who comes back is not<br>
                  [RECORD ENDS]"
                </template>
                <template v-else>
                  「我今晚獨自外出了。03:00觀測窗口。其他人沒有來。<br>
                  我找到了訊號來源。它不在天上。<br>
                  它是 [已損毀]<br>
                  <br>
                  如果有人讀到這個——回來的那個不是<br>
                  [記錄終止]」
                </template>
              </blockquote>
            </div>
          </div>
        </Transition>

        <!-- Back link -->
        <div style="margin-top:28px; padding-top:12px; border-top:1px solid #220000;">
          <RouterLink to="/members" class="xp-button" style="font-size:12px;">
            <template v-if="locale !== 'zh-TW'">← Back to Registry</template>
            <template v-else>← 返回成員名冊</template>
          </RouterLink>
          <span style="margin-left:12px; font-size:11px; color:#442222;">
            <template v-if="locale !== 'zh-TW'">This page access has been logged.</template>
            <template v-else>此頁面的存取行為已被記錄。</template>
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.member-zero-body {
  padding: 24px;
}

.deletion-notice {
  background: #0d0000;
  border: 1px solid #440000;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 13px;
  line-height: 1.8;
}

.recovered-data {
  margin-top: 4px;
}

.recovered-label {
  font-size: 11px;
  color: #664444;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 16px;
  border-top: 1px dashed #330000;
  border-bottom: 1px dashed #330000;
  padding: 6px 0;
}

.info-table-zero {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-bottom: 20px;
}

.info-table-zero tr {
  border-bottom: 1px solid #1a0000;
}

.label-col {
  color: #664444;
  padding: 7px 10px 7px 0;
  width: 160px;
  vertical-align: top;
  font-size: 12px;
  letter-spacing: 1px;
}

.value-col {
  color: #c8c8c8;
  padding: 7px 0;
  vertical-align: top;
}

.last-fragment {
  background: #060006;
  border-left: 2px solid #440044;
  padding: 12px 16px;
  margin-top: 16px;
}

.fragment-label {
  font-size: 11px;
  color: #553355;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.fragment-quote {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #998899;
  line-height: 1.9;
  margin: 0;
  padding: 0;
  border: none;
  font-style: italic;
}

.fade-enter-active {
  transition: opacity 0.1s steps(1);
}
.fade-enter-from {
  opacity: 0;
}
</style>
