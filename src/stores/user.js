import { defineStore } from 'pinia'
import { apiLogin, apiRegister, apiLogout, apiGetCurrentUser, apiUpdateUser } from '@/api/user'

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        id: null,
        userAccount: '',
        userName: '',
        username: '',
        role: '', // 'student' | 'admin'
        userRoleNum: null, // 0 学生，1 管理员
        gender: '',
        phone: '',
        email: '',
        avatar: '',
        tags: '',
        token: ''
    }),
    actions: {
        async backendLogin(payload) {
            const { account, username, password, userRole } = payload || {}
            // 调用后端登录，后端返回 BaseResponse<User>
            const base = await apiLogin({ account: account ?? username, password, userRole })
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

            // 后端字段：userRole（0 学生 / 1 管理员）
            const roleNum = user.userRole
            const roleMap = { 1: 'admin', 0: 'student' }
            const roleStr = roleMap[roleNum] ?? 'student'

            this.isLoggedIn = true
            this.id = user.id
            this.userAccount = user.userAccount || ''
            this.userName = user.userName || ''
            this.username = this.userName || this.userAccount || ''
            this.role = roleStr
            this.userRoleNum = roleNum
            this.phone = user.phone || ''
            this.email = user.email || ''
            this.avatar = user.userUrl || ''
            this.tags = user.tags || ''
            this.gender = (user.gender ?? this.gender)
            // 如果你后端把 token 放在 cookie，这里可能没有 token
            // 如果后端以后返回 token，这里接一下
            this.token = user.token || ''

            // 如果没有昵称（userName），自动生成一个，然后保存到后端
            if (!this.userName) {
                const defaultNick = `用户${String(this.userAccount || this.id || '').slice(-4) || Math.floor(1000 + Math.random() * 9000)}`
                try {
                    const resp = await apiUpdateUser({ id: this.id, userName: defaultNick })
                    if (resp?.code === 0) {
                        this.userName = defaultNick
                        this.username = this.userName
                    }
                } catch { }
            }
        },
        async backendRegister(payload) {
            // 允许传入 account(手机号) 或 username，apiRegister 内部会做优先级映射
            const base = await apiRegister(payload)
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
            this.userAccount = ''
            this.userName = ''
            this.username = ''
            this.role = ''
            this.gender = ''
            this.phone = ''
            this.email = ''
            this.avatar = ''
            this.tags = ''
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
                this.userAccount = user.userAccount || ''
                this.userName = user.userName || ''
                this.username = this.userName || this.userAccount || ''
                this.role = roleStr
                this.userRoleNum = user.userRole
                this.phone = user.phone || ''
                this.email = user.email || ''
                this.avatar = user.userUrl || ''
                this.tags = user.tags || ''
                this.gender = (user.gender ?? this.gender)
            }
        },
        async updateProfile(profile) {
            // 仅更新允许的字段，密码更新后端未提供专用接口，这里不提交密码
            const payload = {
                id: this.id,
                userAccount: profile.userAccount ?? this.userAccount,
                userName: profile.username ?? this.username,
                phone: profile.phone ?? this.phone,
                email: profile.email ?? this.email,
                userUrl: profile.avatar ?? this.avatar,
                tags: profile.tags, // 可选
                gender: profile.gender, // 可选
                // 如需修改角色，仅管理员应能在后台改
                ...(typeof profile.userRole !== 'undefined' && this.role === 'admin' ? { userRole: profile.userRole } : {})
            }
            const base = await apiUpdateUser(payload)
            if (!base || base.code !== 0) {
                const msg = base?.message || '更新失败'
                const err = new Error(msg)
                err.response = { data: { message: msg } }
                throw err
            }
            // 成功后同步本地
            if (payload.userAccount !== undefined) this.userAccount = payload.userAccount
            if (payload.userName !== undefined) this.userName = payload.userName
            // 展示名优先 userName
            this.username = this.userName || this.userAccount || this.username
            if (payload.phone !== undefined) this.phone = payload.phone
            if (payload.email !== undefined) this.email = payload.email
            if (payload.userUrl !== undefined) this.avatar = payload.userUrl
            if (payload.tags !== undefined) this.tags = payload.tags
            if (payload.gender !== undefined) this.gender = payload.gender
            if (payload.userRole !== undefined) {
                this.userRoleNum = payload.userRole
                const roleMap = { 1: 'admin', 0: 'student' }
                this.role = roleMap[payload.userRole] ?? this.role
            }
        }
    },
    persist: true // 启用持久化
})
