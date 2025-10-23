<template>
  <div class="page">
    <h2>学科竞赛列表</h2>

    <el-table :data="competitionStore.competitions" border style="width: 100%">
      <el-table-column label="竞赛名称">
        <template #default="{ row }">
          <a @click.prevent="goDetail(row.id)" href="#">{{ row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="summary" label="简介" />
      <el-table-column prop="endTime" label="截止时间" />
      <el-table-column label="操作" width="300">
        <template #default="{ row }">
          <!-- 管理员：管理队伍/编辑竞赛 -->
          <template v-if="userStore.role === 'admin' || userStore.role === 1 || userStore.role === '1'">
            <el-button type="primary" size="small" @click="goDetail(row.id)">
              管理/详情
            </el-button>
          </template>

          <!-- 学生：报名（队长）/参加（队员） -->
          <template v-else>
            <el-button type="success" size="small" @click="goCreate(row.id)">
              报名（队长）
            </el-button>
            <el-button type="warning" size="small" @click="goJoin(row.id)">
              参加（队员）
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 空/加载提示 -->
    <div v-if="loading" style="text-align:center;padding:18px">加载中...</div>
    <el-empty description="暂无竞赛" v-else-if="competitionStore.competitions.length === 0" />
  </div>
  
</template>

<style scoped>
.page {
  max-width: 1000px;
  margin: 24px auto;
  background: #fff;
  padding: 20px 24px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCompetitionStore } from '@/stores/competition'
import { useUserStore } from '@/stores/user'

function isUrl(str) {
  if (!str) return false
  try { return ['http:', 'https:'].includes(new URL(str).protocol) } catch (e) { return false }
}

function stripHtml(input) {
  if (!input) return ''
  return input.replace(/<[^>]*>/g, '')
}

function previewText(input, length = 120) {
  const text = stripHtml(input)
  return text.length > length ? text.slice(0, length) + '...' : text
}

const router = useRouter()
const competitionStore = useCompetitionStore()
const userStore = useUserStore()
const loading = ref(false)

onMounted(() => {
  loading.value = true
  competitionStore.fetchList().catch(() => {}).finally(() => { loading.value = false })
})

function goDetail(id) {
  router.push(`/competitions/${id}`)
}

function goCreate(id) {
  router.push({ path: `/competitions/${id}`, query: { mode: 'create' } })
}

function goJoin(id) {
  router.push({ path: `/competitions/${id}`, query: { mode: 'join' } })
}
</script>
