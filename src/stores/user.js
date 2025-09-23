// src/stores/user.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const username = ref('')
    const role = ref('') // admin 或 student
    const isLoggedIn = ref(false)

    const login = (name, userRole) => {
        username.value = name
        role.value = userRole
        isLoggedIn.value = true
    }

    const logout = () => {
        username.value = ''
        role.value = ''
        isLoggedIn.value = false
    }

    return { username, role, isLoggedIn, login, logout }
})
