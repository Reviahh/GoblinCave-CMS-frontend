# 队伍模块 API（草案）

## 数据模型（建议）
```ts
interface Team {
  id: number
  compId: number
  name: string
  description?: string
  maxNum: number
  expireTime?: string
  userId?: number // 队长
  status: 0 | 1 | 2 // 公开/私有/加密
}

interface UserTeam {
  id: number
  userId: number
  teamId: number
  joinTime?: string
}
```

## 接口

- GET /team/list
  - query: { compId, pageNum, pageSize }
  - resp: BaseResponse<{ total: number, list: Team[] }>

- POST /team/create（队长）
  - body: { compId, name, description?, maxNum, expireTime?, status, password? }
  - resp: BaseResponse<number>

- POST /team/update（队长/管理员）
  - body: Partial<Team> & { id: number }
  - resp: BaseResponse<number>

- POST /team/join
  - body: { teamId, password? }
  - resp: BaseResponse<number>

- POST /team/leave
  - body: { teamId }
  - resp: BaseResponse<number>
