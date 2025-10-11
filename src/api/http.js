import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080',
    withCredentials: true,
    timeout: 15000,
})

http.interceptors.request.use((config) => {
    const raw = localStorage.getItem('user')
    if (raw) {
        try {
            const persisted = JSON.parse(raw)
            const token = persisted?.token
            if (token) config.headers.Authorization = `Bearer ${token}`
        } catch { }
    }
    return config
})

http.interceptors.response.use(
    (resp) => resp,
    (err) => {
        const status = err?.response?.status
        if (status === 401) {
            // 未认证，清理并跳转登录
            try {
                localStorage.removeItem('user')
            } catch { }
            // 可在此处做路由跳转
        }
        // 规范化错误信息（兼容 BaseResponse 错误消息）
        const server = err?.response?.data
        if (server && typeof server === 'object') {
            const message = server.message || server.msg
            if (message) {
                err.message = message
            }
        }
        return Promise.reject(err)
    }
)

export default http
