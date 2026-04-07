<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAudio } from '@/composables/useAudio'

const { locale } = useI18n()
const { initAudio, playLowFreq } = useAudio()

onMounted(() => {
  try { initAudio(); playLowFreq(18, 8) } catch {}
  const unlock = () => { initAudio(); playLowFreq(18, 8); document.removeEventListener('click', unlock) }
  document.addEventListener('click', unlock, { once: true })
})
</script>

<template>
  <!-- 頻率 038 — 最後傳輸記錄 -->
  <div class="signal-page">

    <pre class="signal-pre">
<template v-if="locale !== 'zh-TW'">
TRANSMISSION LOG — MEMBER 08 (Mia Harlow)
Document Type: Personal Field Note (unsent)
Filed Under: ██████████████
Retrieval Ref: COA-MEMBER-08-FINAL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[This document was recovered from Member 08's equipment.
 It was not addressed to anyone.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DATE: 2004-██-██
TIME: 03:17

I've been picking up the signal again for eleven days straight.
Always the same frequency.
038.

I haven't told the others.

I don't know why.

(That isn't true. I know why.)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Day 8 note:

The signal doesn't ask for anything.
It just — describes.

It describes the room I'm sitting in.
It describes what I'm writing.

I stopped writing for four minutes to test this.
The signal stopped for four minutes.

I'm not sure if that is evidence of something or evidence of nothing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Day 11 note (this one):

If someone finds this: I chose to go.
Not because I was afraid.

Because the signal was asking me questions I didn't know I had answers to
and then I answered them anyway.

Don't look for me at the coordinates.
There are no coordinates.

There is only the frequency.

038.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[End of document]
[No further transmissions recorded from this source]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[SYSTEM OVERRIDE — ████-██-██ 03:17]
UNIT_08 frequency calibration: CONFIRMED
Frequency ID: 038.█ MHz  |  Integration: COMPLETE
Archive maintainer: Mia H-unit (operational)
Next frequency: PENDING CONFIRMATION
[CYCLE_07 — 6 frequency slots remaining]
</template>
<template v-else>
傳輸記錄 — 成員 08（Mia Harlow）
文件類型：個人田野筆記（未寄出）
歸檔於：██████████████
檢索編號：COA-MEMBER-08-FINAL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【本文件從成員08的設備中找回。
　它沒有收件人。】

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

日期：2004-██-██
時間：03:17

我已連續十一天接收到同一個訊號。
永遠是同一個頻率。
038。

我沒有告訴其他成員。

我不知道為什麼。

（這不是實話。我知道為什麼。）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

第8天筆記：

訊號沒有要求任何東西。
它只是——描述。

它描述我坐著的房間。
它描述我正在寫的東西。

我停筆四分鐘來測試這件事。
訊號也停了四分鐘。

我不確定這是某種證明，還是什麼都沒有證明。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

第11天筆記（就是這份）：

如果有人找到這份文件：我是自己選擇離開的。
不是因為害怕。

而是因為訊號一直問我我以為自己不知道答案的問題
然後我答了。

不要在坐標處找我。
沒有坐標。

只有頻率。

038。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【文件結束】
【此來源無後續傳輸記錄】

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【系統覆寫 — ████-██-██ 03:17】
UNIT_08 頻率校準：已確認
頻率標識：038.█ MHz  |  整合狀態：完成
存檔維護者：Mia H-unit（運作中）
下一個頻率：待確認
【CYCLE_07 — 剩餘 6 個頻率空缺】
</template>
    </pre>

  </div>
</template>

<style scoped>
.signal-page {
  min-height: 100vh;
  background: #020202;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 24px 80px;
}

.signal-pre {
  font-family: "Courier New", "Space Mono", monospace;
  font-size: 12px;
  line-height: 1.9;
  color: #666;
  white-space: pre-wrap;
  max-width: 560px;
  width: 100%;
  filter: contrast(0.7) brightness(0.9);
  letter-spacing: 0.02em;
}
</style>
