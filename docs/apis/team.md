# 队伍模块 API

## 数据模型
```js
interface Team {
  id: number
  compId: string
  name: string
  leaderId: string // 队长
  members: [{ userId }]
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
