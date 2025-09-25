<template>
  <div class="seek">
    <h2>寻找队友</h2>
    <el-form :model="form" label-width="80px" class="seek-form">
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="例如：数学建模招募一位写作同学" />
      </el-form-item>
      <el-form-item label="竞赛">
        <el-select v-model="form.competitionId" placeholder="选择关联竞赛" style="width: 260px">
          <el-option v-for="c in competitionStore.competitions" :key="c.id" :label="c.title" :value="c.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="方向">
        <el-select v-model="form.tags" multiple placeholder="选择方向/标签" style="width: 320px">
          <el-option label="编程" value="编程" />
          <el-option label="写作" value="写作" />
          <el-option label="建模" value="建模" />
          <el-option label="数据分析" value="数据分析" />
          <el-option label="产品/设计" value="产品/设计" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea" :rows="3" placeholder="简单介绍需求与时间安排" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish">发布</el-button>
      </el-form-item>
    </el-form>

    <el-divider />

    <!-- 过滤器 -->
    <div class="filters">
      <el-select v-model="filterTag" clearable placeholder="按方向筛选" style="width: 180px; margin-right: 10px;">
        <el-option label="编程" value="编程" />
        <el-option label="写作" value="写作" />
        <el-option label="建模" value="建模" />
        <el-option label="数据分析" value="数据分析" />
        <el-option label="产品/设计" value="产品/设计" />
      </el-select>
      <el-input v-model="keyword" placeholder="搜索标题/内容" style="width: 220px" />
    </div>

    <el-table :data="filteredPosts" border>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="author" label="发布人" width="120" />
      <el-table-column label="竞赛">
        <template #default="{ row }">
          {{ competitionStore.competitions.find(c => c.id == row.competitionId)?.title || '未关联' }}
        </template>
      </el-table-column>
      <el-table-column label="方向" width="200">
        <template #default="{ row }">
          <el-tag v-for="t in (row.tags || [])" :key="t" style="margin-right: 6px" type="info">{{ t }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="发布时间" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="goChat(row.id)">进入会话</el-button>
          <el-button type="danger" size="small" v-if="row.author === userStore.username || userStore.role==='admin'" @click="remove(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.seek { max-width: 1000px; margin: 24px auto; background: #fff; padding: 20px 24px; border-radius: 10px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.seek-form { margin-bottom: 10px; }
.filters { display:flex; align-items:center; margin-bottom: 10px; }
</style>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useCompetitionStore } from '@/stores/competition'
import { useChatStore } from '@/stores/chat'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const competitionStore = useCompetitionStore()
const chatStore = useChatStore()

const form = reactive({ title: '', competitionId: '', content: '', tags: [] })
const filterTag = reactive('')
const keyword = reactive('')

onMounted(() => {
  // 如果从竞赛/队伍详情入口带 competitionId，自动回填
  const cid = route.query.competitionId
  if (cid) form.competitionId = Number(cid)
})

function publish() {
  if (!form.title || !form.competitionId) return ElMessage.warning('请填写标题并选择竞赛')
  chatStore.addPost({ title: form.title, content: form.content, competitionId: form.competitionId, author: userStore.username || 'student', tags: form.tags })
  form.title = ''
  form.competitionId = ''
  form.content = ''
  form.tags = []
  ElMessage.success('发布成功')
}

function goChat(postId) {
  router.push({ path: '/chat', query: { postId } })
}

function remove(id) {
  chatStore.deletePost(id)
  ElMessage.success('已删除')
}

const filteredPosts = computed(() => {
  const list = chatStore.posts
  return list.filter(p => {
    const tagOk = !filterTag || (p.tags || []).includes(filterTag)
    const keyOk = !keyword || p.title?.includes(keyword) || p.content?.includes(keyword)
    return tagOk && keyOk
  })
})
</script>
