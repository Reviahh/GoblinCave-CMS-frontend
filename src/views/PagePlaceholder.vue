<script setup>
defineProps({ title: String })
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <p>这里是 {{ title }} 的占位页面。</p>
  </div>
</template>
