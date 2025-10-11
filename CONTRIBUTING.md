# Contributing Guide

感谢你对本项目的关注！请在提交代码前阅读以下约定，帮助我们更高效协作。

- 简体中文 | [日本語](CONTRIBUTING.ja.md)

## 分支策略
- main：稳定分支，可发布状态。
- feat/*：新功能（例如 feat/login-ui）。
- fix/*：缺陷修复（例如 fix/login-rule）。
- docs/*：文档更新。

## 提交信息（Commit Message）
建议遵循简洁清晰的英文/中文动宾短语，常用前缀：
- feat: 新功能
- fix: 缺陷修复
- docs: 文档
- refactor: 重构（不改变外部行为）
- test: 测试
- chore: 构建/依赖/杂务

示例：
- feat: 注册页新增校验规则提示
- fix: 修复 /user/delete 发送体格式为数字

## 代码风格
- 前端：Vue 3 + Vite
  - 组件命名：帕斯卡命名（MyComponent.vue）
  - 状态管理：Pinia（模块解耦、持久化按需）
  - API 封装：`src/api/` 下分模块封装，统一返回 `BaseResponse` 并在上层解码
- 类型与校验：保持最小但清晰的参数校验（前后端一致）

## PR 流程
- 在 feature/bugfix 分支上完成开发与自测
- 确认以下检查项：
  - 构建通过：`npm run build`
  - 单元测试（如有）：`npm run test:unit`
  - 文档同步：必要时更新 `docs/` 与 `README`
- 提交 PR，说明动机、改动点、验证方法与影响范围

## 问题反馈（Issues）
创建 Issue 时请尽量包含：复现步骤、期望与实际、截图或日志、环境信息。

谢谢你的贡献！