const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// 创建 Express 应用
const app = express();
const PORT = 3000;

// ============= 获取本机局域网 IP 的函数 =============
function getLocalIpAddress() {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  const ips = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // 跳过内部回环地址和非 IPv4 地址
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  return ips;
}

// ============= 修复 CORS 配置 =============
// 允许所有来源访问（开发环境用）
app.use(cors({
  origin: '*',  // 允许所有来源
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的请求方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
  credentials: true, // 允许携带凭证
  optionsSuccessStatus: 200 // 处理 OPTIONS 请求
}));

// 或者使用更安全的配置（二选一）
// 取消下面的注释并注释掉上面的配置，使用白名单模式
/*
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://192.168.3.10:5173', // 替换成你的实际 IP
  'http://192.168.3.10:3000',
  // 可以添加更多 IP
];

app.use(cors({
  origin: function(origin, callback) {
    // 允许没有 origin 的请求（如 Postman）
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('被阻止的来源:', origin);
      callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));
*/

// 中间件配置
app.use(bodyParser.json()); // 解析 JSON 请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析表单请求

// 添加请求日志中间件（便于调试）
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.url} - 来源: ${req.headers.origin || '直接访问'}`);
  next();
});

// 创建 MySQL 连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456', // 你的数据库密码
  database: 'company',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 将 pool 转换为 Promise 版本
const promisePool = pool.promise();

// 测试数据库连接
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ 数据库连接失败:', err.message);
  } else {
    console.log('✅ 数据库连接成功');
    connection.release();
  }
});

// ============= 原有的用户接口 =============
let users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '访客' }
];

app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: '后端服务器运行正常！',
    time: new Date().toLocaleString(),
    ip: req.ip || req.connection.remoteAddress
  });
});

// 也可以添加一个返回服务器信息的接口
app.get('/api/info', (req, res) => {
  const ips = getLocalIpAddress();
  res.json({
    success: true,
    serverTime: new Date().toLocaleString(),
    serverIps: ips,
    port: PORT,
    nodeVersion: process.version,
    platform: process.platform
  });
});

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
  
  if (!name || !email) {
    return res.status(400).json({ message: '姓名和邮箱不能为空' });
  }
  
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
  res.status(204).send();
});

// ============= 统计接口 =============

// 辅助函数：获取客户端真实 IP
const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
  
  // 处理 IPv6 格式的 IPv4 地址
  if (ip && ip.includes('::ffff:')) {
    return ip.split('::ffff:')[1];
  }
  return ip || '0.0.0.0';
};

// 1. 记录页面访问
app.post('/api/track/visit', async (req, res) => {
  try {
    const { pageUrl = '/' } = req.body;
    const ipAddress = getClientIp(req);
    const userAgent = req.headers['user-agent'] || '';
    const now = new Date();
    const visitDate = now.toISOString().split('T')[0];
    
    console.log('记录访问:', { ipAddress, pageUrl, visitDate });
    
    const [result] = await promisePool.execute(
      'INSERT INTO page_visits (ip_address, user_agent, visit_time, visit_date, page_url) VALUES (?, ?, ?, ?, ?)',
      [ipAddress, userAgent, now, visitDate, pageUrl]
    );
    
    res.status(201).json({ 
      success: true, 
      message: '访问记录成功',
      id: result.insertId 
    });
  } catch (error) {
    console.error('记录访问失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '服务器错误',
      error: error.message 
    });
  }
});

// 2. 提交咨询表单
app.post('/api/consult/submit', async (req, res) => {
  try {
    const { phone, wechat, question } = req.body;
    
    if (!question) {
      return res.status(400).json({ 
        success: false, 
        message: '问题咨询不能为空' 
      });
    }
    
    if (!phone && !wechat) {
      return res.status(400).json({ 
        success: false, 
        message: '请至少填写手机号或微信号' 
      });
    }
    
    const ipAddress = getClientIp(req);
    const userAgent = req.headers['user-agent'] || '';
    const now = new Date();
    const createdDate = now.toISOString().split('T')[0];
    
    console.log('提交咨询:', { phone, wechat, ipAddress });
    
    const [result] = await promisePool.execute(
      'INSERT INTO consult_submissions (phone, wechat, question, ip_address, user_agent, created_at, created_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [phone || null, wechat || null, question, ipAddress, userAgent, now, createdDate]
    );
    
    res.status(201).json({ 
      success: true, 
      message: '提交成功！我们会尽快联系您',
      id: result.insertId 
    });
  } catch (error) {
    console.error('提交咨询失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '服务器错误',
      error: error.message 
    });
  }
});

// 3. 获取访问统计（按天）
app.get('/api/stats/visits/daily', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = `
      SELECT 
        visit_date,
        COUNT(DISTINCT ip_address) as unique_visitors,
        COUNT(*) as total_visits
      FROM page_visits
    `;
    
    const params = [];
    if (startDate && endDate) {
      query += ' WHERE visit_date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }
    
    query += ' GROUP BY visit_date ORDER BY visit_date DESC';
    
    const [rows] = await promisePool.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('获取访问统计失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 4. 获取咨询提交统计
app.get('/api/stats/submissions', async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    
    let query = `
      SELECT 
        cs.*,
        DATE(cs.created_at) as submit_date
      FROM consult_submissions cs
      WHERE 1=1
    `;
    
    const params = [];
    
    if (startDate && endDate) {
      query += ' AND DATE(cs.created_at) BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }
    
    if (status !== undefined) {
      query += ' AND cs.status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY cs.created_at DESC';
    
    const [rows] = await promisePool.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('获取提交记录失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 5. 获取统计概览
app.get('/api/stats/overview', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const [todayVisits] = await promisePool.execute(
      'SELECT COUNT(DISTINCT ip_address) as unique_visitors, COUNT(*) as total_visits FROM page_visits WHERE visit_date = ?',
      [today]
    );
    
    const [totalVisits] = await promisePool.execute(
      'SELECT COUNT(DISTINCT ip_address) as unique_visitors, COUNT(*) as total_visits FROM page_visits'
    );
    
    const [todaySubmissions] = await promisePool.execute(
      'SELECT COUNT(*) as total FROM consult_submissions WHERE DATE(created_at) = ?',
      [today]
    );
    
    const [totalSubmissions] = await promisePool.execute(
      'SELECT COUNT(*) as total FROM consult_submissions'
    );
    
    const [pendingSubmissions] = await promisePool.execute(
      'SELECT COUNT(*) as total FROM consult_submissions WHERE status = 0'
    );
    
    res.json({
      today: {
        visitors: todayVisits[0].unique_visitors || 0,
        visits: todayVisits[0].total_visits || 0,
        submissions: todaySubmissions[0].total || 0
      },
      total: {
        unique_visitors: totalVisits[0].unique_visitors || 0,
        visits: totalVisits[0].total_visits || 0,
        submissions: totalSubmissions[0].total || 0
      },
      pending_submissions: pendingSubmissions[0].total || 0
    });
  } catch (error) {
    console.error('获取统计概览失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 6. 更新提交状态（标记为已处理）
app.put('/api/stats/submissions/:id/status', async (req, res) => {
  try {
    const id = req.params.id;
    const { status, remark } = req.body;
    
    const [result] = await promisePool.execute(
      'UPDATE consult_submissions SET status = ?, remark = ? WHERE id = ?',
      [status || 1, remark || null, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    
    res.json({ success: true, message: '状态更新成功' });
  } catch (error) {
    console.error('更新状态失败:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 处理 OPTIONS 预检请求（可选，cors 中间件已处理）
app.options('*', cors());

// 404 处理
app.use((req, res) => {
  res.status(404).json({ success: false, message: '接口不存在' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ success: false, message: '服务器内部错误' });
});

// ============= 启动服务器 - 监听所有网络接口 =============
app.listen(PORT, '0.0.0.0', () => {
  const ips = getLocalIpAddress();
  console.log('\n=================================');
  console.log(`🚀 后端服务器已启动！`);
  console.log(`=================================`);
  console.log(`📡 本地访问地址：`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   http://127.0.0.1:${PORT}`);
  
  if (ips.length > 0) {
    console.log(`\n📡 局域网访问地址（分享给其他人）：`);
    ips.forEach(ip => {
      console.log(`   http://${ip}:${PORT}`);
    });
  }
  
  console.log(`\n📊 可用接口：`);
  console.log(`   GET  /api/users - 获取用户列表`);
  console.log(`   POST /api/track/visit - 记录访问`);
  console.log(`   POST /api/consult/submit - 提交咨询`);
  console.log(`   GET  /api/stats/overview - 统计概览`);
  console.log(`   GET  /api/stats/submissions - 提交记录`);
  console.log(`\n⏰ 启动时间：${new Date().toLocaleString()}`);
  console.log(`=================================\n`);
});