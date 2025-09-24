import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        username: '',
        role: '',
        phone: '',
        password: '',
        avatar: ''
    }),
    actions: {
        login(username, role) {
            this.isLoggedIn = true
            this.username = username
            this.role = role
        },
        logout() {
            this.isLoggedIn = false
            this.username = ''
            this.role = ''
        },
        updateProfile(profile) {
            this.username = profile.username
            this.phone = profile.phone
            this.role = profile.role
            this.password = profile.password
            this.avatar = profile.avatar
        }
    },
    persist: true // 启用持久化
})
