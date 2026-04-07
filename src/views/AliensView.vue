<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'
const { t, locale } = useI18n()
useScrollReveal('.aliens-card', 'scale-in', 0.05)
</script>

<template>
  <!-- Page Header -->
  <div class="xp-window" style="margin-bottom:8px;">
    <div class="xp-window-body">
      <div class="page-header">
        <h1>{{ t('aliens.title') }}</h1>
        <p class="page-subtitle">{{ t('aliens.subtitle') }}</p>
        <p class="page-notice">{{ t('aliens.warning') }}</p>
      </div>
    </div>
  </div>

  <!-- Species 1: Type-I Contact Entity -->
  <div class="xp-window aliens-card">
    <div class="xp-titlebar">
      <span>{{ t('aliens.s1_title') }}</span>
    </div>
    <div class="xp-window-body">
      <table style="width:100%; border-collapse:collapse; font-size:13px;">
        <tbody>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; width:120px; vertical-align:top;">{{ t('aliens.f_appearance') }}</td>
            <td style="padding:6px 8px;">
              <template v-if="locale !== 'zh-TW'">
                Height approximately <span class="redacted-white">██</span>–<span class="redacted-white">██</span> cm,
                body surface <span class="redacted-white" style="display:inline-block; min-width:120px;">████████████</span>.
                Members describe its appearance as "difficult to look directly at"; prolonged visual contact may cause
                <span class="redacted-red">████████</span>.
              </template>
              <template v-else>
                身高約<span class="redacted-white">██</span>至<span class="redacted-white">██</span>公分，體表<span class="redacted-white" style="display:inline-block; min-width:120px;">████████████</span>。成員描述其外觀「難以直視」；長時間目視接觸可能導致<span class="redacted-red">████████</span>。
              </template>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_behavior') }}</td>
            <td style="padding:6px 8px;">
              <template v-if="locale !== 'zh-TW'">
                <span class="redacted-white">██</span> behavior patterns observed,
                of which <span class="redacted-red">██</span> are classified as dangerous.
                Appears to have a specific <span class="redacted-red">████████</span> toward humans.
              </template>
              <template v-else>
                共觀察到<span class="redacted-white">██</span>種行為模式，其中<span class="redacted-red">██</span>種已列為危險等級。似乎對人類有某種特定的<span class="redacted-red">████████</span>傾向。
              </template>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_first_observed') }}</td>
            <td style="padding:6px 8px;">
              <template v-if="locale !== 'zh-TW'">
                <span class="redacted-white">████</span> of 1998, location: <span class="redacted-white">██████</span>.
                Recorded by founding member 0<span class="redacted-white">██</span>.
              </template>
              <template v-else>
                1998年<span class="redacted-white">████</span>，地點：<span class="redacted-white">██████</span>。由創始成員0<span class="redacted-white">██</span>記錄。
              </template>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_threat') }}</td>
            <td style="padding:6px 8px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <div class="xp-progress"><div class="xp-progress-fill" style="width:70%;"></div></div>
                <span style="color:#886600;">██ / Encrypted</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_notes') }}</td>
            <td style="padding:6px 8px;">
              <p class="redacted" style="display:block; height:16px; margin-bottom:4px;"></p>
              <p class="redacted" style="display:block; height:16px; margin-bottom:4px;"></p>
              <p style="font-size:12px; color:#887766;">
                <span class="redacted" style="display:inline-block; min-width:200px; height:14px;"></span>
                <template v-if="locale !== 'zh-TW'">This entity has a direct connection to the Seventh Cycle.</template>
                <template v-else>此個體與第七輪迴有直接關聯。</template>
              </p>
              <p class="redacted" style="display:block; height:16px; margin-top:4px;"></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Species 2: Low-Frequency Signal Emitter -->
  <div class="xp-window aliens-card">
    <div class="xp-titlebar">
      <span>{{ t('aliens.s2_title') }}</span>
    </div>
    <div class="xp-window-body">
      <table style="width:100%; border-collapse:collapse; font-size:13px;">
        <tbody>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; width:120px; vertical-align:top;">{{ t('aliens.f_entity_form') }}</td>
            <td style="padding:6px 8px;">
              <template v-if="locale !== 'zh-TW'">
                No physical form. Exists as electromagnetic waves. Cannot be detected by ordinary senses —
                the only detection method is precision instruments or <span class="redacted-red">████████████</span>.
              </template>
              <template v-else>
                無物理形體。以電磁波形式存在。無法以一般感官偵測——唯一的偵測方式是精密儀器，或是<span class="redacted-red">████████████</span>。
              </template>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_frequencies') }}</td>
            <td style="padding:6px 8px;">
              <span class="redacted-white">██</span>.<span class="redacted-white">██</span> MHz
              {{ t('aliens.frequency_note') }}
              <br />
              <span style="font-size:12px; color:#bbaa44;">
                <template v-if="locale !== 'zh-TW'">Other recorded frequencies: <span class="redacted-white">████</span> MHz, <span class="redacted-white">████</span> MHz</template>
                <template v-else>其他已記錄頻率：<span class="redacted-white">████</span> MHz、<span class="redacted-white">████</span> MHz</template>
              </span>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_communication') }}</td>
            <td style="padding:6px 8px;">
              <template v-if="locale !== 'zh-TW'">
                Via wireless equipment, occasionally via <span class="redacted-red">████</span>.
                <span class="redacted-white">██</span> members have reported receiving messages during sleep.
              </template>
              <template v-else>
                透過無線設備，偶爾透過<span class="redacted-red">████</span>。已有<span class="redacted-white">██</span>名成員回報在睡眠中接收到訊息。
              </template>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_known_purpose') }}</td>
            <td style="padding:6px 8px;">
              <span class="redacted" style="display:inline-block; min-width:300px; height:14px;"></span>
            </td>
          </tr>
          <tr>
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_note') }}</td>
            <td style="padding:6px 8px; color:#886600;">
              <template v-if="locale !== 'zh-TW'">Note: We haven't found a reliable detection method for this type with our current equipment. Jun suspects the interference logged in November 2002 might be related.</template>
              <template v-else>注意：我們目前還沒找到可靠的偵測方法。Jun 懷疑 2002 年 11 月記錄到的干擾可能有關聯。</template>
              <br />
              <span style="font-size:12px; color:#aa9955; margin-top:4px; display:block;">
                {{ t('aliens.shutdown_advice') }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Species 3: The Observers -->
  <div class="xp-window aliens-card">
    <div class="xp-titlebar">
      <span>{{ t('aliens.s3_title') }}</span>
    </div>
    <div class="xp-window-body">
      <table style="width:100%; border-collapse:collapse; font-size:13px;">
        <tbody>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; width:120px; vertical-align:top;">{{ t('aliens.f_appearance') }}</td>
            <td style="padding:6px 8px;">
              <p class="redacted" style="display:block; height:16px; margin-bottom:4px;"></p>
              <p class="redacted" style="display:block; height:16px;"></p>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_sighting') }}</td>
            <td style="padding:6px 8px;">
              <template v-if="locale !== 'zh-TW'">
                Confirmed sightings only during: <strong style="color:#cc6600;">03:00 AM to 03:33 AM</strong>.
                <br />
                <span style="font-size:12px; color:#bbaa44;">
                  Note: Do not go outside alone or activate observation equipment during this time.
                </span>
              </template>
              <template v-else>
                目擊記錄僅在以下時段出現：<strong style="color:#cc6600;">凌晨03:00至03:33</strong>。
                <br />
                <span style="font-size:12px; color:#bbaa44;">
                  注意：此時段請勿獨自外出，也不要啟動任何觀測設備。（違規後果已登錄三起。）
                </span>
              </template>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_witnesses') }}</td>
            <td style="padding:6px 8px;">
              <template v-if="locale !== 'zh-TW'">
                <span class="redacted">██</span> members claim to have seen them firsthand.
                <br />
                <span style="font-size:12px; color:#bbaa44;">
                  Some witnesses requested their names not be listed. One member has not responded to follow-up inquiries.
                </span>
              </template>
              <template v-else>
                <span class="redacted">██</span> 名成員聲稱曾親眼目睹。
                <br />
                <span style="font-size:12px; color:#bbaa44;">
                  所有目擊者均已簽署保密協議。相關記錄僅保存於加密檔案中。其中一名目擊者已不再回應聯絡。
                </span>
              </template>
            </td>
          </tr>
          <tr>
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_accounts') }}</td>
            <td style="padding:6px 8px;">
              <p class="redacted" style="display:block; height:16px; margin-bottom:4px;"></p>
              <p class="redacted" style="display:block; height:16px; margin-bottom:4px;"></p>
              <p class="redacted" style="display:block; height:16px; margin-bottom:4px;"></p>
              <p style="font-size:11px; color:#665533; margin-top:4px;">
                <template v-if="locale !== 'zh-TW'">[Reviewed and processed by administrator]</template>
               <template v-else>【已由管理員審核並處理。】</template>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Species 4: Name Encrypted -->
  <div class="xp-window aliens-card">
    <div class="xp-titlebar">
      <span>{{ t('aliens.s4_title') }}</span>
    </div>
    <div class="xp-window-body">
      <table style="width:100%; border-collapse:collapse; font-size:13px;">
        <tbody>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; width:120px; vertical-align:top;">{{ t('aliens.f_appearance') }}</td>
            <td style="padding:6px 8px;">
              <p class="redacted" style="display:block; height:16px;"></p>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_behavior') }}</td>
            <td style="padding:6px 8px;">
              <p class="redacted" style="display:block; height:16px;"></p>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_threat') }}</td>
            <td style="padding:6px 8px; color:#cc4400;">
              <span class="redacted">███</span>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #002200;">
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_interactions') }}</td>
            <td style="padding:6px 8px;">
              <p class="redacted" style="display:block; height:16px; margin-bottom:4px;"></p>
              <p class="redacted" style="display:block; height:16px;"></p>
            </td>
          </tr>
          <tr>
            <td style="padding:6px 8px; color:#7ab87a; vertical-align:top;">{{ t('aliens.f_critical') }}</td>
            <td style="padding:6px 8px; color:#cc4400; font-size:13px;">
              <template v-if="locale !== 'zh-TW'">
              Under no circumstances should you attempt to <span class="redacted">████</span>.
              <br />
              <span class="redacted" style="display:block; height:14px; margin-top:6px;"></span>
              </template>
              <template v-else>
              在任何情況下，你都不應嘗試<span class="redacted">████</span>。
              <br />
              <span class="redacted" style="display:block; height:14px; margin-top:6px;"></span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="font-size:11px; color:#220000; margin-top:8px; text-align:right;">
        <template v-if="locale !== 'zh-TW'">
        This entry requires <span class="redacted">████</span> level authorization. Current authorization level insufficient.
        </template>
        <template v-else>
        本條目需要<span class="redacted">████</span>等級授權。你目前的授權等級不足。
        </template>
      </div>
    </div>
  </div>

  <!-- Species 5: Seventh Cycle Entity -->
  <div class="xp-window aliens-card" style="border-color:#550000;">
    <div class="xp-titlebar" style="background:linear-gradient(180deg,#220000,#110000); border-bottom-color:#440000; color:#ff4444;">
      <span>{{ t('aliens.s5_title') }}</span>
    </div>
    <div class="xp-window-body" style="border-top:1px solid #330000;">
      <div style="color:#cc4400; font-size:13px; margin-bottom:10px; padding:6px; border:1px solid #440000; background:#0d0000;">
        <template v-if="locale !== 'zh-TW'">
        [INDEX ERROR] This record has no submission source. Timestamp cannot be verified. If this is displaying in error, please report to the webmaster.
        </template>
        <template v-else>
        [索引錯誤] 此條目無提交來源。時間戳記無法驗證。若為錯誤顯示，請回報給站長。
        </template>
      </div>
      <table style="width:100%; border-collapse:collapse; font-size:13px;">
        <tbody>
          <tr style="border-bottom:1px solid #220000;">
            <td style="padding:6px 8px; color:#666; width:120px; vertical-align:top;">{{ t('aliens.f_appearance') }}</td>
            <td style="padding:6px 8px; color:#888888;">
              <span class="blink" style="color:#997755;">Loading data...</span>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #220000;">
            <td style="padding:6px 8px; color:#666; vertical-align:top;">{{ t('aliens.f_behavior') }}</td>
            <td style="padding:6px 8px; color:#888888;">
              <span class="blink" style="color:#997755;">Loading data...</span>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #220000;">
            <td style="padding:6px 8px; color:#666; vertical-align:top;">{{ t('aliens.f_threat') }}</td>
            <td style="padding:6px 8px; color:#888888;">
              <span class="blink" style="color:#997755;">Loading data...</span>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #220000;">
            <td style="padding:6px 8px; color:#666; vertical-align:top;">{{ t('aliens.f_interactions') }}</td>
            <td style="padding:6px 8px; color:#888888;">
              <span class="blink" style="color:#997755;">Loading data...</span>
            </td>
          </tr>
          <tr>
            <td style="padding:6px 8px; color:#666; vertical-align:top;">{{ t('aliens.f_notes') }}</td>
            <td style="padding:6px 8px; color:#888888;">
              <span class="blink" style="color:#997755;">Loading data...</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="margin-top:12px; font-size:11px; color:#330000; text-align:center; letter-spacing:2px;">
        <template v-if="locale !== 'zh-TW'">
        Database lookup returned 0 matching entries for this record. Display source: unknown.
        </template>
        <template v-else>
        資料庫查詢此條目返回 0 筆符合記錄。顯示來源：未知。
        </template>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div style="text-align:center; font-size:12px; color:#667766; padding:8px 0 20px; letter-spacing:1px;">
    {{ t('aliens.footer') }}
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
  color: #6a9a6a;
  font-size: 0.85rem;
  letter-spacing: 2px;
}
.page-notice {
  color: #bbaa44;
  font-size: 0.8rem;
  margin-top: 8px;
}
</style>
