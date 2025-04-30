---
title: "Windowsでゼロ円公開！中学生でもできるアフィリエイトブログ構築マニュアル"
date: 2025-04-29T15:00:00+09:00
draft: false
tags: ["Hugo", "Cloudflare Pages", "アフィリエイト", "初心者向け"]
---

> **ゴール**：パソコン初心者でも30分で _Hugo + GitHub + Cloudflare Pages_ の無料インフラを使い、記事を書いたら URL が公開されるブログを完成させる。

---

## 0. 全体の流れ（鳥瞰図）
1. 必要ツールをインストール（Git / Hugo / VSCode）  
2. Hugo でサイト骨格を作成  
3. GitHub にアップロード  
4. Cloudflare Pages と連携し公開  
5. 記事を書く → `git push` で自動公開  
6. カスタムドメイン & アクセス解析

---

## 1. 必要ツールを入れる（15分）
| ツール | 役割 | インストール（PowerShell 管理者） |
|--------|------|----------------------------------|
| **Git** | ソース管理 | `winget install --id Git.Git -e` |
| **Chocolatey** | パッケージ管理 | <https://chocolatey.org/install> |
| **Hugo Extended** | 静的サイト生成 | `choco install hugo-extended -y` |
| **VSCode** | エディタ | `winget install --id Microsoft.VisualStudioCode` |

```powershell
git --version
hugo version
code --version
```

---

## 2. Hugo サイトを作る（10分）
```powershell
mkdir my-affi-site
cd my-affi-site
hugo new site . --format toml
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke themes/ananke
Add-Content hugo.toml 'theme = "ananke"'
hugo server -D   # → http://localhost:1313
```

---

## 3. GitHub にアップロード（5分）
```powershell
git remote add origin https://github.com/<あなたのID>/my-affi-site.git
git add .
git commit -m "First commit"
git branch -M main
git push -u origin main   # パスワード欄に PAT を貼り付け
```

---

## 4. Cloudflare Pages と接続（10分）
1. Cloudflare ダッシュボード → **Pages → Create a project**  
2. GitHub と連携しリポジトリを選択  
3. **Build settings**  
   - Framework: Hugo  
   - Build: `hugo --gc --minify`  
   - Output: `public`  
   - Env: `HUGO_VERSION=0.128.0`  
4. **Save and Deploy** → `https://my-affi-site.pages.dev`

---

## 5. 記事を追加して公開
### 5-1. ショートコード
`layouts/shortcodes/affiliate.html`
```html
<a href="{{ .Get "url" }}" target="_blank" rel="noopener">
  <button style="background:#ff8000;color:#fff;padding:8px 16px;border:none;border-radius:4px;">
    {{ .Get "text" }}
  </button>
</a>
```

### 5-2. 新規記事
```powershell
hugo new post/first-affiliate.md
```

### 5-3. 反映
```powershell
git add .
git commit -m "Add first article"
git push
```

---

## 6. カスタムドメイン & アクセス解析
| やりたいこと      | 操作                                       |
|------------------|-------------------------------------------|
| 独自ドメイン     | Pages → **Custom domains → Add**          |
| Web Analytics    | Pages → **Metrics → Enable**              |

---

## 7. よくあるトラブル
| 症状          | 対策                                                   |
|---------------|--------------------------------------------------------|
| 404           | `baseURL` を正しい URL にして再プッシュ                |
| ボタン非表示  | `affiliate.html` が無い → layouts/shortcodes に置く    |
| テーマエラー  | Hugo Extended 版をインストール                          |

---
## 8. 一歩先へ行きたいあなたへ
<a href="https://px.a8.net/svt/ejp?a8mat=453LNH+50ED2Q+50+2HWVS1" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www27.a8.net/svt/bgt?aid=250430813303&wid=001&eno=01&mid=s00000000018015102000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=453LNH+50ED2Q+50+2HWVS1" alt="">

これで“ゼロ円”インフラのブログ構築は完了！  
次は記事を量産して収益化を目指そう📈
