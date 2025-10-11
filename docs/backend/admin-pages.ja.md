# 管理画面の仕様（日本語）

本ドキュメントは管理者向けページのフィールドと操作の概要を示します。現状はサンプル実装が多く、バックエンド API 確定後に接続を進めます。

- 日本語 | [简体中文](admin-pages.md)

## ユーザー管理 `/admin/users`
- 一覧/検索：ユーザー名で検索
- 操作：編集、削除（削除は `/user/delete` へ JSON 数値を POST）
- フィールド例：id, userName, userAccount, userRole(0/1), createTime など

## システム設定 `/admin/settings`
- サンプル設定項目（テーマ、掲示、締切など）
- 保存はバックエンド API 仕様確定後に接続

## 競技投稿 `/admin/publish`
- リッチテキスト/Markdown 投稿を想定
- 添付・画像のアップロードは将来対応

## 認可/ルーティング
- `meta.requiresAuth: true` + `meta.role: 'admin'`
- 初回ナビゲーション時のセッション同期により F5 でも状態維持
