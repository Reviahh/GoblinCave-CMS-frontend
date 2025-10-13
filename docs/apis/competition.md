# 竞赛模块 API（草案）

> 根据后端 SQL 与页面场景先给出骨架，字段/签名以后端实现为准。

## 数据模型（建议）
```ts
interface Competition {
  id: number
  compName: string
  category?: string
  organizer?: string
  description?: string
  startTime?: string // ISO
  endTime?: string   // ISO
  isTeam: 0 | 1
  maxTeamSize: number
  createUserId?: number
  createTime?: string
  updateTime?: string
}
```

## 接口

- GET /competition/list
  - query: { pageNum, pageSize, keyword? }
  - resp: BaseResponse<{ total: number, list: Competition[] }>

- GET /competition/:id
  - resp: BaseResponse<Competition>

- POST /competition/create（管理员）
  - body: Partial<Competition>（必填 compName、isTeam、maxTeamSize）
  - resp: BaseResponse<number>（新 ID）

- POST /competition/update（管理员）
  - body: Partial<Competition> & { id: number }
  - resp: BaseResponse<number>

- POST /competition/delete（管理员）
  - body: number（JSON number id）
  - resp: BaseResponse<number>

- GET /announcement/list
  - query: { compId?, pageNum, pageSize }
  - resp: BaseResponse<{ total: number, list: Announcement[] }>

- POST /announcement/create（管理员）
  - body: { compId?, title, content }
  - resp: BaseResponse<number>

```ts
interface Announcement {
  id: number
  compId?: number
  title: string
  content: string
  userId?: number
  createTime?: string
}
```
