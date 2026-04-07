<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useTimeAware } from '@/composables/useTimeAware'
import { useVisitorStore } from '@/stores/visitorStore'

const { t, locale } = useI18n()
const time = useTimeAware()
const store = useVisitorStore()

const visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone || '██████'

interface Member {
  id: number
  codename: string
  joinDate: string
  status: 'active' | 'sealed' | 'missing' | 'unknown'
  specialty?: string
  specialtyZH?: string
  lastSeen: string
  note?: string
  noteZH?: string
  photo?: string
}

const members: Member[] = [
  { id: 1, codename: 'Kai-Chun Cheng', joinDate: '1998-03-07', status: 'active', specialty: 'Radio Signal Analysis', specialtyZH: '無線電訊號分析', lastSeen: '2024-██-██', note: 'Founding member, current administrator. [Identity unverifiable — original records modified 2001-03-17]', noteZH: '創始成員，現任管理員。【身份無法核實——原始記錄於 2001-03-17 遭修改】', photo: '/img/members/kaichun.jpg' },
  { id: 2, codename: 'Maria Brown', joinDate: '1998-03-07', status: 'active', specialty: 'Visual Observation', specialtyZH: '目視觀測', lastSeen: '2024-██-██', photo: '/img/members/maria.jpg' },
  { id: 3, codename: 'Jun Watanabe', joinDate: '1998-05-14', status: 'active', specialty: 'EM Spectrum Monitoring', specialtyZH: '電磁頻譜監測', lastSeen: '2023-██-██', photo: '/img/members/jun.jpg' },
  { id: 4, codename: 'Sonia Vasquez', joinDate: '1998-09-03', status: 'active', specialty: 'Astronomical Photography', specialtyZH: '天文攝影', lastSeen: '2024-██-██', note: 'One of two founding members who conducted sustained observational research. Attended all major field sessions.', noteZH: '少數真正持續投入研究的創始成員之一。出席所有重要野外觀測活動。', photo: '/img/members/sonia.jpg' },
  { id: 5, codename: 'Thomas Lin', joinDate: '1999-01-21', status: 'active', specialty: 'Anomaly Documentation', specialtyZH: '異常現象記錄', lastSeen: '2022-██-██', photo: '/img/members/thomas.jpg' },
  { id: 6, codename: 'Priya Sharma', joinDate: '1999-06-30', status: 'active', specialty: 'Audio Signal Analysis', specialtyZH: '音頻訊號分析', lastSeen: '2024-██-██', photo: '/img/members/priya.jpg' },
  { id: 7, codename: 'David James Mercer', joinDate: '1999-11-11', status: 'active', specialty: 'Gravitational Anomalies', specialtyZH: '重力異常研究', lastSeen: '2023-██-██', photo: '/img/members/david.jpg' },
  { id: 8, codename: 'Mia Harlow', joinDate: '2000-02-29', status: 'sealed', specialty: 'Signal Tracking', specialtyZH: '訊號追蹤', lastSeen: '2004-██-██', note: "File sealed 2004. Final transmission recovered — see /signal/038. Currently operating as 'Records Unit' designation: Mia H-unit.", noteZH: '檔案已於2004年封存。最後傳輸記錄已恢復——詳見 /signal/038。目前以「記錄員單元」代號：Mia H單元 持續運作。' },  { id: 9, codename: 'Yi-Ling Wu', joinDate: '2000-07-07', status: 'active', specialty: 'Mirror Reflection Phenomena', specialtyZH: '鏡面反射現象', lastSeen: '2024-██-██', photo: '/img/members/yiling.jpg' },
  { id: 10, codename: 'Ethan Johnson', joinDate: '2001-01-01', status: 'active', specialty: 'Temporal Anomaly Recording', specialtyZH: '時間異常記錄', lastSeen: '2024-██-██', photo: '/img/members/ethan.jpg' },
  { id: 11, codename: '██████', joinDate: '████-██-██', status: 'sealed', specialty: '██████', lastSeen: '████-██-██', note: 'Assimilation anomaly — initial process failed. Forced integration subsequently completed. Source: CYCLE_07. Identity records purged.', noteZH: '同化異常——初次程序失敗。強制整合隨後完成。來源：CYCLE_07。身份記錄已全面抹除。' },
  { id: 12, codename: '████', joinDate: '████-██-██', status: 'sealed', specialty: '██████', lastSeen: '████-██-██', note: 'Assimilation anomaly — initial process failed. Forced integration subsequently completed. Source: CYCLE_07. Identity records purged.', noteZH: '同化異常——初次程序失敗。強制整合隨後完成。來源：CYCLE_07。身份記錄已全面抹除。' },
  { id: 13, codename: '???', joinDate: '████-██-██', status: 'unknown', specialty: '██████████████', lastSeen: '██████', note: undefined },
]

const MEMBER13_KEY = 'coa-member13-name'
const member13StoredName = localStorage.getItem(MEMBER13_KEY) || ''

const member13Codename = computed(() => {
  if (member13StoredName) return member13StoredName
  if (store.visitCount >= 13) return '██████ [CANDIDATE IDENTIFIED]'
  return '???'
})


const displayedMembers = computed(() =>
  members.map(m => ({
    ...m,
    displayNote: locale.value === 'zh-TW' && m.noteZH ? m.noteZH : m.note,
  }))
)

function photoColor(status: Member['status']): string {
  if (status === 'sealed') return '#1a0000'
  if (status === 'unknown') return '#0a0000'
  return '#001500'
}

function formatId(id: number): string {
  return `0${String(id).padStart(2, '0')}`
}

function statusLabel(status: Member['status']): string {
  if (status === 'active') return t('members.status_active')
  if (status === 'sealed') return t('members.status_sealed')
  if (status === 'missing') return t('members.status_missing')
  return t('members.status_unknown')
}
</script>

<template>
<!-- ============================================================
     C.O.A. MEMBER REGISTRY — ADMINISTRATIVE VIEW
     ============================================================

     record_count: 12 (public) + 1 (pending) + 1 (deleted)
     member_00: record corrupted. do not restore.
     member_13: slot allocated. candidate identified.
     candidate timezone: [will be populated on confirmation]

     NOTE: if you are not an administrator, close this immediately.
     your IP has been logged.
     ============================================================ -->  <div class="page-container">
    <div class="xp-window">
      <div class="xp-window-body">

        <div class="page-header">
          <h1>{{ t('members.title') }}</h1>
          <p class="page-subtitle">{{ t('members.subtitle') }}</p>
          <p class="page-notice blink">{{ t('members.notice') }}</p>
        </div>

        <table class="member-table" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ t('members.photo_col') }}</th>
              <th>{{ t('members.name_col') }}</th>
              <th>{{ t('members.joined') }}</th>
              <th>{{ t('members.last_seen') }}</th>
              <th>{{ t('members.status_col') }}</th>
              <th>{{ t('members.file_col') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="member in displayedMembers"
              :key="member.id"
              :class="{
                'row-sealed': member.status === 'sealed',
                'row-unknown': member.status === 'unknown',
              }"
            >
              <!-- # -->
              <td class="td-id">{{ formatId(member.id) }}</td>

              <!-- Photo -->
              <td class="td-photo">
                <div class="t-photo" :class="{ forgotten: member.status === 'sealed' }">
                  <img v-if="member.photo" :src="member.photo" :alt="member.codename" class="t-photo-img" />
                  <span v-else-if="member.status === 'sealed'" class="redacted-x">✕</span>
                  <span v-else-if="member.status === 'unknown'" class="corrupted-text" style="font-size:1rem;">???</span>
                  <span v-else class="photo-placeholder">[ {{ member.id }} ]</span>
                </div>
              </td>

              <!-- Name -->
              <td class="td-name">
                <span v-if="member.status === 'sealed'" class="redacted">{{ member.codename }}</span>
                <span v-else-if="member.status === 'unknown' && member.id === 13 && member13StoredName" style="color:#ccffaa; font-weight:bold;">{{ member13StoredName }}</span>
                <span v-else-if="member.status === 'unknown'" class="corrupted-text">{{ member13Codename }}</span>
                <span v-else>{{ member.codename }}</span>
                <div v-if="member.displayNote" class="t-note">{{ member.displayNote }}</div>
                <div v-if="member.id === 13 && member13StoredName" class="t-note ghost-text-red" style="margin-top:4px;">
                  <template v-if="locale !== 'zh-TW'">Seventh Cycle: 13/13. Integration confirmed.</template>
                  <template v-else>第七循環：13/13。整合已確認。</template>
                </div>
                <div v-else-if="member.id === 13" class="t-note" :class="store.visitCount >= 13 ? 'ghost-text-red' : 'ghost-text'" style="margin-top:4px;">
                  <template v-if="locale !== 'zh-TW'">Candidate timezone: {{ visitorTz }}. Seventh Cycle: READY.</template>
                  <template v-else>候選人時區：{{ visitorTz }}。第七循環：就緒。</template>
                </div>
                <div v-if="member.id === 8" class="t-note ghost-text" style="margin-top:4px; border-left-color:#330000;">
                  <template v-if="locale !== 'zh-TW'">she chose to go.</template>
                  <template v-else>他選擇離開的。</template>
                </div>
              </td>

              <!-- Joined -->
              <td class="td-mono">
                <span v-if="member.status === 'sealed'" class="redacted">{{ member.joinDate }}</span>
                <span v-else>{{ member.joinDate }}</span>
              </td>

              <!-- Last Seen -->
              <td class="td-mono">
                <span v-if="member.status === 'sealed'" class="redacted">{{ member.lastSeen }}</span>
                <span v-else>{{ member.lastSeen }}</span>
              </td>

              <!-- Status -->
              <td class="td-status">
                <span v-if="member.status === 'active'" class="badge-active">【{{ statusLabel(member.status) }}】</span>
                <span v-else-if="member.status === 'sealed' && member.id === 8 && time.isNightMode.value" class="badge-sealed corrupted-text">【████】</span>
                <span v-else-if="member.status === 'sealed'" class="badge-sealed">【{{ statusLabel(member.status) }}】</span>
                <span v-else class="badge-unknown">【{{ statusLabel(member.status) }}】</span>
              </td>

              <!-- File link -->
              <td class="td-link">
                <RouterLink
                  v-if="member.status === 'active'"
                  :to="`/members/${member.id}`"
                  class="xp-button t-btn"
                >{{ t('members.click_for_file') }}</RouterLink>
                <RouterLink
                  v-else-if="member.status === 'unknown' && store.visitCount >= 13"
                  to="/members/13"
                  class="xp-button t-btn"
                  style="color:#99cc77; border-color:#336633; animation: blink 1.2s step-start infinite;"
                >{{ member13StoredName ? (locale === 'zh-TW' ? '查看記錄' : 'View Record') : (locale === 'zh-TW' ? '確認加入 →' : 'Confirm Joining →') }}</RouterLink>
                <RouterLink
                  v-else-if="member.status === 'unknown'"
                  to="/members/13"
                  class="xp-button t-btn broken-link"
                  style="cursor:not-allowed;text-decoration:line-through;opacity:0.4;"
                >{{ t('members.click_for_file') }}</RouterLink>
                <span v-else class="td-sealed-file">——</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div style="font-size: 11px; color: #002200; margin-top: 24px; text-align: center; user-select: none;">
          13 founding members total | Last reviewed: ████
          <br>
          <span style="letter-spacing: -1px; opacity: 0.3;">
            <!-- 5s6d396e6b=YmlzMGJlcnMvMTM= -->
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #003300;
  padding-bottom: 12px;
}
h1 { color: #f0f0f0; font-size: 1.6rem; letter-spacing: 4px; margin-bottom: 8px; }
.page-subtitle { color: #6a9a6a; font-size: 0.85rem; letter-spacing: 2px; }
.page-notice { color: #ff4400; font-size: 0.8rem; margin-top: 8px; }

/* ── Table ── */
.member-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  font-family: monospace;
}
.member-table th {
  background: #c0c0c0;
  color: #000000;
  border: 2px outset #ffffff;
  padding: 6px 12px;
  text-align: left;
  font-weight: bold;
  font-size: 13px;
  letter-spacing: 0;
}
.member-table td {
  border: 1px solid #808080;
  padding: 10px 12px;
  vertical-align: middle;
  color: #c0c0c0;
  background: #111;
}
.member-table tr:hover td { background: #1a1a1a; }
.member-table tr:hover td { background: #020f02; }

.row-sealed td { background: #080000; color: #553333; opacity: 0.75; }
.row-sealed:hover td { background: #0d0000; }
.row-unknown td { background: #060000; color: #884444; }

/* Photo cell */
.td-photo { width: 70px; padding: 5px 7px !important; }
.t-photo {
  width: 58px;
  height: 74px;
  background: #001500;
  border: 1px solid #002200;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.t-photo.forgotten { border-color: #330000; filter: grayscale(1) brightness(0.3); }
.t-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: brightness(0.72) contrast(1.1) saturate(0.5);
}
.photo-placeholder { color: #002200; font-size: 0.6rem; }
.redacted-x { color: #440000; font-size: 1.2rem; }

/* Column widths */
.td-id { width: 40px; color: #5a8a5a; text-align: center; }
.td-name { min-width: 130px; color: #e0e0e0; font-weight: bold; }
.td-mono { width: 100px; font-family: monospace; font-size: 11px; }
.td-spec { color: #99aa77; }
.td-status { width: 90px; text-align: center; white-space: nowrap; }
.td-link { width: 80px; text-align: center; }
.td-sealed-file { color: #667766; }

.badge-active { color: #00aa00; font-family: monospace; }
.badge-sealed { color: #880000; font-family: monospace; }
.badge-unknown { color: #aa3333; font-family: monospace; }

.t-note {
  font-size: 10px;
  color: #668866;
  margin-top: 3px;
  font-style: italic;
  border-left: 1px solid #223322;
  padding-left: 4px;
  font-weight: normal;
}
.t-btn { font-size: 10px; padding: 2px 6px; white-space: nowrap; }
.broken-link { pointer-events: none; }
</style>
