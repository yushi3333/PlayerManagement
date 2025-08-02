# NBA球员管理系统 - 快速开始指南

## 🚀 快速启动

本指南将帮助您在5分钟内启动NBA球员管理系统。

---

## 📋 系统要求

### 必需软件
- **Java**: JDK 17 或更高版本
- **Node.js**: 16.x 或更高版本
- **MySQL**: 8.0 或更高版本
- **Maven**: 3.6 或更高版本

### 检查环境
```bash
# 检查Java版本
java -version

# 检查Node.js版本
node -v
npm -v

# 检查MySQL版本
mysql --version

# 检查Maven版本
mvn -version
```

---

## ⚡ 5分钟快速启动

### 步骤1: 克隆项目 (1分钟)
```bash
# 克隆项目到本地
git clone <repository-url>
cd PlayerManagement

# 或者直接下载项目文件
# 解压到本地目录
```

### 步骤2: 配置数据库 (1分钟)
```bash
# 启动MySQL服务
# Windows: 启动MySQL服务
# macOS: brew services start mysql
# Linux: sudo systemctl start mysql

# 创建数据库
mysql -u root -p
CREATE DATABASE nba_players;
USE nba_players;
exit;
```

### 步骤3: 启动后端 (2分钟)
```bash
# 进入项目根目录
cd PlayerManagement

# 配置数据库连接
# 编辑 src/main/resources/application.properties
# 修改数据库用户名和密码

# 启动Spring Boot应用
mvn spring-boot:run

# 等待启动完成，看到以下信息：
# Started NbAplayerApplication in X.XXX seconds
```

### 步骤4: 启动前端 (1分钟)
```bash
# 新开一个终端，进入前端目录
cd frontend-player

# 安装依赖
npm install

# 启动React应用
npm start

# 等待启动完成，浏览器自动打开 http://localhost:3000
```

---

## ✅ 验证安装

### 检查后端API
```bash
# 测试API是否正常
curl http://localhost:8080/api/players

# 应该返回球员数据JSON
```

### 检查前端页面
1. 打开浏览器访问 `http://localhost:3000`
2. 应该看到NBA球员管理系统首页
3. 点击导航栏的各个链接，确认功能正常

### 检查默认账户
系统会自动创建以下默认账户：

| 用户名 | 密码 | 角色 | 权限 |
|--------|------|------|------|
| admin | admin123 | ADMIN | 完全权限 |
| user | user123 | USER | 查看和评论 |
| guest | guest123 | GUEST | 仅查看 |

---

## 🎯 快速体验

### 1. 浏览球员数据
- 访问 `http://localhost:3000/players`
- 查看149名NBA球员的详细信息
- 使用搜索功能查找特定球员

### 2. 查看球队统计
- 访问 `http://localhost:3000/team-stats`
- 查看30支NBA球队的统计数据
- 使用排序功能分析球队表现

### 3. 体验用户功能
- 点击右上角"Login"按钮
- 使用默认账户登录
- 体验不同角色的权限差异

### 4. 管理员功能
- 使用admin账户登录
- 访问球员详情页面
- 尝试编辑球员信息

---

## 🔧 常见问题解决

### 问题1: 端口被占用
```bash
# 检查端口占用
lsof -i :8080  # 检查后端端口
lsof -i :3000  # 检查前端端口

# 杀死占用进程
kill -9 <PID>
```

### 问题2: 数据库连接失败
```bash
# 检查MySQL服务状态
# Windows: services.msc
# macOS: brew services list
# Linux: sudo systemctl status mysql

# 检查数据库配置
# 确认 application.properties 中的配置正确
```

### 问题3: 前端依赖安装失败
```bash
# 清除npm缓存
npm cache clean --force

# 删除node_modules重新安装
rm -rf node_modules package-lock.json
npm install
```

### 问题4: 后端启动失败
```bash
# 检查Java版本
java -version

# 清理Maven缓存
mvn clean

# 重新编译
mvn compile
```

---

## 📚 下一步学习

### 1. 阅读文档
- [项目开发流程指南](PROJECT_DEVELOPMENT_GUIDE.md)
- [API文档](API_DOCUMENTATION.md)
- [技术决策记录](TECHNICAL_DECISIONS.md)

### 2. 探索代码
```bash
# 后端代码结构
src/main/java/com/example/NBAplayer/
├── controllers/     # API控制器
├── services/        # 业务逻辑
├── repositories/    # 数据访问
├── entities/        # 数据实体
└── config/          # 配置类

# 前端代码结构
frontend-player/src/
├── components/      # React组件
├── services/        # API服务
└── utils/           # 工具函数
```

### 3. 尝试修改
- 修改球员数据
- 添加新的统计指标
- 自定义界面样式
- 扩展功能模块

---

## 🛠️ 开发环境配置

### IDE推荐
- **后端**: IntelliJ IDEA 或 Eclipse
- **前端**: VS Code 或 WebStorm
- **数据库**: MySQL Workbench 或 DBeaver

### 开发工具配置
```bash
# 后端开发
# 在IDE中导入Maven项目
# 配置运行配置

# 前端开发
# 在VS Code中打开frontend-player目录
# 安装推荐的扩展
```

### 调试配置
```bash
# 后端调试
# 在IDE中设置断点
# 使用Debug模式启动

# 前端调试
# 使用浏览器开发者工具
# 在VS Code中设置断点
```

---

## 📊 系统监控

### 健康检查
```bash
# 检查后端健康状态
curl http://localhost:8080/actuator/health

# 检查数据库连接
curl http://localhost:8080/api/players/count
```

### 性能监控
```bash
# 查看应用日志
tail -f logs/application.log

# 监控数据库性能
mysql -u root -p -e "SHOW PROCESSLIST;"
```

---

## 🚀 生产部署

### Docker部署
```bash
# 构建后端镜像
docker build -t nba-backend .

# 构建前端镜像
cd frontend-player
docker build -t nba-frontend .

# 启动容器
docker-compose up -d
```

### 云平台部署
- **AWS**: 使用EC2和RDS
- **Azure**: 使用App Service和SQL Database
- **Google Cloud**: 使用Compute Engine和Cloud SQL

---

## 📞 获取帮助

### 文档资源
- [项目文档](README.md)
- [API文档](API_DOCUMENTATION.md)
- [开发指南](PROJECT_DEVELOPMENT_GUIDE.md)

### 技术支持
- 查看[常见问题](FAQ.md)
- 提交[Issue](issues)
- 联系开发团队

### 社区支持
- Stack Overflow
- GitHub Discussions
- 技术论坛

---

## 🎉 恭喜！

您已经成功启动了NBA球员管理系统！

### 系统特色
- ✅ **完整的用户认证系统**
- ✅ **丰富的球员数据管理**
- ✅ **强大的球队统计分析**
- ✅ **现代化的用户界面**
- ✅ **安全的权限控制**

### 开始使用
1. 浏览球员数据
2. 查看球队统计
3. 体验用户功能
4. 探索管理员权限

### 继续学习
- 阅读完整文档
- 探索源代码
- 尝试功能扩展
- 参与项目贡献

---

**享受您的NBA球员管理系统之旅！** 🏀 