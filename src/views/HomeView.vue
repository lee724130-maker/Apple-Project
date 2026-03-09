<template>
  <div class="home-view">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <h1 class="welcome-title">欢迎使用 Vue3 Company</h1>
      <p class="welcome-subtitle">一个基于 Vue 3 + TypeScript + Element Plus 的企业级管理系统</p>
      
      <div class="welcome-stats">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="6">
            <div class="stat-card">
              <div class="stat-icon" style="background-color: #409eff;">
                <el-icon><User /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ stats.users }}</div>
                <div class="stat-label">用户总数</div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <div class="stat-card">
              <div class="stat-icon" style="background-color: #67c23a;">
                <el-icon><Document /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ stats.documents }}</div>
                <div class="stat-label">文档数量</div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <div class="stat-card">
              <div class="stat-icon" style="background-color: #e6a23c;">
                <el-icon><Message /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ stats.messages }}</div>
                <div class="stat-label">消息通知</div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <div class="stat-card">
              <div class="stat-icon" style="background-color: #f56c6c;">
                <el-icon><TrendCharts /></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ stats.growth }}%</div>
                <div class="stat-label">增长比例</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 功能卡片区域 -->
    <div class="features-section">
      <h2 class="section-title">主要功能</h2>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <router-link to="/users" class="feature-card">
            <div class="feature-icon">
              <el-icon><User /></el-icon>
            </div>
            <h3 class="feature-title">用户管理</h3>
            <p class="feature-desc">管理用户信息、权限和角色</p>
          </router-link>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon><Setting /></el-icon>
            </div>
            <h3 class="feature-title">系统设置</h3>
            <p class="feature-desc">配置系统参数和个性化选项</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon><DataAnalysis /></el-icon>
            </div>
            <h3 class="feature-title">数据分析</h3>
            <p class="feature-desc">查看统计报表和数据分析</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <div class="feature-card">
            <div class="feature-icon">
              <el-icon><Document /></el-icon>
            </div>
            <h3 class="feature-title">文档管理</h3>
            <p class="feature-desc">上传、管理和分享文档</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 最近活动 -->
    <div class="recent-activity">
      <h2 class="section-title">最近活动</h2>
      <el-timeline>
        <el-timeline-item
          v-for="activity in recentActivities"
          :key="activity.id"
          :timestamp="activity.time"
          :type="activity.type"
          :icon="activity.icon"
          :color="activity.color"
        >
          <div class="activity-item">
            <div class="activity-content">
              <strong>{{ activity.user }}</strong> {{ activity.action }}
              <span v-if="activity.target" class="activity-target">{{ activity.target }}</span>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>

    <!-- 快速操作 -->
    <div class="quick-actions">
      <h2 class="section-title">快速操作</h2>
      <div class="actions-grid">
        <el-button type="primary" :icon="Plus" @click="handleAddUser">
          添加用户
        </el-button>
        <el-button type="success" :icon="Upload" @click="handleUpload">
          上传文件
        </el-button>
        <el-button type="warning" :icon="Bell" @click="handleNotification">
          发送通知
        </el-button>
        <el-button type="info" :icon="Refresh" @click="handleRefresh">
          刷新数据
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  User,
  Document,
  Message,
  TrendCharts,
  Setting,
  DataAnalysis,
  Plus,
  Upload,
  Bell,
  Refresh
} from '@element-plus/icons-vue'

const router = useRouter()

// 统计数据
const stats = ref({
  users: 156,
  documents: 234,
  messages: 12,
  growth: 24.5
})

// 最近活动
const recentActivities = ref([
  {
    id: 1,
    user: '张三',
    action: '创建了新用户',
    target: '李四',
    time: '2024-01-15 14:30',
    type: 'primary',
    icon: User,
    color: '#409eff'
  },
  {
    id: 2,
    user: '管理员',
    action: '更新了系统配置',
    target: '',
    time: '2024-01-15 10:15',
    type: 'success',
    icon: Setting,
    color: '#67c23a'
  },
  {
    id: 3,
    user: '王五',
    action: '上传了文档',
    target: '项目计划书.pdf',
    time: '2024-01-14 16:45',
    type: 'warning',
    icon: Document,
    color: '#e6a23c'
  },
  {
    id: 4,
    user: '系统',
    action: '完成了数据备份',
    target: '',
    time: '2024-01-14 03:00',
    type: 'info',
    icon: DataAnalysis,
    color: '#909399'
  }
])

// 页面加载时获取数据
onMounted(() => {
  // 这里可以调用API获取真实数据
  // fetchDashboardData()
})

// 快速操作处理函数
const handleAddUser = () => {
  router.push('/users?action=add')
}

const handleUpload = () => {
  ElMessage.info('上传功能开发中...')
}

const handleNotification = () => {
  ElMessage.info('通知功能开发中...')
}

const handleRefresh = () => {
  ElMessage.success('数据已刷新')
  // 这里可以重新获取数据
}
</script>

<style scoped>
.home-view {
  padding: var(--spacing-lg);
}

/* 欢迎区域 */
.welcome-section {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.welcome-title {
  font-size: 32px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.welcome-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.welcome-stats {
  margin-top: var(--spacing-xl);
}

.stat-card {
  background-color: var(--bg-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon .el-icon {
  font-size: 28px;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 28px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
}

/* 功能卡片区域 */
.features-section {
  margin-bottom: var(--spacing-xl);
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.feature-card {
  background-color: var(--bg-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  text-align: center;
  display: block;
  text-decoration: none;
  color: inherit;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  height: 100%;
  margin-bottom: 20px;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  color: var(--primary-color);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background-color: var(--border-extra-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
}

.feature-icon .el-icon {
  font-size: 28px;
  color: var(--primary-color);
}

.feature-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: var(--spacing-sm);
}

.feature-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 最近活动 */
.recent-activity {
  margin-bottom: var(--spacing-xl);
}

.activity-item {
  padding: var(--spacing-sm) 0;
}

.activity-content {
  font-size: 14px;
  line-height: 1.5;
}

.activity-target {
  color: var(--primary-color);
  font-weight: 500;
}

/* 快速操作 */
.quick-actions {
  margin-bottom: var(--spacing-xl);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-view {
    padding: var(--spacing-md);
  }
  
  .welcome-title {
    font-size: 24px;
  }
  
  .welcome-subtitle {
    font-size: 14px;
  }
  
  .stat-card {
    padding: var(--spacing-md);
  }
  
  .stat-icon {
    width: 50px;
    height: 50px;
  }
  
  .stat-icon .el-icon {
    font-size: 24px;
  }
  
  .stat-number {
    font-size: 24px;
  }
  
  .section-title {
    font-size: 20px;
  }
  
  .feature-card {
    padding: var(--spacing-md);
  }
  
  .feature-icon {
    width: 50px;
    height: 50px;
  }
  
  .feature-icon .el-icon {
    font-size: 24px;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>