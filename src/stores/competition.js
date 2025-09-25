// stores/competition.js
import { defineStore } from 'pinia'

export const useCompetitionStore = defineStore('competition', {
    state: () => ({
        // 预置一些本地初始数据（无后端时使用）
        competitions: [
            {
                id: 1001,
                title: '数学建模大赛',
                description: '面向全体本科生的数学建模竞赛，考察建模与编程能力。',
                publishTime: '2025-09-01',
                deadline: '2025-10-01',
                createdBy: 'admin',
                maxMembers: 3
            },
            {
                id: 1002,
                title: '程序设计竞赛',
                description: '算法与数据结构为核心内容的程序设计竞赛。',
                publishTime: '2025-09-05',
                deadline: '2025-10-10',
                createdBy: 'admin',
                maxMembers: 1
            },
            {
                id: 1003,
                title: '创新创业大赛',
                description: '鼓励跨学科创新合作，提交商业计划与原型。',
                publishTime: '2025-09-08',
                deadline: '2025-10-20',
                createdBy: 'admin',
                maxMembers: 5
            }
        ] // { id, title, description, publishTime, deadline, createdBy, maxMembers }
    }),
    actions: {
        setCompetitions(data) {
            this.competitions = data
        },
        addCompetition(competition) {
            this.competitions.push(competition)
        },
        updateCompetition(id, newData) {
            const index = this.competitions.findIndex(c => c.id === id)
            if (index !== -1) {
                this.competitions[index] = { ...this.competitions[index], ...newData }
            }
        },
        deleteCompetition(id) {
            this.competitions = this.competitions.filter(c => c.id !== id)
        }
    },
    persist: true
})
