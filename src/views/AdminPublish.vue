<template>
  <div class="page">
    <h2>题目发布</h2>
    <el-form>
      <el-form-item label="标题">
        <el-input v-model="title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" rows="10" v-model="content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const title = ref('')
const content = ref('')
</script>
