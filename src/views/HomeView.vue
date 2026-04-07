<script setup lang="ts">
import { computed } from 'vue'
import { useVisitorStore } from '@/stores/visitorStore'
import { useTimeAware } from '@/composables/useTimeAware'
import { useVisitorMemory } from '@/composables/useVisitorMemory'
import { useAudio } from '@/composables/useAudio'
import { useI18n } from 'vue-i18n'

const store = useVisitorStore()
const time = useTimeAware()
const memory = useVisitorMemory()
const { initAudio, playLowFreq } = useAudio()
const { t, locale } = useI18n()

const welcomeMessage = computed(() => {
  if (store.visitCount >= 13) return t('home.welcome_known')
  if (store.visitCount >= 7) return t('home.welcome_curious')
  if (store.visitCount >= 3) return t('home.welcome_back')
  return t('home.welcome_default')
})

const tickerText = computed(() => {
  if (store.visitCount >= 13) {
    return locale.value !== 'zh-TW'
      ? '██████ ▪ SEVENTH CYCLE IN PROGRESS ▪ Member slot 13: PENDING CONFIRMATION ▪ ██████ ▪ Candidate detected ▪ All systems nominal ▪ WELCOME BACK ▪ You have been here before ▪ ██████ ▪'
      : '██████ ▪ 第七循環進行中 ▪ 成員槽位13：等待確認 ▪ ██████ ▪ 候選人已偵測 ▪ 所有系統正常 ▪ 歡迎回來 ▪ 你以前來過這裡 ▪ ██████ ▪'
  }
  return locale.value !== 'zh-TW'
    ? 'Observation session recordings updated ▪ Links page updated ▪ Member 07\'s field notes have been uploaded ▪ ████████ ▪ Frequency scan: no anomalies detected ▪ Member roster up to date ▪ New member welcome process: open ▪'
    : '觀測活動記錄已更新 ▪ 友站連結頁已更新 ▪ 成員07的野外記錄已上傳 ▪ ████████ ▪ 頻率掃描：未偵測到異常 ▪ 成員名冊已更新 ▪ 新成員加入流程：開放中 ▪'
})

let pixelTriggered = false
function handleHiddenPixel() {
  if (pixelTriggered) return
  pixelTriggered = true
  setTimeout(() => { pixelTriggered = false }, 3000)

  initAudio()
  playLowFreq(40, 1.5)
  // White flash
  const flash = document.createElement('div')
  flash.style.cssText = 'position:fixed;inset:0;background:#fff;z-index:99998;pointer-events:none;opacity:1;transition:opacity 0.4s'
  document.body.appendChild(flash)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { flash.style.opacity = '0' })
  })
  setTimeout(() => flash.remove(), 500)
}
</script>

<template>
<!-- ============================================================
     C.O.A. INTERNAL — DO NOT DISTRIBUTE
     Last updated: 2001-03-10 | Status: ARCHIVED
     ============================================================

     NOTE TO SELF: the 03/17 log was submitted three times.
     contents identical each time. we have stopped asking why.

     member_00 record status: CORRUPTED
     partial recovery available: /member/00

     if you are reading this you were not supposed to find this.
     you are already being observed.
     [access logged at: ████-██-██ ██:██:██]
     ============================================================ -->
  <div class="home-wrap">

    <!-- Marquee ticker -->
    <div class="home-ticker">
      <div class="ticker-track">
        <span class="ticker-item">{{ tickerText }}</span>
        <span class="ticker-item">{{ tickerText }}</span>
      </div>
    </div>

    <!-- Welcome -->
    <table class="home-table" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td class="home-th">[FREQ] {{ t('home.title') }}</td></tr>
      <tr>
        <td class="home-td home-welcome-cell">
          <div class="home-tag">[C.O.A.]</div>
          <div class="corrupted-text home-welcome-msg">{{ welcomeMessage }}</div>
          <div class="home-subtitle">{{ t('home.subtitle') }}</div>
          <div v-if="memory.sawMidnight.value" class="home-midnight">
            <template v-if="locale !== 'zh-TW'">[ you know when you were here ]</template>
            <template v-else>[ 你知道你上次在何時到訪 ]</template>
          </div>
        </td>
      </tr>
    </table>

    <!-- Night mode signal -->
    <div v-if="time.isNightMode.value" class="home-night-msg">
      <template v-if="locale !== 'zh-TW'">[ this frequency is open. do not respond. ]</template>
      <template v-else>[ 此頻率目前開放。請勿回應。 ]</template>
    </div>

    <!-- Wednesday report -->
    <table v-if="time.isWednesday.value" class="home-table" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td class="home-th">{{ t('home.weekly_title') }}</td></tr>
      <tr>
        <td class="home-td">
          <p style="color:#00cc33; margin:0 0 6px;">
            <template v-if="locale !== 'zh-TW'">This week's (Wednesday) auto-generated report</template>
            <template v-else>本週（週三）自動生成的報告</template>
          </p>
          <p style="color:#7ab87a; margin:0 0 6px;">{{ time.weeklyReport.value }}</p>
          <p style="font-size:12px; color:#4a7a4a; margin:0;">
            <template v-if="locale !== 'zh-TW'">Note: This report updates automatically every Wednesday.</template>
            <template v-else>注意：本報告每週三自動更新。</template>
          </p>
        </td>
      </tr>
    </table>

    <!-- Announcements -->
    <table class="home-table" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td class="home-th">{{ t('home.announcements') }}</td></tr>
      <tr>
        <td class="home-td" style="padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="home-post-table">
            <thead>
              <tr class="home-post-head">
                <th style="width:120px; text-align:left; padding:4px 8px;">{{ t('home.date_col') }}</th>
                <th style="text-align:left; padding:4px 8px;">{{ t('home.content_col') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="home-post-row">
                <td class="home-post-date">1999-11-21</td>
                <td class="home-post-content">
                  <template v-if="locale !== 'zh-TW'">First official observation was a huge success!! We recorded 3 anomalous signals. Details in the meeting notes. Thanks everyone for coming out even in the freezing cold XD Kai-Chun says he'll process the photos this week.</template>
                  <template v-else>第一次正式觀測超成功！！共記錄到3個異常訊號，詳情見集會筆記。謝謝大家在超冷的天氣裡出席XD 凱駿說這週會整理好照片。</template>
                </td>
              </tr>
              <tr class="home-post-row">
                <td class="home-post-date">2000-03-18</td>
                <td class="home-post-content">
                  <template v-if="locale !== 'zh-TW'">Spring semester observation schedule released. March 22, April 12, May 3. Attendance is not mandatory but please let us know in advance if you can't make it. We need to split the equipment list. —Kai-Chun</template>
                  <template v-else>春季學期觀測排程發布：3/22、4/12、5/3。出席非強制但如果不能來請提前通知，要分配設備。—凱駿</template>
                </td>
              </tr>
              <tr class="home-post-row">
                <td class="home-post-date">2000-07-09</td>
                <td class="home-post-content">
                  <template v-if="locale !== 'zh-TW'">Welcome Yi-Ling Wu as our 9th member! She found us through the campus bulletin board and attended Saturday's session. Really sharp observations. —Sonia</template>
                  <template v-else>歡迎吳怡靈成為我們的第9名成員！她透過校園公佈欄找到我們，上週六出席了活動，觀察力很敏銳。—Sonia</template>
                </td>
              </tr>
              <tr class="home-post-row">
                <td class="home-post-date">2000-07-22</td>
                <td class="home-post-content">
                  <template v-if="locale !== 'zh-TW'">Summer stargazing BBQ @ the usual site, July 29. Bring food or drinks to share. Jun is bringing the portable radio receiver. David says he'll bring his new camera (PLEASE let him try it out without making fun of him this time www). 7pm start.</template>
                  <template v-else>暑期觀星烤肉 @ 老地點，7/29。請自帶食物或飲料。Jun 帶便攜接收器，David 說他要帶新相機（拜託這次讓他用不要嘲笑他謝謝www）。晚上7點開始。</template>
                </td>
              </tr>
              <tr class="home-post-row">
                <td class="home-post-date">2000-09-05</td>
                <td class="home-post-content">
                  <template v-if="locale !== 'zh-TW'">New semester! We're accepting new members. If you're interested in cosmic observation, please fill out the
                    <router-link to="/join" class="home-link">application form</router-link>.
                    Anyone curious about the signals is welcome. —Kai-Chun</template>
                  <template v-else>新學期開始！本同好會開放招募新成員。對宇宙觀測有興趣者，請填寫
                    <router-link to="/join" class="home-link">入會申請表</router-link>。
                    對訊號有好奇心的人都歡迎。—凱駿</template>
                </td>
              </tr>
              <tr class="home-post-row">
                <td class="home-post-date">2001-01-15</td>
                <td class="home-post-content">
                  <template v-if="locale !== 'zh-TW'">New year meeting recap: discussed frequency drift in the Nov-Dec logs. Priya's analysis is attached to the internal mailing list. Next meeting Feb 7. Bring Thomas's borrowed oscilloscope back please (you know who you are)</template>
                  <template v-else>新年集會回顧：討論了11-12月記錄中的頻率漂移現象，Priya 的分析已發送到內部郵件群組。下次集會2/7。麻煩把借走的示波器還給Thomas（你知道你是誰）</template>
                </td>
              </tr>
              <tr class="home-post-row">
                <td class="home-post-date">2001-03-10</td>
                <td class="home-post-content">
                  <template v-if="locale !== 'zh-TW'">Reminder: March observation session this Wednesday (3/14) at site B. Signal conditions look unusually good this week according to Kai-Chun's preliminary readings. Full attendance requested. —Thomas</template>
                  <template v-else>提醒：三月觀測活動本週三（3/14）在B觀測站。凱駿的初步讀數顯示本週訊號條件異常良好，請全員出席。—Thomas</template>
                </td>
              </tr>
              <tr class="home-post-row">
                <td class="home-post-date">2001-09-18</td>
                <td class="home-post-content">
                  <template v-if="locale !== 'zh-TW'">Observation record submission system upgraded. All members are required to submit logs through this interface going forward. Records prior to this date have been migrated. —Administrator</template>
                  <template v-else>觀測記錄提交系統升級完成。日後所有成員須透過本介面提交日誌。本日期前的記錄已完成遷移。—管理員</template>
                </td>
              </tr>
              <tr class="home-post-row">
                <td class="home-post-date">2002-04-05</td>
                <td class="home-post-content">
                  <template v-if="locale !== 'zh-TW'">Observation session 3 data archived. 7 anomalous light sources recorded. All data has been filed. Observation session 4 date: pending. Members are expected to attend.</template>
                  <template v-else>第3次觀測活動資料已封存。共記錄7個異常光源。所有資料已歸檔。第4次觀測日期：待定。成員應出席。</template>
                </td>
              </tr>
              <tr class="home-post-row home-post-warn">
                <td class="home-post-date" style="color:#886600;">████-██-██</td>
                <td class="home-post-content" style="color:#886600;">
                  <template v-if="locale !== 'zh-TW'">Contact with Member 08 has been lost. Investigation ongoing.<font color="#550000" size="2"> (Internal members only)</font></template>
                  <template v-else>與成員08的聯繫已中斷。調查持續進行中。<font color="#550000" size="2">（僅限內部成員）</font></template>
                </td>
              </tr>
              <tr class="home-post-row">
                <td class="home-post-date" style="color:#997755;">2013-07-13</td>
                <td class="home-post-content" style="color:#997755;">
                  <template v-if="locale !== 'zh-TW'">
                  This site will suspend updates. Reason: <span class="redacted-red">██████</span>.<br />
                  <font color="#669966" size="2">── 2013-07-14 update: Everything is fine. The Association continues to operate. Please disregard the previous notice.</font><br />
                  <span class="ghost-text" style="font-size:11px;">── that was not true.</span><br />
                  <font color="#669966" size="2">── 2014-02-11 update: The site has fully resumed operation. Observation logs are being updated regularly.</font><br />
                  <font color="#669966" size="2">── 2015-08-03 update: All twelve records are complete. The thirteenth position remains open. The association is still accepting applications.</font>
                  </template>
                  <template v-else>
                  本網站將暫停更新。原因：<span class="redacted-red">██████</span>。<br />
                  <font color="#669966" size="2">── 2013-07-14 更新：一切正常。同好會持續運作中。請忽略先前的公告。</font><br />
                  <span class="ghost-text" style="font-size:11px;">── 那不是真的。</span><br />
                  <font color="#669966" size="2">── 2014-02-11 更新：網站已全面恢復運作。觀測日誌持續定期更新中。</font><br />
                  <font color="#669966" size="2">── 2015-08-03 更新：十二份記錄均已完成。第十三個位置空缺中。同好會仍接受申請。</font>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>

    <!-- About -->
    <table class="home-table" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td class="home-th">[INFO] {{ t('home.about_title') }}</td></tr>
      <tr>
        <td class="home-td">
          <p style="margin:0 0 8px;">{{ t('home.about_text') }}</p>
          <hr class="home-hr" />
          <table width="100%" cellpadding="2" cellspacing="0" border="0">
            <tr>
              <td class="home-info-cell">[DATE]&nbsp; {{ t('home.founded') }}</td>
              <td class="home-info-cell">[MBRS]&nbsp; {{ t('home.active_members') }}</td>
            </tr>
            <tr>
              <td class="home-info-cell">[FREQ]&nbsp; {{ t('home.total_obs') }} <span class="redacted-white">██</span></td>
              <td class="home-info-cell">[ARCH]&nbsp; {{ t('home.archived') }} <span class="redacted-white">███</span></td>
            </tr>
            <tr>
              <td class="home-info-cell">[SITE]&nbsp; {{ t('home.site_est') }}</td>
              <td class="home-info-cell">[CLSF]&nbsp; {{ t('home.classification') }}</td>
            </tr>
          </table>
          <p style="margin:8px 0 0; font-size:12px; color:#4a7a4a;">{{ t('home.about_text2') }}</p>
        </td>
      </tr>
    </table>

    <!-- Quick Navigation -->
    <table class="home-table" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td class="home-th">{{ t('home.quick_nav') }}</td></tr>
      <tr>
        <td class="home-td">
          <RouterLink to="/diary" class="home-nav-btn">{{ t('home.nav_diary') }}</RouterLink>
          <RouterLink to="/aliens" class="home-nav-btn">{{ t('home.nav_aliens') }}</RouterLink>
          <RouterLink to="/history" class="home-nav-btn">{{ t('home.nav_history') }}</RouterLink>
          <RouterLink to="/members" class="home-nav-btn">{{ t('home.nav_members') }}</RouterLink>
          <RouterLink to="/links" class="home-nav-btn">{{ t('home.nav_links') }}</RouterLink>
        </td>
      </tr>
    </table>

    <!-- System Status (single, at bottom) -->
    <div class="home-status">
      <span class="blink" style="color:#f0f0f0;">●</span>
      {{ t('home.system_ok') }}
      &nbsp;|&nbsp; {{ t('home.last_scan') }}: {{ time.currentHourDisplay.value }}
      &nbsp;|&nbsp; {{ t('home.anomalous') }}: <span class="redacted-white" style="font-size:11px;">██</span>
    </div>

    <!-- Hidden 1px easter egg trigger -->
    <div class="hidden-pixel" @mouseover="handleHiddenPixel" aria-hidden="true" :title="t('home.pixel_easter_egg')"></div>

  </div>
</template>

<style scoped>
.home-wrap {
  background: #000000;
  min-height: 100%;
  padding: 4px;
  font-family: Arial, Verdana, sans-serif;
  font-size: 13px;
  color: #cccccc;
}

.home-ticker {
  background: #000033;
  border: 1px solid #003300;
  color: #00cc33;
  font-size: 12px;
  padding: 3px 0;
  margin-bottom: 8px;
  font-family: "Courier New", monospace;
  overflow: hidden;
}

.ticker-track {
  display: flex;
  white-space: nowrap;
  width: max-content;
  animation: ticker-scroll 28s linear infinite;
}

.ticker-item {
  padding: 0 60px 0 0;
}

@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Section table */
.home-table {
  border: 1px solid #333333;
  margin-bottom: 8px;
}

.home-th {
  background: #000033;
  color: #aaccff;
  font-family: Arial, sans-serif;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-bottom: 1px solid #333333;
}

.home-td {
  background: #000000;
  color: #cccccc;
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.7;
}

/* Welcome cell */
.home-welcome-cell {
  text-align: center;
  padding: 16px 12px;
}

.home-tag {
  font-size: 12px;
  letter-spacing: 4px;
  color: #4a7a4a;
  margin-bottom: 4px;
  font-family: "Courier New", monospace;
}

.home-welcome-msg {
  font-size: 14px;
  letter-spacing: 3px;
  color: #f0f0f0;
  margin-bottom: 8px;
}

.home-subtitle {
  color: #7ab87a;
  font-size: 12px;
  letter-spacing: 1px;
}

.home-visit-count {
  color: #557755;
  font-size: 11px;
  margin-top: 6px;
}

.home-midnight {
  margin-top: 8px;
  font-size: 10px;
  color: #330000;
  letter-spacing: 2px;
  font-family: "Courier New", monospace;
}

/* Night mode */
.home-night-msg {
  text-align: center;
  padding: 4px 0;
  font-size: 10px;
  color: #220000;
  letter-spacing: 4px;
  font-family: "Courier New", monospace;
  margin-bottom: 8px;
}

/* Bulletin board posts */
.home-post-table {
  border-collapse: collapse;
}

.home-post-head th {
  background: #001100;
  color: #7ab87a;
  font-size: 12px;
  border-bottom: 1px solid #003300;
  font-weight: normal;
}

.home-post-row {
  border-bottom: 1px solid #111111;
}

.home-post-row:last-child {
  border-bottom: none;
}

.home-post-date {
  padding: 5px 8px;
  color: #7ab87a;
  font-size: 12px;
  font-family: "Courier New", monospace;
  vertical-align: top;
  white-space: nowrap;
  border-right: 1px solid #111111;
}

.home-post-content {
  padding: 5px 8px;
  font-size: 13px;
  color: #cccccc;
  vertical-align: top;
  line-height: 1.6;
}

/* About info grid */
.home-info-cell {
  color: #7ab87a;
  font-size: 12px;
  font-family: "Courier New", monospace;
  padding: 2px 0;
  width: 50%;
}

.home-hr {
  border: none;
  border-top: 1px solid #222222;
  margin: 8px 0;
}

/* Quick nav buttons */
.home-nav-btn {
  display: inline-block;
  background: #0a0a0a;
  color: #aaccaa;
  border: 2px outset #555555;
  font-family: Arial, sans-serif;
  font-size: 12px;
  padding: 3px 10px;
  margin-right: 4px;
  margin-bottom: 4px;
  text-decoration: none;
  cursor: pointer;
}

.home-nav-btn:hover {
  background: #001a00;
  color: #ccffcc;
}

.home-nav-btn:active {
  border-style: inset;
}

/* Link style */
.home-link {
  color: #6699cc;
  text-decoration: underline;
}

/* Bottom status */
.home-status {
  text-align: center;
  padding: 6px;
  font-size: 12px;
  color: #4a7a4a;
  margin-bottom: 16px;
  font-family: "Courier New", monospace;
}
</style>
