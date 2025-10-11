# 管理后台页面字段与操作一览

本文列出当前项目中“后台”相关页面的核心字段、操作与访问控制要求，便于协作与对齐实现。

- 简体中文 | [日本語](admin-pages.ja.md)

## 约定
- 角色：student（学生）、admin（管理员），后端 userRole：学生=0，管理员=1
- 鉴权：
  - 登录态基于 Session + Cookie，前端 axios withCredentials=true
  - 路由守卫：meta.requiresAuth + meta.role

## 用户管理（/admin/users）
- 字段（展示）：
  - id：用户ID
  - username：用户名（前端展示可映射为 user.userAccount 或 user.userName）
  - email：邮箱
  - role：'admin' | 'user'（展示标签），后端数值映射 admin=1 / user=0
  - createTime：创建时间
- 操作：
  - 搜索：按用户名查询（前端模拟，接入后端后对接 GET /user/search?userName=xxx）
  - 新增：打开对话框，输入用户名/密码/邮箱/角色，提交后刷新列表（当前为模拟新增）
  - 编辑：编辑邮箱/角色等（当前为模拟编辑）
  - 删除：删除选中用户（当前为模拟删除）
- 接口（目标对接）：
  - 查询：GET /user/search?userName=xxx → BaseResponse<List<User>>（仅管理员）
  - 删除：POST /user/delete，body 为数字 id（JSON number），仅管理员
  - 更新：POST /user/update，body 为 User（检查权限）

## 系统设置（/admin/settings）
- 字段：按页面实际表单控件为准（示例：开关、文本等）
- 操作：保存配置（示例）

## 发布竞赛（/admin/publish）
- 字段：
  - title：标题
  - description：描述
  - maxMembers：人数上限
- 操作：提交发布（当前示例：前端本地状态）

## 备注
- 目前 admin 页多为演示/模拟数据，逐步接入后端 API 时遵循下文 API 约定。
