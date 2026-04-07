<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t, locale } = useI18n()

interface FriendLink {
  name: string
  nameZH?: string
  url: string
  desc: string
  descZH?: string
  lastChecked: string
  status: 'dead' | 'redirect' | 'classified' | 'archived' | 'suspicious'
  hoverWarning?: string
  hoverWarningZH?: string
  routePath?: string
}

const links: FriendLink[] = [
  {
    name: 'Deep Space Observatory',
    nameZH: '深空觀測站',
    url: 'http://deepspace-obs.net',
    desc: "Taiwan's earliest amateur astronomical observation community, recording anomalous signals since 1996.",
    descZH: '台灣最早的業餘天文觀測社群，自1996年起記錄異常訊號。',
    lastChecked: '2013-██-██',
    status: 'dead',
  },
  {
    name: 'Third Contact Research Society',
    nameZH: '第三類接觸研究協會',
    url: 'http://ce3k-research.org.tw',
    desc: 'Academic documentation and research on extraterrestrial contact events.',
    descZH: '對外星接觸事件的學術文獻記錄與研究。',
    lastChecked: '2021-██-██',
    status: 'dead',
  },
  {
    name: 'Radio Anomaly Frequency Archive',
    nameZH: '無線電異常頻率封存庫',
    url: 'http://ro-anomaly.tw',
    desc: 'Amateur radio enthusiast database of anomalous frequency records. Last updated: 2018.',
    descZH: '業餘無線電愛好者異常頻率記錄資料庫。最後更新：2018年。',
    lastChecked: '2022-03-15',
    status: 'redirect',
    hoverWarning: 'You should not be here',
    hoverWarningZH: '你不應該在這裡',
  },
  {
    name: 'SkyWatch Taiwan',
    nameZH: '台灣天空監測網',
    url: 'http://skywatch.tw',
    desc: 'Observation network across Taiwan.',
    descZH: '全台觀測網絡。',
    lastChecked: '2017-██-██',
    status: 'archived',
  },
  {
    name: '█████████',
    url: 'http://████████.███',
    desc: '██████████████████████████████',
    lastChecked: '████-██-██',
    status: 'classified',
    hoverWarning: 'Leave. Now.',
    hoverWarningZH: '離開。現在。',
  },
  {
    name: 'Observers Forum (Closed)',
    nameZH: '觀測者論壇（已關閉）',
    url: 'http://observers-forum.net',
    desc: 'Once the largest alien observation discussion community. Shut down on July 14, 2013 with no announcement.',
    descZH: '曾是最大的外星觀測討論社群。2013年7月14日無預警關閉。',
    lastChecked: '2013-07-13',
    status: 'dead',
  },
  {
    name: 'Low-Frequency Signal Database',
    nameZH: '低頻訊號資料庫',
    url: 'http://lo-database.org',
    desc: 'Globally recorded low-frequency electromagnetic signal archive. Some records classified.',
    descZH: '全球低頻電磁訊號封存資料庫。部分記錄已列為機密。',
    lastChecked: '2020-██-██',
    status: 'suspicious',
    hoverWarning: 'This link is being monitored',
    hoverWarningZH: '此連結正被監控',
  },
  {
    name: 'LF Signal Archive — Document Index',
    nameZH: '低頻訊號封存庫——文件索引',
    url: 'http://lo-database.org/archive/doc-001',
    desc: 'Direct index access to archived signal documentation. Member clearance required. Last known state: accessible.',
    descZH: '直接存取封存訊號文件的索引頁。需要成員授權。最後已知狀態：可存取。',
    lastChecked: '2013-07-13',
    status: 'redirect',
    hoverWarning: 'You do not have clearance for this resource.',
    hoverWarningZH: '您沒有此資源的存取權限。',
    routePath: '/archive/doc-001',
  },
]

const displayedLinks = computed(() =>
  links.map(l => ({
    ...l,
    displayName: locale.value === 'zh-TW' && l.nameZH ? l.nameZH : l.name,
    displayDesc: locale.value === 'zh-TW' && l.descZH ? l.descZH : l.desc,
    displayWarning: locale.value === 'zh-TW' && l.hoverWarningZH ? l.hoverWarningZH : l.hoverWarning,
  }))
)

function statusBadge(status: FriendLink['status']): string {
  switch (status) {
    case 'dead': return t('links.status_dead')
    case 'redirect': return t('links.status_redirect')
    case 'archived': return t('links.status_archived')
    case 'classified': return t('links.status_classified')
    case 'suspicious': return t('links.status_suspicious')
  }
  return ''
}
</script>

<template>
  <div class="page-container">
    <div class="xp-window">
      <div class="xp-window-body">

        <div class="page-header">
          <h1>{{ t('links.title') }}</h1>
          <p class="page-notice">
            {{ t('links.last_reviewed') }}: ████-██ |
            {{ t('links.notice') }}
          </p>
        </div>

        <div class="links-list">
          <div
            v-for="(link, index) in displayedLinks"
            :key="index"
            class="link-row xp-window"
            :class="`link-${link.status}`"
          >
            <div class="link-row-inner">
              <div class="link-main">
                <div class="link-name-row">
                  <!-- classified: non-clickable redacted style -->
                  <span
                    v-if="link.status === 'classified'"
                    class="link-name redacted"
                    :title="link.displayWarning"
                  >
                    {{ link.displayName }}
                  </span>

                  <!-- Redirect: RouterLink to routePath or /classified -->
                  <RouterLink
                    v-else-if="link.status === 'redirect'"
                    :to="link.routePath || '/classified'"
                    class="link-name link-redirect"
                    :title="link.displayWarning"
                  >
                    {{ link.displayName }}
                  </RouterLink>

                  <!-- Dead: strikethrough, not-allowed -->
                  <span
                    v-else-if="link.status === 'dead'"
                    class="link-name link-dead"
                    :title="link.displayWarning"
                    style="text-decoration: line-through; cursor: not-allowed;"
                  >
                    {{ link.displayName }}
                  </span>

                  <!-- Archived / Suspicious: normal but styled -->
                  <span
                    v-else
                    class="link-name"
                    :class="`link-${link.status}`"
                    :title="link.displayWarning"
                  >
                    {{ link.displayName }}
                  </span>

                  <span class="status-badge">{{ statusBadge(link.status) }}</span>
                </div>

                <div class="link-url">{{ link.url }}</div>
                <div class="link-desc">{{ link.displayDesc }}</div>
              </div>

              <div class="link-meta">
                <div class="last-checked">{{ t('links.last_verified') }}：{{ link.lastChecked }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="page-footer">
          {{ t('links.footer') }}
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #f0f0f0;
  font-size: 1.5rem;
  letter-spacing: 4px;
  margin-bottom: 8px;
}

.page-header {
  margin-bottom: 24px;
  border-bottom: 1px solid #003300;
  padding-bottom: 12px;
}

.page-notice {
  color: #6a9a6a;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.links-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.link-row {
  border: 1px solid #003300;
  background: #020802;
  transition: border-color 0.2s;
}

.link-row:hover {
  border-color: #00aa00;
}

.link-row.link-dead {
  border-color: #220000;
  background: #060000;
  opacity: 0.75;
}

.link-row.link-classified {
  border-color: #111;
  background: #030303;
}

.link-row.link-suspicious {
  border-color: #332200;
  background: #060400;
}

.link-row.link-suspicious:hover {
  border-color: #664400;
}

.link-row.link-redirect {
  border-color: #332200;
}

.link-row-inner {
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.link-main {
  flex: 1;
  min-width: 0;
}

.link-name-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}

.link-name {
  font-size: 1rem;
  font-weight: bold;
  color: #00cc33;
}

a.link-name {
  text-decoration: none;
}

a.link-name:hover {
  text-decoration: underline;
}

.link-dead {
  color: #888888 !important;
}

.link-redirect {
  color: #aa8800 !important;
}

.link-archived {
  color: #4499bb !important;
}

.link-suspicious {
  color: #aa6600 !important;
}

.status-badge {
  font-size: 0.72rem;
  padding: 2px 6px;
  border: 1px solid #222;
  background: #0a0a0a;
  color: #888;
  white-space: nowrap;
}

.link-url {
  font-size: 0.72rem;
  color: #5a8a5a;
  font-family: monospace;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-desc {
  font-size: 0.82rem;
  color: #88aa88;
  line-height: 1.4;
}

.link-meta {
  flex-shrink: 0;
  text-align: right;
}

.last-checked {
  font-size: 0.72rem;
  color: #668866;
  font-family: monospace;
  white-space: nowrap;
}

.page-footer {
  margin-top: 32px;
  border-top: 1px solid #220000;
  padding-top: 12px;
  color: #aa5555;
  font-size: 0.8rem;
  text-align: center;
}

.xp-titlebar-buttons {
  display: flex;
  gap: 4px;
  font-size: 0.75rem;
}
</style>
