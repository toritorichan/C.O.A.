<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVisitorStore } from '@/stores/visitorStore'
import { useScrollReveal } from '@/composables/useScrollReveal'
const { t, locale } = useI18n()
const store = useVisitorStore()
const intensity = computed((): 0 | 1 | 2 => {
  if (store.visitCount >= 13) return 2
  if (store.visitCount >= 7) return 1
  return 0
})
useScrollReveal('.timeline-entry', 'fade-right', 0.1)

// 1120 photo swap — shows 1120-1c.jpg once user has scrolled past and comes back up
const photo1120El = ref<HTMLImageElement | null>(null)
const photo1120Swapped = ref(false)
const photo1231El = ref<HTMLImageElement | null>(null)
const photo1231Swapped = ref(false)
let photoObserver: IntersectionObserver | null = null
let photo1231Observer: IntersectionObserver | null = null
let photo1231Timer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  // 1120: swap when scrolled past (exits viewport from top)
  photoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          if (entry.target === photo1120El.value) photo1120Swapped.value = true
        }
      })
    },
    { threshold: 0.1 },
  )
  if (photo1120El.value) photoObserver.observe(photo1120El.value)

  // 1231: swap 2s after the photo enters the viewport (corrupts while you watch)
  photo1231Observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !photo1231Swapped.value) {
          photo1231Timer = setTimeout(() => {
            photo1231Swapped.value = true
          }, 2000)
        } else if (!entry.isIntersecting && photo1231Timer) {
          clearTimeout(photo1231Timer)
          photo1231Timer = null
        }
      })
    },
    { threshold: 0.5 },
  )
  if (photo1231El.value) photo1231Observer.observe(photo1231El.value)
})
onUnmounted(() => {
  photoObserver?.disconnect()
  photo1231Observer?.disconnect()
  if (photo1231Timer) clearTimeout(photo1231Timer)
})
</script>

<template>
  <!-- Page Header -->
  <div class="xp-window" style="margin-bottom:8px;">
    <div class="xp-window-body">
      <div class="page-header">
        <h1>{{ t('history.title') }}</h1>
        <p class="page-subtitle">{{ t('history.subtitle') }}</p>
        <p class="page-notice blink">{{ t('history.notice') }}</p>
      </div>
    </div>
  </div>

  <!-- Timeline Container -->
  <div class="xp-window">
    <div class="xp-titlebar">
      <span>{{ t('history.timeline_title') }}</span>
    </div>
    <div class="xp-window-body">

      <!-- 1998-03-07 -->
      <div class="timeline-entry">
        <div class="timeline-date">1998-03-07</div>
        <div class="timeline-content">
          <p>
            <template v-if="locale !== 'zh-TW'">Association founded. President elected: Kai-Chun Cheng. Location: <span class="redacted-white">████</span>.</template>
            <template v-else>同好會創立。會長選舉結果：鄭凱駿。地點：<span class="redacted-white">████</span>。</template>
          </p>
          <p style="font-size:11px; color:#444; margin-top:6px; border-left: 1px solid #002200; padding-left:6px;">
            <template v-if="locale !== 'zh-TW'">
              <span class="redacted">████████████████████████████████</span><br />
              Signal received: <span class="redacted">038.█ MHz</span>. Duration: <span class="redacted">16:33</span>. Terminated: 03:33.<br />
              <span class="redacted">████████████ [RECORD SEALED] ████████████</span>
            </template>
            <template v-else>
              <span class="redacted">████████████████████████████████</span><br />
              接收到訊號：<span class="redacted">038.█ MHz</span>。持續時間：<span class="redacted">16:33</span>。終止：03:33。<br />
              <span class="redacted">████████████ [記錄已封存] ████████████</span>
            </template>
          </p>
        </div>
      </div>

      <hr style="border-color:#002200; margin:4px 0;" />

      <!-- 1998-09-15 -->
      <div class="timeline-entry">
        <div class="timeline-date">1998-09-15</div>
        <div class="timeline-content">
          <p>
            <template v-if="locale !== 'zh-TW'">First regular meeting. Attendance: 4/4.</template>
            <template v-else>首次例行會議，出席率：4/4。</template>
          </p>
        </div>
      </div>

      <hr style="border-color:#002200; margin:4px 0;" />

      <!-- 1999-03-07 -->
      <div class="timeline-entry">
        <div class="timeline-date">1999-03-07</div>
        <div class="timeline-content">
          <p>
            <template v-if="locale !== 'zh-TW'">First anniversary general meeting. Officer re-election: President retained. Annual dues: 100% paid.</template>
            <template v-else>一周年大會。幹部改選：會長留任。年費繳納率：100%。</template>
          </p>
        </div>
      </div>

      <hr style="border-color:#002200; margin:4px 0;" />

      <!-- 1999-11-20 -->
      <div class="timeline-entry">
        <div class="timeline-date">1999-11-20</div>
        <div class="timeline-content">
          <p>
            <template v-if="locale !== 'zh-TW'">First organized field observation. Participants: 7/7. Observation log filed. Status: normal.</template>
            <template v-else>首次正式野外觀測活動。參與人數：7/7。觀測記錄已提交。狀態：正常。</template>
          </p>
          <p style="font-size:11px; color:#556655; margin-top:6px;">
            <template v-if="locale !== 'zh-TW'">Activity photographs:</template>
            <template v-else>活動照片：</template>
          </p>
          <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:4px;">
            <div>
              <div class="obs-photo-wrap">
                <img
                  ref="photo1120El"
                  :src="photo1120Swapped ? '/img/history/1120-1c.jpg' : '/img/history/1120.jpg'"
                  alt="1999-11-20 first observation"
                  class="obs-photo"
                  :class="{ 'photo-swapped': photo1120Swapped }"
                />
                <span class="obs-date-stamp">1999-11-20 23:██</span>
              </div>
              <p style="font-size:11px; color:#556655; margin-top:3px; font-style:italic;">
                <template v-if="locale !== 'zh-TW'">(Kai-Chun literally looks like an alien here lmao)</template>
                <template v-else>（凱子這張回頭超像外星人的~~~笑死）</template>
              </p>
            </div>
            <div>
              <div class="obs-photo-wrap">
                <img
                  :src="'/img/history/1120-2.jpg'"
                  alt="1999-11-20 first observation 2"
                  class="obs-photo"
                />
                <span class="obs-date-stamp">1999-11-20 23:██</span>
              </div>
              <p style="font-size:11px; color:#556655; margin-top:3px; font-style:italic;">
                <template v-if="locale !== 'zh-TW'">(so cold that night, everyone kept complaining lol)</template>
                <template v-else>（那天超冷 每個人都在哀說要回家 哈哈）</template>
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr style="border-color:#002200; margin:4px 0;" />

      <!-- 2000-03-07 -->
      <div class="timeline-entry">
        <div class="timeline-date">2000-03-07</div>
        <div class="timeline-content">
          <p>
            <template v-if="locale !== 'zh-TW'">Second anniversary general meeting. New member recruitment discussed. President re-elected for third term.</template>
            <template v-else>二周年大會。討論新成員招募事宜。會長第三任連任。</template>
          </p>
        </div>
      </div>

      <hr style="border-color:#002200; margin:4px 0;" />

      <!-- 2000-07-14 -->
      <div class="timeline-entry">
        <div class="timeline-date">2000-07-14</div>
        <div class="timeline-content">
          <p>
            <template v-if="locale !== 'zh-TW'">New members admitted. Total membership: <span class="redacted-white">██</span>.</template>
            <template v-else>新成員加入。成員總數：<span class="redacted-white">██</span>人。</template>
          </p>
        </div>
      </div>

      <hr style="border-color:#002200; margin:4px 0;" />

      <!-- 2000-12-31 -->
      <div class="timeline-entry">
        <div class="timeline-date">2000-12-31</div>
        <div class="timeline-content">
          <p>
            <template v-if="locale !== 'zh-TW'">New Year's Eve special observation. Full attendance. Observation report: pending submission.</template>
            <template v-else>除夕特別觀測活動。全員出席。觀測報告：提交中。</template>
          </p>
          <div style="margin-top:10px;">
            <div class="obs-photo-wrap">
              <img
                ref="photo1231El"
                :src="photo1231Swapped ? '/img/history/1231-1c.jpg' : '/img/history/1231.jpg'"
                alt="2000-12-31 special observation"
                class="obs-photo"
                :class="{ 'photo-swapped': photo1231Swapped }"
              />
              <span class="obs-date-stamp">2000-12-31 23:██</span>
            </div>
          </div>
        </div>
      </div>

      <hr style="border-color:#002200; margin:4px 0;" />

      <!-- 2001-01-20 -->
      <div class="timeline-entry">
        <div class="timeline-date">2001-01-20</div>
        <div class="timeline-content">
          <p>
            <template v-if="locale !== 'zh-TW'">Regular meeting. Spring observation schedule under review. Equipment check scheduled for March.</template>
            <template v-else>例行會議。春季觀測排程審議中。器材盤點排定於三月進行。</template>
          </p>
        </div>
      </div>

      <hr style="border-color:#002200; margin:4px 0;" />

      <!-- 2001-03-01 -->
      <div class="timeline-entry">
        <div class="timeline-date">2001-03-01</div>
        <div class="timeline-content">
          <p>
            <template v-if="locale !== 'zh-TW'">Equipment inventory completed. All units: functional. Spring observation sites A and B confirmed.</template>
            <template v-else>器材盤點完成。所有設備狀態：正常。春季觀測站 A、B 均已確認。</template>
          </p>
        </div>
      </div>

      <hr style="border-color:#002200; margin:4px 0;" />

      <!-- 2001-03-16 — LAST NORMAL ENTRY -->
      <div class="timeline-entry">
        <div class="timeline-date">2001-03-16</div>
        <div class="timeline-content">
          <p>
            <template v-if="locale !== 'zh-TW'">Spring observation schedule finalized. All sites confirmed ready. Next regular meeting: 2001-04-01.</template>
            <template v-else>春季觀測排程確認完畢。各站備妥。下次例行會議：2001-04-01。</template>
          </p>
        </div>
      </div>

      <hr style="border-color:#002200; margin:4px 0;" />

      <!-- POST-INCIDENT — entries become sparse, things keep being postponed -->
      <div class="timeline-entry">
        <div class="timeline-date" style="color:#776655;">2001-04-01</div>
        <div class="timeline-content">
          <p style="color:#776655;">
            <template v-if="locale !== 'zh-TW'">Regular meeting: cancelled. Rescheduled to <span class="redacted-white">██-██</span>.</template>
            <template v-else>例行會議：取消。改期至<span class="redacted-white">██月██日</span>。</template>
          </p>
        </div>
      </div>

      <hr style="border-color:#002200; margin:4px 0;" />

      <div class="timeline-entry">
        <div class="timeline-date" style="color:#665544;">2001-06-██</div>
        <div class="timeline-content">
          <p style="color:#665544;">
            <template v-if="locale !== 'zh-TW'">Summer observation activity: postponed indefinitely. No reason recorded.</template>
            <template v-else>夏季觀測活動：無限期延後。未記錄原因。</template>
          </p>
        </div>
      </div>

      <hr style="border-color:#002200; margin:4px 0;" />

      <div class="timeline-entry">
        <div class="timeline-date" style="color:#554433;">2002-██-██</div>
        <div class="timeline-content">
          <p style="color:#554433;">
            <template v-if="locale !== 'zh-TW'">Annual general meeting: postponed. Current membership: <span class="redacted">██</span>.</template>
            <template v-else>年度大會：延後。當前成員數：<span class="redacted">██</span>。</template>
          </p>
          <template v-if="intensity >= 1">
            <p style="font-size:11px; color:#443322; margin-top:4px; letter-spacing:1px;">
              <template v-if="locale !== 'zh-TW'">[note: no meeting minutes submitted for this entry. filing date unknown.]</template>
              <template v-else>【備注：此條目無會議紀錄提交。建檔日期不明。】</template>
            </p>
          </template>
        </div>
      </div>

      <hr style="border-color:#002200; margin:4px 0;" />

      <!-- FINAL ENTRY — just a date, barely anything -->
      <div class="timeline-entry">
        <div class="timeline-date" style="color:#443322;">2003-██-██</div>
        <div class="timeline-content">
          <p style="color:#443322; letter-spacing:1px;">
            <template v-if="locale !== 'zh-TW'">Association status: <span class="redacted">████████</span>.</template>
            <template v-else>同好會狀態：<span class="redacted">████████</span>。</template>
          </p>
          <template v-if="intensity >= 2">
            <p class="ghost-text" style="font-size:11px; margin-top:4px; letter-spacing:1px;">
              <template v-if="locale !== 'zh-TW'"><span class="corrupted-text">record_end record_end no further entries no further entries</span></template>
              <template v-else><span class="corrupted-text">記錄終止 記錄終止 無後續條目 無後續條目</span></template>
            </p>
          </template>
          <p style="font-size:11px; color:#443322; margin-top:6px;">
            <RouterLink to="/diary" style="font-size:11px; color:#556644; text-decoration:none;">
              <template v-if="locale !== 'zh-TW'">[ Log archive → ]</template>
              <template v-else>[ 日誌存檔 → ]</template>
            </RouterLink>
          </p>
        </div>
      </div>

    </div>
  </div>

  <!-- 2013 ENTRY — only visible at intensity >= 1 -->
  <template v-if="intensity >= 1">
    <div style="
      border: 1px solid #003300;
      padding: 10px 14px;
      margin-top: 12px;
      margin-bottom: 4px;
      font-family: 'Courier New', monospace;
      font-size: 11px;
      color: #446644;
      letter-spacing: 1px;
      background: #020802;
    ">
      <div style="color:#558855; margin-bottom:4px; font-size:12px;">2013-07-13</div>
      <template v-if="locale !== 'zh-TW'">
        <p style="margin:0 0 3px;">External observer detected. First contact logged.</p>
        <p style="margin:0 0 3px;">Member #13 slot: vacancy confirmed.</p>
        <p style="margin:0 0 3px;">CYCLE_07: <span style="color:#88bb88;">READY</span></p>
        <p style="margin:0; font-size:10px; color:#334433;">[ continuing to wait ]</p>
      </template>
      <template v-else>
        <p style="margin:0 0 3px;">已偵測到外部觀察者。首次接觸已記錄。</p>
        <p style="margin:0 0 3px;">成員 #13 空缺：已確認。</p>
        <p style="margin:0 0 3px;">CYCLE_07：<span style="color:#88bb88;">就緒</span></p>
        <p style="margin:0; font-size:10px; color:#334433;">[ 繼續等待 ]</p>
      </template>
      <template v-if="intensity >= 2">
        <p style="margin:4px 0 0; font-size:10px; color:#2a3a2a; letter-spacing:2px;">
          <template v-if="locale !== 'zh-TW'">CYCLE_06 completed: ████-██-██ | intake: 13/13</template>
          <template v-else>CYCLE_06 完成時間：████-██-██ | 收錄：13/13</template>
        </p>
      </template>
    </div>
  </template>

  <!-- Footer note -->
  <div style="
    border: 1px solid #002200;
    padding: 8px 12px;
    font-size: 12px;
    color: #556655;
    margin-top: 8px;
    margin-bottom: 20px;
    text-align: center;
    letter-spacing: 1px;
  ">
    <template v-if="locale !== 'zh-TW'">Last updated: 2003-██-██ | Records may be incomplete.</template>
    <template v-else>最後更新：2003-██-██ | 記錄可能不完整。</template>
  </div>
</template>

<style scoped>
.obs-photo {
  /* no transition */
}
.photo-swapped {
  animation: photo-reveal 1.8s ease-in-out forwards;
}
@keyframes photo-reveal {
  0%   { opacity: 1; }
  20%  { opacity: 0.82; }
  100% { opacity: 1; }
}

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
  color: #6a9a6a;
  font-size: 0.85rem;
  letter-spacing: 2px;
}
.page-notice {
  color: #ff4400;
  font-size: 0.8rem;
  margin-top: 8px;
}

/* Observation photo — analog degraded look with burned-in date */
.obs-photo-wrap {
  position: relative;
  display: inline-block;
  width: 360px;
}
.obs-photo {
  display: block;
  width: 360px;
  height: auto;
  filter: brightness(0.6) contrast(1.1) saturate(0.3) sepia(0.2);
  border: 1px solid #002200;
}
.obs-date-stamp {
  position: absolute;
  bottom: 8px;
  right: 10px;
  font-family: "Courier New", monospace;
  font-size: 12px;
  color: #dd7700;
  text-shadow: 0 0 4px #aa5500;
  letter-spacing: 1px;
  pointer-events: none;
  user-select: none;
}
</style>
