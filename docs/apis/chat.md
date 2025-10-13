# 会话/聊天模块 API（草案）

> 若采用临时会话（文本交流/组队沟通），可从以下两种实现中择一：
> 1) 简化：使用后端 REST 轮询接口；
> 2) 实时：使用 WebSocket 建立会话通道。

## 数据模型
```
interface ChatRoom {
  id: number
  topic?: string
  compId?: number
  teamId?: number
  createUserId?: number
  createTime?: string
}

interface Message {
  id: number
  roomId: number
  userId: number
  content: string
  createTime: string
}
```

## REST 方案（骨架）
- GET /chat/room/list?compId?&teamId?
- POST /chat/room/create { compId?, teamId?, topic? }
- GET /chat/message/list?roomId&pageNum&pageSize
- POST /chat/message/send { roomId, content }

## WebSocket 方案（骨架）
- 握手：/ws/chat（带 Cookie/Token）
- 订阅：根据 roomId 订阅频道（例如 /topic/room/{roomId}）
- 发送：消息体 { roomId, content }
- 鉴权：仅房间成员可订阅/发送
