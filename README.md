# NBA球员管理系统

## 项目概述

这是一个基于Spring Boot的NBA球员管理系统，实现了完整的用户认证和权限控制功能。系统支持三种用户角色，每种角色具有不同的操作权限。

## 功能特性

### 用户角色和权限

#### 1. ADMIN（管理者）
- ✅ 增加新球员
- ✅ 删除球员
- ✅ 更新球员信息
- ✅ 管理用户账户
- ✅ 查看所有数据
- ✅ 评论功能

#### 2. USER（普通用户）
- ✅ 评论球队和球员
- ✅ 查看球员数据
- ✅ 查看球队数据
- ✅ 管理自己的评论

#### 3. GUEST（未注册用户）
- ✅ 查看球员数据
- ✅ 查看球队数据
- ✅ 查看公开评论

## 技术栈

- **后端框架：** Spring Boot 3.4.1
- **安全框架：** Spring Security 6.4.2
- **数据库：** MySQL
- **ORM框架：** Spring Data JPA
- **认证方式：** JWT (JSON Web Token)
- **密码加密：** BCrypt
- **构建工具：** Maven

## 项目结构

```
src/main/java/com/example/NBAplayer/
├── CoreConfig.java              # 核心配置
├── NbAplayerApplication.java    # 主启动类
├── SecurityConfig.java          # 安全配置
├── JwtUtil.java                 # JWT工具类
├── JwtAuthenticationFilter.java # JWT认证过滤器
├── DataInitializer.java         # 数据初始化
├── UserRole.java                # 用户角色枚举
├── User.java                    # 用户实体
├── Player.java                  # 球员实体
├── Comment.java                 # 评论实体
├── UserRepository.java          # 用户数据访问层
├── PlayerRepository.java        # 球员数据访问层
├── CommentRepository.java       # 评论数据访问层
├── UserService.java             # 用户服务
├── PlayerServices.java          # 球员服务
├── CommentService.java          # 评论服务
├── AuthController.java          # 认证控制器
├── UserController.java          # 用户控制器
├── PlayerController.java        # 球员控制器
└── CommentController.java       # 评论控制器
```

## 快速开始

### 1. 环境要求

- Java 17+
- MySQL 8.0+
- Maven 3.6+

### 2. 数据库配置

在 `src/main/resources/application.properties` 中配置数据库连接：

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mavenproject
spring.datasource.username=root
spring.datasource.password=root123
spring.jpa.hibernate.ddl-auto=update
```

### 3. 启动应用

```bash
# 克隆项目
git clone <repository-url>
cd PlayerManagement

# 编译项目
mvn clean compile

# 启动应用
mvn spring-boot:run
```

应用将在 `http://localhost:8080` 启动。

### 4. 默认账户

系统启动时会自动创建以下默认账户：

#### 管理员账户
- **用户名：** admin
- **密码：** admin123
- **角色：** ADMIN

#### 普通用户账户
- **用户名：** user
- **密码：** user123
- **角色：** USER

## API 文档

详细的API文档请参考 [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### 主要API端点

#### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

#### 球员管理
- `GET /api/players` - 获取所有球员（公开）
- `GET /api/players/{id}` - 获取单个球员（公开）
- `POST /api/players` - 创建球员（ADMIN）
- `PUT /api/players/{id}` - 更新球员（ADMIN）
- `DELETE /api/players/{id}` - 删除球员（ADMIN）

#### 评论管理
- `GET /api/comments` - 获取所有评论（USER/ADMIN）
- `GET /api/comments/player/{playerId}` - 获取球员评论（公开）
- `GET /api/comments/team/{teamName}` - 获取球队评论（公开）
- `POST /api/comments` - 创建评论（USER/ADMIN）
- `PUT /api/comments/{id}` - 更新评论（USER/ADMIN）
- `DELETE /api/comments/{id}` - 删除评论（USER/ADMIN）

#### 用户管理
- `GET /api/users` - 获取所有用户（ADMIN）
- `GET /api/users/{id}` - 获取单个用户（ADMIN）
- `PUT /api/users/{id}` - 更新用户（ADMIN）
- `DELETE /api/users/{id}` - 删除用户（ADMIN）

## 安全特性

### JWT认证
- 使用JWT进行无状态认证
- Token包含用户角色信息
- 支持Token过期机制

### 密码安全
- 使用BCrypt加密存储密码
- 密码永远不会以明文形式存储

### 权限控制
- 基于角色的访问控制（RBAC）
- 细粒度的API权限控制
- 防止未授权访问

## 数据库设计

### 用户表 (users)
- id: 主键
- username: 用户名（唯一）
- password: 加密密码
- email: 邮箱（唯一）
- role: 用户角色
- created_at: 创建时间
- updated_at: 更新时间

### 球员表 (player)
- id: 主键
- team: 球队
- name: 球员姓名
- gp: 比赛场次
- minutes: 场均时间
- fgp: 投篮命中率
- fg3p: 三分命中率
- ftp: 罚球命中率
- eff: 效率值
- reb: 篮板
- ast: 助攻
- stl: 抢断
- blk: 盖帽
- tov: 失误
- pts: 得分

### 评论表 (comments)
- id: 主键
- content: 评论内容
- user_id: 用户ID（外键）
- player_id: 球员ID（外键，可选）
- team_name: 球队名称（可选）
- created_at: 创建时间
- updated_at: 更新时间

## 测试

### 使用curl测试API

#### 1. 注册新用户
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "email": "test@example.com",
    "role": "USER"
  }'
```

#### 2. 用户登录
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

#### 3. 查看球员（无需认证）
```bash
curl -X GET http://localhost:8080/api/players
```

#### 4. 创建评论（需要认证）
```bash
curl -X POST http://localhost:8080/api/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "content": "这个球员表现很棒！",
    "playerId": 1,
    "teamName": "Lakers"
  }'
```

## 部署

### 生产环境配置

1. 修改 `application.properties` 中的数据库配置
2. 更改JWT密钥（jwt.secret）
3. 调整JWT过期时间（jwt.expiration）
4. 配置CORS策略

### Docker部署

```dockerfile
FROM openjdk:17-jdk-slim
COPY target/NBAplayer-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

本项目采用MIT许可证。 