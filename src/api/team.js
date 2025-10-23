import http from './http'

export function listTeams(params) {
    return http.get('/team/list', { params })
}

export function createTeam(data) {
    return http.post('/team/create', data)
}

export function updateTeam(data) {
    return http.post('/team/update', data)
}

export function joinTeam(data) {
    return http.post('/team/join', data)
}

export function leaveTeam(data) {
    return http.post('/team/leave', data)
}
