<template>
  <div class="competition-detail">
    <h2>{{ competition.name }}</h2>
    <!-- content 优先，如果 content 是 URL 则显示链接，否则当作 HTML 内容渲染 -->
    <div v-if="competition.content && isUrl(competition.content)">
      <p>内容链接：<a :href="competition.content" target="_blank">打开</a></p>
    </div>
    <div v-else-if="competition.content" class="competition-content" v-html="competition.content"></div>
    <p v-else>{{ competition.summary }}</p>
    <p>人数上限：{{ competition.maxMembers ?? 5 }}</p>

    <!-- 学生视角 -->
    <div v-if="userStore.role === 'student'" class="student-section">
      <h3>报名参赛</h3>
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="goSeek">发起临时会话（寻找队友）</el-button>
      </div>

      <!-- 单人赛提示 -->
      <p class="mode-tip" v-if="isSingle">
        当前模式：<strong>单人赛（直接报名）</strong>
      </p>
      <!-- 普通赛提示 -->
      <p class="mode-tip" v-else>
        当前模式：
        <strong>{{ mode === 'join' ? '参加（队员）' : '报名（队长）' }}</strong>
      </p>

      <!-- 本竞赛的招募帖 -->
      <div class="seek-section">
        <h3>该竞赛的招募帖</h3>
        <el-table v-if="postsForCompetition.length" :data="postsForCompetition" border>
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="author" label="发布人" width="120" />
          <el-table-column prop="createdAt" label="发布时间" width="180" />
          <el-table-column label="方向/标签" width="220">
            <template #default="{ row }">
              <el-tag v-for="t in (row.tags || [])" :key="t" style="margin-right:6px" type="info">{{ t }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template #default="{ row }">
              <el-button type="primary" size="small" @click="goChat(row.id)">进入会话</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-empty v-else description="暂无招募帖" />
      </div>

      <!-- 单人赛：直接报名（不展示成员编辑） -->
      <div v-if="isSingle">
        <el-form :model="teamForm" label-width="100px">
          <el-form-item label="队伍名称">
            <el-input v-model="teamForm.name" placeholder="请输入队伍名称" />
          </el-form-item>
          <el-form-item label="队长">
            <el-input v-model="teamForm.leaderId" disabled />
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitTeam">立即报名</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 报名（队长）模式：创建队伍 -->
      <div v-else-if="mode !== 'join'">
        <el-form :model="teamForm" label-width="100px">
          <!-- 队伍名称 -->
          <el-form-item label="队伍名称">
            <el-input v-model="teamForm.name" placeholder="请输入队伍名称" />
          </el-form-item>

          <!-- 队长（自动填充，不可编辑） -->
          <el-form-item label="队长">
            <el-input v-model="teamForm.leaderId" disabled />
          </el-form-item>

          <!-- 成员列表 -->
          <el-form-item label="队员">
            <div v-for="(m, index) in teamForm.members" :key="index" class="member-row">
              <el-input
                v-model="m.userId"
                placeholder="请输入队员用户名"
                style="width: 200px"
              />
              <el-button
                type="danger"
                size="small"
                @click="removeMember(index)"
                v-if="teamForm.members.length > 0"
              >
                删除
              </el-button>
            </div>
            <el-button
              type="primary"
              size="small"
              @click="addMember"
              :disabled="teamForm.members.length + 1 >= competition.maxMembers"
              class="add-member-btn"
            >
              添加成员
            </el-button>
          </el-form-item>

          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="success" @click="submitTeam">提交报名</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 参加（队员）模式：加入现有队伍（单人赛不展示） -->
      <div v-else>
        <div class="my-team-entry" v-if="myTeam">
          <el-alert type="info" show-icon :closable="false" title="你已在该竞赛的队伍中">
            <template #default>
              <div style="margin-top: 6px">
                当前队伍：{{ myTeam.name }}
                <el-button type="primary" link @click="goTeamDetail(myTeam.id)">管理我的队伍</el-button>
              </div>
            </template>
          </el-alert>
        </div>
        <el-form label-width="120px">
          <el-form-item label="选择队伍">
            <el-select v-model="selectedTeamId" placeholder="请选择队伍" style="width: 260px">
              <el-option
                v-for="t in availableTeams"
                :key="t.id"
                :label="t.name + capacityText(t)"
                :value="t.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="!selectedTeamId" @click="joinTeam">
              加入队伍
            </el-button>
          </el-form-item>
        </el-form>
        <div class="team-hint" v-if="availableTeams.length === 0">
          暂无可加入队伍，请联系队长或切换到“报名（队长）”模式创建队伍。
        </div>
      </div>
    </div>

    <!-- 管理员视角 -->
    <div v-else-if="userStore.role === 'admin'" class="admin-section">
      <h3>竞赛管理</h3>
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="goSeek">发起临时会话（寻找队友）</el-button>
      </div>
      <!-- 编辑竞赛信息 -->
      <el-form :model="competition" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="competition.name" />
        </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="competition.summary" />
          </el-form-item>
          <el-form-item label="内容 URL">
            <el-input v-model="competition.content" placeholder="请输入内容链接（例如：https://...）" />
          </el-form-item>
        <el-form-item label="人数限制">
          <el-input-number v-model="competition.maxMembers" :min="1" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateCompetition">保存修改</el-button>
        </el-form-item>
      </el-form>

      <!-- 队伍管理 -->
      <h3>队伍列表</h3>
  <el-table :data="teamStore.teams.filter(t => t.compId === competition.id)" border>
  <el-table-column prop="name" label="队伍名称" />
        <el-table-column prop="leaderId" label="队长" />
        <el-table-column label="成员">
          <template #default="{ row }">
            <span v-for="m in row.members" :key="m.userId">{{ m.userId }} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="goTeamDetail(row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteTeam(row.id)">删除队伍</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useCompetitionStore } from '@/stores/competition'
import { useTeamStore } from '@/stores/team'
import { useChatStore } from '@/stores/chat'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const competitionStore = useCompetitionStore()
const teamStore = useTeamStore()
const chatStore = useChatStore()

// 当前竞赛详情
const competition = ref(
  competitionStore.competitions.find(c => c.id == route.params.id) || {
    id: Date.now(),
    name: '未找到',
    summary: '',
    maxMembers: 5
  }
)

onMounted(async () => {
  const id = route.params.id
  if (id) {
    const data = await competitionStore.fetchCompetition(Number(id))
    if (data) competition.value = data
  }
})

// 模式：create（报名-队长）或 join（参加-队员）
const mode = ref(route.query.mode === 'join' ? 'join' : 'create')
// 单人赛
const isSingle = computed(() => (competition.value.maxMembers ?? 5) === 1)

// 学生报名表单
const teamForm = ref({
  name: '',
  leaderId: userStore.username, // 队长自动填充
  members: [] // 队员手动输入
})

// 本竞赛的招募帖
const postsForCompetition = computed(() =>
  (chatStore.posts || []).filter(p => p.competitionId == competition.value.id)
)

// 本竞赛的队伍
const teamsInCompetition = computed(() =>
  teamStore.teams.filter(t => t.compId == competition.value.id)
)

// 可加入队伍（未满员）
const availableTeams = computed(() =>
  teamsInCompetition.value.filter(t => 1 + (t.members?.length || 0) < (competition.value.maxMembers || 5))
)

// 选择加入的队伍ID
const selectedTeamId = ref(null)

// 队伍容量展示文本
function capacityText(team) {
  const current = 1 + (team.members?.length || 0)
  const max = competition.value.maxMembers ?? 5
  return `（${current}/${max}）`
}

// 添加成员
function addMember() {
  if (teamForm.value.members.length + 1 < competition.value.maxMembers) {
    teamForm.value.members.push({ userId: '' })
  }
}

// 删除成员
function removeMember(index) {
  teamForm.value.members.splice(index, 1)
}

// 学生提交报名
function submitTeam() {
  // 已报名校验（同一竞赛只能在一个队伍中）
  const exists = teamStore.teams.some(t =>
    t.compId == competition.value.id && (t.leaderId === userStore.username || (t.members || []).some(m => m.userId === userStore.username))
  )
  if (exists) {
    ElMessage.info('你已在该竞赛的队伍中')
    return
  }
  teamStore.addTeam({
    id: Date.now(),
    compId: competition.value.id,
    name: teamForm.value.name,
    leaderId: teamForm.value.leaderId,
    members: teamForm.value.members
  })
  ElMessage.success('报名成功')
}

// 队员加入队伍
function joinTeam() {
  const teamId = selectedTeamId.value
  if (!teamId) return
  const team = teamStore.teams.find(t => t.id === teamId)
  if (!team) return ElMessage.error('队伍不存在')

  // 容量校验：1（队长） + 成员数量 < 上限
  const currentSize = 1 + (team.members?.length || 0)
  const max = competition.value.maxMembers || 5
  if (currentSize >= max) return ElMessage.warning('该队伍已满员')

  // 重复加入校验
  const already = (team.members || []).some(m => m.userId === userStore.username) || team.leaderId === userStore.username
  if (already) return ElMessage.info('你已在该队伍中')

  // 确保有成员数组
  if (!Array.isArray(team.members)) {
    teamStore.updateTeam(teamId, { members: [] })
  }
  teamStore.addMember(teamId, { userId: userStore.username })
  ElMessage.success('加入成功')
}

// 管理员更新竞赛
function updateCompetition() {
  competitionStore.updateCompetition(competition.value.id, {
    name: competition.value.name,
    summary: competition.value.summary,
    maxMembers: competition.value.maxMembers
  })
  ElMessage.success('竞赛信息已更新')
}

// 管理员删除队伍
function deleteTeam(teamId) {
  teamStore.deleteTeam(teamId)
}

function goTeamDetail(teamId) {
  router.push({ path: '/team-detail', query: { teamId } })
}

// 我所在的队伍（用于 join 模式快捷入口）
const myTeam = computed(() =>
  teamsInCompetition.value.find(t => t.leaderId === userStore.username || (t.members || []).some(m => m.userId === userStore.username))
)

function goSeek() {
  router.push({ path: '/seek', query: { competitionId: competition.value.id } })
}

function goChat(postId) {
  router.push({ path: '/chat', query: { postId } })
}

// 简单的 URL 校验
function isUrl(str) {
  if (!str) return false
  try {
    const u = new URL(str)
    return ['http:', 'https:'].includes(u.protocol)
  } catch (e) {
    return false
  }
}
</script>

<style scoped>
.competition-detail {
  max-width: 900px;
  margin: 30px auto;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.student-section,
.admin-section {
  margin-top: 30px;
}
.seek-section {
  margin-top: 30px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}
.member-row {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}
.mode-tip {
  color: #666;
  margin-bottom: 12px;
}
.team-hint {
  color: #999;
  font-size: 13px;
}
.add-member-btn { margin-top: 12px; }
</style>
