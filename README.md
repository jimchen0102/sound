<div align="center">
  <a href="http://sound.zeabur.app/" target="_blank">
    <img src="https://github.com/user-attachments/assets/de0ad6dd-bf49-4b35-9d0f-5512fa8b88af" alt="SOUND">
  </a>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Nuxt.js-00C58E?style=for-the-badge&logo=nuxtdotjs&logoColor=white" alt="Nuxt.js"/>
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase"/>
</div>

<h3 align="center">SOUND 音樂共享</h3>

## 📋 <a name="table">目錄</a>
1. 🤖 [專案介紹](#introduction)
2. ⚙️ [技術棧](#tech-stack)
3. 🔋 [專案功能](#features)
4. 🤸 [專案設定](#quick-start)

## <a name="introduction">🤖 專案介紹</a>

SOUND 是一個音樂共享平台，使用者可以輕鬆上傳音樂並分享，同時提供音樂編輯和評論功能，以營造一個充滿音樂熱情的社區。

## <a name="tech-stack">⚙️ 技術棧</a>

- Nuxt 3
- Vue 3
- TypeScript
- TailwindCSS
- GSAP
- Firebase

## <a name="features">🔋 專案功能</a>

👉 **使用者驗證**: 使用者可以註冊帳號並登入，以執行後續操作。

👉 **上傳歌曲**: 登入後，使用者可以在後台上傳歌曲，與他人分享自己的音樂。

👉 **編輯歌曲**: 上傳歌曲後，使用者可以新增封面、設定曲風並添加歌曲描述。

👉 **拖拉進度**: 使用者可以直覺地拖曳歌曲進度條並調整音量。

👉 **發送評論**: 使用者可在歌曲下方提交評論，與創作者交流心得。

👉 **動態互動**: 整個應用圍繞著互動，例如頁面間的流暢銜接，播放或暫停音樂時，首頁的 CD 也會同步旋轉。


## <a name="quick-start">🤸 專案設定</a>

**git clone 專案**
```bash
git clone https://github.com/jimchen0102/sound.git
cd sound
```

**安裝**

使用 npm 安裝專案的依賴項：

```bash
npm install
```

**設置環境變數**

在專案根目錄下建立一個名為 `.env.local` 的新文件，並加入以下內容：

```env
FIREBASE_API_KEY=
FIREBASE_APP_ID=
FIREBASE_AUTH_DOMAIN=s
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
```

**執行專案**

```bash
npm run dev
```
打開瀏覽器並訪問 [http://localhost:3000](http://localhost:3000) 來查看專案。
