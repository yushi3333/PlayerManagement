# NBA球员管理系统 - 快速启动指南

## 🚀 5分钟快速启动

### 1. 环境检查
确保你的系统已安装：
- Node.js (版本 >= 14.0.0)
- npm (版本 >= 6.0.0)

检查命令：
```bash
node --version
npm --version
```

### 2. 克隆项目
```bash
# 如果你还没有项目，先克隆
git clone <your-repo-url>
cd PlayerManagement/frontend-player
```

### 3. 安装依赖
```bash
npm install
```

### 4. 启动后端服务
确保后端服务正在运行：
```bash
# 在项目根目录
cd /Users/ganyushi/Desktop/PlayerManagement
./mvnw spring-boot:run
```

### 5. 启动前端服务
```bash
# 在frontend-player目录
npm start
```

### 6. 访问应用
打开浏览器访问：`http://localhost:3000`

---

## 📁 项目结构速览

```
frontend-player/
├── src/
│   ├── components/          # React组件
│   │   ├── api.js          # API配置
│   │   ├── header.js       # 导航栏
│   │   ├── card/           # 球员卡片
│   │   ├── dashboard/      # 数据仪表板
│   │   ├── home/           # 首页
│   │   ├── player/         # 球员详情
│   │   └── team/           # 球队统计
│   ├── App.js              # 主应用
│   └── index.js            # 入口文件
├── package.json            # 项目配置
└── README.md              # 项目说明
```

---

## 🔧 常用命令

### 开发命令
```bash
npm start          # 启动开发服务器
npm run build      # 构建生产版本
npm test           # 运行测试
npm run eject      # 弹出配置（不可逆）
```

### 调试命令
```bash
# 检查端口占用
lsof -i :3000
lsof -i :8080

# 查看进程
ps aux | grep node
ps aux | grep java
```

---

## 🌐 服务端口

| 服务 | 端口 | 访问地址 |
|------|------|----------|
| 前端 | 3000 | http://localhost:3000 |
| 后端 | 8080 | http://localhost:8080 |
| API | 8080 | http://localhost:8080/api/players |

---

## 🔍 快速调试

### 前端问题排查
1. **页面空白**
   ```bash
   # 检查控制台错误
   F12 → Console
   
   # 检查网络请求
   F12 → Network
   ```

2. **API连接失败**
   ```bash
   # 测试后端API
   curl http://localhost:8080/api/players
   
   # 检查CORS配置
   curl -H "Origin: http://localhost:3000" -X OPTIONS http://localhost:8080/api/players
   ```

3. **组件不更新**
   - 检查React DevTools
   - 验证props传递
   - 检查useEffect依赖

### 后端问题排查
1. **端口被占用**
   ```bash
   # 查找占用进程
   lsof -i :8080
   
   # 杀死进程
   kill -9 <PID>
   ```

2. **数据库连接失败**
   - 检查MySQL服务状态
   - 验证数据库配置
   - 检查用户名密码

---

## 📱 主要功能

### 1. 球员列表 (`/players`)
- 显示所有NBA球员
- 搜索和筛选功能
- 响应式卡片布局

### 2. 数据仪表板 (`/dashboard`)
- 统计数据概览
- 球员排名表格
- 排序和筛选

### 3. 球队统计 (`/team-stats`)
- 球队数据对比
- 平均数据计算
- 可视化展示

### 4. 球员详情 (`/player/:id`)
- 详细球员信息
- 统计数据展示
- 性能指标分析

---

## 🎨 自定义配置

### 修改API地址
编辑 `src/components/api.js`：
```javascript
const API_URL = 'http://your-backend-url:8080/api/players';
```

### 修改主题色彩
编辑 `src/App.css`：
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### 添加新组件
```bash
# 创建新组件目录
mkdir src/components/new-component

# 创建组件文件
touch src/components/new-component/NewComponent.js
touch src/components/new-component/NewComponent.css
```

---

## 🚨 常见问题

### Q: 前端无法启动
**A**: 检查Node.js版本和依赖安装
```bash
node --version  # 确保 >= 14.0.0
npm install     # 重新安装依赖
```

### Q: 后端连接失败
**A**: 检查后端服务和CORS配置
```bash
# 确保后端运行
curl http://localhost:8080/api/players

# 检查CORS配置
```

### Q: 样式不生效
**A**: 确保Bootstrap已正确导入
```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Q: 路由不工作
**A**: 检查React Router配置
```jsx
import { BrowserRouter } from 'react-router-dom';
```

---

## 📚 学习资源

### React相关
- [React官方文档](https://reactjs.org/docs/)
- [React Hooks指南](https://reactjs.org/docs/hooks-intro.html)
- [React Router文档](https://reactrouter.com/)

### UI框架
- [Bootstrap文档](https://getbootstrap.com/docs/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [FontAwesome](https://fontawesome.com/)

### 开发工具
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools)

---

## 🤝 贡献指南

### 代码规范
- 使用函数式组件和Hooks
- 遵循ESLint规则
- 使用语义化命名

### 提交规范
```bash
git add .
git commit -m "feat: add new player component"
git push origin main
```

### 分支管理
- `main`: 主分支
- `develop`: 开发分支
- `feature/*`: 功能分支

---

## 📞 技术支持

### 联系方式
- 项目维护者: [YuShi Gan]
- 邮箱: [ygan29@uwo.ca]
- GitHub: [your-github]

### 问题反馈
1. 查看[常见问题](#常见问题)
2. 搜索GitHub Issues
3. 创建新的Issue

---

*最后更新: 2025年8月1日*
*版本: 1.0.0* 