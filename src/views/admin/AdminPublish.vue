<template>
  <div class="publish-page">
    <h2>发布竞赛题目</h2>

    <el-form :model="form" label-width="100px" ref="formRef">
      <el-form-item 
        label="题目标题" 
        prop="title" 
        :rules="[{ required: true, message: '题目标题不能为空', trigger: 'blur' }]">
        <el-input v-model="form.title" placeholder="请输入题目标题"></el-input>
      </el-form-item>

      <el-form-item 
        label="题目内容" 
        prop="content"
        :rules="[{ required: true, message: '题目内容不能为空', trigger: 'blur' }]">
        <quill-editor
          ref="quillEditorRef"
          v-model:content="form.content"
          contentType="html"
          theme="snow"
          :options="editorOptions"
          style="height: 400px;"
        />
      </el-form-item>

      <el-form-item>
        <el-button 
          type="primary" 
          @click="handlePublish" 
          :loading="isSubmitting">
          {{ isSubmitting ? '发布中...' : '立即发布' }}
        </el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

// 引入 Quill Editor，请确保你已安装 vue-quill
// npm install @vueup/vue-quill
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// 表单实例和富文本编辑器实例的引用
const formRef = ref(null);
const quillEditorRef = ref(null);

// 表单数据
const form = ref({
  title: '',
  content: ''
});

// 提交状态
const isSubmitting = ref(false);

// --- 模拟后端 API ---
// 模拟文件上传接口
const mockUploadFileApi = (file) => {
  return new Promise((resolve) => {
    console.log("开始上传文件:", file.name);
    setTimeout(() => {
      // 实际项目中，这里应该是后端返回的真实文件 URL
      const mockUrl = URL.createObjectURL(file); 
      console.log("文件上传成功，URL:", mockUrl);
      resolve({ success: true, url: mockUrl });
    }, 1500); // 模拟 1.5 秒的上传延迟
  });
};

// 模拟发布题目接口
const mockPublishApi = (data) => {
  return new Promise((resolve) => {
    console.log("正在发布题目...", data);
    setTimeout(() => {
      resolve({ success: true, message: '发布成功' });
    }, 1000);
  });
};
// --- 模拟结束 ---


// 自定义图片上传处理逻辑
const imageHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      ElMessage.info('正在上传图片...');
      const res = await mockUploadFileApi(file); // 调用上传接口

      if (res.success && quillEditorRef.value) {
        const quill = quillEditorRef.value.getQuill();
        const range = quill.getSelection(true);
        // 在光标处插入图片
        quill.insertEmbed(range.index, 'image', res.url);
        // 将光标移动到图片后面
        quill.setSelection(range.index + 1);
        ElMessage.success('图片上传成功！');
      } else {
        ElMessage.error('图片上传失败！');
      }
    }
  };
};

// 富文本编辑器配置
const editorOptions = {
  placeholder: '请输入题目内容，支持文字、图片和视频...',
  modules: {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // 切换按钮
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }], // 标题
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }], // 上标/下标
        [{ 'indent': '-1'}, { 'indent': '+1' }], // 缩进
        [{ 'direction': 'rtl' }], // 文字方向
        [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }], // 颜色
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'], // 清除格式
        ['link', 'image', 'video'] // 链接、图片、视频
      ],
      handlers: {
        // 覆盖默认的图片上传行为
        'image': imageHandler 
      }
    }
  }
};


// 发布按钮点击事件
const handlePublish = async () => {
  if (!formRef.value) return;

  // 校验表单
  await formRef.value.validate(async (valid) => {
    if (valid) {
      // 检查内容是否为空（Quill 空内容可能为 '<p><br></p>'）
      if (!form.value.content || form.value.content === '<p><br></p>') {
        ElMessage.warning('题目内容不能为空');
        return;
      }
      
      isSubmitting.value = true;
      try {
        // 调用后端 API
        const res = await mockPublishApi(form.value);
        if (res.success) {
          ElMessage.success('题目发布成功！');
          handleReset(); // 发布成功后重置表单
        } else {
          ElMessage.error(res.message || '发布失败');
        }
      } catch (error) {
        console.error("发布失败:", error);
        ElMessage.error('发布过程中发生错误');
      } finally {
        isSubmitting.value = false;
      }
    } else {
      ElMessage.error('请检查表单，填写完整信息');
      return false;
    }
  });
};

// 重置按钮点击事件
const handleReset = () => {
  if (formRef.value) {
    formRef.value.resetFields(); // 重置表单验证和数据
  }
  // Quill 编辑器需要手动清空
  if (quillEditorRef.value) {
     quillEditorRef.value.setHTML('');
  }
};
</script>

<style scoped>
.publish-page {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

/* 确保编辑器工具栏和内容区域在 Element Form 中正确显示 */
:deep(.el-form-item__content) {
  line-height: normal;
  /* 添加下面这行，让 flex 容器内的元素可以自由伸缩 */
  flex-wrap: wrap; 
}

/* 关键修复代码：
  强制 Quill 编辑器容器宽度为 100%
*/
:deep(.ql-container) {
  width: 100%;
}
</style>