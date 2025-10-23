// stores/team.js
import { defineStore } from 'pinia'
import * as api from '@/api/team'

export const useTeamStore = defineStore('team', {
    state: () => ({
        // 初始队伍样例数据（方便本地开发联调）
        teams: [
            { id: 2001, compId: 1001, name: '建模先锋队', leaderId: 'alice', members: [{ userId: 'bob' }] },
            { id: 2002, compId: 1001, name: '数创未来', leaderId: 'charlie', members: [] },
            { id: 2003, compId: 1003, name: '创客工坊', leaderId: 'david', members: [{ userId: 'eva' }, { userId: 'frank' }] }
        ] // { id, compId, name, leaderId, members: [{ userId, roleInTeam? }] }
    }),
    actions: {
        async fetchList(params = { compId: undefined, pageNum: 1, pageSize: 100 }) {
            try {
                const resp = await api.listTeams(params)
                const data = resp?.data?.data?.list || resp?.data?.data || []
                if (Array.isArray(data)) this.teams = data
                else if (resp?.data?.data?.list) this.teams = resp.data.data.list
                return this.teams
            } catch (err) {
                console.error('fetchList error', err)
                return this.teams
            }
        },
        setTeams(data) {
            this.teams = data
        },
        async addTeam(team) {
            try {
                const resp = await api.createTeam(team)
                const newId = resp?.data?.data || resp?.data
                if (typeof newId === 'number') this.teams.push({ ...team, id: newId })
                else if (resp?.data?.data) this.teams.push(resp.data.data)
                else this.teams.push(team)
                return resp
            } catch (err) {
                console.error('addTeam error', err)
                throw err
            }
        },
        async updateTeam(id, newData) {
            try {
                const payload = { id, ...newData }
                const resp = await api.updateTeam(payload)
                const index = this.teams.findIndex(t => t.id === id)
                if (index !== -1) this.teams[index] = { ...this.teams[index], ...newData }
                return resp
            } catch (err) {
                console.error('updateTeam error', err)
                throw err
            }
        },
        async deleteTeam(id) {
            try {
                const resp = await api.updateTeam(id) // backend may have delete endpoint, adapt if available
                this.teams = this.teams.filter(t => t.id !== id)
                return resp
            } catch (err) {
                console.error('deleteTeam error', err)
                throw err
            }
        },
        async addMember(teamId, member) {
            // local update; consider calling API if backend has endpoint
            const team = this.teams.find(t => t.id === teamId)
            if (team) {
                team.members = team.members || []
                team.members.push(member)
            }
        },
        async removeMember(teamId, userId) {
            const team = this.teams.find(t => t.id === teamId)
            if (team) team.members = team.members.filter(m => m.userId !== userId)
        }
    },
    persist: true
})
