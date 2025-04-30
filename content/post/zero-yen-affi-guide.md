---
title: "Windowsでゼロ円公開！初心者でもできる副業ブログ構築マニュアル【無料 ブログ 作り方】"
date: 2025-04-29T15:00:00+09:00
draft: false
tags: ["無料 ブログ 作り方", "Hugo", "Cloudflare Pages", "副業", "初心者向け"]
description: "Git・Hugo・Cloudflare Pages を組み合わせ、完全無料で副業ブログを公開する手順を初心者向けに解説。必要ツールの導入から独自ドメイン設定、トラブル対処まで網羅！"
images: ["/images/ogp-free-blog-guide.png"]
---

> **ゴール**  
> パソコン初心者でも 30 分で **Hugo × GitHub × Cloudflare Pages** の **ゼロ円インフラ**を構築し、記事を書いたら即公開できる副業ブログを完成させる！

---

## 0. 全体の流れ

![Hugo→GitHub→Cloudflare Pages 連携図](https://images.unsplash.com/photo-1537432376769-00a35b6e7c9e?fit=crop&w=1280&h=720)

1. 必要ツールをインストール  
2. Hugo でサイト骨格を作成  
3. GitHub にアップロード  
4. Cloudflare Pages と連携して公開  
5. 記事を書く → `git push` で自動公開  
6. 独自ドメイン & アクセス解析

---

## 1. 必要ツールを入れる（15 分）

| ツール | 役割 | インストール (PowerShell 管理者) |
| ------ | ---- | -------------------------------- |
| Git | バージョン管理 | `winget install --id Git.Git -e` |
| Chocolatey | パッケージ管理 | <https://chocolatey.org/install> |
| Hugo Extended | 静的サイト生成 | `choco install hugo-extended -y` |
| Visual Studio Code | エディタ | `winget install --id Microsoft.VisualStudioCode` |

```powershell
git --version
hugo version   # “Extended” が付いていればOK
code --version
```

---

## 2. Hugo サイトを作る（10 分）

```powershell
mkdir my-blog
cd my-blog
hugo new site . --format toml
git init
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
echo 'theme = "PaperMod"' >> config.toml
hugo server -D   # http://localhost:1313 でプレビュー
```

---

## 3. GitHub にアップロード（5 分）

```powershell
git remote add origin https://github.com/<YOUR_ID>/my-blog.git
git add .
git commit -m "First commit"
git branch -M main
git push -u origin main   # PAT を入力
```

---

## 4. Cloudflare Pages と接続（10 分）

1. Cloudflare Dashboard → **Pages → Create a project**  
2. GitHub 認証 → リポジトリ選択  
3. Build settings  
   - Framework: **Hugo**  
   - Build: `hugo --gc --minify`  
   - Output: `public`  
4. Environment variables  
   | Name | Value |
   | ---- | ----- |
   | `HUGO_VERSION` | `0.115.4` |
   | `HUGO_ENV` | `production` |
5. **Save and Deploy** → `https://<project>.pages.dev`

---

## 5. 記事を追加して公開

### ショートコード

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

記事例:

```markdown
{{< affiliate slug="onamae" text="お名前.comで独自ドメインを無料登録する" >}}
```

```powershell
git add .
git commit -m "Add first article"
git push
```

---

## 6. 独自ドメイン & アクセス解析

| やりたいこと | 操作 |
| ------------ | ---- |
| 独自ドメイン | Pages → **Custom domains → Add** |
| 解析 (GA4)  | `googleAnalytics = "G-XXXX"` を config.toml に追記 |

---

## 7. よくあるトラブル

| 症状 | 対策 |
| ---- | ---- |
| 404 | `baseURL` を実URLに合わせ再デプロイ |
| テーマ反映されず | サブモジュールをコミット / `git submodule update --init --recursive` |
| Hugo Extended エラー | `HUGO_VERSION` を Extended 対応版へ |

---

## 8. 独自ドメインでブログを本格始動！

- **初年度登録料 0 円** キャンペーン  
- 豊富な TLD (.com / .net / .jp)  
- SSL 設定もワンクリック  

{{< affiliate slug="onamae" text="お名前.comで独自ドメインを無料登録する" >}}

---

## 今すぐブログを始めよう！

今日からあなたも副業ブロガー。**思い立ったが吉日、今すぐブログを始めよう！**
```