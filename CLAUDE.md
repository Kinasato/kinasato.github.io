# kinasato.github.io

## 公開ページを更新するときのルール

- コミットしてPRまで進める（＝公開ページを更新する）ときは、`index.html` のトップにある「Last Update」の日付を、その時点のJST（日本時間）の日付に更新してから同じPRに含める。
  - 対象：`<p class="hero__updated">Last Update：<time datetime="YYYY-MM-DD">YYYY.MM.DD</time></p>`
  - `datetime` 属性（`YYYY-MM-DD`）と表示テキスト（`YYYY.MM.DD`）の両方を揃えて更新する
  - 日付は `TZ=Asia/Tokyo date +%Y-%m-%d` で確認する
- `assets/css/site.css` または `assets/js/site.js` を変更したPRでは、`index.html` で読み込むURLの `?v=YYYYMMDD` も同じJST日付に更新する（ブラウザに古いファイルが残って表示が崩れるのを防ぐため）。
