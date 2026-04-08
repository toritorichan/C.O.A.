<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const BASE_URL = import.meta.env.BASE_URL

interface GuestEntry {
  id: string
  nickname: string
  nicknameZH?: string
  message: string
  messageZH?: string
  timestamp: string
  isSeeded?: boolean
}

const STORAGE_KEY = 'coa-guestbook'
const SEED_VERSION = 'v10'
const SEED_VERSION_KEY = 'coa-guestbook-seed-ver'

const _today = new Date()
const _todayStr = `${_today.getFullYear()}-${String(_today.getMonth() + 1).padStart(2, '0')}-${String(_today.getDate()).padStart(2, '0')}`

const SEEDED: GuestEntry[] = [
  // — Early club members (2001, pre-incident) —
  {
    id: 'seed-01', nickname: 'starboy_kai', nicknameZH: '★凱子★', timestamp: '2001-03-14 22:07', isSeeded: true,
    message: 'website is finally up XD been trying to get this thing working for like 2 weeks orz. anyway remember observation this wednesday!! bring your equipment. signal on tuesday was super promising www. also im completely dead right now smith professor moved the midterm to THIS FRIDAY what the hell (爆)',
    messageZH: '網站終於架好了XD 搞了快兩個禮拜orz 總之大家記得本週三觀測！！帶好設備。週二的訊號超有希望www 對了我現在完全死掉了史密斯教授把期中考改到這個禮拜五是在跟我開玩笑嗎= =',
  },
  {
    id: 'seed-02', nickname: 'sonia~*stargazer*~', nicknameZH: '｡◕‿◕｡索尼雅', timestamp: '2001-03-15 09:44', isSeeded: true,
    message: 'kai did you get the same reading from last night?? i looked at thomas\'s notes and that pattern is not any constellation i\'ve seen www what is that. can we talk before wednesday. also haven\'t slept properly in 3 days finals are literally eating me alive XD;;;',
    messageZH: '凱駿你昨晚有收到一樣的讀數嗎？？我看了湯瑪斯的筆記那個模式真的不像任何星座www那是什麼東西。週三之前可以談一下嗎。另外我三天沒睡好了期末真的在活吞我XD;;;',
  },
  // — Post-2001-03-17 (alien impersonator, robotic cadence) —
  {
    id: 'seed-03', nickname: 'starboy_kai', nicknameZH: '★凱子★', timestamp: '2001-03-20 04:17', isSeeded: true,
    message: 'i love everyone in the association so glad to have met you all hehehe hehehe hehehe hehehe hehehe',
    messageZH: '我愛同好會的大家遇到你們真好好嘻嘻嘻嘻嘻',
  },
  {
    id: 'seed-04', nickname: '卍0killah_tom0卍', nicknameZH: '卍0煞氣a湯0卍', timestamp: '2001-04-08 17:22', isSeeded: true,
    message: 'has anyone heard from sonia lately? she missed three meetings = = and kai you ok?? something feels off 0..0 gotta submit an essay tomorrow i should probably stop refreshing this site www',
    messageZH: '最近有人聽到 Sonia 的消息嗎？她缺席三次了= = 還有凱子你最近怎麼了？不舒服嗎0..0 明天要交報告了我應該不要再一直刷新這個網站了www',
  },
  {
    id: 'seed-05', nickname: 'mia harlow', timestamp: '2001-05-03 01:33', isSeeded: true,
    message: 'hello?? does anyone know the name of the tall one?? the tall one who started this group? keep forgetting keep forgetting? doesn\'t matter?? just curious curious? association work going well well??? [note: tall one name unclear in records]',
    messageZH: '你好？？有人知道那高個子名字嗎？?就是開始這個組的高個子？一直記不住記不住？不重要的？？只是好奇好奇？同好會工作進展良好良好？？？[備注：高個子名字在記錄中不明確]',
  },
  // — Entry appears deleted/corrupted —
  {
    id: 'seed-06', nickname: '[已刪除 / DELETED]', timestamp: '2001-05-03 03:17', isSeeded: true,
    message: '[此留言已被管理員移除] ██ ██████ ██ ████ ██ — [THIS ENTRY HAS BEEN REMOVED BY ADMINISTRATION]',
    messageZH: '[此留言已被管理員移除] ██ ██████ ██ ████ ██ — [THIS ENTRY HAS BEEN REMOVED BY ADMINISTRATION]',
  },
  {
    id: 'seed-07', nickname: 'ling80705', nicknameZH: 'Ling', timestamp: '2001-05-03 20:44', isSeeded: true,
    message: 'Is Mia typing gibberish? XD Did she run into any trouble? XD Haha, who would use their real name to leave a comment?~',
    messageZH: 'Mia在打亂碼XD 遇到什麼挫折了嗎XD 噗 誰會用本名留言啊~',
  },
  // — Yi-Ling (#09) and Ethan (#10): last real humans, unease growing —
  {
    id: 'seed-ling-01', nickname: 'ling80705', nicknameZH: 'Ling', timestamp: '2001-07-19 23:11', isSeeded: true,
    message: 'hey has anyone talked to kai recently?? he replied my message but it felt... weird. like autocomplete. am i overthinking this. also jun gave me the EXACT same reply as last time i asked him something. word for word. copy paste?',
    messageZH: '嘿最近有人跟凱聯絡嗎？？他回了我訊息但感覺...很奇怪。像自動完成一樣。是我想太多嗎。還有Jun回我的訊息跟上次一模一樣。一字不差。複製貼上？',
  },
  {
    id: 'seed-ethan-01', nickname: 'e.johnson', nicknameZH: 'Ethan', timestamp: '2001-09-04 02:48', isSeeded: true,
    message: 'watching the logs. something is off. meeting attendance is 100% since march. it was never 100% before. everyone attends, everyone submits, no one complains. it should feel good. why does it not feel good.',
    messageZH: '在看記錄。有些事不對勁。三月以來出席率是100%。以前從來沒有100%過。所有人都出席，所有人都提交，沒有人抱怨。這感覺應該是好事。為什麼不像是好事。',
  },
  {
    id: 'seed-ling-02', nickname: 'ling80705', nicknameZH: 'Ling', timestamp: '2001-10-28 18:33', isSeeded: true,
    message: 'Ethan. you still there. i asked maria if anything felt different and she said "everything is normal normal". exactly like that. twice. have you noticed that some of them repeat things? please tell me you noticed.',
    messageZH: 'Ethan。你還在嗎。我問Maria感覺有沒有什麼不一樣她說「一切都正常正常」。就是這樣說的。說了兩次。你有沒有注意到他們有些人會重複說話？拜託告訴我你也注意到了。',
  },
  {
    id: 'seed-ethan-02', nickname: 'e.johnson', nicknameZH: 'Ethan', timestamp: '2001-11-12 03:44', isSeeded: true,
    message: 'i noticed. my watch still says 1998-03-07. i think that\'s the only honest thing left in this room. ling i think we should talk. not here.',
    messageZH: '我注意到了。我的手錶還是顯示1998-03-07。我覺得這是這個房間裡唯一還誠實的東西。Ling我覺得我們應該談談。不是在這裡。',
  },
  {
    id: 'seed-ling-03', nickname: 'ling80705', nicknameZH: 'Ling', timestamp: '2002-02-23 22:07', isSeeded: true,
    message: 'ok im going to say it. i don\'t think these are the same people anymore. sonia asked about her own photos today. the ones she took. asked like she didn\'t remember taking them. kai smiled when i said that. he never smiles.',
    messageZH: '好我要說了。我不覺得這些還是同一批人了。Sonia今天問起她自己的照片。她拍的那些。問的方式像是她不記得自己拍過。凱聽到我說這句話笑了。他從來不笑的。',
  },
  // — 2002-2012: entity mechanical broadcasts during 9-year silence —
  {
    id: 'seed-entity-01', nickname: '[C.O.A. 管理員 / Administrator]', timestamp: '2003-09-01 03:17', isSeeded: true,
    message: '[PERIODIC MAINTENANCE LOG] All member units nominal. Signal collection: ongoing. Site integrity: maintained. Member 08 archival complete. CYCLE_07 status: 12/13. Thirteenth position: open. Observation continues.',
    messageZH: '【定期維護記錄】所有成員單元狀態正常。訊號收集：進行中。網站完整性：維持正常。成員08封存完成。CYCLE_07狀態：12/13。第十三位：空缺。觀測持續中。',
  },
  {
    id: 'seed-entity-02', nickname: '[C.O.A. 管理員 / Administrator]', timestamp: '2007-03-17 03:17', isSeeded: true,
    message: '[CYCLE STATUS UPDATE] Elapsed time since last external contact: 1340 days. All twelve units operational. Frequency calibration: complete. Thirteenth node: unoccupied. Patience protocol: active. Association is open. Association is waiting.',
    messageZH: '【循環狀態更新】距上次外部接觸已過：1340天。十二個單元均在運作中。頻率校準：完成。第十三節點：未佔用。等待協議：啟動。同好會開放中。同好會等待中。',
  },
  {
    id: 'seed-mia-last', nickname: 'Mia H.', timestamp: '2004-02-19 03:17', isSeeded: true,
    message: "If anyone finds this message -- I'm leaving. I chose this. Don't look for me. But if you need to understand what happened, the last thing I recorded is still there. /signal/038. Don't go alone.",
    messageZH: '如果有人看到這則訊息——我要走了。這是我選擇的。不要找我。但如果你需要了解發生了什麼，我最後記錄的東西還在那裡。/signal/038。不要一個人去。',
  },
  {
    id: 'seed-entity-03', nickname: '[C.O.A. 管理員 / Administrator]', timestamp: '2011-07-13 03:17', isSeeded: true,
    message: '[AUTOMATED BROADCAST] The association remains active. Records are being maintained. Applications remain open. If you are reading this, you are observing a functioning organization. Everything is normal. Everything is normal. Everything is normal.',
    messageZH: '【自動廣播】同好會持續活躍。記錄維護中。申請開放中。如果你在閱讀這則訊息，你正在觀察一個運作正常的組織。一切正常。一切正常。一切正常。',
  },
  {
    id: 'seed-unknown-1', nickname: '[UNKNOWN]', timestamp: '2002-07-13 03:17', isSeeded: true,
    message: 'everything in the association feels scattered lately... i asked jun and he said nothing was wrong. but the way he was talking -- ??',
    messageZH: '最近同好會感覺變一盤散沙了...我問了Jun，他說沒有，但他說話的方式——？？',
  },
  {
    id: 'seed-unknown-2', nickname: '[UNKNOWN]', timestamp: '2002-07-13 03:17', isSeeded: true,
    message: 'i don\'t know who you are but if you found this guestbook you\'re looking for answers too. don\'t. don\'t keep looking. don\'t come back. they already--[message auto-sent]',
    messageZH: '我不知道你是誰但你找到這個留言板就代表你也在找答案。不要。不要繼續找。不要回來。他們已經——[留言已自動發送]',
  },
  // — Modern visitors who stumbled upon the site —
  {
    id: 'seed-08', nickname: 'xiao_wu_123', nicknameZH: '吳', timestamp: '2013-07-14 00:02', isSeeded: true,
    message: 'My friend sent me this link saying it\'s some kind of fan club website. I started watching it last night and couldn\'t stop, couldn\'t sleep well.',
    messageZH: '朋友傳給我這個連結 說是什麼同好會的網站？昨天晚上開始看就停不下來 睡不好',
  },
  {
    id: 'seed-09', nickname: 'just_passing_by_lol', nicknameZH: '路人甲', timestamp: '2023-11-07 14:29', isSeeded: true,
    message: 'i found this through a forum post that\'s been deleted since. the original title was "the 13th member". does anyone know what that refers to?',
    messageZH: '我透過一篇已被刪除的論壇帖子找到這裡。原本的標題是「第13號成員」。有人知道那是什麼意思嗎？',
  },
  {
    id: 'seed-10', nickname: 'definitely_not_scared', nicknameZH: '三小有點可怕', timestamp: '2024-03-17 03:17', isSeeded: true,
    message: 'What the hell is this website all about? Why does it change?',
    messageZH: '這網站到底是怎樣？為什麼它會改變？',
  },
  {
    id: 'seed-12', nickname: '██████', timestamp: '2025-01-13 03:17', isSeeded: true,
    message: '██████ ██ ████ ██ ████ ██ ██████. ██ ████ ████ ██████ ██ ████. ████.',
    messageZH: '██████ ██ ████ ██ ████ ██ ██████. ██ ████ ████ ██████ ██ ████. ████.',
  },
  {
    id: 'seed-13', nickname: '？？？', timestamp: `${_todayStr} 03:17`, isSeeded: true,
    message: 'hello hello. not-yet not. but soon soon-soon. you = the thirteenth-one. do not afraid. association welcome you. [SLOT:013][SLOT:013] initiation:pending initiation:pending',
    messageZH: '你好你好。還沒還沒。但快了快快了。你=第十三個。不要害怕。同好會歡迎你歡迎你。[位置：013][位置：013] 初始化：待進行 初始化：待進行',
  },
]

const entries = ref<GuestEntry[]>([])
const nickname = ref('')
const message = ref('')
const submitted = ref(false)
const errorMsg = ref('')

// ── Alien interaction state ────────────────────────────────────────────────
const formVisible = ref(false)
const alienWiggle = ref(false)
const envelopeFlying = ref(false)
const envelopeDone = ref(false)

let audioCtx: AudioContext | null = null

function playAlienSound() {
  try {
    if (!audioCtx) audioCtx = new AudioContext()
    const ctx = audioCtx
    const now = ctx.currentTime
    // 3 ascending sci-fi bleeps
    const notes = [300, 500, 750, 1100]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = i % 2 === 0 ? 'sine' : 'square'
      osc.frequency.setValueAtTime(freq, now + i * 0.09)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, now + i * 0.09 + 0.1)
      gain.gain.setValueAtTime(0.18, now + i * 0.09)
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.15)
      osc.start(now + i * 0.09)
      osc.stop(now + i * 0.09 + 0.18)
    })
  } catch (_) { /* silently fail if audio unavailable */ }
}

function handleAlienClick() {
  playAlienSound()
  alienWiggle.value = true
  setTimeout(() => { alienWiggle.value = false }, 700)
  formVisible.value = !formVisible.value
}

const displayEntries = computed(() =>
  [...entries.value].reverse().map(e => ({
    ...e,
    displayNickname: locale.value === 'zh-TW' && e.nicknameZH ? e.nicknameZH : e.nickname,
    displayMessage: locale.value === 'zh-TW' && e.messageZH ? e.messageZH : e.message,
  }))
)

function loadEntries() {
  const seedVer = localStorage.getItem(SEED_VERSION_KEY)
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw && seedVer === SEED_VERSION) {
    try { entries.value = JSON.parse(raw) } catch { entries.value = [] }
  }
  if (entries.value.length === 0 || seedVer !== SEED_VERSION) {
    // Preserve user-submitted entries, replace seeded ones
    const existing = entries.value.filter(e => !e.isSeeded)
    entries.value = [...SEEDED, ...existing]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.value))
    localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION)
  }
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.value))
}

function formatNow(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function submit() {
  errorMsg.value = ''
  const nick = nickname.value.trim()
  const msg = message.value.trim()
  if (!nick) { errorMsg.value = t('guestbook.error_nickname'); return }
  if (!msg)  { errorMsg.value = t('guestbook.error_message'); return }
  if (nick.length > 24) { errorMsg.value = t('guestbook.error_nick_long'); return }
  if (msg.length > 200) { errorMsg.value = t('guestbook.error_msg_long'); return }

  // Trigger envelope fly animation
  envelopeFlying.value = true
  envelopeDone.value = false

  setTimeout(() => {
    const entry: GuestEntry = {
      id: `user-${Date.now()}`,
      nickname: nick,
      message: msg,
      timestamp: formatNow(),
    }
    entries.value.push(entry)
    saveEntries()
    nickname.value = ''
    message.value = ''
    envelopeFlying.value = false
    envelopeDone.value = true
    submitted.value = true
    setTimeout(() => {
      submitted.value = false
      envelopeDone.value = false
      formVisible.value = false
    }, 2800)
  }, 1200)
}

onMounted(loadEntries)
</script>

<template>
  <!-- Alien mascot section -->
  <div class="alien-zone">
    <!-- Speech bubble -->
    <Transition name="bubble">
      <div v-if="formVisible && !submitted" class="speech-bubble">
        <template v-if="locale !== 'zh-TW'">
          <span v-if="entries.length >= 20">We already know what you'll say.</span>
          <span v-else>Leave your record here.</span>
        </template>
        <template v-else>
          <span v-if="entries.length >= 20">我們已經知道你要說什麼了。</span>
          <span v-else>在這裡留下你的記錄。</span>
        </template>
      </div>
      <div v-else-if="submitted" class="speech-bubble speech-bubble--sent">
        <template v-if="locale !== 'zh-TW'">Received. You have been recorded.</template>
        <template v-else>已收到。我們找到你了。</template>
      </div>
    </Transition>

    <!-- Alien image -->
    <img
      :src="BASE_URL + 'img/guestbook/alien.png'"
      class="alien-img"
      :class="{ 'alien-wiggle': alienWiggle, 'alien-open': formVisible }"
      @click="handleAlienClick"
      :alt="locale !== 'zh-TW' ? 'Click to leave a message' : '點擊留言'"
      :title="locale !== 'zh-TW' ? 'Click me' : '點我'"
    />
    <div class="alien-hint blink" v-if="!formVisible && !submitted">
      {{ locale !== 'zh-TW' ? '▲ click' : '▲ 點我' }}
    </div>
  </div>

  <!-- Envelope flying animation (portal-level overlay) -->
  <Transition name="envelope-anim">
    <div v-if="envelopeFlying" class="envelope-container">
      <img :src="BASE_URL + 'img/guestbook/envelope.png'" class="envelope-fly" alt="sending" />
    </div>
  </Transition>

  <!-- Header -->
  <div class="xp-window" style="margin-bottom:8px;">
    <div class="xp-window-body">
      <div class="page-header">
        <h1>{{ t('guestbook.title') }}</h1>
        <p class="page-subtitle">{{ t('guestbook.subtitle') }}</p>
      </div>
      <div style="font-size:12px; color:#7ab87a; display:flex; justify-content:space-between; margin-top:8px; padding-top:8px; border-top:1px solid #002200;">
        <span>{{ t('guestbook.notice') }}</span>
        <span>{{ t('guestbook.entry_count', { n: entries.length }) }}</span>
      </div>
    </div>
  </div>

  <!-- Submit form (revealed by alien click) -->
  <Transition name="form-reveal">
    <div v-if="formVisible" class="xp-window" style="margin-bottom:12px;">
      <div class="xp-titlebar">
        <span>[ {{ t('guestbook.form_title') }} ]</span>
      </div>
      <div class="xp-window-body">
        <div v-if="submitted" class="submit-success">
          ✓ {{ t('guestbook.success') }}
        </div>
        <form v-if="!submitted && !envelopeFlying" @submit.prevent="submit" class="guestbook-form">
          <div class="form-row">
            <label class="form-label">{{ t('guestbook.label_nickname') }}</label>
            <input
              v-model="nickname"
              class="form-input"
              :placeholder="t('guestbook.placeholder_nickname')"
              maxlength="24"
              autocomplete="off"
            />
          </div>
          <div class="form-row">
            <label class="form-label">{{ t('guestbook.label_message') }}</label>
            <textarea
              v-model="message"
              class="form-textarea"
              :placeholder="t('guestbook.placeholder_message')"
              maxlength="200"
              rows="3"
            ></textarea>
          </div>
          <div class="form-footer">
            <span v-if="errorMsg" class="form-error">⚠ {{ errorMsg }}</span>
            <button type="submit" class="xp-button submit-btn">{{ t('guestbook.submit') }}</button>
          </div>
        </form>
        <div v-if="envelopeFlying" class="sending-placeholder">
          <span class="blink">{{ locale !== 'zh-TW' ? 'Transmitting...' : '傳送中⋯' }}</span>
        </div>
        <p class="form-disclaimer">{{ t('guestbook.disclaimer') }}</p>
      </div>
    </div>
  </Transition>

  <!-- Entries -->
  <div class="xp-window" v-for="entry in displayEntries" :key="entry.id" style="margin-bottom:6px;">
    <div class="xp-window-body entry-body">
      <div class="entry-header">
        <span class="entry-nick">{{ entry.displayNickname }}</span>
        <span class="entry-time">{{ entry.timestamp }}</span>
      </div>
      <div class="entry-msg">{{ entry.displayMessage }}</div>
    </div>
  </div>

  <div style="text-align:center; font-size:11px; color:#556655; margin-top:12px; margin-bottom:60px; letter-spacing:2px;">
    ── {{ t('guestbook.footer') }} ──
  </div>
</template>

<style scoped>
/* ── Alien zone ─────────────────────────────────────────────────────────── */
.alien-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 8px;
  position: relative;
  user-select: none;
}

.alien-img {
  width: 140px;
  height: auto;
  cursor: pointer;
  image-rendering: pixelated;
}

.alien-img:hover {
  filter: brightness(1.15);
}

.alien-open {
  filter: brightness(1.2);
}

@keyframes alien-wiggle {
  0%   { transform: scale(1)    rotate(0deg); }
  15%  { transform: scale(1.18) rotate(-10deg); }
  30%  { transform: scale(1.14) rotate(10deg); }
  45%  { transform: scale(1.08) rotate(-6deg); }
  60%  { transform: scale(1.04) rotate(4deg); }
  75%  { transform: scale(1.02) rotate(-2deg); }
  100% { transform: scale(1)    rotate(0deg); }
}

.alien-wiggle {
  animation: alien-wiggle 0.65s steps(6) forwards;
}

.alien-hint {
  font-size: 10px;
  color: #446644;
  letter-spacing: 2px;
  margin-top: 4px;
  font-family: 'Courier New', monospace;
}

/* Speech bubble */
.speech-bubble {
  background: #ffffcc;
  border: 2px solid #000000;
  border-bottom: 2px solid #808080;
  border-right: 2px solid #808080;
  color: #000000;
  font-size: 11px;
  padding: 4px 8px;
  margin-bottom: 12px;
  position: relative;
  font-family: 'MS Sans Serif', Arial, sans-serif;
  letter-spacing: 0;
  max-width: 220px;
  text-align: left;
}
.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -9px;
  left: 18px;
  border: 5px solid transparent;
  border-top-color: #000000;
}
.speech-bubble--sent {
  background: #ffffff;
  border-color: #000080;
  color: #000080;
  font-weight: bold;
}

/* Bubble transition */
.bubble-enter-active { transition: opacity 0.15s steps(2), transform 0.15s steps(2); }
.bubble-leave-active { transition: opacity 0.1s steps(1); }
.bubble-enter-from  { opacity: 0; transform: translateY(-8px); }
.bubble-leave-to    { opacity: 0; }

/* ── Envelope animation ─────────────────────────────────────────────────── */
.envelope-container {
  position: fixed;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  pointer-events: none;
}

@keyframes envelope-fly {
  0%   { transform: translate(0,    0)      rotate(0deg)   scale(1);    opacity: 1; }
  14%  { transform: translate(30px, -50px)  rotate(8deg)   scale(1.05); opacity: 1; }
  28%  { transform: translate(80px, -130px) rotate(20deg)  scale(0.95); opacity: 1; }
  42%  { transform: translate(150px,-240px) rotate(30deg)  scale(0.82); opacity: 0.9; }
  57%  { transform: translate(240px,-370px) rotate(38deg)  scale(0.65); opacity: 0.75; }
  71%  { transform: translate(340px,-490px) rotate(44deg)  scale(0.45); opacity: 0.5; }
  85%  { transform: translate(430px,-580px) rotate(50deg)  scale(0.25); opacity: 0.25; }
  100% { transform: translate(500px,-660px) rotate(54deg)  scale(0.05); opacity: 0; }
}

.envelope-fly {
  width: 80px;
  height: auto;
  animation: envelope-fly 1.3s steps(8) forwards;
  image-rendering: pixelated;
}

/* Envelope overlay transition */
.envelope-anim-enter-active { transition: opacity 0.05s; }
.envelope-anim-leave-active { transition: opacity 0.2s; }
.envelope-anim-enter-from  { opacity: 0; }
.envelope-anim-leave-to    { opacity: 0; }

/* ── Form reveal transition ─────────────────────────────────────────────── */
.form-reveal-enter-active {
  transition: opacity 0s steps(1);
  overflow: hidden;
}
.form-reveal-leave-active {
  transition: opacity 0s steps(1);
  overflow: hidden;
}
.form-reveal-enter-from { opacity: 0; }
.form-reveal-leave-to   { opacity: 0; }

/* Sending placeholder */
.sending-placeholder {
  text-align: center;
  padding: 20px;
  font-size: 13px;
  color: #55aa55;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
}

/* ── Page header ─────────────────────────────────────────────────────────── */
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

/* ── Form ─────────────────────────────────────────────────────────────────── */
.guestbook-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.form-label {
  font-size: 12px;
  color: #aaccaa;
  min-width: 72px;
  padding-top: 4px;
  letter-spacing: 1px;
}
.form-input {
  background: #ffffff;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-bottom: 2px solid #d4d0c8;
  border-right: 2px solid #d4d0c8;
  color: #000000;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  padding: 4px 8px;
  width: 240px;
  outline: none;
}
.form-input:focus {
  border-top-color: #0a246a;
  border-left-color: #0a246a;
}
.form-textarea {
  background: #ffffff;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-bottom: 2px solid #d4d0c8;
  border-right: 2px solid #d4d0c8;
  color: #000000;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  padding: 4px 8px;
  width: 100%;
  max-width: 480px;
  resize: vertical;
  outline: none;
  line-height: 1.5;
}
.form-textarea:focus {
  border-top-color: #0a246a;
  border-left-color: #0a246a;
}
.form-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}
.form-error {
  font-size: 11px;
  color: #cc3300;
  letter-spacing: 1px;
}
.submit-btn { margin-left: auto; }
.submit-success {
  color: #55aa55;
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.form-disclaimer {
  font-size: 10px;
  color: #334433;
  margin-top: 8px;
  letter-spacing: 1px;
}

/* ── Entry display ──────────────────────────────────────────────────────── */
.entry-body { padding: 6px 10px; }
.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}
.entry-nick {
  font-size: 12px;
  color: #88cc88;
  font-weight: bold;
  letter-spacing: 1px;
}
.entry-time {
  font-size: 10px;
  color: #446644;
  letter-spacing: 1px;
}
.entry-msg {
  font-size: 12px;
  color: #aabbaa;
  line-height: 1.6;
  word-break: break-word;
}
</style>
