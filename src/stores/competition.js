// stores/competition.js
import { defineStore } from 'pinia'
import * as api from '@/api/competition'

const DEFAULT_COMPETITIONS = [
    {
        id: 1001,
        name: '数学建模大赛',
        summary: '面向全体本科生的数学建模竞赛，考察建模与编程能力。',
        content: '',
        startTime: '2025-09-01',
        endTime: '2025-10-01',
        creatorId: 'admin',
        maxMembers: 3
    },
    {
        id: 1002,
        name: '程序设计竞赛',
        summary: '算法与数据结构为核心内容的程序设计竞赛。',
        content: '',
        startTime: '2025-09-05',
        endTime: '2025-10-10',
        creatorId: 'admin',
        maxMembers: 1
    },
    {
        id: 1003,
        name: '创新创业大赛',
        summary: '鼓励跨学科创新合作，提交商业计划与原型。',
        content: '',
        startTime: '2025-09-08',
        endTime: '2025-10-20',
        creatorId: 'admin',
        maxMembers: 5
    }
]

// Normalize various backend shapes into the new Competition interface:
// { id, name, summary, content, startTime, endTime, creatorId, maxMembers }
function normalizeCompetition(raw) {
    if (!raw) return null
    return {
        id: raw.id ?? raw.competitionId ?? raw.competition_id ?? null,
        name: raw.name ?? raw.title ?? '',
        summary: raw.summary ?? raw.description ?? raw.desc ?? '',
        content: raw.content ?? raw.contentUrl ?? raw.content_url ?? raw.url ?? '',
        startTime: raw.startTime ?? raw.start_time ?? raw.startAt ?? raw.start ?? '',
        endTime: raw.endTime ?? raw.end_time ?? raw.endAt ?? raw.end ?? '',
        creatorId: raw.creatorId ?? raw.creator ?? raw.userId ?? raw.creator_id ?? '',
        maxMembers: raw.maxMembers ?? raw.max_members ?? raw.capacity ?? 0
    }
}

export const useCompetitionStore = defineStore('competition', {
    state: () => ({
        // 预置一些本地初始数据（无后端时使用）
        competitions: [] // { id, name, summary, content, startTime, endTime, creatorId, maxMembers }
    }),
    actions: {
        async fetchList(params = { pageNum: 1, pageSize: 100 }) {
            try {
                const resp = await api.listCompetitions(params)
                const payload = resp?.data?.data
                let list = []
                if (Array.isArray(payload)) list = payload
                else if (payload?.list && Array.isArray(payload.list)) list = payload.list
                else if (Array.isArray(resp?.data)) list = resp.data

                // normalize each item to the new Competition interface
                const normalized = list.map(item => normalizeCompetition(item)).filter(Boolean)
                if (normalized.length) {
                    this.competitions = normalized
                } else if (!this.competitions || this.competitions.length === 0) {
                    // 如果后端没有数据且当前 store 为空，则回退到本地示例
                    // this.competitions = DEFAULT_COMPETITIONS.slice()
                }
                // debug log（开发阶段可帮助定位后端响应问题）
                console.debug('fetchList resp payload:', payload, 'normalized length:', normalized.length)
                return this.competitions
            } catch (err) {
                // keep local sample data as fallback
                console.error('fetchList error', err)
                return this.competitions
            }
        },
        async fetchCompetition(id) {
            try {
                const resp = await api.getCompetition(id)
                const raw = resp?.data?.data || resp?.data
                const data = normalizeCompetition(raw)
                if (data) {
                    const index = this.competitions.findIndex(c => c.id == data.id)
                    if (index !== -1) this.competitions[index] = data
                    else this.competitions.push(data)
                    return data
                }
                return null
            } catch (err) {
                console.error('fetchCompetition error', err)
                return null
            }
        },
        setCompetitions(data) {
            if (Array.isArray(data)) this.competitions = data.map(normalizeCompetition).filter(Boolean)
            else this.competitions = []
        },
        async addCompetition(competition) {
            try {
                const resp = await api.createCompetition(competition)
                const newId = resp?.data?.data || resp?.data
                // optimistic local update if backend didn't return full object
                if (typeof newId === 'number') {
                    this.competitions.push({ ...competition, id: newId })
                } else if (resp?.data?.data) {
                    this.competitions.push(resp.data.data)
                } else {
                    this.competitions.push(competition)
                }
                return resp
            } catch (err) {
                console.error('addCompetition error', err)
                throw err
            }
        },
        // Add a competition locally (no backend); ensures persistence and normalization
        addLocalCompetition(competition) {
            try {
                const normalized = normalizeCompetition(competition) || {
                    ...competition,
                    id: competition.id ?? Date.now()
                }
                if (!normalized.id) normalized.id = Date.now()
                this.competitions.push(normalized)
                return normalized
            } catch (err) {
                console.error('addLocalCompetition error', err)
                throw err
            }
        },
        async updateCompetition(id, newData) {
            try {
                const payload = { id, ...newData }
                const resp = await api.updateCompetition(payload)
                // apply local patch
                const index = this.competitions.findIndex(c => c.id === id)
                if (index !== -1) this.competitions[index] = { ...this.competitions[index], ...newData }
                return resp
            } catch (err) {
                console.error('updateCompetition error', err)
                throw err
            }
        },
        async deleteCompetition(id) {
            try {
                const resp = await api.deleteCompetition(id)
                this.competitions = this.competitions.filter(c => c.id !== id)
                return resp
            } catch (err) {
                console.error('deleteCompetition error', err)
                throw err
            }
        }
    },
    persist: true
})
