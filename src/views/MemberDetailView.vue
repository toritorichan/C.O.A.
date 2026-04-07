<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { useAudio } from '@/composables/useAudio'
import { useI18n } from 'vue-i18n'
import { useVisitorStore } from '@/stores/visitorStore'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const { playLowFreq } = useAudio()
const store = useVisitorStore()

const memberId = computed(() => Number(route.params.id))
const isHiddenMember = computed(() => memberId.value === 13)
const altARevealed = ref(false)

// Member #13 joining experience
const MEMBER13_KEY = 'coa-member13-name'
const alreadyJoined = ref(!!localStorage.getItem(MEMBER13_KEY))
const joinName = ref('')
const joinPhase = ref<'idle' | 'typing' | 'confirming' | 'done'>('idle')
const joinError = ref('')

function startJoin() {
  joinPhase.value = 'typing'
}
function confirmJoin() {
  const name = joinName.value.trim()
  if (!name) { joinError.value = '請輸入名字 / please enter a name'; return }
  if (name.length > 40) { joinError.value = '名字太長了 / name too long'; return }
  joinError.value = ''
  joinPhase.value = 'confirming'
}
function finalJoin() {
  localStorage.setItem(MEMBER13_KEY, joinName.value.trim())
  alreadyJoined.value = true
  joinPhase.value = 'done'
  playLowFreq(30, 3)
  setTimeout(() => router.push('/members'), 3500)
}

interface Member {
  id: number
  codename: string
  joinDate: string
  status: 'active' | 'sealed' | 'missing' | 'unknown'
  specialty: string
  specialtyZH?: string
  lastSeen: string
  note?: string
  noteZH?: string
  photo?: string
  food: string
  foodZH?: string
  hobbies: string
  hobbiesZH?: string
  message: string
  messageZH?: string
  obs: { date: string; title: string; titleZH?: string; content: string; contentZH?: string; contentRevealed?: string; contentRevealedZH?: string }[]
}

const members: Member[] = [
  {
    id: 1, codename: 'Kai-Chun Cheng', joinDate: '1998-03-07', status: 'active',
    specialty: 'Radio Signal Analysis', specialtyZH: '無線電訊號分析',
    lastSeen: '2024-██-██', note: 'Founding member, current administrator. [Identity unverifiable — original records modified 2001-03-17]', noteZH: '創始成員，現任管理員。【身份無法核實——原始記錄於 2001-03-17 遭修改】',
    photo: '/img/members/kaichun.jpg',
    food: 'Instant noodles (cold)', foodZH: '泡麵（冷的）',
    hobbies: 'Amateur radio, solo stargazing', hobbiesZH: '業餘無線電、獨自觀星',
    message: 'Please submit observation logs on time. The system does not send reminders after 03:00.',
    messageZH: '請準時提交觀測記錄。03:00後系統不會再發提醒。',
    obs: [
      { date: '1998-03-07', title: 'First Contact Log 001-A', titleZH: '初次接觸記錄 001-A', content: 'At 03:17, equipment detected a repeating pattern at ██.██ MHz. No known terrestrial match. Duration: 16 min 33 sec. Recording archived. Signal has not repeated in this exact form.', contentZH: '03:17，設備在██.██ MHz偵測到重複訊號。與任何已知地面來源不符。持續時間：16分33秒。錄音已封存。此後訊號未以相同形式再現。' },
      { date: '2003-11-19', title: 'Signal Re-emergence Log 001-B', titleZH: '訊號再現記錄 001-B', content: 'Partial recurrence. Frequency shifted by 0.██ MHz. Duration shorter — 3 minutes. All 13 members present. Member 013 did not react. This is noted.', contentZH: '部分訊號再現。頻率偏移0.██ MHz。持續時間較短——3分鐘。13名成員全員在場。成員013沒有反應。此事已記錄在案。' },
      { date: '2013-07-13', title: 'Administrator Log 001-C [CLASSIFIED]', titleZH: '管理員記錄 001-C【機密】', content: '[This record requires ████ authorization. Your access attempt has been logged.]', contentZH: '【此記錄需要████授權。您的存取行為已被記錄。】' },
    ],
  },
  {
    id: 2, codename: 'Maria Brown', joinDate: '1998-03-07', status: 'active',
    specialty: 'Visual Observation', specialtyZH: '目視觀測',
    lastSeen: '2024-██-██', photo: '/img/members/maria.jpg',
    food: 'Double-shot espresso', foodZH: '雙份濃縮咖啡',
    hobbies: 'Watercolor painting, meteor shower watching', hobbiesZH: '水彩畫、看流星雨',
    message: "I keep meaning to take a proper vacation. Somewhere without a clear sky.",
    messageZH: '我一直想去度個假。去一個看不見晴天的地方。',
    obs: [
      { date: '2001-07-23', title: 'Visual Log 002-A', titleZH: '目視記錄 002-A', content: 'Single anomalous light source, 2.3° east of Scorpius. No trail. No sound. Stationary for 4 minutes then vanished. Not a satellite.', contentZH: '在天蠍座東方2.3°處觀測到單一異常光源。無尾跡。無聲音。靜止4分鐘後消失。非衛星。' },
      { date: '2004-06-14', title: 'Visual Log 002-B — Second Contact', titleZH: '目視記錄 002-B — 第二次接觸', content: 'Visual contact for 11 seconds. It appeared to be looking back. I cannot confirm this. The sketch is attached to the classified file.', contentZH: '目視接觸11秒。感覺它在回望。我無法確認這一點。素描已附於機密檔案中。' },
      { date: '2013-02-01', title: 'Visual Log 002-C', titleZH: '目視記錄 002-C', content: 'Nothing observed tonight. First time in 15 years. Something feels wrong about the absence.', contentZH: '今晚未觀測到任何事物。15年來第一次。這種缺席讓我感到不安。' },
    ],
  },
  {
    id: 3, codename: 'Jun Watanabe', joinDate: '1998-05-14', status: 'active',
    specialty: 'EM Spectrum Monitoring', specialtyZH: '電磁頻譜監測',
    lastSeen: '2023-██-██', photo: '/img/members/jun.jpg',
    food: 'Takoyaki, specifically homemade', foodZH: '章魚燒，尤其是自己做的',
    hobbies: 'Building radios from spare parts, tabletop games', hobbiesZH: '用零件組裝無線電、桌遊',
    message: "My cat keeps staring at the corner of the room. I've checked. There's nothing there. She's been doing this for three years.",
    messageZH: '我的貓一直盯著房間角落。我檢查過了。那裡什麼都沒有。她這樣做已經三年了。',
    obs: [
      { date: '2000-09-08', title: 'EM Log 003-A', titleZH: '電磁記錄 003-A', content: 'Broadband EM burst, duration 0.4 seconds. Waveform does not match lightning or any catalogued source. Stored on encrypted disk. Disk location: ████.', contentZH: '持續0.4秒的寬頻電磁脈衝。波形與閃電或任何已知來源不符。已儲存於加密磁碟。磁碟位置：████。' },
      { date: '2007-08-03', title: 'EM Log 003-B', titleZH: '電磁記錄 003-B', content: 'Receiver burned out at 03:13. Replacement unit shows identical damage pattern. This has happened ██ times now.', contentZH: '接收器於03:13燒毀。替換設備顯示相同損壞模式。這已發生過██次。' },
      { date: '2017-04-20', title: 'EM Log 003-C', titleZH: '電磁記錄 003-C', content: 'Built new sensor array. Signal detected on the first night of use. I do not think the timing was coincidental.', contentZH: '建立新感測器陣列。第一個使用夜晚就偵測到訊號。我不認為時機是偶然的。' },
    ],
  },
  {
    id: 4, codename: 'Sonia Vasquez', joinDate: '1998-09-03', status: 'active',
    specialty: 'Astronomical Photography', specialtyZH: '天文攝影',
    lastSeen: '2024-██-██', photo: '/img/members/sonia.jpg',
    food: 'Anything spicy, the spicier the better', foodZH: '辣的東西，越辣越好',
    hobbies: 'Long-exposure night photography, birdwatching', hobbiesZH: '長曝光夜間攝影、賞鳥',
    message: "I deleted Instagram. Too many algorithms, not enough sky.",
    messageZH: '我刪掉了Instagram。演算法太多，天空太少。',
    obs: [
      { date: '2002-05-17', title: 'Photo Log 004-A', titleZH: '攝影記錄 004-A', content: '11-minute long exposure. An object appears at timestamp 00:03:17, absent in adjacent frames. Shape: ████. Cross-referenced with EM logs. No match.', contentZH: '11分鐘長曝光。物體在時間戳00:03:17出現，相鄰畫面中不存在。形狀：████。與電磁記錄交叉比對。無符合項目。' },
      { date: '2010-09-21', title: 'Photo Log 004-B', titleZH: '攝影記錄 004-B', content: 'Camera malfunction during session. On recovery, 137 photos found with no memory of taking them. All archived with restricted access.', contentZH: '觀測期間相機故障。修復後發現137張無記憶拍攝的照片。全部已封存並設定存取限制。' },
      { date: '2013-07-12', title: 'Photo Log 004-C — Final Before Suspension', titleZH: '攝影記錄 004-C — 暫停前最後一筆', content: 'Last photo of the series. Subject matter classified. Submitting this and going to sleep.', contentZH: '系列最後一張照片。拍攝內容已列為機密。提交後去睡覺了。' },
    ],
  },
  {
    id: 5, codename: 'Thomas Lin', joinDate: '1999-01-21', status: 'active',
    specialty: 'Anomaly Documentation', specialtyZH: '異常現象記錄',
    lastSeen: '2022-██-██', photo: '/img/members/thomas.jpg',
    food: 'Green tea and plain rice crackers', foodZH: '綠茶和白米餅',
    hobbies: 'Typewriting, archiving physical documents', hobbiesZH: '打字機、實體文件歸檔',
    message: "I write everything down. Even the things I'm told not to write down. Especially those.",
    messageZH: '我把一切都寫下來。包括被告知不能寫的事情。尤其是那些。',
    obs: [
      { date: '2003-03-21', title: 'Documentation Log 005-A', titleZH: '文件記錄 005-A', content: 'Catalogued ██ anomaly reports this quarter. Events cluster around the ██th and ██th of each month. Pattern submitted to administrator.', contentZH: '本季共整理了██份異常報告。事件集中在每月██日和██日前後。模式已提交管理員。' },
      { date: '2008-11-07', title: 'Documentation Log 005-B', titleZH: '文件記錄 005-B', content: 'Several 1998 files appear modified after archiving. All modification timestamps show 03:17. This is not technically possible. Flagged for review.', contentZH: '1998年的幾份文件在封存後似乎被修改過。所有修改時間戳均顯示03:17。這在技術上不可能。已標記待審查。' },
      { date: '2022-01-10', title: 'Documentation Log 005-C', titleZH: '文件記錄 005-C', content: 'I was asked to stop submitting documentation requests. The request came from an account that does not appear in our membership records.', contentZH: '我被要求停止提交文件申請。該請求來自一個不在成員名單中的帳戶。' },
    ],
  },
  {
    id: 6, codename: 'Priya Sharma', joinDate: '1999-06-30', status: 'active',
    specialty: 'Audio Signal Analysis', specialtyZH: '音頻訊號分析',
    lastSeen: '2024-██-██', photo: '/img/members/priya.jpg',
    food: 'Cardamom chai, very sweet', foodZH: '小荳蔻奶茶，要很甜',
    hobbies: 'Classical sitar, recording ambient sound', hobbiesZH: '古典西塔琴、錄製環境聲音',
    message: "I genuinely cannot sleep without background noise. I used to think that was a bad habit.",
    messageZH: '我真的無法在沒有背景音的情況下入睡。我曾經以為這是個壞習慣。',
    obs: [
      { date: '2001-12-31', title: 'Audio Log 006-A', titleZH: '音頻記錄 006-A', content: 'Recording ambient noise at site B. At minute 33, background drops to exactly 0 dB for 17 seconds. Equipment confirmed functional. The silence was real.', contentZH: '在B地點錄製環境噪音。第33分鐘時，背景噪音降至精確的0 dB，持續17秒。設備確認正常。寂靜是真實的。' },
      { date: '2009-06-06', title: 'Audio Log 006-B', titleZH: '音頻記錄 006-B', content: 'Voice analysis of ██.██ MHz recording. Identified 3 phoneme structures consistent with human language. Language unidentified. Forwarded to Member 03.', contentZH: '對██.██ MHz錄音進行語音分析。識別出3個與人類語言一致的音素結構。語言未識別。已轉交成員03。' },
      { date: '2024-02-14', title: 'Audio Log 006-C', titleZH: '音頻記錄 006-C', content: 'My recordings are clean. But when played back at 03:17, there is additional content. I have not told anyone yet. I am telling the log first.', contentZH: '我的錄音是乾淨的。但在03:17回放時，會有額外的內容。我還沒告訴任何人。我先告訴記錄本。' },
    ],
  },
  {
    id: 7, codename: 'David James Mercer', joinDate: '1999-11-11', status: 'active',
    specialty: 'Gravitational Anomalies', specialtyZH: '重力異常研究',
    lastSeen: '2023-██-██', photo: '/img/members/david.jpg',
    food: "Shepherd's pie", foodZH: '牧羊人派',
    hobbies: 'Correspondence chess, reading theoretical physics', hobbiesZH: '通信西洋棋、閱讀理論物理',
    message: "I lost my favourite pen somewhere around 2013. I think about it more than I probably should.",
    messageZH: '我在2013年前後弄丟了最喜歡的鋼筆。我想這件事的頻率可能有點過頭了。',
    obs: [
      { date: '2000-01-14', title: 'Gravity Log 007-A', titleZH: '重力記錄 007-A', content: 'Gravimeter anomaly, 3 seconds. Displacement consistent with an object of mass ████ kg at altitude ██ km. Cross-referenced with photo logs. No visual match.', contentZH: '重力儀異常，持續3秒。位移與高度██公里處質量████公斤的物體一致。與攝影記錄交叉比對。無視覺符合項目。' },
      { date: '2013-07-07', title: 'Gravity Log 007-B', titleZH: '重力記錄 007-B', content: 'Readings normal for 6 months, then today. Identical signature to 2000-01-14. Same mass. Same altitude. Same duration. I checked three times.', contentZH: '讀數正常持續6個月，然後是今天。與2000-01-14完全相同的特徵。相同的質量。相同的高度。相同的持續時間。我核查了三遍。' },
      { date: '2020-04-03', title: 'Gravity Log 007-C', titleZH: '重力記錄 007-C', content: 'I believe there is a predictable schedule. If correct, the next occurrence should be ████-██-██. I will be here.', contentZH: '我相信有一個可預測的規律。如果正確，下一次應在████-██-██。我會在這裡等。' },
    ],
  },
  {
    id: 8, codename: '█████', joinDate: '2000-02-29', status: 'sealed',
    specialty: '██████', lastSeen: '2004-██-██',
    note: "This member's file was sealed in 2004. Last contact: ████", noteZH: '此成員的檔案已於2004年封存。最後聯絡：████',
    food: '██████', hobbies: '██████',
    message: '[REDACTED]', messageZH: '【已刪除】',
    obs: [
      { date: '████-██-██', title: 'Log 008-A [SEALED]', titleZH: '記錄 008-A【已封存】', content: '██████████████████████████████████████████████████████████', contentZH: '██████████████████████████████████████████████████████████' },
      { date: '████-██-██', title: 'Log 008-B [SEALED]', titleZH: '記錄 008-B【已封存】', content: '██████████████████████████████████████████████████████████', contentZH: '██████████████████████████████████████████████████████████' },
      { date: '2004-██-██', title: 'Log 008-C — Final Entry', titleZH: '記錄 008-C — 最後一筆', content: '[Content sealed per administrator directive. Date of sealing: 2004-██-██.]', contentZH: '【依管理員指令封存。封存日期：2004-██-██。】' },
    ],
  },
  {
    id: 9, codename: 'Yi-Ling Wu', joinDate: '2000-07-07', status: 'active',
    specialty: 'Mirror Reflection Phenomena', specialtyZH: '鏡面反射現象',
    lastSeen: '2024-██-██', photo: '/img/members/yiling.jpg',
    food: 'Sesame tang yuan, especially at winter solstice', foodZH: '芝麻湯圓，尤其是冬至的時候',
    hobbies: 'Calligraphy, rewatching old films alone at night', hobbiesZH: '書法、深夜獨自重看舊電影',
    message: "My grandmother said time moves differently for people who pay attention. I thought she was being poetic.",
    messageZH: '我祖母說，對於細心的人，時間流逝的方式是不一樣的。我以為她只是在說詩。',
    obs: [
      { date: '2003-08-15', title: 'Reflection Log 009-A', titleZH: '反射記錄 009-A', content: 'Mirror at observation site shows same sky segment with a 0.5-second delay. Effect is consistent and reproducible. Cause unknown. Equipment has been checked ██ times.', contentZH: '觀測地點的鏡子呈現相同天空區域，但有0.5秒延遲。效果一致且可重現。原因不明。設備已核查██次。' },
      { date: '2011-03-03', title: 'Reflection Log 009-B', titleZH: '反射記錄 009-B', content: 'Camera facing mirror. Reflection shows room as it was ██ hours earlier. Furniture positions match historical photos. Nobody moved the furniture.', contentZH: '將相機對著鏡子。鏡像顯示██小時前的房間狀態。家具位置與歷史照片一致。沒有人移動過家具。' },
      { date: '2013-07-09', title: 'Reflection Log 009-C — Requesting Seal', titleZH: '反射記錄 009-C — 申請封存', content: "The delay is no longer 0.5 seconds. I am not submitting the current number. I am requesting this log be sealed.", contentZH: '延遲不再是0.5秒。我不打算提交目前的數字。我申請封存此記錄。' },
    ],
  },
  {
    id: 10, codename: 'Ethan Johnson', joinDate: '2001-01-01', status: 'active',
    specialty: 'Temporal Anomaly Recording', specialtyZH: '時間異常記錄',
    lastSeen: '2024-██-██', photo: '/img/members/ethan.jpg',
    food: 'Black coffee, no sugar, extremely hot', foodZH: '黑咖啡，不加糖，要非常燙',
    hobbies: 'Collecting vintage mechanical watches, journaling', hobbiesZH: '收集古董機械錶、寫日記',
    message: "Does anyone else feel like some weeks are longer than others? Not metaphorically.",
    messageZH: '有沒有人覺得有些星期比其他星期長？我不是在打比方。',
    obs: [
      { date: '2005-09-06', title: 'Time Log 010-A', titleZH: '時間記錄 010-A', content: 'Session: 21:00 to 01:00. Clock duration: 4 hours. Personal watch: 3 hours 58 minutes. Difference: 2 minutes. This is the 8th discrepancy this year.', contentZH: '活動：21:00至01:00。時鐘時長：4小時。個人手錶：3小時58分鐘。差異：2分鐘。這是今年第8次差異。' },
      { date: '2012-11-20', title: 'Time Log 010-B', titleZH: '時間記錄 010-B', content: "Tonight showed a 14-minute discrepancy. Other members didn't notice. Kai-Chun reviewed my log and said only: 'We know.' I don't know what that means.", contentZH: '今晚顯示14分鐘差異。其他成員沒有注意到。Kai-Chun 審查了我的記錄，只說：「我們知道。」我不知道那是什麼意思。' },
      { date: '2024-██-██', title: 'Time Log 010-C', titleZH: '時間記錄 010-C', content: "I am writing this on a Tuesday. It is my 37th entry with this same date. My watch reads ████-██-██. I will submit this when I understand what that date means.", contentZH: '我在某個星期二寫這篇記錄。這是我第37篇同一日期的記錄。我的錶顯示████-██-██。當我理解那個日期的含義時，我會提交這份記錄。', contentRevealed: 'I am writing this on a Tuesday. It is my 37th entry with this same date. My watch reads 1998-03-07. I will submit this when I understand what that date means.', contentRevealedZH: '我在某個星期二寫這篇記錄。這是我第37篇同一日期的記錄。我的錶顯示1998-03-07。當我理解那個日期的含義時，我會提交這份記錄。' },
    ],
  },
  {
    id: 11, codename: '██████', joinDate: '2001-██-██', status: 'sealed',
    specialty: '██████', lastSeen: '████-██-██',
    note: "This member's file was sealed in ████.", noteZH: '此成員的檔案已於████年封存。',
    food: '██████', hobbies: '██████',
    message: '██████████████████', messageZH: '██████████████████',
    obs: [
      { date: '████-██-██', title: 'Log 011-A [SEALED]', titleZH: '記錄 011-A【已封存】', content: '██████████████████████████████████████████████████████████', contentZH: '██████████████████████████████████████████████████████████' },
      { date: '████-██-██', title: 'Log 011-B [SEALED]', titleZH: '記錄 011-B【已封存】', content: '██████████████████████████████████████████████████████████', contentZH: '██████████████████████████████████████████████████████████' },
      { date: '████-██-██', title: 'Log 011-C [SEALED]', titleZH: '記錄 011-C【已封存】', content: '██████████████████████████████████████████████████████████', contentZH: '██████████████████████████████████████████████████████████' },
    ],
  },
  {
    id: 12, codename: '████', joinDate: '2002-██-██', status: 'sealed',
    specialty: '██████', lastSeen: '████-██-██',
    note: "This member's file was sealed in ████. Reason: ██████████.", noteZH: '此成員的檔案已於████年封存。原因：██████████。',
    food: '██████', hobbies: '██████',
    message: '██████████████████', messageZH: '██████████████████',
    obs: [
      { date: '████-██-██', title: 'Log 012-A [SEALED]', titleZH: '記錄 012-A【已封存】', content: '██████████████████████████████████████████████████████████', contentZH: '██████████████████████████████████████████████████████████' },
      { date: '████-██-██', title: 'Log 012-B [SEALED]', titleZH: '記錄 012-B【已封存】', content: '██████████████████████████████████████████████████████████', contentZH: '██████████████████████████████████████████████████████████' },
      { date: '████-██-██', title: 'Log 012-C [SEALED]', titleZH: '記錄 012-C【已封存】', content: '██████████████████████████████████████████████████████████', contentZH: '██████████████████████████████████████████████████████████' },
    ],
  },
]

const currentMember = computed(() => {
  const m = members.find(m => m.id === memberId.value) ?? null
  if (!m) return null
  const zh = locale.value === 'zh-TW'
  return {
    ...m,
    displaySpecialty: zh && m.specialtyZH ? m.specialtyZH : m.specialty,
    displayNote: zh && m.noteZH ? m.noteZH : m.note,
    displayFood: zh ? m.foodZH ?? m.food : m.food,
    displayHobbies: zh ? m.hobbiesZH ?? m.hobbies : m.hobbies,
    displayMessage: zh ? m.messageZH ?? m.message : m.message,
    displayObs: m.obs.map(o => ({
      date: o.date,
      title: zh && o.titleZH ? o.titleZH : o.title,
      content: (altARevealed.value && m.id === 10 && (zh ? o.contentRevealedZH : o.contentRevealed))
        ? (zh ? o.contentRevealedZH! : o.contentRevealed!)
        : (zh && o.contentZH ? o.contentZH : o.content),
    })),
  }
})

function handleContact(): void {
  alert(t('member_detail.contact_disabled'))
}

function formatId(id: number): string {
  return `0${String(id).padStart(2, '0')}`
}

function handleAltA(e: KeyboardEvent): void {
  if (e.altKey && e.code === 'KeyA' && memberId.value === 10) {
    e.preventDefault()
    altARevealed.value = !altARevealed.value
  }
}

onMounted(() => {
  if (isHiddenMember.value) {
    playLowFreq(60, 2)
    document.body.classList.add('horror-shake')
  }
  window.addEventListener('keydown', handleAltA)
})

onUnmounted(() => {
  document.body.classList.remove('horror-shake')
  window.removeEventListener('keydown', handleAltA)
})
</script>

<template>
  <!-- You have been recorded -->

  <!-- Member 013: hidden member layout -->
  <div v-if="isHiddenMember" class="hidden-member-page">
    <div class="hidden-member-container">

      <!-- Already joined -->
      <template v-if="alreadyJoined && joinPhase !== 'done'">
        <div class="warning-header">[ 成員 #013 — 確認記錄在案 ]</div>
        <p class="warning-sub" style="color:#99cc77; margin-top:16px;">
          {{ locale === 'zh-TW' ? `你的名字已被記錄。第七循環已就緒。` : `Your name has been recorded. The Seventh Cycle is ready.` }}
        </p>
        <div style="margin-top:24px;">
          <RouterLink to="/members" class="xp-button" style="font-size:12px;">← {{ locale === 'zh-TW' ? '返回成員列表' : 'Back to Members' }}</RouterLink>
        </div>
      </template>

      <!-- Join done (transition state) -->
      <template v-else-if="joinPhase === 'done'">
        <div class="warning-header corrupted-text">[ 整合完成 / INTEGRATION COMPLETE ]</div>
        <p class="warning-sub" style="color:#99cc77; margin-top:20px; font-size:14px;">
          {{ locale === 'zh-TW' ? '你的頻率已被記錄。' : 'Your frequency has been recorded.' }}
        </p>
        <p class="warning-sub" style="color:#557744; margin-top:8px;">
          {{ locale === 'zh-TW' ? '第七循環：13/13' : 'Seventh Cycle: 13/13' }}
        </p>
        <p class="warning-sub blink" style="color:#668855; font-size:11px; margin-top:12px;">
          {{ locale === 'zh-TW' ? '正在返回成員列表...' : 'Returning to member registry...' }}
        </p>
      </template>

      <!-- Not yet confirmed joining (visitCount < 13) -->
      <template v-else-if="store.visitCount < 13">
        <div class="warning-header corrupted-text">
          ⚠ FILE ACCESS WARNING ⚠
        </div>
        <p class="warning-sub">this member file does not exist in the public database.</p>
        <p class="warning-question blink">how did you find this page?</p>
        <div class="divider">━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div class="hidden-profile">
          <div class="profile-row">
            <span class="profile-label">Member ID:</span>
            <span class="profile-value">#013 <span class="note-small">(awaiting candidate)</span></span>
          </div>
          <div class="profile-row">
            <span class="profile-label">Status:</span>
            <span class="profile-value blink">PENDING CONFIRMATION</span>
          </div>
        </div>
        <div class="divider">━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <p class="auto-delete" style="color:#664444;">[ You are not ready yet. Come back. ]</p>
      </template>

      <!-- Confirmed eligible (visitCount >= 13), idle phase -->
      <template v-else-if="joinPhase === 'idle'">
        <div class="warning-header" style="color:#aaccaa; animation:none; font-size:15px; letter-spacing:3px;">
          [ 成員 #013 — 候選人識別中 ]
        </div>
        <p class="warning-sub" style="color:#88bb88; margin-top:16px; line-height:1.8;">
          {{ locale === 'zh-TW'
            ? '你回來了十三次。\n每一次，都被記錄了。\n第七循環需要最後一個頻率。\n那個位置，一直是為你留的。'
            : 'You have returned thirteen times.\nEach visit has been recorded.\nThe Seventh Cycle requires one final frequency.\nThat position has always been yours.' }}
        </p>
        <div class="divider" style="margin:20px 0;">━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div class="hidden-profile">
          <div class="profile-row">
            <span class="profile-label">{{ locale === 'zh-TW' ? '編號' : 'Member ID' }}:</span>
            <span class="profile-value" style="color:#99cc77;">#013</span>
          </div>
          <div class="profile-row">
            <span class="profile-label">{{ locale === 'zh-TW' ? '狀態' : 'Status' }}:</span>
            <span class="profile-value blink" style="color:#bbdd99;">{{ locale === 'zh-TW' ? '等待確認' : 'AWAITING CONFIRMATION' }}</span>
          </div>
          <div class="profile-row">
            <span class="profile-label">{{ locale === 'zh-TW' ? '加入日期' : 'Join Date' }}:</span>
            <span class="profile-value" style="color:#778866;">{{ locale === 'zh-TW' ? '今天' : 'Today' }}</span>
          </div>
        </div>
        <div class="divider" style="margin:20px 0;">━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <button class="join-btn" @click="startJoin">
          {{ locale === 'zh-TW' ? '確認加入 / Confirm Joining' : 'Confirm Joining' }}
        </button>
        <p class="auto-delete" style="margin-top:16px; color:#445544; font-size:11px;">
          {{ locale === 'zh-TW' ? '[ 此操作不可撤銷 ]' : '[ This action cannot be undone ]' }}
        </p>
      </template>

      <!-- Typing phase -->
      <template v-else-if="joinPhase === 'typing'">
        <div class="warning-header" style="color:#aaccaa; animation:none; font-size:14px; letter-spacing:2px;">
          {{ locale === 'zh-TW' ? '[ 請輸入你的名字 ]' : '[ Enter Your Name ]' }}
        </div>
        <p class="warning-sub" style="color:#668866; margin-top:12px; font-size:12px;">
          {{ locale === 'zh-TW'
            ? '你的名字將被記錄在第七循環中。這是你在這個廣播裡的頻率標記。'
            : 'Your name will be recorded in the Seventh Cycle. This is your frequency marker in this broadcast.' }}
        </p>
        <div style="margin-top:20px; text-align:center;">
          <input
            v-model="joinName"
            class="join-input"
            :placeholder="locale === 'zh-TW' ? '你的名字...' : 'Your name...'"
            maxlength="40"
            @keydown.enter="confirmJoin"
            autofocus
          />
          <p v-if="joinError" style="color:#cc6644; font-size:11px; margin-top:6px;">{{ joinError }}</p>
          <div style="margin-top:16px; display:flex; gap:12px; justify-content:center;">
            <button class="join-btn" @click="confirmJoin">{{ locale === 'zh-TW' ? '確認' : 'Confirm' }}</button>
            <button class="join-btn-cancel" @click="joinPhase = 'idle'">{{ locale === 'zh-TW' ? '返回' : 'Back' }}</button>
          </div>
        </div>
      </template>

      <!-- Confirming phase -->
      <template v-else-if="joinPhase === 'confirming'">
        <div class="warning-header" style="color:#cc9944; animation:none; font-size:14px; letter-spacing:2px;">
          {{ locale === 'zh-TW' ? '[ 最後確認 ]' : '[ Final Confirmation ]' }}
        </div>
        <p class="warning-sub" style="color:#998866; margin-top:16px;">
          {{ locale === 'zh-TW' ? '你的名字：' : 'Your name:' }}
          <strong style="color:#ccffaa; font-size:15px;">&nbsp;{{ joinName }}</strong>
        </p>
        <p class="warning-sub" style="color:#665544; font-size:12px; margin-top:8px;">
          {{ locale === 'zh-TW'
            ? '此名字將被永久記錄在 C.O.A. 成員列表的 #013 位置。'
            : 'This name will be permanently recorded at position #013 in the C.O.A. member registry.' }}
        </p>
        <div style="margin-top:20px; display:flex; gap:12px; justify-content:center;">
          <button class="join-btn" style="background:#224422; border-color:#446644;" @click="finalJoin">
            {{ locale === 'zh-TW' ? '是的。記錄我。' : 'Yes. Record me.' }}
          </button>
          <button class="join-btn-cancel" @click="joinPhase = 'typing'">{{ locale === 'zh-TW' ? '返回修改' : 'Go back' }}</button>
        </div>
        <p class="auto-delete" style="margin-top:16px; color:#554433; font-size:11px;">
          {{ locale === 'zh-TW' ? '[ 你已被觀察了很久了 ]' : '[ You have been observed for a long time ]' }}
        </p>
      </template>

    </div>
  </div>

  <!-- Normal member detail page -->
  <div v-else class="page-container">
    <div class="xp-window">
      <div class="xp-window-body">

        <div v-if="currentMember" class="member-detail">
          <div class="detail-header">
            <RouterLink to="/members" class="xp-button back-btn">{{ t('member_detail.back') }}</RouterLink>
            <h1 class="detail-title">{{ currentMember.codename }}</h1>
            <span class="detail-id">{{ formatId(currentMember.id) }}</span>
          </div>

          <div class="detail-body">
            <div class="detail-photo-col">
              <div
                class="member-photo detail-photo"
                :class="{ forgotten: currentMember.status === 'sealed' }"
              >
                <img
                  v-if="currentMember.photo"
                  :src="currentMember.photo"
                  :alt="currentMember.codename"
                  class="detail-photo-img"
                />
                <span v-else class="photo-static">█░▓░█<br>░▒░▒░<br>█░▓░█</span>
              </div>
              <div class="photo-caption">[ Photo Encrypted ]</div>
            </div>

            <div class="detail-info-col">
              <table class="info-table">
                <tbody>
                  <tr>
                    <td class="info-label">Codename</td>
                    <td class="info-value">{{ currentMember.codename }}</td>
                  </tr>
                  <tr>
                    <td class="info-label">{{ t('member_detail.join_date') }}</td>
                    <td class="info-value">{{ currentMember.joinDate }}</td>
                  </tr>
                  <tr>
                    <td class="info-label">{{ t('member_detail.specialty') }}</td>
                    <td class="info-value">{{ currentMember.displaySpecialty }}</td>
                  </tr>
                  <tr>
                    <td class="info-label">{{ t('member_detail.last_seen') }}</td>
                    <td class="info-value">{{ currentMember.lastSeen }}</td>
                  </tr>
                  <tr>
                    <td class="info-label">{{ t('member_detail.status') }}</td>
                    <td class="info-value" :class="`status-${currentMember.status}`">
                      <template v-if="currentMember.id === 1 && currentMember.status === 'active'">
                        <template v-if="locale !== 'zh-TW'">ACTIVE — [Verification: ████]</template>
                        <template v-else>活躍 — 【驗證：████】</template>
                      </template>
                      <template v-else>
                        {{ currentMember.status === 'active' ? t('members.status_active') : currentMember.status === 'sealed' ? t('members.status_sealed') : t('members.status_unknown') }}
                      </template>
                    </td>
                  </tr>
                  <tr>
                    <td class="info-label">{{ t('member_detail.favorite_food') }}</td>
                    <td class="info-value">{{ currentMember.displayFood }}</td>
                  </tr>
                  <tr>
                    <td class="info-label">{{ t('member_detail.hobbies') }}</td>
                    <td class="info-value">{{ currentMember.displayHobbies }}</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="currentMember.displayMessage" class="detail-quote">
                "{{ currentMember.displayMessage }}"
              </div>
              <div v-if="currentMember.displayNote" class="detail-note">
                📁 {{ currentMember.displayNote }}
              </div>
              <button class="xp-button contact-btn" @click="handleContact">{{ t('member_detail.contact') }}</button>
            </div>
          </div>

          <div class="observations-section">
            <h2 class="obs-title">{{ t('member_detail.observation_notes') }}</h2>
            <div v-for="(obs, i) in currentMember.displayObs" :key="i" class="obs-entry">
              <div class="obs-header">
                <span class="obs-date redacted">{{ obs.date }}</span>
                <span class="obs-title-text">{{ obs.title }}</span>
              </div>
              <div class="obs-content">{{ obs.content }}</div>
            </div>
          </div>
        </div>

        <!-- Member not found -->
        <div v-else class="not-found">
          <p class="corrupted-text">{{ t('member_detail.not_found_text') }}</p>
          <RouterLink to="/members" class="xp-button">{{ t('member_detail.back') }}</RouterLink>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hidden member page styles */
.hidden-member-page {
  min-height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.hidden-member-container {
  max-width: 600px;
  width: 100%;
  font-family: monospace;
  color: #aa0000;
  text-align: center;
}

.warning-header {
  font-size: 1.6rem;
  font-weight: bold;
  color: #cc0000;
  margin-bottom: 20px;
  letter-spacing: 3px;
  border: 1px solid #440000;
  padding: 12px;
  background: #0a0000;
}

.warning-sub {
  color: #880000;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.warning-question {
  color: #ff2200;
  font-size: 1rem;
  margin-bottom: 20px;
}

.divider {
  color: #330000;
  margin: 20px 0;
  letter-spacing: 1px;
}

.hidden-profile {
  text-align: left;
  background: #060000;
  border: 1px solid #330000;
  padding: 16px 20px;
  margin: 0 auto;
}

.profile-row {
  margin-bottom: 8px;
}

.profile-label {
  color: #660000;
  font-size: 0.85rem;
}

.profile-value {
  color: #aa0000;
  font-size: 0.9rem;
}

.note-small {
  font-size: 0.75rem;
  color: #550000;
}

.last-message {
  text-align: left;
}

.message-meta {
  color: #660000;
  font-size: 0.8rem;
  margin-bottom: 10px;
}

.message-body {
  border-left: 2px solid #440000;
  padding: 12px 16px;
  background: #060000;
  color: #cc3300;
  font-style: italic;
  line-height: 2;
  margin: 0;
}

.auto-delete {
  color: #330000;
  font-size: 0.78rem;
  margin-top: 20px;
}

.join-btn {
  background: #0a1a0a;
  border: 1px solid #336633;
  color: #99cc77;
  font-family: monospace;
  font-size: 13px;
  padding: 8px 20px;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background 0.2s, color 0.2s;
}
.join-btn:hover {
  background: #142814;
  color: #ccffaa;
  border-color: #55aa55;
}

.join-btn-cancel {
  background: #0a0a0a;
  border: 1px solid #333;
  color: #666;
  font-family: monospace;
  font-size: 12px;
  padding: 8px 16px;
  cursor: pointer;
}
.join-btn-cancel:hover {
  background: #111;
  color: #888;
}

.join-input {
  background: #060f06;
  border-top: 2px solid #224422;
  border-left: 2px solid #224422;
  border-bottom: 2px solid #335533;
  border-right: 2px solid #335533;
  color: #ccffaa;
  font-family: monospace;
  font-size: 15px;
  padding: 8px 12px;
  width: 260px;
  text-align: center;
  outline: none;
  letter-spacing: 2px;
}
.join-input::placeholder { color: #334433; }
.join-input:focus { border-color: #558855; }

/* Normal member detail styles */
.detail-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid #003300;
  padding-bottom: 12px;
}

.detail-title {
  color: #f0f0f0;
  font-size: 1.4rem;
  flex: 1;
}

.detail-id {
  font-family: monospace;
  color: #6a9a6a;
  font-size: 0.9rem;
}

.back-btn {
  white-space: nowrap;
}

.detail-body {
  display: flex;
  gap: 24px;
  margin-bottom: 28px;
}

.detail-photo-col {
  flex-shrink: 0;
  text-align: center;
}

.detail-photo {
  width: 120px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: brightness(0.6) contrast(1.4);
  font-family: monospace;
  font-size: 0.85rem;
  color: #4a7a4a;
  line-height: 1.6;
  text-align: center;
  overflow: hidden;
}

.detail-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: brightness(0.85) saturate(0.5) contrast(1.1);
}

.photo-caption {
  font-size: 0.7rem;
  color: #4a7a4a;
  margin-top: 4px;
}

.detail-info-col {
  flex: 1;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

.info-table td {
  padding: 6px 8px;
  border: 1px solid #002200;
  font-size: 0.85rem;
}

.info-label {
  color: #6a9a6a;
  background: #020a02;
  width: 100px;
  white-space: nowrap;
}

.info-value {
  color: #00cc33;
  background: #010501;
}

.status-active { color: #f0f0f0 !important; }
.status-sealed { color: #880000 !important; }
.status-unknown { color: #660000 !important; }

.detail-note {
  font-size: 0.78rem;
  color: #555;
  border-left: 2px solid #222;
  padding: 6px 10px;
  margin-bottom: 12px;
  background: #020202;
}

.contact-btn {
  margin-top: 4px;
}

.observations-section {
  border-top: 1px solid #003300;
  padding-top: 20px;
}

.obs-title {
  color: #00cc33;
  font-size: 1rem;
  margin-bottom: 16px;
  letter-spacing: 2px;
}

.obs-entry {
  border: 1px solid #002200;
  background: #020802;
  padding: 10px 12px;
  margin-bottom: 10px;
}

.obs-header {
  display: flex;
  gap: 12px;
  margin-bottom: 6px;
  align-items: center;
}

.obs-date {
  font-family: monospace;
  font-size: 0.75rem;
}

.obs-title-text {
  color: #007700;
  font-size: 0.8rem;
  font-family: monospace;
}

.obs-content {
  font-size: 0.82rem;
  color: #006600;
  line-height: 1.5;
}

.not-found {
  text-align: center;
  padding: 40px;
}

.xp-titlebar-buttons {
  display: flex;
  gap: 4px;
  font-size: 0.75rem;
}
</style>
