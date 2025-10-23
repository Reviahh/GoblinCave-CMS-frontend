import http from './http'

export function listCompetitions(params) {
    return http.get('/competition/list', { params })
}

export function getCompetition(id) {
    return http.get(`/competition/${id}`)
}

export function createCompetition(data) {
    return http.post('/competition/create', data)
}

export function updateCompetition(data) {
    return http.post('/competition/update', data)
}

export function deleteCompetition(id) {
    // backend expects JSON number in body
    return http.post('/competition/delete', JSON.stringify(id), {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    })
}
