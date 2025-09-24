import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'



const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('quill-editor', QuillEditor)
app.mount('#app')
