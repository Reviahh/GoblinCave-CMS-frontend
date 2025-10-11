import http from './http'

// 后端统一返回 BaseResponse<T> 结构：{ code, data, message }

export function apiRegister(payload) {
    // 映射前端字段到后端：userAccount / userPassword / checkPassword
    const body = {
        userAccount: payload.username,
        userPassword: payload.password,
        checkPassword: payload.confirmPassword,
    }
    // 返回整个 BaseResponse，交由上层判断 code
    return http.post('/user/register', body).then((res) => res?.data)
}

export function apiLogin(payload) {
    const body = {
        userAccount: payload.username,
        userPassword: payload.password,
    }
    // 返回整个 BaseResponse，交由上层判断 code
    return http.post('/user/login', body).then((res) => res?.data)
}
