# 竞赛模块 API

## 数据模型
```js
interface Competition {
  id: number
  name: string
  summary?: string
  content: string
  startTime: string // ISO
  endTime: string   // ISO
  maxMembers: number
  creatorId?: string
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

