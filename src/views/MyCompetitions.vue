<template>
  <div class="my-comps">
    <h2>我的竞赛</h2>
    <el-table :data="myTeams" border style="width: 100%">
      <el-table-column prop="competitionTitle" label="竞赛名称" />
      <el-table-column prop="teamName" label="我的队伍" />
      <el-table-column label="角色" width="120">
        <template #default="{ row }">{{ row.isLeader ? '队长' : '队员' }}</template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="goTeam(row.teamId)">管理队伍</el-button>
          <el-button size="small" @click="goCompetition(row.competitionId)">查看竞赛</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="myTeams.length === 0" description="暂无参赛记录" />
  </div>
</template>

<style scoped>
.my-comps {
  max-width: 1000px;
  margin: 24px auto;
  background: #fff;
  padding: 20px 24px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
</style>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useTeamStore } from '@/stores/team'
import { useCompetitionStore } from '@/stores/competition'

const router = useRouter()
const userStore = useUserStore()
const teamStore = useTeamStore()
const competitionStore = useCompetitionStore()

const myTeams = computed(() => {
  const username = userStore.username
  return teamStore.teams
    .filter(t => t.leaderId === username || (t.members || []).some(m => m.userId === username))
    .map(t => {
      const comp = competitionStore.competitions.find(c => c.id == t.competitionId)
      return {
        competitionId: t.competitionId,
        competitionTitle: comp?.title || '未知竞赛',
        teamId: t.id,
        teamName: t.teamName,
        isLeader: t.leaderId === username
      }
    })
})

function goTeam(teamId) {
  router.push({ path: '/team-detail', query: { teamId } })
}
function goCompetition(id) {
  router.push(`/competitions/${id}`)
}
</script>
