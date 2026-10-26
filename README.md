# kinasato.github.io
Kinasato Mochiemon's Portfolio Site

## デザインとライセンス

本サイトは[デジタル庁デザインシステム](https://design.digital.go.jp/dads/)（DADS）のガイドラインに沿って作成しています。利用条件は「[利用上の注意事項](https://design.digital.go.jp/dads/introduction/notices/)」に従います。

| 対象 | 取り扱い |
| --- | --- |
| `assets/dads/` | [DADS コードスニペット（HTML版）](https://github.com/digital-go-jp/design-system-example-components-html) のCSSを**無改変**で同梱。MIT License（`assets/dads/LICENSE`）。無改変利用のため、ページのフッターに利用元（デジタル庁デザインシステムウェブサイト・デジタル庁GitHub）を明記しています。サイト固有の調整は `assets/css/site.css` で行い、同梱ファイルは編集しないでください。 |
| `assets/css/site.css` | 本サイト独自のスタイル。 |
| `assets/js/site.js` | 本サイト独自のスクリプト（ダークモード切替、モバイルメニューの開閉、現在地のメニュー強調、スキル一覧の絞り込み、セクションの表示アニメーション）。JavaScriptが無効でも内容はすべて閲覧でき（ライトモード表示）、「視差効果を減らす」設定ではアニメーションしません。 |
| ダークモード | DADSにダーク用の定義がないため、`site.css` でニュートラルとキーカラーの階調を反転して作成。文字は4.5:1以上、非テキストは3:1以上を確認済み。フォーカスインジケーターはDADSの規定どおり変更していません。 |
| `assets/images/` | `favicon.png`・`logo_icon.png` はサイト所有者のロゴ（原本）。`favicon-32.png`・`logo-mark-64.png`・`logo-400.png`・`apple-touch-icon.png`・`ogp.png` はそれらから生成した表示用の派生ファイル（ロゴを差し替えた場合は再生成が必要）。 |
| フォント | Noto Sans JP（SIL Open Font License 1.1）を Google Fonts から読み込み。フォントファイルは同梱していません。 |
| 外部リンクアイコン | 本サイト用に独自に作成したSVG。 |
| `design-guide/` | DADSドキュメントのMarkdown版（AI参照用のローカル資料）。再配布にあたらないよう `.gitignore` でリポジトリ・公開サイトから除外しています。 |

サイトのデザインに、デジタル庁デザインシステムウェブサイト https://design.digital.go.jp/dads/ およびデジタル庁GitHub https://github.com/digital-go-jp のコードスニペットを使用しています。
