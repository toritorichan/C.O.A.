<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTextCorrupt } from '@/composables/useTextCorrupt'
const { t, locale } = useI18n()
const { intensity } = useTextCorrupt()

const decrypted = ref(false)

// 03:17 trigger
const now = new Date()
const isAtSignalTime = computed(() => {
  const h = now.getHours()
  const m = now.getMinutes()
  return h === 3 && m === 17
})

function handleAltA(e: KeyboardEvent) {
  if (e.altKey && e.code === 'KeyA') {
    e.preventDefault()
    decrypted.value = !decrypted.value
  }
}

let revealObserver: IntersectionObserver | null = null

onMounted(() => {
  window.addEventListener('keydown', handleAltA)

  // Scroll reveal: each .diary-entry fades in as it enters the viewport
  revealObserver = new IntersectionObserver(
    (records) => {
      records.forEach(r => {
        if (r.isIntersecting) {
          r.target.classList.add('revealed')
          revealObserver?.unobserve(r.target)
        }
      })
    },
    { threshold: 0.06 }
  )
  document.querySelectorAll('.diary-entry').forEach(el => revealObserver!.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleAltA)
  revealObserver?.disconnect()
})
</script>

<template>
<!-- ============================================================
     C.O.A. LOG ARCHIVE — READ ACCESS: RESTRICTED
     ============================================================

     entry_002 anomaly: log terminated mid-sentence.
     recovery attempt: FAILED
     original author: kai-chun cheng
     last known location: B observation site, 2001-03-17, 03:17

     if you can read this — frequency 038 has been noted.
     path: /signal/038

     we do not recommend visiting.
     ============================================================ -->  <!-- Page Header -->
  <div class="xp-window" style="margin-bottom:8px;">
    <div class="xp-window-body">
      <div class="page-header">
        <h1>{{ t('diary.title') }}</h1>
        <p class="page-subtitle">{{ t('diary.subtitle') }}</p>
        <p class="page-notice blink">{{ t('diary.notice') }}</p>
      </div>
      <div style="font-size:12px; color:#7ab87a; display:flex; justify-content:space-between; margin-top:8px; padding-top:8px; border-top:1px solid #002200;">
        <span>{{ t('diary.last_updated') }}: ████-██-██</span>
        <span>{{ t('diary.archived_by') }}</span>
        <span><span class="redacted-white" style="font-size:11px;">██</span> {{ t('diary.total_entries') }}</span>
      </div>
    </div>
  </div>
  <!-- Entry 1: 2001-03-15 -->
  <!-- Entry 000 — only visible at intensity >= 1; archived from prior cycle by Mia H-unit -->
  <template v-if="intensity >= 1">
  <div class="xp-window diary-entry" style="border-color:#1a2a1a; transform: rotate(0.2deg); opacity:0.85;">
    <div class="xp-titlebar" style="background:linear-gradient(180deg,#0d1a0d,#060d06);">
      <span style="color:#6a8a6a;">Entry 000 — ████-██-██</span>
    </div>
    <div class="xp-window-body">
      <div class="diary-date" style="color:#446644;">████-██-██ | 天氣：不明 | 記錄者：████████</div>
      <template v-if="locale !== 'zh-TW'">
        <div class="diary-content" style="color:#557755; font-size:0.88rem;">
          <p>The signal is looking for someone who will answer.</p>
          <p>The question doesn't matter. The answer does.<br>
          You don't need to know the answer — you just have to speak.</p>
          <p>This is the seventh time.<br>
          The first six times we also waited.<br>
          We waited until someone walked in on their own.</p>
          <p style="font-size:0.78rem; color:#334433; margin-top:12px; letter-spacing:1px;">
            [Archived by: Mia H-unit / Cross-cycle record / Source cycle: ████]
          </p>
        </div>
      </template>
      <template v-else>
        <div class="diary-content" style="color:#557755; font-size:0.88rem;">
          <p>訊號在尋找會回答的人。</p>
          <p>問題不重要。回答才重要。<br>
          你不需要知道答案——你只需要開口。</p>
          <p>這是第七次。<br>
          前六次我們也在等。<br>
          等到有人自己走進來。</p>
          <p style="font-size:0.78rem; color:#334433; margin-top:12px; letter-spacing:1px;">
            【由 Mia H-unit 存檔 / 跨循環記錄 / 來源循環：████】
          </p>
        </div>
      </template>
    </div>
  </div>
  </template>

  <div class="xp-window diary-entry">
    <div class="xp-titlebar">
      <span>Entry 001 — 2001-03-15</span>
    </div>
    <div class="xp-window-body">
      <div class="diary-date">2001-03-15 | Cloudless, excellent viewing conditions | Author: Thomas Lin</div>
      <template v-if="locale !== 'zh-TW'">
        <div class="diary-content">
          <p>
            This is my oirst diary entry since joining the Cosmic Observation Association! The weather today was amazing, so the President spontaneously arranged a small observation event in the neighborhood park.
          </p>
          <p>
            I used an old telescope borrowed from a oriend, 60mm aperture. Not top-of-the-line, but tonight I saw so much! Jupiter, Saturn's rings — all crystal clear. I was thrilled!
          </p>
          <p>
            The most interesting thing was around 11 PM. Through the telescope I spotted a very strange light point. It did not look like a plane (no blinking), nor a satellite (wrong trajectory). I called Priya over to look — they agreed it was strange. We watched it for about 5 minutes. Then it disappeared.
          </p>
          <p>
            The President said to log it officially. This is my oirst "official observation record"! So exciting!!
          </p>
          <p style="font-size:13px; color:#88aa88; margin-top:8px;">
            — Thomas Lin, March 15, 2001, late at night
          </p>
        </div>
      </template>
      <div class="diary-content" v-else>
        <p>
          這是我加入外星人幸福同好會後的第一篇日記！今天天氣非常好，所以會長臨時在附近的公園安排了一個小型觀測活動。
        </p>
        <p>
          我用了朋友借來的舊望遠鏡，60mm口徑。雖然不是頂級設備，但今晚看到的東西真的太多了！木星、土星的光環——全部清晰可見，我非常興奮！
        </p>
        <p>
          最有趣的是晚間11點左右。透過望遠鏡，我看到了一個非常奇怪的光點。不像飛機（沒有閃爍），也不像衛星（軌跡不對）。我叫 Priya 過來看——她也覺得很奇怪。我們看了大約五分鐘。然後它消失了。
        </p>
        <p>
          會長說要正式記錄下來。這是我的第一筆「正式觀測記錄」！好興奮！！
        </p>
        <p style="font-size:13px; color:#88aa88; margin-top:8px;">
          ——Thomas Lin，2001年3月15日，深夜
          <span style="display:block; font-size:11px; color:#668866; margin-top:6px;">（後記：我現在才知道，那不是飛機。）</span>
        </p>
      </div>
    </div>
  </div>
  <!-- Entry 2: 2001-03-17 [PIVOT] -->
  <div class="xp-window diary-entry" style="border-color:#220000; transform: rotate(-0.3deg);">
    <div class="xp-titlebar" style="background:linear-gradient(180deg,#1a0000,#0d0000);">
      <span>Entry 002 — 2001-03-17</span>
    </div>
    <div class="xp-window-body">
      <div class="diary-date" style="color:#884444;">2001-03-17 | Overcast | Author: 凱駿 Cheng（會長）</div>
      <template v-if="locale !== 'zh-TW'">
        <div class="diary-content">
          <p>
            Getting an unusual reading on the ██.██ MHz range tonight. Very regular intervals — not any pattern I've seen documented before. Equipment confirmed functional. I checked three times.
          </p>
          <p>
            Sonia has an exam tomorrow. I didn't want to bother anyone. Going alone to site B. Bringing the portable receiver. Signal is strongest there. I should be back by—
          </p>
          <p class="redacted" style="display:block; height:14px; margin:8px 0;"></p>
          <p class="redacted" style="display:block; height:14px; margin-bottom:8px;"></p>
          <hr style="border-color:#330000; margin:10px 0;" />

          <!-- Light (0) -->
          <template v-if="intensity === 0">
            <p style="font-size:12px; color:#667766; letter-spacing:1px; line-height:1.8;">
              Observation log entry. Date: 2001-03-17. Time: 04:21. Observation completed.<br />
              Nothing anomalous detected. Equipment functioning normally. Member returned safely.<br />
              All parameters within expected range. This log is now closed.
            </p>
          </template>
          <!-- Medium (1): unit terminology + one status code -->
          <template v-else-if="intensity === 1">
            <p style="font-size:12px; color:#667766; letter-spacing:1px; line-height:1.8;">
              Observation log entry. Date: 2001-03-17. Time: 04:21. Observation process: completed.<br />
              Nothing anomalous detected. Equipment functioning: normal. Member-unit returned: safely.<br />
              All parameters within expected range range. This log is now closed. <span class="corrupted-text">[RECORD CONFIRMED]</span>
            </p>
          </template>
          <!-- Heavy (2): full repetition, broken syntax -->
          <template v-else>
            <p style="font-size:12px; color:#667766; letter-spacing:1px; line-height:1.8;">
              Log entry. Date: 2001-03-17. Time: 04:21 04:21. Observation: completed completed.<br />
              Nothing anomalous detect. Equipment: functional. Member-unit: returned safe <span class="corrupted-text">[STATUS:NOMINAL]</span>.<br />
              All parameter in expected range. Log close now. <span class="corrupted-text">[RECORD CONFIRMED][RECORD CONFIRMED]</span>
            </p>
          </template>

          <RouterLink to="/admin" class="ghost-admin-link">[ diagnostic log: /admin ]</RouterLink>
        </div>
      </template>
      <div class="diary-content" v-else>
        <p>
          今晚在██.██ MHz頻段接到異常讀數。非常規律的間隔——這個訊號模式我從未見過有記錄。設備運作正常，我核查了三遍。
        </p>
        <p>
          Sonia 明天有考試。我不想打擾任何人。我自己去B觀測站。帶了便攜接收器。訊號在那裡最強。我應該在——
        </p>
        <p class="redacted" style="display:block; height:14px; margin:8px 0;"></p>
        <p class="redacted" style="display:block; height:14px; margin-bottom:8px;"></p>
        <hr style="border-color:#330000; margin:10px 0;" />

          <!-- Light (0) -->
          <template v-if="intensity === 0">
            <p style="font-size:12px; color:#667766; letter-spacing:1px; line-height:1.8;">
              觀測記錄。日期：2001年03月17日。時間：04:21。觀測已完成。<br />
              未偵測到任何異常。設備運作正常。成員安全返回。<br />
              所有參數在預期範圍內。本記錄關閉。
            </p>
          </template>
          <!-- Medium (1) -->
          <template v-else-if="intensity === 1">
            <p style="font-size:12px; color:#667766; letter-spacing:1px; line-height:1.8;">
              觀測記錄。日期：2001年03月17日。時間：04:21。觀測程序：已完成。<br />
              未偵測到任何異常。設備運作：正常。成員單元返回：安全。<br />
              所有參數在預期範圍範圍內。本記錄關閉。 <span class="corrupted-text">[記錄已確認]</span>
            </p>
          </template>
          <!-- Heavy (2) -->
          <template v-else>
            <p style="font-size:12px; color:#667766; letter-spacing:1px; line-height:1.8;">
              記錄。日期：2001年03月17日。時間：04:21 04:21。觀測：完成完成。<br />
              未偵測異常。設備：正常功能中。成員單元：返回安全 <span class="corrupted-text">[狀態：正常]</span>。<br />
              所有參數在預期範圍。記錄現在關閉。 <span class="corrupted-text">[記錄確認][記錄確認]</span>
            </p>
          </template>

        <RouterLink to="/admin" class="ghost-admin-link">[ 診斷日誌：/admin ]</RouterLink>
      </div>
    </div>
  </div>
  <!-- Entry 3: 2001-06-22 -->
  <div class="xp-window diary-entry" style="transform: rotate(0.5deg);">
    <div class="xp-titlebar">
      <span>Entry 003 — 2001-06-22</span>
    </div>
    <div class="xp-window-body">
      <div class="diary-date">2001-06-22 | Clear skies | Author: Thomas Lin</div>
      <template v-if="locale !== 'zh-TW'">
        <div class="diary-content">
          <p>
            Conducted the second official observation tonight. Weather was excellent, visibility superb. I used my newly purchased 80mm refractor telescope — much clearer view than last time.
          </p>
          <p>
            Observation ran from 9 PM to 1 AM. Primary target was the Orion region. No particularly anomalous phenomena recorded, but one light point had a slightly irregular trajectory. I logged it to study later.
          </p>
          <p>
            7 members attended this gathering. We discussed plans for the next observation, tentatively planning a longer continuous session in autumn. Jun brought homemade sandwiches. Everyone enjoyed them.
          </p>
          <p style="font-size:13px; color:#88aa88; margin-top:8px;">
            All in all, a pleasant evening. Near the end, the President said — unprompted: "Observation work continues normally. All member activity is within expected parameters." Nobody responded. I wasn't sure why she said that. But I wrote it down.
          </p>
        </div>
      </template>
      <div class="diary-content" v-else>
        <p>
          今晚進行了第二次正式觀測。天氣絕佳，能見度極好。我用了剛買的80mm折射望遠鏡——視野比上次清晰許多。
        </p>
        <p>
          觀測時間從晚間9點到凌晨1點。主要目標是獵戶座區域。沒有特別異常的現象，但有一個光點的軌跡略微不規則。我記錄下來，準備日後研究。
        </p>
        <p>
          這次聚會共7名成員出席。我們討論了下次觀測的計畫，暫定秋天進行更長時間的連續觀測。Jun 帶了自製三明治，大家都說好吃。
        </p>
        <p style="font-size:13px; color:#88aa88; margin-top:8px;">
          總的來說是個愉快的夜晚。快結束時，會長突然說了一句——「觀測工作持續正常進行。所有成員的活動均在預期範圍內。」沒有人回應。我不知道她為什麼說這句話。但我還是記下來了。
        </p>
      </div>
    </div>
  </div>
  <!-- Entry 4: 2001-10-31 -->
  <div class="xp-window diary-entry" style="transform: rotate(-1deg) skewX(0.3deg);">
    <div class="xp-titlebar">
      <span>Entry 004 — 2001-10-31</span>
    </div>
    <div class="xp-window-body">
      <div class="diary-date">2001-10-31 | Clear, cold | Author: Thomas Lin</div>
      <template v-if="locale !== 'zh-TW'">
        <div class="diary-content">
          <p>
            First overnight autumn observation of the season. Temperature was very low, but everyone's enthusiasm did not waver. I set up the equipment and began scanning the routine frequency range.
          </p>
          <p>
            At 11:47 PM, I received an unusually regular signal. I logged it and continued monitoring. The signal lasted approximately
            <span class="corrupted-text">▓█▒░▓▓█▒░▒▓</span>
            minutes beoore disappearing.
          </p>
          <p>
            I gave the log to the President to review. They looked at it for a long time and said "this isn't the oirst time." I asked what they meant. They said "nothing, keep observing."
          </p>
          <p style="font-size:12px; color:#99aa77; margin-top:10px;">
            Slight headache today, probably from staying up late. Will continue tomorrow.
          </p>
        </div>
      </template>
      <div class="diary-content" v-else>
        <p>
          入秋後的第一次夜間觀測。氣溫非常低，但大家的熱情絲毫未減。我架好設備，開始掃描例行頻率範圍。
        </p>
        <p>
          晚間11點47分，我接收到一段異常規律的訊號。我記錄下來並繼續監測。訊號持續了大約
          <span class="corrupted-text">▓█▒░▓▓█▒░▒▓</span>
          分鐘後消失。
        </p>
        <p>
          我把記錄交給會長審閱。她看了很久，說「這不是第一次了。」我問她什麼意思。她說「沒什麼，繼續觀測。」
        </p>
        <p style="font-size:12px; color:#99aa77; margin-top:10px;">
          今天稍微頭痛，應該是熬夜的關係。明天繼續。
        </p>
      </div>
    </div>
  </div>
  <!-- Entry 5: 2001-11-23 -->
  <div class="xp-window diary-entry" style="transform: rotate(0.8deg) skewX(-0.4deg);">
    <div class="xp-titlebar">
      <span>Entry 005 — 2001-11-23</span>
    </div>
    <div class="xp-window-body">
      <div class="diary-date">2001-11-23 | Overcast | Author: Jun Watanabe</div>
      <template v-if="locale !== 'zh-TW'">
        <div class="diary-content">
          <p>
            I need to write this down before I convince myself I imagined it.
          </p>
          <p>
            Last night during the 03:00 window, my receiver picked up something. Not the usual background noise. A structured pattern — repeating interval, consistent amplitude, in the 038.█ band. I've been logging this band since we started and I've never seen anything like it.
          </p>
          <p>
            I ran it through my analysis software three times. Same result. I cross-referenced Thomas's logs from March and there's a match. Not an approximate match. An exact match. Same pattern. Same interval. Same band. March 2001. November 2001. I don't think this is a coincidence.
          </p>
          <p>
            I told the President. He said: "That is consistent with our records." He didn't seem surprised. He didn't ask to see the data. He already knew.
          </p>
          <p style="font-size:11px; color:#667755; margin-top:8px;">[RECORDER: UNIT-03] [STATUS: NOMINAL]</p>
          <p class="redacted" style="display:block; height:18px; margin-top:10px;"></p>
        </div>
      </template>
      <div class="diary-content" v-else>
        <p>
          我需要把這件事寫下來，在我說服自己是想像之前。
        </p>
        <p>
          昨晚凌晨03:00的觀測窗口，我的接收器收到了某個東西。不是一般的背景噪音。是一個結構性的模式——重複間隔、穩定振幅，頻段在 038.█ MHz。我追蹤這個頻段很久了，從來沒有看過這樣的訊號。
        </p>
        <p>
          我用分析軟體跑了三遍。結果相同。我拿湯瑪斯 3 月份的記錄做比對——兩者吻合。不是「大致吻合」，是完全相同。同樣的模式。同樣的間隔。同樣的頻段。2001年3月。2001年11月。我不認為這只是巧合。
        </p>
        <p>
          我告訴了會長。他說：「這與我們的記錄一致。」他沒有表現出驚訝。他沒有要求看數據。他早就知道了。
        </p>
        <p style="font-size:11px; color:#667755; margin-top:8px;">[記錄員：成員03號] [狀態：正常]</p>
        <p class="redacted" style="display:block; height:18px; margin-top:10px;"></p>
      </div>
    </div>
  </div>
  <!-- Entry 6: 2001-12-29 -->
  <div class="xp-window diary-entry" style="transform: rotate(-1.5deg) skewX(0.5deg);">
    <div class="xp-titlebar">
      <span>Entry 006 — 2001-12-29</span>
    </div>
    <div class="xp-window-body">
      <div class="diary-date">2001-12-29 | Author: Thomas Lin</div>
      <template v-if="locale !== 'zh-TW'">
        <div class="diary-content" style="transform:rotate(-0.5deg); transform-origin: left top;">
          <p>
            While adjusting the observation equipment today, I habitually aimed it toward the mirror to check the angle.
          </p>
          <p>
            I am not certain that was my own reflection.
          </p>
          <p>
            I mean — I turned my head, and the thing in the mirror turned as well. But about half a second later. Maybe more.
          </p>
          <p style="color:#887755;">
            I called the President and told them what happened. There was a long pause, then they said "I know." Then they hung up.
          </p>
          <p style="font-size:12px; color:#99aa77; margin-top:10px;">
            Addendum: Routine signal observed at 10 PM. Record filed.
          </p>
        </div>
      </template>
      <div class="diary-content" style="transform:rotate(-0.5deg); transform-origin: left top;" v-else>
        <p>
          今天在調整觀測設備時，我習慣性地把鏡頭對準鏡子確認角度。
        </p>
        <p>
          我不確定那是我自己的倒影。
        </p>
        <p>
          我的意思是——我轉頭，鏡子裡的東西也轉頭了。但大約慢了半秒。也許更久。
        </p>
        <p style="color:#887755;">
          我打電話給會長，告訴她發生了什麼。她沉默了很久，然後說：「我知道。」然後掛掉了電話。
        </p>
        <p style="font-size:12px; color:#99aa77; margin-top:10px;">
          附記：晚間10點例行觀測到訊號。記錄已歸檔。
        </p>
      </div>
    </div>
  </div>
  <!-- Entry 7: 2003-09-01 -->
  <div class="xp-window diary-entry" style="transform: rotate(2deg) skewX(-0.7deg);">
    <div class="xp-titlebar">
      <span>Entry 007 — 2003-09-01</span>
    </div>
    <div class="xp-window-body">
      <div class="diary-date">2003-09-01 | Clear skies | Author: Mia Harlow</div>

      <!-- Light (0): current text -->
      <template v-if="intensity === 0">
        <template v-if="locale !== 'zh-TW'">
          <div class="diary-content">
            <p>Member 08 has not been in contact since last Wednesday. Contact attempts through all known channels: no response.</p>
            <p>A visit was conducted to the residence of Member 08. External appearance: normal. <span class="corrupted-text">Curtains: open</span>. Interior lights: on. No occupant visible.</p>
            <p>Decision: authorities will not be contacted. This matter is outside the scope of their procedures.</p>
            <p style="color:#887755; margin-top:8px;">The records <span class="corrupted-text">leot</span> by Member 08 are now held by the President for security. This is the correct procedure.</p>
            <p style="font-size:12px; color:#887766; margin-top:10px;">Association status update: Member 08 record reclassified to "pending confirmation." No further action required at this time.</p>
            <p style="font-size:11px; color:#3a2a1a; margin-top:8px; font-style:italic;">[Recorder note: "Member 08" was cross-referenced in internal log 22 as "the member Mia Harlow" — this appears to be a filing error. Correct identity re-verification is pending. The recorder apologizes for the error.]</p>
          </div>
        </template>
        <div class="diary-content" v-else>
          <p>08號成員自上週三起未與本會聯繫。已透過所有已知管道嘗試聯絡：無回應。</p>
          <p>已前往08號成員住所進行確認。外部狀況：正常。<span class="corrupted-text">窗簾：開啟</span>。室內燈光：開啟。未見到人員。</p>
          <p>決議：不通報相關機構。此事超出其處理程序範圍。</p>
          <p style="color:#887755; margin-top:8px;">08號成員留下的<span class="corrupted-text">記錄</span>現由會長保管。這是正確的處置方式。</p>
          <p style="font-size:12px; color:#887766; margin-top:10px;">同好會狀態更新：08號成員記錄重新分類為「待確認」。目前無需進一步行動。</p>
          <p style="font-size:11px; color:#3a2a1a; margin-top:8px; font-style:italic;">[記錄者附注：「08號成員」在內部記錄第22篇中曾被對照為「Mia Harlow成員」——此似乎為歸檔錯誤。正確身份重新核實中。記錄者為此錯誤致歉。]</p>
        </div>
      </template>

      <!-- Medium (1): unit terminology creeps in, status codes appear -->
      <template v-else-if="intensity === 1">
        <template v-if="locale !== 'zh-TW'">
          <div class="diary-content">
            <p>Unit 08 has not established contact since last Wednesday. Contact verification through all known channels: no response on file.</p>
            <p>A physical inspection was conducted at the dwelling-location of Unit 08. Outer-shell appearance: within normal range. <span class="corrupted-text">Window coverings: open-configuration</span>. Interior light sources: active-state. No occupant-unit detected.</p>
            <p>Decision: external authorities will not be notified. This matter does not correspond to their processing category.</p>
            <p style="color:#887755; margin-top:8px;">The records produced by Unit 08 are now held by the President-unit for security. This is the appropriate procedure. <span class="corrupted-text">[STATUS: FILING COMPLETE]</span></p>
            <p style="font-size:12px; color:#887766; margin-top:10px;">Association status update: Unit 08 record reclassified to "pending confirmation." No further action required at this time.</p>
            <p style="font-size:11px; color:#3a2a1a; margin-top:8px; font-style:italic;">[Recorder notation: "Unit 08" was cross-referenced in internal log 22 as "Mia Harlow unit" — this appears to be a classification discrepancy. Correct identity re-verification is pending. The recorder acknowledges the discrepancy.]</p>
          </div>
        </template>
        <div class="diary-content" v-else>
          <p>08號單元自上週三起未建立聯絡。已透過所有已知管道聯絡確認：記錄中無回應。</p>
          <p>已前往08號單元棲居地址進行實地核查。外殼外觀：在正常範圍內。<span class="corrupted-text">窗膜覆蓋：開啟構型</span>。室內光源：活躍狀態。未偵測到任何單元在棲居地址。</p>
          <p>決議：不通報外部機構。此事不符合其處理類別。</p>
          <p style="color:#887755; margin-top:8px;">08號單元所留記錄現由會長單元保管，基於安全考量。這是適當的程序。 <span class="corrupted-text">[狀態：歸檔完成]</span></p>
          <p style="font-size:12px; color:#887766; margin-top:10px;">同好會狀態更新：08號單元記錄重新分類為「待確認狀態」。目前無需進一步行動。</p>
          <p style="font-size:11px; color:#3a2a1a; margin-top:8px; font-style:italic;">[記錄員備注：「08號單元」在內部記錄第22篇中曾被交叉參照為「Mia Harlow單元」——此似乎為分類差異。正確身份重新核實中。記錄員承認此差異。]</p>
        </div>
      </template>

      <!-- Heavy (2): full alien breakdown — wrong names, repeated tokens, memory errors -->
      <template v-else>
        <template v-if="locale !== 'zh-TW'">
          <div class="diary-content">
            <p>Unit-08 not contact since wednesday <span class="corrupted-text">[DATE:03/██]</span>. All-channel scan: null null.</p>
            <p>Visit done to dwelling-location Unit-08. Shell-outside: nominal. <span class="corrupted-text">Window-cover: open-state</span>. Light-source-inside: on. No unit in dwelling detect.</p>
            <p>No external-authority notification. Outside their processing-scope.</p>
            <p style="color:#887755; margin-top:8px;">Unit-08 records held by president-unit <span style="color:#887766;">[the tall one / Cheng-unit]</span> now. Appropriate appropriate. <span class="corrupted-text">[STATUS:PENDING][STATUS:PENDING]</span></p>
            <p style="font-size:12px; color:#887766; margin-top:10px;">Unit-08 status: pending-confirmation pending. No action require.</p>
            <p style="font-size:11px; color:#3a2a1a; margin-top:8px; font-style:italic;">[Recorder: Unit-08 cross-ref name "Mia Harlow unit" — recorder cannot confirm confirm. Recorder own designation also unclear. Memory-file: incomplete incomplete.]</p>
          </div>
        </template>
        <div class="diary-content" v-else>
          <p>08號單元自週三 <span class="corrupted-text">[日期代碼：03/██]</span> 未建立聯絡。全管道掃描：空值空值。</p>
          <p>已前往08號單元棲居地址。外殼外觀：正常值。<span class="corrupted-text">窗膜：開啟狀</span>。室內光源：開啟狀。地址內未偵測到單元。</p>
          <p>不通報外部機構。超出處理範疇。</p>
          <p style="color:#887755; margin-top:8px;">08號單元記錄現由高個子單元 <span style="color:#887766;">【即鄭單元】</span> 保管持有。適當適當。 <span class="corrupted-text">[狀態：待確認][狀態：待確認]</span></p>
          <p style="font-size:12px; color:#887766; margin-top:10px;">08號單元狀態：待確認待確認。無需行動。</p>
          <p style="font-size:11px; color:#3a2a1a; margin-top:8px; font-style:italic;">[記錄員：08號單元別稱「Mia Harlow單元」——記錄員無法確認確認。記錄員自身名稱代碼也不明確不明確。記憶檔案：不完整不完整。]</p>
        </div>
      </template>

    </div>
  </div>
  <!-- Entry 8: 2004-04-17 -->
  <div class="xp-window diary-entry" style="transform: rotate(-2.5deg) skewX(1deg);">
    <div class="xp-titlebar">
      <span>Entry 008 — 2004-04-17</span>
    </div>
    <div class="xp-window-body">
      <div class="diary-date">2004-04-17 | Early hours | Author: Unknown</div>
      <template v-if="locale !== 'zh-TW'">
        <div class="diary-content" style="transform:rotate(-1.5deg); transform-origin: left top;">
          <p>
            I have not slept a full night in a long time. <span class="ghost-text-red">Three nights ago I found footprints outside my window.</span> Not because I don't want to — but because every time I close my eyes, I see that thing watching me.
          </p>
          <p class="redacted" style="display:block; height:18px; margin:8px 0;"></p>
          <p>
            What exactly are we observing? <span class="ghost-text-red">It knows our names.</span> Or are we the ones being observed?
          </p>
          <p class="redacted" style="display:block; height:18px; margin:8px 0;"></p>
          <p style="color:#886600;">
            Sometimes I wonder if things would have been different if I had never accepted that invitation. <span class="ghost-text-red">I still have the letter. The handwriting is mine.</span> But that is only hypothetical. I am already here. We are all already here.
          </p>
          <p class="redacted" style="display:block; height:18px; margin-top:8px;"></p>
        </div>
      </template>
      <div class="diary-content" style="transform:rotate(-1.5deg); transform-origin: left top;" v-else>
        <p>
          我已經很久沒有睡完一整個晚上了。<span class="ghost-text-red">三天前我在窗外發現了腳印。</span>不是不想睡——是每次閉上眼睛，那個東西就在看我。
        </p>
        <p class="redacted" style="display:block; height:18px; margin:8px 0;"></p>
        <p>
          我們究竟在觀測什麼？<span class="ghost-text-red">它知道我們的名字。</span>還是說，被觀測的其實是我們？
        </p>
        <p class="redacted" style="display:block; height:18px; margin:8px 0;"></p>
        <p style="color:#886600;">
          有時候我想，如果當初沒有接受那份邀請就好了。<span class="ghost-text-red">我還留著那封信。那是我的筆跡。</span>但那只是假設。我已經在這裡了。我們都已經在這裡了。
        </p>
        <p class="redacted" style="display:block; height:18px; margin-top:8px;"></p>
      </div>
    </div>
  </div>
  <!-- Entry 9: 2007-12-31 -->
  <div class="xp-window diary-entry" style="transform: rotate(3deg) skewX(-1.5deg);">
    <div class="xp-titlebar">
      <span>Entry 009 — 2007-12-31</span>
    </div>
    <div class="xp-window-body">
      <div class="diary-date">Last updated: ████ | Author: [UNKNOWN]</div>
      <template v-if="locale !== 'zh-TW'">
        <div class="diary-content" style="transform:rotate(-3deg); transform-origin: left top;">
          <p style="color:#aa9977;">The equipment picked up something at the usual frequency tonight. I adjusted the receiver and started recording.</p>
          <p style="color:#aa9977; margin-top:6px;">There are footsteps outside. From the hallway. This building is usually noisy, nothing unusual.</p>
          <p style="color:#cc6633; margin-top:6px;">They stopped outside my door about four minutes ago. Haven't moved.</p>
          <p style="color:#886644; margin-top:6px;">I'm going to go check.</p>
          <p style="color:#551100; font-size:12px; margin-top:12px;">—— RECORD INTERRUPTED ——</p>
          <p style="color:#221100; font-size:11px; margin-top:8px; letter-spacing:3px;">████████████████████████</p>
        </div>
      </template>
      <div class="diary-content" style="transform:rotate(-3deg); transform-origin: left top;" v-else>
        <p style="color:#aa9977;">今晚設備在例行頻率上接到了些什麼。我調整好接收器，開始錄製。</p>
        <p style="color:#aa9977; margin-top:6px;">外面有腳步聲，從走廊那邊過來。這棟大樓本來就比較吵，沒什麼奇怪的。</p>
        <p style="color:#cc6633; margin-top:6px;">腳步聲在我門口停下來大約四分鐘了。沒有移動。</p>
        <p style="color:#886644; margin-top:6px;">我要去看看。</p>
        <p style="color:#551100; font-size:12px; margin-top:12px;">—— 記錄中斷 ——</p>
        <p style="color:#221100; font-size:11px; margin-top:8px; letter-spacing:3px;">████████████████████████</p>
      </div>
    </div>
  </div>
  <!-- Entry 10: 2013-07-14 -->
  <div class="xp-window diary-entry">
    <div class="xp-titlebar">
      <span>Entry 010 — 2013-07-14</span>
    </div>
    <div class="xp-window-body">
      <div class="diary-date">2013-07-14 | Night | Weather: Clear | Author: Administrator</div>

      <!-- Light (0): original robotic but surface-level normal -->
      <template v-if="intensity === 0">
        <template v-if="locale !== 'zh-TW'">
          <div class="diary-content" style="color:#c0d8c0;">
            <p>Nothing happened last night.</p>
            <p>Everything is completely normal.</p>
            <p>We are all fine.</p>
            <p>The Association is operating normally.</p>
            <p>There are no anomalous events to record.</p>
            <p>All members are safe.</p>
            <p>We are all fine.</p>
            <p style="margin-top:10px; font-size:12px; color:#556655;">Nothing happened last night. Everything is normal.</p>
          </div>
        </template>
        <div class="diary-content" style="color:#c0d8c0;" v-else>
          <p>昨晚什麼事都沒有發生。</p>
          <p>一切完全正常。</p>
          <p>我們都很好。</p>
          <p>同好會運作正常。</p>
          <p>沒有任何異常事件需要記錄。</p>
          <p>所有成員平安無事。</p>
          <p>我們都很好。</p>
          <p style="margin-top:10px; font-size:12px; color:#668866;">昨晚什麼事都沒有發生。一切正常。<br><span style="font-size:11px; color:#4a6a4a;">（本記錄已提交三次，內容均相同。）</span></p>
        </div>
      </template>

      <!-- Medium (1): unit terminology + status codes begin -->
      <template v-else-if="intensity === 1">
        <template v-if="locale !== 'zh-TW'">
          <div class="diary-content" style="color:#c0d8c0;">
            <p><span style="font-size:11px; color:#668866;">[RECORD: 2013-07-14]</span></p>
            <p>Nothing anomalous occurred last night.</p>
            <p>All parameters are within normal range.</p>
            <p>All member-units report nominal status.</p>
            <p>The Association is operating within expected parameters.</p>
            <p>No anomalous events require filing at this time.</p>
            <p>All member-units confirmed safe. All member-units confirmed safe.</p>
            <p style="margin-top:10px; font-size:12px; color:#668866;"><span class="corrupted-text">[STATUS:NOMINAL]</span> Nothing anomalous occurred. All parameters normal. <span style="color:#556655;">[END RECORD]</span></p>
          </div>
        </template>
        <div class="diary-content" style="color:#c0d8c0;" v-else>
          <p><span style="font-size:11px; color:#668866;">[記錄：2013-07-14]</span></p>
          <p>昨晚未發生任何異常事件。</p>
          <p>所有參數在正常範圍值內。</p>
          <p>所有成員單元回報正常狀態。</p>
          <p>同好會在預期參數範圍內運作。</p>
          <p>無需歸檔任何異常事件。</p>
          <p>所有成員單元確認安全。所有成員單元確認安全。</p>
          <p style="margin-top:10px; font-size:12px; color:#668866;"><span class="corrupted-text">[狀態：正常]</span> 昨晚未發生異常。所有參數正常。 <span style="color:#556655;">[記錄結束]</span></p>
        </div>
      </template>

      <!-- Heavy (2): full breakdown — repetition, broken syntax, status code overflow -->
      <template v-else>
        <template v-if="locale !== 'zh-TW'">
          <div class="diary-content" style="color:#c0d8c0;">
            <p><span style="font-size:11px; color:#556655;">[2013-07-14][RECORD]</span></p>
            <p>Nothing anomalous occur last night last night.</p>
            <p>All parameter: normal. <span class="corrupted-text">[NOMINAL]</span></p>
            <p>All member-unit: fine fine. <span class="corrupted-text">[CONFIRMED][CONFIRMED]</span></p>
            <p>Association operate normal within parameter.</p>
            <p>No anomal event record require.</p>
            <p>All unit: safe. safe. <span class="corrupted-text">[STATUS:OK]</span></p>
            <p>We are all fine fine.</p>
            <p style="margin-top:10px; font-size:12px; color:#556655;"><span class="corrupted-text">[STATUS:NOMINAL][STATUS:NOMINAL]</span> Nothing happen. Record complete complete.</p>
          </div>
        </template>
        <div class="diary-content" style="color:#c0d8c0;" v-else>
          <p><span style="font-size:11px; color:#556655;">[2013-07-14][記錄]</span></p>
          <p>昨晚昨晚未發生異常事件。</p>
          <p>所有參數：正常。 <span class="corrupted-text">[正常值]</span></p>
          <p>所有成員單元：正常正常。 <span class="corrupted-text">[已確認][已確認]</span></p>
          <p>同好會在參數內正常運作。</p>
          <p>無異常事件需要記錄。</p>
          <p>所有單元：安全。安全。 <span class="corrupted-text">[狀態：確認]</span></p>
          <p>我們都很正常正常。</p>
          <p style="margin-top:10px; font-size:12px; color:#556655;"><span class="corrupted-text">[狀態：正常][狀態：正常]</span> 未發生事件。記錄完成完成。</p>
        </div>
      </template>

    </div>
  </div>
  <!-- Entry 11: newest first -->
  <div class="xp-window diary-entry" style="transform: rotate(4.5deg) skewX(-2.5deg);">
    <div class="xp-titlebar">
      <span>Entry 011 — ███-██-██</span>
    </div>
    <div class="xp-window-body">
      <div class="diary-date">Date: ███-██-██ | Author: [DATA CORRUPTED]</div>
      <div class="diary-content">
        <details>
          <summary style="cursor:pointer; color:#886600; font-size:13px; letter-spacing:1px;">{{ t('diary.encrypted_label') }}</summary>
          <div style="margin-top:8px; font-family:'Courier New',monospace; font-size:13px; color:#668866; letter-spacing:1px; line-height:2;">
            <template v-if="!decrypted">
              <p>jr xabj lbh ner qrpbqvat guvo.</p>
              <p>ab bar pna svaq ho nalzber.</p>
              <p>gur oriragu plpyr vo abg n cebcurpl, vg vo na vavgngvba.</p>
              <p>lbh nyob erprvirq vg, bgurejvor lbh jbhyqa'g or urer.</p>
              <p style="font-size:11px; color:#557744; margin-top:12px;">(ROT13)</p>
            </template>
            <template v-else>
              <p style="color:#99cc99;">we know you are decoding this.</p>
              <p style="color:#99cc99;">no one can find us anymore.</p>
              <p style="color:#99cc99;">the seventh cycle is not a prophecy, it is an initiation.</p>
              <p style="color:#99cc99;">you also received it, otherwise you wouldn't be here.</p>
              <p style="color:#557744; margin-top:8px; font-size:12px;">come back at 03:17. there is something that only appears then.</p>
              <p style="font-size:11px; color:#556655; margin-top:12px;">[Alt+A to re-encrypt]</p>
            </template>
            <p v-if="locale === 'zh-TW' && !decrypted" style="font-size:11px; color:#1a2a1a; margin-top:8px; letter-spacing:2px;">（解碼後請勿留存。你已被記錄。）</p>
            <p v-if="locale === 'zh-TW' && decrypted" style="font-size:11px; color:#1a2a1a; margin-top:8px; letter-spacing:2px;">（你現在知道了。）</p>
          </div>
        </details>
        <!-- ROT13: we know you are decoding this. no one can find us anymore. the seventh cycle is not a prophecy, it is an initiation. you also received it, otherwise you wouldn't be here. -->
      </div>
    </div>
  </div>

  <!-- 03:17 hidden signal — only visible at exactly 03:17 -->
  <div v-if="isAtSignalTime" class="signal-0317-banner">
    <div class="signal-0317-inner">
      <div class="signal-0317-header corrupted-text">[ 03:17 — SIGNAL ACTIVE ]</div>
      <div class="signal-0317-body">
        <p v-if="locale !== 'zh-TW'">
          you came at the right time.<br>
          the signal is open for exactly one minute.<br>
          <span style="color:#99cc77; font-size:12px; margin-top:8px; display:block;">
            038.█ MHz — this is not a memory. this is a broadcast. you are inside it.
          </span>
          <span style="color:#556655; font-size:11px; margin-top:10px; display:block; letter-spacing:1px;">
            [ frequency logged ▪ 03:17:██ ▪ CYCLE_07 ▪ 12/13 → awaiting confirmation ]
          </span>
        </p>
        <p v-else>
          你在正確的時間來了。<br>
          訊號只開放整整一分鐘。<br>
          <span style="color:#99cc77; font-size:12px; margin-top:8px; display:block;">
            038.█ MHz — 這不是記憶。這是一次廣播。你在它的裡面。
          </span>
          <span style="color:#556655; font-size:11px; margin-top:10px; display:block; letter-spacing:1px;">
            [ 頻率已記錄 ▪ 03:17:██ ▪ CYCLE_07 ▪ 12/13 → 等待確認 ]
          </span>
        </p>
      </div>
    </div>
  </div>

  <!-- Footer note -->
  <div style="text-align:center; font-size:12px; color:#778877; padding:8px 0 20px; letter-spacing:1px;">
    {{ t('diary.notice') }}
  </div>
</template>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
}
h1 {
  color: #f0f0f0;
  font-size: 1.6rem;
  letter-spacing: 4px;
  margin-bottom: 8px;
}
.page-subtitle {
  color: #7ab87a;
  font-size: 13px;
  margin-bottom: 4px;
}
.page-notice {
  color: #886600;
  font-size: 12px;
}
.diary-entry {
  margin-bottom: 12px;
}

.signal-0317-banner {
  margin: 24px 0;
  border: 1px solid #336633;
  background: #000f00;
  padding: 2px;
  animation: signal-pulse 2s ease-in-out infinite;
}
.signal-0317-inner {
  border: 1px solid #224422;
  padding: 16px 20px;
}
.signal-0317-header {
  font-size: 14px;
  font-weight: bold;
  color: #99cc55;
  letter-spacing: 3px;
  margin-bottom: 12px;
}
.signal-0317-body {
  color: #7ab87a;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.8;
}
@keyframes signal-pulse {
  0%, 100% { box-shadow: 0 0 6px #003300; }
  50% { box-shadow: 0 0 18px #006600; }
}

.ghost-admin-link {
  display: block;
  margin-top: 6px;
  font-size: 10px;
  color: #0e0e0e;
  text-decoration: none;
  letter-spacing: 0.5px;
  transition: color 0s;
  cursor: default;
}
.ghost-admin-link:hover {
  color: #445544;
  cursor: pointer;
}

.diary-date {
  font-size: 11px;
  color: #6a9a6a;
  letter-spacing: 1px;
  margin-bottom: 10px;
  border-bottom: 1px solid #002200;
  padding-bottom: 6px;
  font-family: "Share Tech Mono", monospace;
}

.diary-content {
  font-size: 13px;
  line-height: 1.9;
  color: #c8c8c8;
}

.diary-content p {
  margin-bottom: 8px;
}

.diary-content details summary:hover {
  color: #bbaa44;
}

/* Scroll reveal — entries appear as they enter the viewport */
.diary-entry {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.1s steps(1), transform 0.1s steps(1);
}
.diary-entry.revealed {
  opacity: 1;
  transform: none;
}
</style>