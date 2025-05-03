---
title: "【2025年最新版】Windowsでゼロ円公開！初心者が30分で副業ブログを作る方法｜無料ブログの作り方"
date: 2025-04-29T15:00:00+09:00
draft: false
tags:
  - "無料 ブログ 作り方"
  - "副業ブログ"
  - "Hugo"
  - "Cloudflare Pages"
  - "初心者向け"
description: >
  Windowsユーザーでも30分で出来る無料ブログの作り方を徹底解説。
  Git・Hugo・GitHub・Cloudflare Pagesを組み合わせたゼロ円インフラで、
  副業ブログを最速公開！独自ドメイン取得・SEO設定・トラブル解決まで完全網羅。
images:
  - "/images/ogp-free-blog-guide.png"
toc: true
---

> ## 🎯 本記事のゴール  
> 1. **パソコン初心者でも30分**で「Hugo × GitHub × Cloudflare Pages」を使った **ランニングコスト0円**ブログを構築  
> 2. 記事を書いたら **即自動公開** される仕組みを体験  
> 3. **独自ドメイン取得** → **SEO対策** → **アクセス解析**まで完全マスター  

---

## 🚀 0. 全体フロー

![Hugo→GitHub→Cloudflare Pages連携図](/images/hugo-github-cfpages-flow.png)

1. 必要ツールのインストール  
2. Hugoでサイト骨格を生成  
3. GitHubにPush  
4. Cloudflare Pagesで自動デプロイ  
5. 記事作成 → `git push` で即公開  
6. 独自ドメイン & アクセス解析設定  

---

## 🛠 1. 必要ツールを一気にインストール（約15分）

| ツール               | 役割                 | インストールコマンド（管理者PowerShell）         |
| -------------------- | -------------------- | ----------------------------------------------- |
| **Git**              | ソース管理           | `winget install --id Git.Git -e`                |
| **Chocolatey**       | パッケージ管理       | [chocolatey.org/install](https://chocolatey.org/install) |
| **Hugo Extended**    | 静的サイト生成       | `choco install hugo-extended -y`                |
| **Visual Studio Code** | コードエディタ       | `winget install --id Microsoft.VisualStudioCode` |

```powershell
git --version       # Gitインストール確認
hugo version        # “extended” が付いていればOK
code --version      # VSCode起動確認
💡 Tip: Chocolateyでまとめて入れると、依存ライブラリも自動管理！

📦 2. Hugoサイトをサクっと10分で作成
powershell
コピーする
編集する
# プロジェクト新規作成〜ローカルプレビュー
mkdir my-blog && cd my-blog
hugo new site . --format toml
git init
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
echo 'theme = "PaperMod"' >> hugo.toml
hugo server -D   # ⇒ http://localhost:1313
所要時間: 約5分

ポイント: PaperModは日本語フォント対応・モバイル最適化済み

📤 3. GitHubへ一発Push（約5分）
powershell
コピーする
編集する
git remote add origin https://github.com/<YOUR_ID>/my-blog.git
git add .
git commit -m "feat: initial site"
git branch -M main
git push -u origin main   # PATを入力
🔐 セキュリティTip: GitHubトークンは[Settings→Developer settings→Personal access tokens]で生成！

☁️ 4. Cloudflare Pagesで無料公開（約10分）
Cloudflareダッシュボード→Pages→Create a project

GitHubと連携しリポジトリを選択

Build settings を以下に設定

Framework: Hugo

Build command: hugo --gc --minify

Output directory: public

Environment variables

Name	Value
HUGO_VERSION	0.147.0
HUGO_ENV	production

Save and Deploy → 数十秒で https://<project>.pages.dev に自動公開！ 🎉

🚀 裏技: --minifyでCSS/JSを自動圧縮し、表示速度を高速化！

✍️ 5. 記事を追加 → git push で自動公開
5-1. アフィリエイトボタン (Shortcode)
layouts/shortcodes/affiliate.html を作成：

html
コピーする
編集する
<a href="/go/{{ .Get "slug" }}" target="_blank" rel="noopener noreferrer">
  <button style="
    background:#ff8000;
    color:#fff;
    padding:10px 20px;
    border:none;
    border-radius:5px;
    font-size:1rem;
    cursor:pointer;
  ">
    {{ .Get "text" }}
  </button>
</a>
5-2. 新規記事テンプレート
bash
コピーする
編集する
hugo new posts/first-affiliate.md
記事例 — content/posts/first-affiliate.md
markdown
コピーする
編集する
---
title: "お名前.comで独自ドメインを0円で取得する方法"
date: 2025-04-29T16:00:00+09:00
tags:
  - "独自ドメイン"
  - "副業"
  - "初心者"
---

Webサイト運営の第一歩は独自ドメイン取得！  
以下のボタンから今すぐ無料登録しましょう👇

{{< affiliate slug="onamae" text="お名前.comでドメインを無料登録" >}}
powershell
コピーする
編集する
git add content/posts/first-affiliate.md
git commit -m "feat: add first-affiliate post"
git push
✅ ポイント: 投稿直後にCloudflare Pagesが自動ビルドし、数秒で公開完了！

🌐 6. 独自ドメイン & GA4設定
やりたいこと	操作
独自ドメイン	Pages → Custom domains → ドメイン名を入力 → DNSレコード自動化 ✔
アクセス解析	googleAnalytics = "G-XXXXXXX" を hugo.toml に追記

toml
コピーする
編集する
[params]
  googleAnalytics = "G-ABCDEFG1234"
📈 SEOTip: OGP画像・メタタイトル・メタ説明を設定し、SNSや検索結果でクリック率UP！

⚠️ 7. よくあるトラブル＆解決策
症状	対策
404エラー	baseURLが間違い → hugo.toml の baseURL を実URLに修正 → 再Push
テーマが反映されない	git submodule update --init --recursive → 再Deploy
Hugo Extendedが必要	HUGO_VERSIONをExtended対応版に上げる（例: 0.147.0）
記事にショートコードが出ない	layouts/shortcodes 配下に .html ファイルがあるか確認

🎉 まとめ：今日から副業ブロガー
手順30分でブログ構築

サーバーレス×無料で運営コスト0円

git push だけで永久自動公開

さあ、今すぐ行動して、あなたも副業ブログで収益化への第一歩を踏み出しましょう！🚀