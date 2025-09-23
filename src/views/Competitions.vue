<template>
  <div class="page">
    <h2>学科竞赛报名</h2>
    <el-form>
      <el-form-item label="队伍名称">
        <el-input v-model="teamName" />
      </el-form-item>
      <el-form-item label="成员">
        <el-input v-model="members" placeholder="多个成员用逗号隔开" />
      </el-form-item>
      <el-form-item>
        <el-button type="success">提交报名</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const teamName = ref('')
const members = ref('')
</script>
