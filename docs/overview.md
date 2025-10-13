## 系统概览

- 前端：Vue 3 + Vite + Pinia + Vue Router + Element Plus
- 后端：Spring Boot + MyBatis-Plus（参考后端仓库）
- 存储：MySQL（见下方 ER 关系），可选 Redis
- 会话：Session + Cookie；开发通过 Vite 代理保持同域 Cookie

## 功能

- 多用户管理（学生/管理员）
  - 登录/注册：账号名（如学号/工号，唯一） + 密码，角色（学生=0、管理员=1）
  - 会话维持：后端 Session + Cookie；前端 axios withCredentials=true；开发环境通过 Vite 代理保持同域
  - 路由守卫：meta.requiresAuth + meta.role（'student' | 'admin'），刷新时调用 /user/current 恢复会话
  - 个人中心：只读显示账号；可修改昵称、性别（0-女/1-男）、手机号、邮箱、头像、个人简介（<=512）；前端对手机号/邮箱做格式校验
- 题目发布（管理员）
  - 管理员可发布竞赛题目
  - 富文本编辑（支持排版、图片/视频）
- 学生组队报名（学生）
  - 注册后可报名参加比赛
  - 支持“队长报名/队员加入”与单人赛模式
- 临时会话（找队友）
  - 发布寻找队友后，感兴趣的学生可进入临时会话讨论
- 后台管理
  - 用户管理：列表、筛选、编辑
  - 系统设置：示例配置页
  - 发布竞赛：竞赛发布示例


## 开发记录

- [x] 登录后跳转到首页
- [x] 顶部/侧边菜单与 /competitions 路由可见性（管理员/学生）
- [x] /admin/users 管理用户（示例版）
- [x] /admin/settings 管理系统（示例）
- [x] 组队页面（示例）
- [x] 临时会话页面（示例）
- [x] 右上角用户管理入口（管理员/普通用户界面）
- [x] 注册/登录：
  - 显示校验规则
  - 登录/注册框增加角色选择（学生=0/管理员=1）

## 待办

- 后端接口对接
  -  [ ] 用户：处理用户剩余接口，完成Users.vue页面
  - [ ] 竞赛/队伍/会话：待后端仓库完善后补充 docs/apis 中的定义并接入
- 列表分页与筛选统一：与后端约定分页参数（pageNum/pageSize）与返回结构
- 错误提示与国际化（可选）：统一使用后端 BaseResponse.message 展示；后续可接入 i18n
- 开发代理：Vite server.proxy 将 `/user` 代理到 `http://localhost:8080`；axios 使用相对 baseURL `/`