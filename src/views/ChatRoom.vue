<template>
  <div class="chat">
    <h2>临时会话</h2>
    <el-card class="post-card" v-if="post">
      <template #header>
        <div class="card-header">{{ post.title }}</div>
      </template>
      <div class="post-meta">发布人：{{ post.author }} ｜ 竞赛：{{ competitionTitle }}</div>
      <div class="post-content">{{ post.content }}</div>
    </el-card>

    <div class="chat-box">
      <div class="messages" ref="listRef">
        <div v-for="m in messages" :key="m.id" class="msg" :class="{ me: m.sender === userStore.username }">
          <div class="who">{{ m.sender }}</div>
          <div class="text">
            <template v-if="!m.type || m.type==='text'">{{ m.text }}</template>
            <template v-else-if="m.type==='image'">
              <img :src="m.url" alt="image" style="max-width: 240px; border-radius: 6px;" />
            </template>
            <template v-else-if="m.type==='file'">
              <a :href="m.url" target="_blank">{{ m.name || '文件下载' }}</a>
            </template>
          </div>
          <div class="time">{{ m.timestamp }}</div>
        </div>
      </div>
      <div class="input-bar">
        <el-input v-model="text" placeholder="输入消息..." @keyup.enter.native="send" />
        <el-upload :show-file-list="false" :before-upload="uploadImage" accept="image/*">
          <el-button>图片</el-button>
        </el-upload>
        <el-upload :show-file-list="false" :before-upload="uploadFile">
          <el-button>文件</el-button>
        </el-upload>
        <el-button type="primary" @click="send">发送</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat { max-width: 900px; margin: 24px auto; }
.post-card { margin-bottom: 16px; }
.post-meta { color:#666; font-size: 13px; margin-bottom: 6px; }
.chat-box { background:#fff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); padding: 12px; }
.messages { height: 360px; overflow-y: auto; padding: 8px; background:#fafafa; border-radius: 6px; }
.msg { margin-bottom: 8px; }
.msg.me .text { background: #e6f4ff; }
.who { font-size: 12px; color:#888; }
.text { display:inline-block; background:#fff; padding: 8px 10px; border-radius: 6px; margin: 4px 0; }
.time { font-size: 12px; color:#aaa; }
.input-bar { display:flex; gap: 8px; margin-top: 10px; }
</style>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useCompetitionStore } from '@/stores/competition'
import { useChatStore } from '@/stores/chat'

const route = useRoute()
const userStore = useUserStore()
const competitionStore = useCompetitionStore()
const chatStore = useChatStore()

const postId = Number(route.query.postId)
const post = chatStore.posts.find(p => p.id === postId)
const competitionTitle = computed(() => competitionStore.competitions.find(c => c.id == post?.competitionId)?.name || '未关联')
const messages = computed(() => chatStore.messagesByPost[postId] || [])

const text = ref('')
const listRef = ref(null)

function scrollToBottom() {
  nextTick(() => {
    const el = listRef.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

function send() {
  const content = text.value.trim()
  if (!content) return
  chatStore.addMessage(postId, { sender: userStore.username || 'student', text: content })
  text.value = ''
  scrollToBottom()
}

onMounted(scrollToBottom)

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function uploadImage(file) {
  const url = await fileToDataUrl(file)
  chatStore.addMessage(postId, { sender: userStore.username || 'student', type: 'image', url })
  scrollToBottom()
  return false // 阻止默认上传
}

async function uploadFile(file) {
  const url = await fileToDataUrl(file)
  chatStore.addMessage(postId, { sender: userStore.username || 'student', type: 'file', url, name: file.name })
  scrollToBottom()
  return false
}
</script>
