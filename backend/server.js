const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// 创建 Express 应用
const app = express();
const PORT = 3000;

// 中间件配置
app.use(cors()); // 允许跨域请求
app.use(bodyParser.json()); // 解析 JSON 请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析表单请求

// 模拟数据库数据
let users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '访客' }
];

// ============= 路由接口 =============

// 测试接口 - 根路径
app.get('/', (req, res) => {
  res.json({ message: '后端服务器运行正常！' });
});

// GET 请求：获取所有用户
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET 请求：根据 ID 获取单个用户
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: '用户不存在' });
  }
});

// POST 请求：创建新用户
app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;
  
  // 简单的数据验证
  if (!name || !email) {
    return res.status(400).json({ message: '姓名和邮箱不能为空' });
  }
  
  // 创建新用户（实际项目中应该用数据库）
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: role || '访客'
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT 请求：更新用户信息
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, role } = req.body;
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: '用户不存在' });
  }
  
  // 更新用户信息
  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    role: role || users[userIndex].role
  };
  
  res.json(users[userIndex]);
});

// DELETE 请求：删除用户
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: '用户不存在' });
  }
  
  users.splice(userIndex, 1);
  res.status(204).send(); // 204 表示删除成功，无返回内容
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 后端服务器已启动！`);
  console.log(`📡 接口地址：http://localhost:${PORT}`);
  console.log(`📊 用户列表接口：http://localhost:${PORT}/api/users`);
  console.log(`⏰ 启动时间：${new Date().toLocaleString()}`);
});