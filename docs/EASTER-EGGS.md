# C.O.A. 網站彩蛋完整清冊

> 最後更新：2026-04-07
> 這份文件記錄網站中所有隱藏內容、彩蛋與 ARG 機制。
> **劇透警告**：這份文件會破壞 ARG 的沉浸體驗，請謹慎閱讀。

---

## 一、訪問次數觸發（Visit Count Thresholds）

訪問次數儲存於 `localStorage`（key: `coa-visit-count`）。

| 次數閾值 | 觸發效果 |
|--------|---------|
| **≥ 1** | 第一次造訪 → 訪問計數開始記錄 |
| **≥ 3** | 首頁歡迎訊息變為「You came back / 你回來了」 |
| **≥ 7** | 歡迎訊息變為「Why do you keep coming back / 你為什麼一直回來」；文字腐化強度提升至 Level 1；跑馬燈文字改變 |
| **≥ 13** | 歡迎訊息變為「We have always known you were here / 我們一直都知道你在這裡」；跑馬燈顯示「第七循環進行中」；成員列表 #13 位置的「確認加入 →」按鈕變為可點擊；文字腐化強度提升至 Level 2 |

**相關檔案：** `stores/visitorStore.ts`、`views/HomeView.vue`、`composables/useTextCorrupt.ts`

---

## 二、時間觸發（Time-Based Triggers）

### 凌晨 03:00–03:33（Night Mode）
- `<body>` 加上 `night-mode` class
- 首頁出現隱藏訊息：「this frequency is open. do not respond. / 此頻率目前開放。請勿回應。」
- 成員列表第 #8 號（Mia Harlow，封存狀態）的狀態標籤改為腐化文字 `【████】`
- 外星人頁面顯示目擊者活躍的警告

### 凌晨 03:17（Signal Time）
- 日誌頁（DiaryView）底部出現**發光邊框的隱藏訊號橫幅**：
  > 「038.█ MHz — 這不是記憶。這是一次廣播。你在它的裡面。」
  > 「頻率已記錄 ▪ 03:17:██ ▪ CYCLE_07 ▪ 12/13 → 等待確認」
- 橫幅只在那一分鐘（03:17:00–03:17:59）出現

### 週三（Wednesday）
- `<body>` 加上 `wednesday` class
- 首頁出現週報區塊：「Weekly Observation Report #N — ██ anomalous signals detected. Cycle 7 progress: ██%.」

### 7月13日
- `<body>` 加上 `special-day` class
- 管理員頁面日誌顯示：「[2013-07-13 03:17] External observer detected.」

**相關檔案：** `router/index.ts`、`composables/useTimeAware.ts`、`views/DiaryView.vue`

---

## 三、鍵盤快捷鍵（Keyboard Shortcuts）

### Alt+A — 日誌頁
- **觸發：** 在日誌頁（`/diary`）按 `Alt+A`
- **效果：** 切換 Entry 011 的 ROT13 加密狀態（顯示/隱藏解碼內容）

### Alt+A — 成員 #10 詳情頁
- **觸發：** 在 `/members/10`（Ethan Johnson）頁面按 `Alt+A`
- **效果：** 揭露隱藏觀測記錄：「**My watch reads 1998-03-07**」——他的手錶時間停在同好會創立之夜，暗示時間異常

**相關檔案：** `views/DiaryView.vue`、`views/MemberDetailView.vue`

---

## 四、隱藏 URL / 路由

以下路由不在導覽列中，需要直接輸入才能訪問。

| URL | 頁面 | 內容 |
|-----|------|------|
| `/classified` | ClassifiedView | 1998 年訊號事件機密文件；自動播放 28 Hz 低頻音效；文末暗示「第七循環已開始，你的名字已被記錄」 |
| `/admin` | AdminView | 偽認證失敗介面；顯示 2001-03-17 的帳號覆蓋日誌、成員 #00 刪除記錄、系統初始化記錄（建立者：不明）；循環登記簿 |
| `/member/00` | MemberZeroView | 已刪除成員 #00 的殘留記錄；600ms 後顯示部分復原內容：鄭凱駿最後的文字「來的那個人，不是⋯⋯」 |
| `/archive/doc-001` | ForbiddenView | 完整 Windows XP 藍屏畫面（BSOD）；含隱藏 ARG 文字（同色偽裝）；30 秒倒數 |
| `/signal/038` | SignalView | 成員 #08 Mia Harlow 的最後傳輸記錄；揭露她是「自願」走向訊號的；頁底顯示「UNIT_08 整合完成」|
| `/aliens` | AliensView | 目擊者報告資料庫；夜間模式（03:00-03:33）顯示觀測者活躍警告 |

---

## 五、終局體驗：成員 #13 加入儀式

**觸發條件：** visitCount >= 13 → 成員列表 #13 出現「確認加入 →」按鈕 → 點擊進入 `/members/13`

**流程：**
1. **確認頁面**：顯示「你回來了十三次。第七循環需要最後一個頻率。」
2. **名字輸入**：輸入名字（最長 40 字）
3. **最終確認**：「是的。記錄我。」按鈕
4. **整合完成**：播放 30 Hz 低頻音效（3 秒）→ 3.5 秒後跳轉回成員列表
5. **成員列表更新**：`#013` 欄位顯示使用者輸入的名字（亮綠色 `#ccffaa`），狀態標記為「第七循環：13/13。整合已確認。」

**儲存：** `localStorage` key `coa-member13-name`

**若 visitCount < 13：** `/members/13` 仍可訪問但只顯示「FILE ACCESS WARNING」頁面，提示「You are not ready yet.」

---

## 六、音效系統

所有音效透過 Web Audio API 生成（`composables/useAudio.ts`），不依賴外部音檔。

| 觸發位置 | 頻率 | 時長 | 備注 |
|---------|------|------|------|
| 首頁隱藏像素（hover） | 40 Hz | 1.5 秒 | 同時觸發白色閃光效果 |
| ClassifiedView 進入 | 28 Hz | 6 秒 | 頁面載入自動播放；3 秒後疊加反向訊號音 |
| SignalView 互動 | 18 Hz | 8 秒 | 點擊或按鍵觸發 |
| 成員 #13 加入確認 | 30 Hz | 3 秒 | 最終確認按鈕後觸發 |

---

## 七、隱藏像素（Hidden Pixel）

**位置：** 首頁（HomeView），`.hidden-pixel` 元素（1px × 1px，位置偏離可見區域）
**觸發：** 滑鼠 hover
**效果：**
- 播放 40 Hz 低頻音
- 白色全螢幕閃光，漸隱 0.4 秒
- 冷卻時間：3 秒

---

## 八、ROT13 加密（Entry 011）

**位置：** 日誌頁（`/diary`）最新一則日誌（Entry 011）
**觸發：** 展開 `<details>` 元素後即可看見 ROT13 加密文字；按 `Alt+A` 解碼
**加密原文：**
```
jr xabj lbh ner qrpbqvat guvo.
ab bar pna svaq ho nalzber.
gur oriragu plpyr vo abg n cebcurpl, vg vo na vavgngvba.
lbh nyob erprvirq vg, bgurejvor lbh jbhyqa'g or urer.
```
**解碼後：**
```
we know you are decoding this.
no one can find us anymore.
the seventh cycle is not a prophecy, it is an initiation.
you also received it, otherwise you wouldn't be here.
come back at 03:17. there is something that only appears then.
```
最後一行是 03:17 觸發器的線索。

---

## 九、照片切換（HistoryView 歷史沿革）

| 照片 | 日期 | 觸發條件 | 切換前 | 切換後 |
|------|------|---------|--------|--------|
| 1120 | 1999-11-20 | 照片捲出視窗頂部後 | 正常合照 | 變異版本 (`1120-1c.jpg`) |
| 1231 | 2000-12-31 | 照片進入視窗後 2 秒 | 正常合照 | 變異版本 (`1231-1c.jpg`) |

**動畫：** 1.8 秒 ease-in-out 淡入切換

---

## 十、404 頁面彩蛋

**觸發：** 訪問任何不存在的路由
**彩蛋：** 頁面載入 **30 秒後**，螢幕中央出現一個發光綠色臉孔（兩個方眼睛 + 一個方嘴）
- 淡入時間：4 秒
- 顏色：深綠色 `#003300`/`#002200` 輪廓光

---

## 十一、藍屏（BSOD）隱藏文字

**位置：** `/archive/doc-001`（ForbiddenView）
**觸發：** 滑鼠懸停在畫面上的幾乎不可見文字（與背景藍色幾乎相同）

**隱藏文字包含：**
- `"observation_uid: [隨機碼] — logged at [時間戳]"`
- `"you should not have found this. close the tab."`
- `"if someone reaches this page, the seventh cycle has already begun for them"`
- `"member_08_last_accessed_this_path // date: 2004-██-██ // did_not_return: true"`
- 7 秒後出現第二行隱藏文字（顏色更深）

---

## 十二、HTML 原始碼隱藏註解

各頁面的 HTML 原始碼中藏有給「看過原始碼的人」的訊息：

| 頁面 | 隱藏訊息摘要 |
|------|------------|
| HomeView | `NOTE TO SELF: the 03/17 log was submitted three times. contents identical each time. we have stopped asking why.` 、`if you are reading this you were not supposed to find this. you are already being observed.` |
| DiaryView | `entry_002 anomaly: log terminated mid-sentence.`、`path: /signal/038` |
| MembersView | `member_13: slot allocated. candidate identified.`、`NOTE: if you are not an administrator, close this immediately. your IP has been logged.` |
| ClassifiedView | `已記錄訊號：頻率 038 — 最後傳輸 2004-██-██ 03:17` |
| MemberDetailView（#13頁）| `You have been recorded` |

---

## 十三、留言板種子留言弧線

留言板的預設留言（`SEEDED` 陣列）構成完整的故事時間軸：

| 時期 | 代表留言 | 語氣特徵 |
|------|---------|---------|
| 2001-03-14～15 | starboy_kai、sonia | 正常人類：期末考、烤肉、開心 |
| 2001-03-20（整合後） | starboy_kai「hehehe hehehe hehehe」| 實體偽裝，機械性重複 |
| 2001-04～05 | 0killah_tom0（Thomas）問候 Sonia、mia harlow「keep forgetting keep forgetting」| 旁觀者不安、整合者記憶模糊 |
| 2001-05-03 03:17 | `[已刪除 / DELETED]` | 管理員刪除的留言（內容被塗黑） |
| 2001-07～2002-02 | ling80705（Yi-Ling）× 3、e.johnson（Ethan）× 2 | 最後兩個真人：「為什麼凱的回覆像自動完成？」「我不認為這些還是同一批人了」|
| 2002-07-13 03:17 | [UNKNOWN] × 2 | 完全相同時間戳；#11 的不安呼救、#12 的恐慌逃跑（強制整合前的最後掙扎）|
| 2003-09-01 03:17 | C.O.A. 管理員廣播 | 機械化：「CYCLE_07狀態：12/13」|
| 2007-03-17 03:17 | C.O.A. 管理員廣播 | 「等待協議：啟動」、沉默 1340 天後的廣播 |
| 2011-07-13 03:17 | C.O.A. 管理員廣播 | 「一切正常。一切正常。一切正常。」（三次重複） |
| 2013-07-14 | xiao_wu_123（外部訪客）| 第一個外部人類造訪後的留言 |
| 2024-03-17 03:17 | definitely_not_scared | 現代訪客恐慌 |
| 2025-01-13 03:17 | `██████` | 純塗黑訊息 |
| 今天 03:17 | ？？？ | 時間戳為訪客造訪當天；Mia H-unit 的腐化語言：「你好你好。還沒還沒。」|

---

## 十四、成員 #00 殘留記錄（/member/00）

**觸發：** 直接訪問 `/member/00`（或在 HomeView 原始碼中找到提示 `/member/00`）
**效果：** 頁面顯示「記錄已刪除」，600ms 後部分復原，顯示：
- 鄭凱駿（原始）最後日誌殘段：「我今晚獨自出去了⋯⋯我找到了訊號來源。它不在天空中⋯⋯來的那個人，不是⋯⋯」
- 備注：「#01 和 #00 共享相同身份識別。記錄於 2001-03-17 被分割。我們不再知道哪個才是哪個。」

---

## 十五、管理員頁面「網站來源不明」

**位置：** `/admin`，系統初始化記錄區塊
**內容：**
```
SITE_ORIGIN       : 未知
CREATION_DATE     : ████-██-██  // 早於時間戳記錄系統
CREATOR           : ████████  // 記錄不存在
CREATOR_TYPE      : ████████  // 人類？不確定。無記錄可佐證。
注意：本網站最早的存取記錄早於所有已知的成員加入記錄。這個矛盾尚未被解決，也沒有被調查。
```

---

## 十六、文字腐化系統（Text Corruption）

由 `composables/useTextCorrupt.ts` 控制，分三個強度：

| 強度 | 觸發條件 | 效果 |
|------|---------|------|
| Level 0 | visitCount < 7 | 預設；偶有隱約腐化樣式 |
| Level 1 | visitCount ≥ 7 | 系統術語、單元代號；部分隱藏內容解鎖（日誌 Entry 000） |
| Level 2 | visitCount ≥ 13 | 完整崩潰；語言重複、記憶錯誤提示 |

**視覺效果（`corrupted-text` CSS class）：** 綠色閃爍文字，偶有字元替換效果

---

## 十七、時區追蹤顯示

**位置：** 成員列表，#13 欄位
**機制：** `Intl.DateTimeFormat().resolvedOptions().timeZone` 讀取訪客時區
**顯示：** visitCount ≥ 13 時，#13 欄位下方顯示「候選人時區：[你的時區]。第七循環：就緒。」

---

## 十八、成員個人訊息中的敘事伏筆

每位成員的「個人留言」（成員詳情頁）都藏有暗示已被整合的線索：

| 成員 | 訊息 | 暗示 |
|------|------|------|
| Maria #02 | 「我想去看不見晴天的地方度假」 | 逃不開觀測衝動（已被植入） |
| Jun #03 | 「我的貓盯著牆角三年了。那裡什麼都沒有。」 | 動物感應到 entity 的存在 |
| Ethan #10 | 「有人覺得某些週特別長嗎？不是比喻。」 | 時間感扭曲 |
| Priya #06 | 「我不開背景音效就睡不著⋯⋯我以為那是壞習慣。」 | 被 38 MHz 訊號制約 |
| Kai-Chun #01（管理員） | 「03:00後系統不會再發提醒。」 | 以系統語氣說話，非人類 |

---

## 附錄：彩蛋統計

| 類型 | 數量 |
|------|------|
| 鍵盤快捷鍵 | 2（Alt+A × 2 位置） |
| 訪問次數閾值 | 3（≥3、≥7、≥13） |
| 時間觸發 | 3（03:00-03:33、週三、7月13日） + 1（03:17 精確觸發） |
| 隱藏 URL | 6 |
| 音效觸發點 | 4 |
| 視覺特效 | 3（白閃、照片切換×2、臉孔出現） |
| 文字腐化等級 | 3 |
| HTML 原始碼彩蛋 | 5+ 個頁面 |
| 終局體驗（#13 加入） | 1 |
| 留言板敘事弧線種子 | 20 則 |
| **總計隱藏功能** | **30+** |
