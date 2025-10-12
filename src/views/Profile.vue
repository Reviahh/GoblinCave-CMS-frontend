<template>
  <div class="profile-page">
    <h2>个人中心</h2>

  <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" class="profile-form">
      <!-- 头像 -->
      <el-form-item label="头像">
        <div class="avatar-container">
          <!-- 左边预览 -->
          <div class="avatar-preview">
            <el-avatar :src="form.avatar" size="large" class="preview-avatar" />
          </div>

          <!-- 右边选择 -->
          <div class="preset-avatars">
            <span>选择头像：</span>
            <div class="avatar-nav">
              <!-- 左箭头 -->
              <el-button
                type="text"
                :disabled="groupIndex === 0"
                @click="prevGroup"
              >
                ⬅
              </el-button>

              <!-- 当前组头像 -->
              <div class="preset-list">
                <el-avatar
                  v-for="(url, index) in currentAvatars"
                  :key="index"
                  :src="url"
                  size="large"
                  class="preset-avatar"
                  :class="{ active: form.avatar === url }"
                  @click="form.avatar = url"
                />
              </div>

              <!-- 右箭头 -->
              <el-button
                type="text"
                :disabled="groupIndex === groupCount - 1"
                @click="nextGroup"
              >
                ➡
              </el-button>
            </div>
          </div>
        </div>
      </el-form-item>

      <!-- 账号（唯一标识，只展示不可修改） -->
      <el-form-item label="账号">
        <el-input v-model="form.userAccount" disabled />
      </el-form-item>

      <!-- 昵称（显示名，默认自动生成，可修改） -->
      <el-form-item label="昵称">
        <el-input v-model="form.username" placeholder="请输入昵称（可选）" />
      </el-form-item>

      <!-- 手机号 -->
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option label="男" :value="1" />
          <el-option label="女" :value="0" />
        </el-select>
      </el-form-item>

      <!-- 个人简介 -->
      <el-form-item label="个人简介">
        <el-input v-model="form.profile" type="textarea" :rows="3" placeholder="这一刻的想法…" />
      </el-form-item>

      <!-- 保存/重置 -->
      <el-form-item>
        <el-button type="primary" @click="saveProfile">保存</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 表单数据
const form = ref({
  userAccount: userStore.userAccount || '',
  username: userStore.userName || userStore.username || '',
  phone: userStore.phone || '',
  email: userStore.email || '',
  avatar: userStore.avatar || '',
  profile: userStore.profile || '',
  gender: (userStore.gender ?? '') === '' ? '' : Number(userStore.gender),
})

// 表单校验
const formRef = ref()
const phoneRegex = /^1[3-9]\d{9}$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const validatePhone = (rule, value, callback) => {
  if (!value) return callback() // 允许为空
  if (!phoneRegex.test(String(value).trim())) return callback(new Error('手机号格式不正确'))
  return callback()
}
const validateEmail = (rule, value, callback) => {
  if (!value) return callback() // 允许为空
  if (!emailRegex.test(String(value).trim())) return callback(new Error('邮箱格式不正确'))
  return callback()
}
const rules = {
  phone: [{ validator: validatePhone, trigger: ['blur', 'change'] }],
  email: [{ validator: validateEmail, trigger: ['blur', 'change'] }],
}

// 12 个预设头像
const presetAvatars = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=6',
  'https://i.pravatar.cc/150?img=7',
  'https://i.pravatar.cc/150?img=8',
  'https://i.pravatar.cc/150?img=9',
  'https://i.pravatar.cc/150?img=10',
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=12'
]

const groupCount = Math.ceil(presetAvatars.length / 4)
const groupIndex = ref(0)

// 当前展示的头像（每组 4 个）
const currentAvatars = computed(() => {
  const start = groupIndex.value * 4
  return presetAvatars.slice(start, start + 4)
})

// 切换方法
const prevGroup = () => {
  if (groupIndex.value > 0) groupIndex.value--
}
const nextGroup = () => {
  if (groupIndex.value < groupCount - 1) groupIndex.value++
}

// 保存
const saveProfile = async () => {
  try {
    await formRef.value?.validate()
    if (!form.value.username) return alert('请输入用户名')
    await userStore.updateProfile({
      userAccount: form.value.userAccount,
      username: form.value.username,
      phone: form.value.phone,
      email: form.value.email,
      avatar: form.value.avatar,
      profile: form.value.profile,
      gender: form.value.gender === '' ? undefined : Number(form.value.gender),
    })
    alert('信息已保存！')
  } catch (e) {
    alert(e?.response?.data?.message || e?.message || '保存失败')
  }
}

const resetForm = () => {
  form.value = {
    userAccount: userStore.userAccount,
    username: userStore.userName || userStore.username,
    phone: userStore.phone,
    email: userStore.email,
    avatar: userStore.avatar,
    profile: userStore.profile,
    gender: (userStore.gender ?? '') === '' ? '' : Number(userStore.gender),
  }
}
</script>

<style scoped>
.profile-page {
  max-width: 900px;
  margin: 60px auto;
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.profile-form {
  margin-top: 30px;
}

.avatar-container {
  display: flex;
  align-items: flex-start;
  gap: 40px; /* 左右间距更大 */
}

.avatar-preview {
  flex-shrink: 0;
}

.avatar-nav {
  display: flex;
  align-items: center;
  gap: 20px; /* 箭头和头像组的间距 */
  margin-top: 10px;
}

.preset-list {
  display: flex;
  gap: 25px; /* 头像之间间距更大 */
}

.preset-avatar {
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
  border: 3px solid transparent;
  border-radius: 50%;
}
.preset-avatar:hover {
  transform: scale(1.15);
  border-color: #3fbed1;
}
.preset-avatar.active {
  border-color: #409eff;
}
</style>
