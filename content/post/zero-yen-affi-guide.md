---
title: "【2025年最新版】Windowsでゼロ円公開！初心者が30分で副業ブログを作る方法｜無料ブログの作り方"
date: 2025-04-29T15:00:00+09:00
draft: false
tags: ["無料 ブログ 作り方", "副業ブログ", "Hugo", "Cloudflare Pages", "初心者向け"]
description: "Windowsユーザーでも30分で出来る無料ブログの作り方を徹底解説。Git・Hugo・GitHub・Cloudflare Pagesを組み合わせたゼロ円インフラで、副業ブログを最速公開！独自ドメイン取得・SEO設定・トラブル解決まで完全網羅。"
images: ["/images/ogp-free-blog-guide.png"]
toc: true
---

> ## 🎯 ゴール  
> **パソコン初心者でも 30 分**で **Hugo × GitHub × Cloudflare Pages** を活用した **ゼロ円副業ブログ** を構築し、投稿した記事を **即公開** できるようになる！

---

## 0. 全体フロー

![Hugo→GitHub→Cloudflare Pages 連携図](/images/hugo-github-cfpages-flow.png)

1. ツールをインストール  
2. Hugo サイト生成  
3. GitHub へプッシュ  
4. Cloudflare Pages で公開  
5. 記事を書く → `git push` で自動公開  
6. 独自ドメイン & アクセス解析

---

## 1. 必要ツールをインストール（15 分）

| ツール | 役割 | インストール (PowerShell・管理者) |
| ------ | ---- | --------------------------------- |
| Git | バージョン管理 | `winget install --id Git.Git -e` |
| Chocolatey | パッケージ管理 | <https://chocolatey.org/install> |
| Hugo Extended | 静的サイト生成 | `choco install hugo-extended -y` |
| VS Code | エディタ | `winget install --id Microsoft.VisualStudioCode` |

```powershell
git --version
hugo version   # “extended” が表示されればOK
code --version
```

---

## 2. Hugo サイトを10分で構築

```powershell
mkdir my-blog && cd $_
hugo new site . --format toml
git init
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
echo 'theme = "PaperMod"' >> hugo.toml
hugo server -D   # → http://localhost:1313
```

---

## 3. GitHub へプッシュ（5 分）

```powershell
git remote add origin https://github.com/<YOUR_ID>/my-blog.git
git add .
git commit -m "feat: initial site"
git branch -M main
git push -u origin main   # PAT を入力
```

---

## 4. Cloudflare Pages で無料公開（10 分）

| 設定項目 | 値 |
| -------- | -- |
| Framework | Hugo |
| Build command | `hugo --gc --minify` |
| Output dir | `public` |
| `HUGO_VERSION` | `0.147.0` |
| `HUGO_ENV` | `production` |

＞ **Save and Deploy** → `https://<project>.pages.dev` が数十秒で完成🎉

---

## 5. 記事を書く → `git push` で公開

### アフィリエイトボタン（shortcode）

`layouts/shortcodes/affiliate.html`

```html
<a href="/go/{{ .Get "slug" }}" target="_blank" rel="noopener noreferrer">
  <button style="background:#ff8000;color:#fff;padding:10px 20px;border:none;border-radius:5px;font-size:1rem;cursor:pointer;">
    {{ .Get "text" }}
  </button>
</a>
```

### 新規記事

```powershell
hugo new posts/first-affiliate.md
```

```markdown
---
title: "お名前.comで独自ドメインを0円で取得する方法"
date: 2025-04-29T16:00:00+09:00
tags: ["独自ドメイン", "副業", "初心者"]
---

{{< affiliate slug="onamae" text="お名前.comで独自ドメインを無料登録する" >}}
```

```powershell
git add .
git commit -m "feat: add first article"
git push
```

---

## 6. 独自ドメイン & GA4

| やりたいこと | 操作 |
| ------------ | ---- |
| 独自ドメイン | Pages → *Custom domains* → Add |
| アクセス解析 | `googleAnalytics = "G-XXXX"` を hugo.toml に追記 |

---

## 7. よくあるエラー

| 症状 | 解決策 |
| ---- | ------ |
| 404 | `baseURL` 設定ミス → 修正 & 再デプロイ |
| テーマ崩れ | `git submodule update --init --recursive` |
| Extended 必要 | `HUGO_VERSION` を Extended 対応版に |

---

## まとめ：今日から副業ブロガー！

- **30分**で無料ブログ完成  
- **ランニングコスト0円**  
- `git push` だけで永久無料ホスティング  

**今すぐ行動して、ブログ収益化の第一歩を踏み出そう！ 🚀**
