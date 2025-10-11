# ユーザー API（日本語）

バックエンド（Spring Boot 想定）の `/user/*` とフロントの対応です。レスポンスは `BaseResponse<T>` を想定。

- 日本語 | [简体中文](user.md)

## 認証関連
- POST `/user/register`
  - Body: `{ userAccount, userPassword, checkPassword, userRole? }`
  - バリデーション：ユーザー名 ≥4（空白/記号不可）、パスワード ≥8、一致確認
- POST `/user/login`
  - Body: `{ userAccount, userPassword, userRole? }`
- POST `/user/logout`
  - Body: なし
- GET `/user/current`
  - 現在のログイン情報

## ユーザー検索/更新/削除
- GET `/user/search?userName=...`
  - パラメータ: `userName`（部分一致）
- POST `/user/update`
  - Body: `User` JSON（プロフィール更新など）
- POST `/user/delete`
  - Body: JSON 数値（例: `123`）

## フロント側実装（抜粋）
- axios は `withCredentials: true`
- ルーター初回で `fetchCurrentUser()` を呼びセッション同期
- 役割: 学生=0, 管理者=1 → ストア内では 'student' | 'admin' にマップ
