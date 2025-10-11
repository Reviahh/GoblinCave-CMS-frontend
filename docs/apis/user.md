# 用户相关 API 约定

后端基于 Spring Boot，统一返回 `BaseResponse<T>`：

- 简体中文 | [日本語](user.ja.md)
```
{
  code: number,
  data: T,
  message: string
}
```
- code=0 代表成功，非 0 为错误（message 提示信息）
- 前端 axios 设置 withCredentials=true，依赖 Cookie/Session 做会话

## 注册
- URL：POST /user/register
- Body（JSON）：
```
{
  "userAccount": string,   // 用户名，≥4，不能包含空格/标点/符号
  "userPassword": string,  // 密码，≥8
  "checkPassword": string, // 二次确认，需一致
  "userRole": number       // 角色：学生=0，管理员=1（可选）
}
```
- Response：BaseResponse<number>（新用户 id）

## 登录
- URL：POST /user/login
- Body（JSON）：
```
{
  "userAccount": string,
  "userPassword": string,
  "userRole": number // 学生=0，管理员=1（可选）
}
```
- Response：BaseResponse<User>（脱敏用户）
- 会话：后端在 Session 记录登录态

## 退出登录
- URL：POST /user/logout
- Body：无
- Response：BaseResponse<number>

## 当前用户
- URL：GET /user/current
- Query：无
- Response：BaseResponse<User>（脱敏）
- 场景：页面刷新后恢复登录状态

## 管理查询用户
- URL：GET /user/search?userName=xxx
- 角色：管理员
- Response：BaseResponse<User[]>

## 更新用户信息
- URL：POST /user/update
- Body（JSON）：User（遵循后端 User 实体字段）
- 权限：管理员或本人

## 删除用户
- URL：POST /user/delete
- Body：数字 id（JSON number）
- 权限：管理员

---

## 前端封装（参考）
- `src/api/http.js`：axios 实例（baseURL、withCredentials、拦截器）
- `src/api/user.js`：
  - `apiRegister(payload)`
  - `apiLogin(payload)`
  - `apiLogout()`
  - `apiGetCurrentUser()`
  - `apiSearchUsers({ userName })`
  - `apiUpdateUser(user)`
  - `apiDeleteUser(id)`
