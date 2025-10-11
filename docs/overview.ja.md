# プロジェクト概要（日本語）

このフロントエンドは、教育・競技向けの CMS を想定しており、以下の主要機能を備えます。

- 日本語 | [简体中文](overview.md)

- セッションログイン（Cookie ベース）とロール認可（学生=0、管理者=1）
- 学生側：競技参加、チーム、募集掲示、チャット（サンプル）
- 管理側：ユーザー管理、設定、競技投稿（サンプル）

## TODO（共同編集可）
- 競技/チーム API の仕様確定後、`src/api` と対応ページを実装
- 管理画面の CRUD をバックエンドに接続（現在はサンプル）
- UI の国際化（i18n）の導入検討
- E2E テストの整備（Cypress など）

## 注意事項
- ルーターは初回ナビゲーション時に `fetchCurrentUser()` を呼び、サーバーセッションを同期します
- axios は `withCredentials: true` を有効化。サーバーは CORS で `allowCredentials` を許可する必要があります
- `/user/delete` は JSON の数値ボディを受け付ける仕様です

## 参考
- 管理画面仕様: `docs/backend/admin-pages.ja.md`
- ユーザー API: `docs/apis/user.ja.md`
