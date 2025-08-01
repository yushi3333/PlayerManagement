# NBA球员管理系统 - 前端面试准备指南

## 🎯 面试重点：JavaScript函数与React核心概念

### 📋 目录
- [React Hooks使用模式](#react-hooks使用模式)
- [状态管理实现](#状态管理实现)
- [API集成与异步处理](#api集成与异步处理)
- [组件设计模式](#组件设计模式)
- [性能优化技巧](#性能优化技巧)
- [常见面试题](#常见面试题)

---

## 🪝 React Hooks使用模式

### 1. useState - 状态管理
```javascript
// 基础状态管理
const [players, setPlayers] = useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');

// 复杂状态对象
const [stats, setStats] = useState({
  totalPlayers: 0,
  avgPoints: 0,
  avgRebounds: 0,
  avgAssists: 0
});

// 状态更新函数
const updateStats = (newStats) => {
  setStats(prevStats => ({
    ...prevStats,
    ...newStats
  }));
};
```

### 2. useEffect - 副作用处理
```javascript
// 数据获取
useEffect(() => {
  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const data = await getPlayers();
      setPlayers(data);
      calculateStats(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchPlayers();
}, []); // 空依赖数组，只在组件挂载时执行

// 监听状态变化
useEffect(() => {
  if (players.length > 0) {
    calculateStats(players);
  }
}, [players]); // 当players变化时重新计算

// 清理函数
useEffect(() => {
  const timer = setInterval(() => {
    // 定时更新数据
  }, 5000);

  return () => clearInterval(timer); // 组件卸载时清理
}, []);
```

### 3. useCallback - 性能优化
```javascript
// 缓存函数，避免不必要的重新渲染
const handleSearch = useCallback((searchTerm) => {
  setSearchTerm(searchTerm);
  const filtered = players.filter((player) => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredPlayers(filtered);
}, [players]);

// 传递给子组件的回调函数
const handleTeamSelect = useCallback((team) => {
  setSelectedTeam(team);
  if (team === 'All Teams') {
    setFilteredPlayers(players);
  } else {
    const filtered = players.filter((player) => player.team === team);
    setFilteredPlayers(filtered);
  }
  navigate('/players');
}, [players, navigate]);
```

### 4. useMemo - 计算缓存
```javascript
// 缓存计算结果
const sortedPlayers = useMemo(() => {
  return [...players].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] - b[sortField];
    } else {
      return b[sortField] - a[sortField];
    }
  });
}, [players, sortField, sortDirection]);

// 缓存统计数据
const teamStats = useMemo(() => {
  const stats = {};
  Object.keys(teams).forEach(teamName => {
    const teamPlayers = players.filter(player => player.team === teamName);
    if (teamPlayers.length > 0) {
      stats[teamName] = {
        playerCount: teamPlayers.length,
        avgPoints: (teamPlayers.reduce((sum, p) => sum + p.pts, 0) / teamPlayers.length).toFixed(1)
      };
    }
  });
  return stats;
}, [players, teams]);
```

---

## 📊 状态管理实现

### 1. 全局状态设计
```javascript
// 应用状态结构
const [state, setState] = useState({
  // 数据状态
  players: [],
  filteredPlayers: [],
  
  // UI状态
  loading: true,
  error: null,
  
  // 筛选状态
  selectedTeam: 'All Teams',
  searchTerm: '',
  sortField: 'pts',
  sortDirection: 'desc',
  
  // 计算状态
  stats: {
    totalPlayers: 0,
    avgPoints: 0,
    avgRebounds: 0,
    avgAssists: 0
  }
});

// 状态更新函数
const updateState = (updates) => {
  setState(prevState => ({
    ...prevState,
    ...updates
  }));
};
```

### 2. 状态更新模式
```javascript
// 批量状态更新
const handleSearchAndFilter = (searchTerm, team) => {
  setState(prevState => {
    const filtered = prevState.players.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTeam = team === 'All Teams' || player.team === team;
      return matchesSearch && matchesTeam;
    });
    
    return {
      ...prevState,
      searchTerm,
      selectedTeam: team,
      filteredPlayers: filtered
    };
  });
};

// 异步状态更新
const fetchAndUpdatePlayers = async () => {
  setState(prev => ({ ...prev, loading: true, error: null }));
  
  try {
    const data = await getPlayers();
    const stats = calculateStats(data);
    
    setState(prev => ({
      ...prev,
      players: data,
      filteredPlayers: data,
      stats,
      loading: false
    }));
  } catch (error) {
    setState(prev => ({
      ...prev,
      error: error.message,
      loading: false
    }));
  }
};
```

---

## 🔌 API集成与异步处理

### 1. Axios配置与使用
```javascript
import axios from 'axios';

// API配置
const API_BASE_URL = 'http://localhost:8080/api';
const API_CONFIG = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  ...API_CONFIG
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);
```

### 2. API函数封装
```javascript
// 基础API函数
export const apiService = {
  // 获取所有球员
  async getPlayers() {
    try {
      const response = await apiClient.get('/players');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch players: ${error.message}`);
    }
  },

  // 获取单个球员
  async getPlayer(id) {
    try {
      const response = await apiClient.get(`/players/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch player ${id}: ${error.message}`);
    }
  },

  // 更新球员信息
  async updatePlayer(id, playerData) {
    try {
      const response = await apiClient.put(`/players/${id}`, playerData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update player ${id}: ${error.message}`);
    }
  },

  // 创建新球员
  async createPlayer(playerData) {
    try {
      const response = await apiClient.post('/players', playerData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create player: ${error.message}`);
    }
  },

  // 删除球员
  async deletePlayer(id) {
    try {
      await apiClient.delete(`/players/${id}`);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete player ${id}: ${error.message}`);
    }
  }
};
```

### 3. 自定义Hook封装
```javascript
// 数据获取Hook
export const useApiData = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

// 使用示例
const { data: players, loading, error } = useApiData(apiService.getPlayers, []);
```

### 4. 错误处理策略
```javascript
// 统一错误处理
const handleApiError = (error, context = '') => {
  console.error(`API Error in ${context}:`, error);
  
  if (error.response) {
    // 服务器响应错误
    switch (error.response.status) {
      case 404:
        return '数据未找到';
      case 500:
        return '服务器内部错误';
      default:
        return `请求失败: ${error.response.status}`;
    }
  } else if (error.request) {
    // 网络错误
    return '网络连接失败，请检查网络设置';
  } else {
    // 其他错误
    return error.message || '未知错误';
  }
};

// 重试机制
const retryApiCall = async (apiFunction, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiFunction();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

---

## 🧩 组件设计模式

### 1. 高阶组件(HOC)模式
```javascript
// 加载状态HOC
const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent(props) {
    const { loading, ...restProps } = props;
    
    if (loading) {
      return <div className="loading-spinner">Loading...</div>;
    }
    
    return <WrappedComponent {...restProps} />;
  };
};

// 错误处理HOC
const withErrorHandling = (WrappedComponent) => {
  return function WithErrorHandlingComponent(props) {
    const { error, onRetry, ...restProps } = props;
    
    if (error) {
      return (
        <div className="error-container">
          <p>Error: {error}</p>
          {onRetry && <button onClick={onRetry}>Retry</button>}
        </div>
      );
    }
    
    return <WrappedComponent {...restProps} />;
  };
};

// 使用HOC
const PlayerListWithLoading = withLoading(withErrorHandling(PlayerList));
```

### 2. 渲染属性(Render Props)模式
```javascript
// 数据获取组件
const DataFetcher = ({ url, children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return children({ data, loading, error });
};

// 使用渲染属性
<DataFetcher url="/api/players">
  {({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return <PlayerList players={data} />;
  }}
</DataFetcher>
```

### 3. 组合模式
```javascript
// 基础组件
const Card = ({ children, ...props }) => (
  <div className="card" {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, ...props }) => (
  <div className="card-header" {...props}>
    {children}
  </div>
);

const CardBody = ({ children, ...props }) => (
  <div className="card-body" {...props}>
    {children}
  </div>
);

// 组合使用
<Card>
  <CardHeader>Player Information</CardHeader>
  <CardBody>
    <PlayerDetails player={player} />
  </CardBody>
</Card>
```

### 4. 自定义Hook模式
```javascript
// 搜索Hook
export const useSearch = (items, searchFields = ['name']) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredItems(items);
      return;
    }

    const filtered = items.filter(item =>
      searchFields.some(field =>
        item[field]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredItems(filtered);
  }, [searchTerm, items, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems
  };
};

// 排序Hook
export const useSort = (items, defaultSortField = 'name') => {
  const [sortField, setSortField] = useState(defaultSortField);
  const [sortDirection, setSortDirection] = useState('asc');

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [items, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return {
    sortField,
    sortDirection,
    sortedItems,
    handleSort
  };
};
```

---

## ⚡ 性能优化技巧

### 1. React.memo优化
```javascript
// 优化子组件渲染
const PlayerCard = React.memo(({ player, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(player);
  }, [player, onSelect]);

  return (
    <div onClick={handleClick}>
      <h3>{player.name}</h3>
      <p>{player.team}</p>
      <p>{player.pts} pts</p>
    </div>
  );
});

// 自定义比较函数
const PlayerCard = React.memo(({ player, onSelect }) => {
  // 组件实现
}, (prevProps, nextProps) => {
  // 只有当player.id或onSelect函数变化时才重新渲染
  return prevProps.player.id === nextProps.player.id && 
         prevProps.onSelect === nextProps.onSelect;
});
```

### 2. 虚拟化列表
```javascript
import { FixedSizeList as List } from 'react-window';

const VirtualizedPlayerList = ({ players }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <PlayerCard player={players[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={players.length}
      itemSize={100}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

### 3. 懒加载组件
```javascript
// 路由懒加载
const Dashboard = lazy(() => import('./components/Dashboard'));
const TeamStats = lazy(() => import('./components/TeamStats'));

// 条件懒加载
const LazyComponent = ({ shouldLoad, component: Component, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad && !isLoaded) {
      setIsLoaded(true);
    }
  }, [shouldLoad, isLoaded]);

  if (!shouldLoad || !isLoaded) {
    return <div>Loading...</div>;
  }

  return <Component {...props} />;
};
```

---

## ❓ 常见面试题

### 1. React Hooks相关
**Q: 解释useEffect的依赖数组**
```javascript
// 空依赖数组 - 只在组件挂载时执行
useEffect(() => {
  fetchData();
}, []);

// 有依赖 - 当依赖变化时执行
useEffect(() => {
  fetchData();
}, [userId, searchTerm]);

// 无依赖数组 - 每次渲染都执行
useEffect(() => {
  console.log('Component rendered');
});
```

**Q: 如何避免useEffect的无限循环？**
```javascript
// 错误示例 - 会导致无限循环
useEffect(() => {
  setCount(count + 1);
}, [count]);

// 正确示例 - 使用函数式更新
useEffect(() => {
  setCount(prev => prev + 1);
}, []); // 空依赖数组

// 或者使用useCallback
const incrementCount = useCallback(() => {
  setCount(prev => prev + 1);
}, []);

useEffect(() => {
  incrementCount();
}, [incrementCount]);
```

### 2. 状态管理相关
**Q: 如何优化大量状态更新？**
```javascript
// 批量更新
const handleMultipleUpdates = () => {
  setState(prevState => ({
    ...prevState,
    loading: true,
    error: null,
    data: null
  }));
};

// 使用useReducer处理复杂状态
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
```

### 3. 性能优化相关
**Q: 如何检测组件不必要的重新渲染？**
```javascript
// 使用React DevTools Profiler
// 或者添加console.log
const MyComponent = React.memo(({ data }) => {
  console.log('MyComponent rendered');
  return <div>{data}</div>;
});

// 使用why-did-you-render库
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
```

### 4. 异步处理相关
**Q: 如何处理竞态条件？**
```javascript
// 使用AbortController
const useApiCall = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          signal: abortController.signal
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, loading };
};
```

---

## 🎯 面试要点总结

### 核心技术栈
- **React 18**: Hooks, 函数式组件, 性能优化
- **JavaScript ES6+**: 异步编程, 函数式编程
- **状态管理**: useState, useReducer, Context API
- **性能优化**: React.memo, useMemo, useCallback
- **API集成**: Axios, 错误处理, 拦截器

### 重点概念
1. **Hooks生命周期**: useEffect依赖数组, 清理函数
2. **状态更新**: 批量更新, 函数式更新
3. **性能优化**: 避免不必要的重新渲染
4. **异步处理**: Promise, async/await, 错误处理
5. **组件设计**: 组合模式, 自定义Hook

### 实践项目亮点
- 完整的CRUD操作
- 实时搜索和筛选
- 数据可视化
- 响应式设计
- 错误边界处理

---

*这份文档专注于JavaScript函数和React核心概念，适合面试准备使用* 