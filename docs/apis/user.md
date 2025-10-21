---
title: 默认模块
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# 默认模块

Base URLs:

# Authentication

# 用户接口

## POST 用户注册

POST /user/register

> Body 请求参数

```json
{
  "userAccount": "string",
  "userPassword": "string",
  "checkPassword": "string",
  "userRole": 0
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[UserRegisterRequest](#schemauserregisterrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": 0,
  "message": "",
  "description": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[BaseResponseLong](#schemabaseresponselong)|

## POST 用户登录

POST /user/login

> Body 请求参数

```json
{
  "userAccount": "string",
  "userPassword": "string",
  "userRole": 0
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[UserLoginRequest](#schemauserloginrequest)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "id": 0,
    "userName": "",
    "userAccount": "",
    "userPassword": "",
    "userUrl": "",
    "gender": 0,
    "phone": "",
    "email": "",
    "tags": "",
    "userRole": 0,
    "createTime": "",
    "updateTime": "",
    "isDelete": 0
  },
  "message": "",
  "description": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[BaseResponseUser](#schemabaseresponseuser)|

## POST 用户登出

POST /user/logout

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": 0,
  "message": "",
  "description": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[BaseResponseInteger](#schemabaseresponseinteger)|

## GET 查询当前用户

GET /user/current

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": {
    "id": 0,
    "userName": "",
    "userAccount": "",
    "userPassword": "",
    "userUrl": "",
    "gender": 0,
    "phone": "",
    "email": "",
    "tags": "",
    "userRole": 0,
    "createTime": "",
    "updateTime": "",
    "isDelete": 0
  },
  "message": "",
  "description": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[BaseResponseUser](#schemabaseresponseuser)|

## GET 查询用户列表

GET /user/search

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userName|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": [
    {
      "id": 0,
      "userName": "",
      "userAccount": "",
      "userPassword": "",
      "userUrl": "",
      "gender": 0,
      "phone": "",
      "email": "",
      "tags": "",
      "userRole": 0,
      "createTime": "",
      "updateTime": "",
      "isDelete": 0
    }
  ],
  "message": "",
  "description": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[BaseResponseListUser](#schemabaseresponselistuser)|

## POST 更新用户信息

POST /user/update

> Body 请求参数

```json
{
  "id": 0,
  "userName": "string",
  "userAccount": "string",
  "userPassword": "string",
  "userUrl": "string",
  "gender": 0,
  "phone": "string",
  "email": "string",
  "tags": "string",
  "userRole": 0,
  "createTime": "string",
  "updateTime": "string",
  "isDelete": 0
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[User](#schemauser)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": 0,
  "message": "",
  "description": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[BaseResponseInteger](#schemabaseresponseinteger)|

## POST 删除用户

POST /user/delete

> Body 请求参数

```json
0
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|integer| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "data": false,
  "message": "",
  "description": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[BaseResponseBoolean](#schemabaseresponseboolean)|

# 数据模型

<h2 id="tocS_BaseResponseLong">BaseResponseLong</h2>

<a id="schemabaseresponselong"></a>
<a id="schema_BaseResponseLong"></a>
<a id="tocSbaseresponselong"></a>
<a id="tocsbaseresponselong"></a>

```json
{
  "code": 0,
  "data": 0,
  "message": "string",
  "description": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|data|integer(int64)|false|none||none|
|message|string|false|none||none|
|description|string|false|none||none|

<h2 id="tocS_UserRegisterRequest">UserRegisterRequest</h2>

<a id="schemauserregisterrequest"></a>
<a id="schema_UserRegisterRequest"></a>
<a id="tocSuserregisterrequest"></a>
<a id="tocsuserregisterrequest"></a>

```json
{
  "userAccount": "string",
  "userPassword": "string",
  "checkPassword": "string",
  "userRole": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|userAccount|string|false|none||none|
|userPassword|string|false|none||none|
|checkPassword|string|false|none||none|
|userRole|integer|false|none||none|

<h2 id="tocS_User">User</h2>

<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": 0,
  "userName": "string",
  "userAccount": "string",
  "userPassword": "string",
  "userUrl": "string",
  "gender": 0,
  "phone": "string",
  "email": "string",
  "tags": "string",
  "userRole": 0,
  "createTime": "string",
  "updateTime": "string",
  "isDelete": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||id|
|userName|string|false|none||用户昵称|
|userAccount|string|false|none||用户账号|
|userPassword|string|false|none||用户密码|
|userUrl|string|false|none||用户头像|
|gender|integer|false|none||性别 0-女 1-男|
|phone|string|false|none||电话|
|email|string|false|none||邮箱|
|tags|string|false|none||个人简介|
|userRole|integer|false|none||用户角色 0-普通用户，1-管理员|
|createTime|string|false|none||创建时间|
|updateTime|string|false|none||更新时间|
|isDelete|integer|false|none||是否删除|

<h2 id="tocS_BaseResponseUser">BaseResponseUser</h2>

<a id="schemabaseresponseuser"></a>
<a id="schema_BaseResponseUser"></a>
<a id="tocSbaseresponseuser"></a>
<a id="tocsbaseresponseuser"></a>

```json
{
  "code": 0,
  "data": {
    "id": 0,
    "userName": "string",
    "userAccount": "string",
    "userPassword": "string",
    "userUrl": "string",
    "gender": 0,
    "phone": "string",
    "email": "string",
    "tags": "string",
    "userRole": 0,
    "createTime": "string",
    "updateTime": "string",
    "isDelete": 0
  },
  "message": "string",
  "description": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|data|[User](#schemauser)|false|none||none|
|message|string|false|none||none|
|description|string|false|none||none|

<h2 id="tocS_UserLoginRequest">UserLoginRequest</h2>

<a id="schemauserloginrequest"></a>
<a id="schema_UserLoginRequest"></a>
<a id="tocSuserloginrequest"></a>
<a id="tocsuserloginrequest"></a>

```json
{
  "userAccount": "string",
  "userPassword": "string",
  "userRole": 0
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|userAccount|string|false|none||none|
|userPassword|string|false|none||none|
|userRole|integer|false|none||none|

<h2 id="tocS_BaseResponseInteger">BaseResponseInteger</h2>

<a id="schemabaseresponseinteger"></a>
<a id="schema_BaseResponseInteger"></a>
<a id="tocSbaseresponseinteger"></a>
<a id="tocsbaseresponseinteger"></a>

```json
{
  "code": 0,
  "data": 0,
  "message": "string",
  "description": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|data|integer|false|none||none|
|message|string|false|none||none|
|description|string|false|none||none|

<h2 id="tocS_BaseResponseListUser">BaseResponseListUser</h2>

<a id="schemabaseresponselistuser"></a>
<a id="schema_BaseResponseListUser"></a>
<a id="tocSbaseresponselistuser"></a>
<a id="tocsbaseresponselistuser"></a>

```json
{
  "code": 0,
  "data": [
    {
      "id": 0,
      "userName": "string",
      "userAccount": "string",
      "userPassword": "string",
      "userUrl": "string",
      "gender": 0,
      "phone": "string",
      "email": "string",
      "tags": "string",
      "userRole": 0,
      "createTime": "string",
      "updateTime": "string",
      "isDelete": 0
    }
  ],
  "message": "string",
  "description": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|data|[[User](#schemauser)]|false|none||none|
|message|string|false|none||none|
|description|string|false|none||none|

<h2 id="tocS_BaseResponseBoolean">BaseResponseBoolean</h2>

<a id="schemabaseresponseboolean"></a>
<a id="schema_BaseResponseBoolean"></a>
<a id="tocSbaseresponseboolean"></a>
<a id="tocsbaseresponseboolean"></a>

```json
{
  "code": 0,
  "data": true,
  "message": "string",
  "description": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||none|
|data|boolean|false|none||none|
|message|string|false|none||none|
|description|string|false|none||none|

