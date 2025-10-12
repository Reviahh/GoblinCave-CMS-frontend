import http from './http'

// 后端统一返回 BaseResponse<T> 结构：{ code, data, message }

export function apiRegister(payload) {
    // 映射前端字段到后端：userAccount / userPassword / checkPassword
    const body = {
        userAccount: payload.account ?? payload.username,
        userPassword: payload.password,
        checkPassword: payload.confirmPassword,
        // 后端接受 Integer userRole，可选
        userRole: payload.userRole,
    }
    // 返回整个 BaseResponse，交由上层判断 code
    return http.post('/user/register', body).then((res) => res?.data)
}

export function apiLogin(payload) {
    const body = {
        userAccount: payload.account ?? payload.username,
        userPassword: payload.password,
        // 后端接受 Integer userRole，可选
        userRole: payload.userRole,
    }
    // 返回整个 BaseResponse，交由上层判断 code
    return http.post('/user/login', body).then((res) => res?.data)
}

// 退出登录（会清理后端 Session）
export function apiLogout() {
    return http.post('/user/logout').then((res) => res?.data)
}

// 获取当前登录用户（基于后端 Session）
export function apiGetCurrentUser() {
    return http.get('/user/current').then((res) => res?.data)
}

// 管理端查询用户列表（需要管理员权限）
export function apiSearchUsers(params) {
    // 后端签名：GET /user/search?userName=xxx
    const query = { userName: params?.userName ?? '' }
    return http.get('/user/search', { params: query }).then((res) => res?.data)
}

// 更新用户信息（需要登录用户，后端在服务层校验权限）
export function apiUpdateUser(user) {
    return http.post('/user/update', user).then((res) => res?.data)
}

// 删除用户（需要管理员权限），后端要求请求体是一个 long 数字
export function apiDeleteUser(id) {
    // 直接发送 JSON number：axios 会以 application/json 发送 123
    return http.post('/user/delete', id).then((res) => res?.data)
}
