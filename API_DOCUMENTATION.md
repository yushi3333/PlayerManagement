# NBA球员管理系统 API 文档

## 概述
本系统实现了用户登录注册功能，包括三种用户角色：
- **ADMIN（管理者）**：可以增加、删除、更新球员信息
- **USER（普通用户）**：可以评论球队和球员，查看球员和球队数据
- **GUEST（未注册用户）**：只能查看球员和球队数据

## 认证相关 API

### 1. 用户注册
**POST** `/api/auth/register`

**请求体：**
```json
{
    "username": "testuser",
    "password": "password123",
    "email": "test@example.com",
    "role": "USER"
}
```

**响应：**
```json
{
    "message": "User registered successfully",
    "user": {
        "id": 1,
        "username": "testuser",
        "email": "test@example.com",
        "role": "USER",
        "createdAt": "2024-01-01T10:00:00",
        "updatedAt": "2024-01-01T10:00:00"
    }
}
```

### 2. 用户登录
**POST** `/api/auth/login`

**请求体：**
```json
{
    "username": "testuser",
    "password": "password123"
}
```

**响应：**
```json
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "testuser"
}
```

## 球员管理 API

### 1. 获取所有球员（公开访问）
**GET** `/api/players`

**响应：**
```json
[
    {
        "id": 1,
        "team": "Lakers",
        "name": "LeBron James",
        "gp": 82,
        "minutes": 35.2,
        "fgp": 0.520,
        "fg3p": 0.350,
        "ftp": 0.750,
        "eff": 25.8,
        "reb": 7.5,
        "ast": 7.3,
        "stl": 1.2,
        "blk": 0.6,
        "tov": 3.1,
        "pts": 25.0
    }
]
```

### 2. 获取单个球员（公开访问）
**GET** `/api/players/{id}`

### 3. 创建球员（需要ADMIN权限）
**POST** `/api/players`

**请求头：**
```
Authorization: Bearer <JWT_TOKEN>
```

**请求体：**
```json
{
    "team": "Warriors",
    "name": "Stephen Curry",
    "gp": 82,
    "minutes": 34.2,
    "fgp": 0.480,
    "fg3p": 0.420,
    "ftp": 0.920,
    "eff": 24.8,
    "reb": 4.5,
    "ast": 6.3,
    "stl": 1.1,
    "blk": 0.2,
    "tov": 3.2,
    "pts": 29.4
}
```

### 4. 更新球员（需要ADMIN权限）
**PUT** `/api/players/{id}`

**请求头：**
```
Authorization: Bearer <JWT_TOKEN>
```

### 5. 删除球员（需要ADMIN权限）
**DELETE** `/api/players/{id}`

**请求头：**
```
Authorization: Bearer <JWT_TOKEN>
```

## 评论管理 API

### 1. 获取所有评论（需要USER或ADMIN权限）
**GET** `/api/comments`

**请求头：**
```
Authorization: Bearer <JWT_TOKEN>
```

### 2. 获取球员评论（公开访问）
**GET** `/api/comments/player/{playerId}`

### 3. 获取球队评论（公开访问）
**GET** `/api/comments/team/{teamName}`

### 4. 创建评论（需要USER或ADMIN权限）
**POST** `/api/comments`

**请求头：**
```
Authorization: Bearer <JWT_TOKEN>
```

**请求体：**
```json
{
    "content": "这个球员表现很棒！",
    "playerId": 1,
    "teamName": "Lakers"
}
```

### 5. 更新评论（需要USER或ADMIN权限）
**PUT** `/api/comments/{id}`

**请求头：**
```
Authorization: Bearer <JWT_TOKEN>
```

### 6. 删除评论（需要USER或ADMIN权限）
**DELETE** `/api/comments/{id}`

**请求头：**
```
Authorization: Bearer <JWT_TOKEN>
```

## 用户管理 API（需要ADMIN权限）

### 1. 获取所有用户
**GET** `/api/users`

### 2. 获取单个用户
**GET** `/api/users/{id}`

### 3. 更新用户
**PUT** `/api/users/{id}`

### 4. 删除用户
**DELETE** `/api/users/{id}`

## 默认用户账户

系统启动时会自动创建以下默认账户：

### 管理员账户
- **用户名：** admin
- **密码：** admin123
- **角色：** ADMIN

### 普通用户账户
- **用户名：** user
- **密码：** user123
- **角色：** USER

## 权限说明

### 公开访问（无需认证）
- 查看所有球员信息
- 查看单个球员信息
- 查看球员评论
- 查看球队评论

### 需要USER或ADMIN权限
- 创建、更新、删除评论
- 查看所有评论

### 需要ADMIN权限
- 创建、更新、删除球员
- 管理用户账户

## 错误响应

### 认证失败
```json
{
    "error": "Invalid credentials"
}
```

### 权限不足
```json
{
    "error": "Access denied"
}
```

### 资源不存在
```json
{
    "error": "Resource not found"
}
```

## 使用示例

### 1. 注册新用户
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "password": "password123",
    "email": "newuser@example.com",
    "role": "USER"
  }'
```

### 2. 用户登录
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "password": "password123"
  }'
```

### 3. 使用JWT Token访问受保护的API
```bash
curl -X GET http://localhost:8080/api/comments \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

### 4. 管理员创建球员
```bash
curl -X POST http://localhost:8080/api/players \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>" \
  -d '{
    "team": "Celtics",
    "name": "Jayson Tatum",
    "gp": 82,
    "minutes": 36.9,
    "fgp": 0.465,
    "fg3p": 0.350,
    "ftp": 0.855,
    "eff": 22.8,
    "reb": 8.1,
    "ast": 4.6,
    "stl": 1.1,
    "blk": 0.7,
    "tov": 2.6,
    "pts": 26.9
  }'
``` 