# 项目概览（功能 & TODO）

本文基于现有实现与你的开发笔记（frontend.md）整理项目功能列表与开发待办，便于团队协作。

- 简体中文 | [日本語](overview.ja.md)

## 功能（Features）

- 多用户管理（学生/管理员）
  - 登录/注册（角色选择：学生=0、管理员=1）
  - 会话维持：后端 Session + Cookie，前端 axios withCredentials=true
  - 路由守卫：meta.requiresAuth + meta.role（'student' | 'admin'）
- 题目发布（管理员）
  - 管理员可发布竞赛题目
  - 富文本编辑（支持排版、图片/视频）
- 学生组队报名（学生）
  - 注册后可报名参加比赛
  - 支持“队长报名/队员加入”与单人赛模式
- 临时会话（找队友）
  - 发布寻找队友后，感兴趣的学生可进入临时会话讨论
- 后台管理
  - 用户管理（/admin/users）：列表、筛选、增删改（当前为示例数据，待接入后端）
  - 系统设置（/admin/settings）：示例配置页
  - 发布竞赛（/admin/publish）：竞赛发布示例

> 更详细的后台页面字段与操作，见 docs/backend/admin-pages.md  
> 用户相关 API 约定，见 docs/apis/user.md

## 开发记录（Done）

- 登录后跳转到首页
- 顶部/侧边菜单与 /competitions 路由可见性（管理员/学生）
- /admin/users 管理用户（示例版）
- /admin/settings 管理系统（示例）
- 组队页面（示例）
- 临时会话页面（示例）
- 右上角用户管理入口（管理员/普通用户界面）
- 注册/登录：
  - 显示校验规则
  - 登录/注册框增加角色选择（学生=0/管理员=1）

## 待办（TODO）

- 后端接口对接与替换示例数据
  - 用户管理：GET /user/search、POST /user/update、POST /user/delete（请求体为数字 id）
  - 竞赛/队伍：根据后端接口补充 docs/apis 下规范，并对接页面
- 列表分页与筛选统一：与后端约定分页参数（pageNum/pageSize）与返回结构
- 错误提示与国际化（可选）：统一使用后端 BaseResponse.message 展示；后续可接入 i18n
- 环境配置：在 `.env.*` 配置 `VITE_API_BASE` 与不同环境的后端地址
- 文档完善：补充竞赛、组队、会话等模块的 API 文档