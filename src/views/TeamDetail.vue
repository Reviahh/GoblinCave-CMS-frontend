<template>
  <div class="team-detail">
    <h2>队伍详情</h2>

    <el-form v-if="team" label-width="100px" :model="teamEdit">
      <el-form-item label="队伍名称">
        <el-input v-model="teamEdit.teamName" />
      </el-form-item>
      <el-form-item label="队长">
        <el-input v-model="teamEdit.leaderId" disabled />
      </el-form-item>
      <el-form-item label="成员">
        <div v-for="(m, idx) in teamEdit.members" :key="idx" class="member-row">
          <el-input v-model="m.userId" placeholder="成员用户名" style="width: 240px" />
          <el-button type="danger" size="small" @click="removeMember(idx)">删除</el-button>
        </div>
        <el-button type="primary" size="small" @click="addMember" :disabled="isFull" class="add-member-btn">
          添加成员
        </el-button>
        <span class="hint">{{ capacityText }}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>

    <el-empty v-else description="未找到该队伍" />
  </div>
</template>

<style scoped>
.team-detail {
  max-width: 800px;
  margin: 24px auto;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.member-row {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}
.hint { color: #888; margin-left: 10px; }
.add-member-btn { margin-top: 12px; }
</style>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/team'
import { useCompetitionStore } from '@/stores/competition'

const route = useRoute()
const router = useRouter()
const teamStore = useTeamStore()
const competitionStore = useCompetitionStore()

const teamId = Number(route.query.teamId)
const team = teamStore.teams.find(t => t.id === teamId)
const comp = team ? competitionStore.competitions.find(c => c.id == team.competitionId) : null

const teamEdit = reactive(team ? {
  id: team.id,
  competitionId: team.competitionId,
  teamName: team.teamName,
  leaderId: team.leaderId,
  members: team.members ? team.members.map(m => ({ ...m })) : []
} : {})

const maxMembers = computed(() => comp?.maxMembers ?? 5)
const currentSize = computed(() => 1 + (teamEdit.members?.length || 0))
const isFull = computed(() => currentSize.value >= maxMembers.value)
const capacityText = computed(() => `（${currentSize.value}/${maxMembers.value}）`)

function addMember() {
  if (!isFull.value) teamEdit.members.push({ userId: '' })
}
function removeMember(idx) {
  teamEdit.members.splice(idx, 1)
}
function save() {
  teamStore.updateTeam(teamEdit.id, {
    teamName: teamEdit.teamName,
    members: teamEdit.members
  })
  router.back()
}
</script>
