import axios from 'axios'
// 允许跨域携带 Cookie
axios.defaults.withCredentials = true;

const http = axios.create({
    // 使用相对路径，开发环境走 Vite 代理（见 vite.config.js -> server.proxy），避免跨站 Cookie 丢失
    baseURL: import.meta.env.VITE_API_BASE || '/',
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
            // 跳转登录，避免停留在需要权限的页面
            if (typeof window !== 'undefined') {
                window.location.href = '/login'
            }
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
