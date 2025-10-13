# 用户模块接口文档
## 一、用户实体结构(数据库)

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | Long | 用户唯一标识 |
| username | String | 用户名 |
| password | String | 登录密码（仅注册与登录时使用） |
| userUrl | String | 用户头像URL |
| email | String | 邮箱 |
| tags | String | 个人简介 |
| role | String | 用户角色（user/admin） |
| createTime | Date | 注册时间 |
| updateTime | Date | 更新时间 |

---

## 二、接口列表

### 1. 用户注册

- **URL**：`/user/register`
- **方法**：`POST`
- **权限**：公开（无需登录）

**请求体：**
```json
{
  "userAccount": "ihliai",
  "userPassword": "123456666",
  "checkPassword": "123456666",
  "userRole": "0"
}
```

**返回示例：**
```json
{
  "code": 0,
  "data": 1,
  "message": "注册成功"
}
```

---

### 2. 用户登录

- **URL**：`/user/login`
- **方法**：`POST`
- **权限**：公开

**请求体：**
```json
{
  "userAccount": "1111",
  "userPassword": "11111111",
  "userRole": "0"
}
```

**返回示例：**
```json
{
    "code": 0,
    "data": {
        "id": 13,
        "userName": "sbyg",
        "userAccount": "1111",
        "userPassword": null,
        "userUrl": "https://i.pravatar.cc/150?img=6",
        "gender": null,
        "phone": "123131",
        "email": "",
        "tags": null,
        "userRole": 0,
        "createTime": "2025-10-11 18:18:09",
        "updateTime": null,
        "isDelete": null,
        "profile": null
    },
    "message": "successful",
    "description": ""
}
```

---

### 3. 获取当前登录用户信息

- **URL**：`/user/current`
- **方法**：`GET`
- **权限**：需要登录 ✅

**返回示例：**
```json
{
  "code": 0,
  "data": {
    "id": 1,
    "username": "ihli",
    "userUrl": "https://example.com/userUrl.png",
    "tags": "热爱Flutter开发",
    "email": "ihli@example.com",
    "role": "user"
  }
}
```

---

### 4. 更新个人信息

- **URL**：`/user/update`
- **方法**：`POST`
- **权限**：需要登录 ✅

**请求体：**
```json
{
  "userUrl": "https://example.com/new-userUrl.png",
  "tags": "Flutter开发者 | 健身爱好者"
}
```

**返回：**
```json
{
  "code": 0,
  "message": "修改成功"
}
```

---

### 5. 用户列表（管理员）

- **URL**：`/user/list`
- **方法**：`GET`
- **权限**：管理员 ✅

**参数：**
| 参数名 | 类型 | 说明 |
|--------|------|------|
| username | String | 模糊查询用户名（可选） |

**返回示例：**
```json
{
  "code": 0,
  "data": [
    {
      "id": 1,
      "username": "ihli",
      "email": "ihli@example.com",
      "tags": "健康运动研究者",
      "role": "user"
    },
    {
      "id": 2,
      "username": "admin",
      "tags": "系统管理员",
      "role": "admin"
    }
  ]
}
```

---

### 6. 删除用户（管理员）

- **URL**：`/user/delete/{id}`
- **方法**：`DELETE`
- **权限**：管理员 ✅

**返回示例：**
```json
{
  "code": 0,
  "message": "删除成功"
}
```

---

### 7. 用户登出

- **URL**：`/user/logout`
- **方法**：`POST`
- **权限**：需要登录 ✅

**返回示例：**
```json
{
  "code": 0,
  "message": "退出成功"
}
```

---

## 三、状态码说明

| 状态码 | 含义 |
|--------|------|
| 0 | 成功 |
| 40000 | 参数错误 |
| 40100 | 未登录或登录失效 |
| 40300 | 无权限 |
| 50000 | 系统异常 |