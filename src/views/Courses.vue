<template>
  <div class="page">
    <h2>临时会话</h2>
    <el-card style="max-width:600px">
      <div v-for="(msg, index) in messages" :key="index" class="msg">
        <strong>{{ msg.user }}:</strong> {{ msg.text }}
      </div>
      <el-input v-model="input" placeholder="输入消息" @keyup.enter="sendMsg" />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const input = ref('')
const messages = ref([
  { user: '学生A', text: '有人要组队吗？' },
  { user: '学生B', text: '我有兴趣！' }
])

function sendMsg() {
  if (input.value) {
    messages.value.push({ user: userStore.username, text: input.value })
    input.value = ''
  }
}
</script>

<style scoped>
.msg { margin: 5px 0; }
</style>
