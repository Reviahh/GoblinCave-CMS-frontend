<template>
        <!-- 顶部大图和按钮 -->
        <div class="module-header">
          <div class="module-header-container">
            <div class="module-header-content">
              <div class="module-header-title">竞赛管理系统</div>
              <div class="module-header-info">基于现代 Web 技术的竞赛管理平台，支持竞赛发布、报名、成绩管理等功能</div>
              <div class="module-header-link">
                <el-button type="primary" size="large" @click="startButton1">进入竞赛列表</el-button>
                <el-button type="success" size="large" @click="startButton2" style="margin-left: 20px;">报名管理</el-button>
              </div>
            </div>
            <div class="module-header-empty"></div>
          </div>
        </div>

        <!-- 导航栏 -->
        <el-affix :offset="0">
          <div class="module-nav-container" ref="contentRef">
            <ul class="module-nav-tab">
              <li v-for="(item, index) in navItems" :key="index" class="module-nav-item"
                :class="{ 'module-nav-item-active': activeIndex === index }" @click="handleNavClick(index)">
                {{ item }}
              </li>
            </ul>
            <i class="module-nav-border" :style="borderStyle"></i>
          </div>
        </el-affix>

        <!-- 第一部分：项目背景 -->
        <div id="section1" class="module-section">
          <el-card shadow="hover">
            <h2 class="section-title">项目背景</h2>
            <el-row :gutter="24" class="background-grid">
              <el-col :xs="24" :sm="8">
                <div class="background-item">
                  <img src="" class="background-image" alt="竞赛需求" />
                  <h3>竞赛需求日益增长</h3>
                  <p>各类学科竞赛、创新创业活动日益丰富，管理需求不断提升</p>
                </div>
              </el-col>

              <el-col :xs="24" :sm="8">
                <div class="background-item">
                  <img src="" class="background-image" alt="管理低效" />
                  <h3>传统管理方式低效</h3>
                  <p>手工统计、线下报名等方式效率低，易出错，难以满足现代需求</p>
                </div>
              </el-col>
              <el-col :xs="24" :sm="8">
                <div class="background-item">
                  <img src="" class="background-image" alt="政策支持" />
                  <h3>信息化建设推进</h3>
                  <p>政策鼓励教育信息化，推动竞赛管理系统化、智能化发展</p>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>

        <!-- 第二部分：系统优势 -->
        <div id="section2" class="py-16">
          <el-card shadow="hover">
            <h2 class="section-title">系统优势</h2>
            <el-row :gutter="24">
              <el-col :xs="24" :sm="12">
                <div class="advantage-item">
                  <img src="" class="advantage-image" alt="高效管理" />
                  <h3>高效管理</h3>
                  <ul>
                    <li>一站式竞赛全流程管理</li>
                    <li>自动统计与数据分析</li>
                    <li>权限分级，安全可靠</li>
                  </ul>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12">
                <div class="advantage-item">
                  <img src="" class="advantage-image" alt="智能便捷" />
                  <h3>智能便捷</h3>
                  <ul>
                    <li>在线报名与审核</li>
                    <li>成绩自动发布与查询</li>
                    <li>支持多终端访问</li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>

        <!-- 第三部分：系统涵盖功能 -->
        <div id="section3" class="py-16">
          <el-card shadow="hover">
            <h2 class="section-title">系统涵盖功能</h2>
            <el-row :gutter="24">
              <el-col :xs="24" :sm="8">
                <div class="feature-item">
                  <img src="" class="feature-image" alt="竞赛发布" />
                  <h3>竞赛发布</h3>
                  <p>支持多类型竞赛的发布与信息维护</p>
                </div>
              </el-col>
              <el-col :xs="24" :sm="8">
                <div class="feature-item">
                  <img src="" class="feature-image" alt="报名管理" />
                  <h3>报名管理</h3>
                  <p>在线报名、审核、名单导出等功能一应俱全</p>
                </div>
              </el-col>
              <el-col :xs="24" :sm="8">
                <div class="feature-item">
                  <img src="" class="feature-image" alt="成绩管理" />
                  <h3>成绩管理</h3>
                  <p>成绩录入、自动统计、结果发布与查询</p>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>

        <!-- 第四部分：项目团队 -->
        <div id="section4" class="py-16">
          <el-card shadow="hover">
            <h2 class="section-title">项目团队</h2>
            <el-row :gutter="24">
              <el-col v-for="(member, index) in teamMembers" :key="index" :xs="24" :sm="8" :md="4">
                <div class="team-member">
                  <el-avatar :src="getGithubAvatar(member.github)" :size="80" style="margin-bottom: 12px;" />
                  <div class="text-center">
                    <h3 style="font-size: 18px; font-weight: bold;">{{ member.name }}</h3>
                    <p style="font-size: 14px; color: #888; margin: 4px 0;">{{ member.role }}</p>
                    <el-button type="primary" size="small" :href="member.github" target="_blank" link>GitHub</el-button>
                    <p style="font-size: 13px; margin: 4px 0;">{{ member.major }}</p>
                    <el-tag :type="member.tagType" size="small" effect="plain">{{ member.tag }}</el-tag>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
</template>



<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 40px 0;
}
.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
}
.subtitle {
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
}
.card-list {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
}
.card {
  width: 220px;
  text-align: center;
}
.card-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
}
.card-desc {
  font-size: 14px;
  color: #888;
  margin-bottom: 16px;
}
</style>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const navItems = ['项目背景', '系统优势', '系统涵盖功能', '项目团队'];
const contentRef = ref(null);
const activeIndex = ref(0);
const borderLeft = ref('0px');
const borderWidth = ref('0px');
const borderStyle = computed(() => ({
  left: borderLeft.value,
  width: borderWidth.value,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));
const updateBorderPosition = (index) => {
  if (!contentRef.value) return;
  const items = contentRef.value.querySelectorAll('.module-nav-item');
  const activeItem = items[index];
  if (!activeItem) return;
  borderLeft.value = `${activeItem.offsetLeft}px`;
  borderWidth.value = `${activeItem.offsetWidth}px`;
};
const handleNavClick = (index) => {
  activeIndex.value = index;
  updateBorderPosition(index);
  const targetId = `#section${index + 1}`;
  const targetEl = document.querySelector(targetId);
  if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
};
onMounted(() => {
  updateBorderPosition(0);
});
const router = useRouter();
const startButton1 = () => {
  router.push('/competition-list');
};
const startButton2 = () => {
  router.push('/signup-manage');
};
const teamMembers = [
  {
    name: '姜星宇',
    initials: 'JXY',
    role: '前端页面设计',
    github: 'https://github.com/Reviahh',
    major: '软件工程',
    color: '#f59e0b',
    tag: '队员',
    tagType: 'warning'
  },
  {
    name: '陈非洋',
    initials: 'CFY',
    role: '算法设计实现与文档撰写',
    github: 'https://github.com/1nNoVAt10N',
    major: '软件工程',
    color: '#10b981',
    tag: '成员',
    tagType: 'success'
  },
  {
    name: '刘宇阳',
    initials: 'LYY',
    role: '算法设计与测试',
    github: 'https://github.com/Sabrinagift',
    major: '软件工程',
    color: '#3b82f6',
    tag: '队长',
    tagType: 'info'
  },
  {
    name: '高佳烨',
    initials: 'MeGuRu',
    role: '前端页面设计',
    github: 'https://github.com/MeguruForever',
    major: '软件工程',
    color: '#ec4899',
    tag: '队员',
    tagType: 'danger'
  },
  {
    name: '翁笑阳',
    initials: 'WXY',
    role: '算法设计与文档撰写',
    github: 'https://github.com/7Spike35',
    major: '软件工程',
    color: '#4f46e5',
    tag: '队长',
    tagType: 'primary'
  }
];
const getGithubAvatar = (githubUrl) => {
  const username = githubUrl.split('/').pop();
  return `https://github.com/${username}.png`;
};
</script>
