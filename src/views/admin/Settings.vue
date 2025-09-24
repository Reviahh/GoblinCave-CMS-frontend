<template>
  <div class="settings-page">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理后台</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本设置" name="basic">
          <el-form :model="settingsForm" label-width="120px" style="max-width: 600px">
            <el-form-item label="网站名称">
              <el-input v-model="settingsForm.siteName"></el-input>
            </el-form-item>
            <el-form-item label="网站URL">
              <el-input v-model="settingsForm.siteUrl"></el-input>
            </el-form-item>
            <el-form-item label="网站Logo">
              <el-upload
                action="#"
                :show-file-list="false"
                :auto-upload="false"
              >
                <el-button type="primary">点击上传</el-button>
                <template #tip>
                  <div class="el-upload__tip">
                    建议尺寸 120x120px, JPG, PNG 格式, 小于 2MB
                  </div>
                </template>
              </el-upload>
            </el-form-item>
             <el-form-item label="网站备案号">
              <el-input v-model="settingsForm.icp"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="安全设置" name="security">
           <el-form label-width="150px" style="max-width: 600px">
            <el-form-item label="启用登录验证码">
              <el-switch v-model="securityForm.enableCaptcha" disabled></el-switch>
            </el-form-item>
             <el-form-item label="启用双因素认证">
              <el-switch v-model="securityForm.enable2FA" disabled></el-switch>
            </el-form-item>
             <el-form-item label="后台登录IP白名单">
              <el-input 
                type="textarea"
                :rows="3"
                placeholder="多个IP请用英文逗号隔开"
                v-model="securityForm.ipWhitelist"
                disabled
              ></el-input>
            </el-form-item>
             <el-form-item>
              <el-button type="primary" @click="handleSave">保存设置</el-button>
            </el-form-item>
           </el-form>
        </el-tab-pane>

        <el-tab-pane label="邮件设置" name="email">
          <el-alert title="邮件服务用于发送注册验证、密码找回等通知邮件。" type="info" show-icon :closable="false" style="margin-bottom: 20px;" />
          <el-form :model="emailForm" label-width="120px" style="max-width: 600px">
            <el-form-item label="SMTP服务器">
              <el-input v-model="emailForm.smtpServer" placeholder="例如: smtp.example.com"></el-input>
            </el-form-item>
             <el-form-item label="SMTP端口">
              <el-input v-model="emailForm.smtpPort" placeholder="例如: 465"></el-input>
            </el-form-item>
             <el-form-item label="发件人邮箱">
              <el-input v-model="emailForm.fromEmail" placeholder="例如: no-reply@example.com"></el-input>
            </el-form-item>
             <el-form-item label="邮箱密码/授权码">
              <el-input v-model="emailForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存设置</el-button>
              <el-button @click="handleSave">发送测试邮件</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';

const activeTab = ref('basic');

// 基本设置表单
const settingsForm = reactive({
  siteName: '我的竞赛平台',
  siteUrl: 'http://localhost:8080',
  logo: '',
  icp: '京ICP备20250924号'
});

// 安全设置表单
const securityForm = reactive({
  enableCaptcha: true,
  enable2FA: false,
  ipWhitelist: '127.0.0.1'
});

// 邮件设置表单
const emailForm = reactive({
  smtpServer: '',
  smtpPort: '',
  fromEmail: '',
  password: ''
});

// 统一的保存/提示方法
const handleSave = () => {
  ElMessage.info('此功能正在快马加鞭开发中... 敬请期待！');
};
</script>

<style scoped>
.settings-page {
  padding: 20px;
}
.box-card {
  margin-top: 20px;
}
.el-tab-pane {
    padding: 20px;
}
</style>
