// stores/chat.js
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
    state: () => ({
        // 招募帖
        posts: [
            {
                id: 3001,
                title: '数学建模找队友（擅长Python）',
                content: '希望寻找有数据清洗与写作同学，周末可集中讨论。',
                author: 'alice',
                competitionId: 1001,
                createdAt: new Date().toISOString(),
                tags: ['编程']
            }
        ],
        // 按招募帖存消息
        messagesByPost: {
            // 3001: [{ id, sender, text, timestamp }]
            3001: [
                { id: 1, sender: 'bob', text: '我擅长Matlab，可以吗？', timestamp: new Date().toISOString() },
                { id: 2, sender: 'alice', text: '可以，我们晚上8点语音？', timestamp: new Date().toISOString() }
            ]
        }
    }),
    actions: {
        addPost(post) {
            this.posts.unshift({ ...post, id: post.id ?? Date.now(), createdAt: new Date().toISOString() })
        },
        deletePost(id) {
            this.posts = this.posts.filter(p => p.id !== id)
            delete this.messagesByPost[id]
        },
        addMessage(postId, msg) {
            if (!this.messagesByPost[postId]) this.messagesByPost[postId] = []
            this.messagesByPost[postId].push({ id: Date.now(), timestamp: new Date().toISOString(), ...msg })
        }
    },
    persist: true
})
