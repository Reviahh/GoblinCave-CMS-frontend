// stores/team.js
import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', {
    state: () => ({
        // 初始队伍样例数据（方便本地开发联调）
        teams: [
            { id: 2001, competitionId: 1001, teamName: '建模先锋队', leaderId: 'alice', members: [{ userId: 'bob' }] },
            { id: 2002, competitionId: 1001, teamName: '数创未来', leaderId: 'charlie', members: [] },
            { id: 2003, competitionId: 1003, teamName: '创客工坊', leaderId: 'david', members: [{ userId: 'eva' }, { userId: 'frank' }] }
        ] // { id, competitionId, teamName, leaderId, members: [{ userId, roleInTeam? }] }
    }),
    actions: {
        setTeams(data) {
            this.teams = data
        },
        addTeam(team) {
            this.teams.push(team)
        },
        updateTeam(id, newData) {
            const index = this.teams.findIndex(t => t.id === id)
            if (index !== -1) {
                this.teams[index] = { ...this.teams[index], ...newData }
            }
        },
        deleteTeam(id) {
            this.teams = this.teams.filter(t => t.id !== id)
        },
        addMember(teamId, member) {
            const team = this.teams.find(t => t.id === teamId)
            if (team) {
                team.members.push(member)
            }
        },
        removeMember(teamId, userId) {
            const team = this.teams.find(t => t.id === teamId)
            if (team) {
                team.members = team.members.filter(m => m.userId !== userId)
            }
        }
    },
    persist: true
})
