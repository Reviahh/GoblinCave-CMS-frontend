import { defineStore } from 'pinia'
import { apiLogin, apiRegister, apiLogout, apiGetCurrentUser } from '@/api/user'

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        id: null,
        username: '',
        role: '',
        phone: '',
        email: '',
        avatar: '',
        token: ''
    }),
    actions: {
        async backendLogin({ username, password, userRole }) {
            // 调用后端登录，后端返回 BaseResponse<User>
            const base = await apiLogin({ username, password, userRole })
            if (!base || typeof base.code === 'undefined') {
                throw new Error('登录失败：无效响应')
            }
            if (base.code !== 0) {
                const msg = base.message || '用户名或密码错误'
                const err = new Error(msg)
                err.response = { data: { message: msg } }
                throw err
            }
            const user = base.data
            if (!user) {
                const msg = '登录失败：返回空用户'
                const err = new Error(msg)
                err.response = { data: { message: msg } }
                throw err
            }

            // 后端字段调整：userRole（0 学生 / 1 管理员）
            const roleNum = user.userRole
            const roleMap = { 1: 'admin', 0: 'student' }
            const roleStr = roleMap[roleNum] ?? 'student'

            this.isLoggedIn = true
            this.id = user.id
            this.username = user.userAccount || user.userName || username
            this.role = roleStr
            this.phone = user.phone || ''
            this.email = user.email || ''
            this.avatar = user.userUrl || ''
            // 如果你后端把 token 放在 cookie，这里可能没有 token
            // 如果后端以后返回 token，这里接一下
            this.token = user.token || ''
        },
        async backendRegister({ username, password, confirmPassword, userRole }) {
            const base = await apiRegister({ username, password, confirmPassword, userRole })
            if (!base || typeof base.code === 'undefined') {
                throw new Error('注册失败：无效响应')
            }
            if (base.code !== 0) {
                const msg = base.message || '注册失败'
                const err = new Error(msg)
                err.response = { data: { message: msg } }
                throw err
            }
        },
        // 兼容原本的本地登录（可逐步移除）
        login(username, role) {
            this.isLoggedIn = true
            this.username = username
            this.role = role
        },
        async logout() {
            // 通知后端注销会话（忽略错误，确保本地状态清理）
            try { await apiLogout() } catch { }
            this.isLoggedIn = false
            this.id = null
            this.username = ''
            this.role = ''
            this.phone = ''
            this.email = ''
            this.avatar = ''
            this.token = ''
        },
        async fetchCurrentUser() {
            const base = await apiGetCurrentUser()
            if (base && base.code === 0 && base.data) {
                const user = base.data
                const roleMap = { 1: 'admin', 0: 'student' }
                const roleStr = roleMap[user.userRole] ?? 'student'
                this.isLoggedIn = true
                this.id = user.id
                this.username = user.userAccount || user.userName || ''
                this.role = roleStr
                this.phone = user.phone || ''
                this.email = user.email || ''
                this.avatar = user.userUrl || ''
            }
        },
        updateProfile(profile) {
            if (profile.username !== undefined) this.username = profile.username
            if (profile.phone !== undefined) this.phone = profile.phone
            if (profile.role !== undefined) this.role = profile.role
            if (profile.email !== undefined) this.email = profile.email
            if (profile.avatar !== undefined) this.avatar = profile.avatar
        }
    },
    persist: true // 启用持久化
})
