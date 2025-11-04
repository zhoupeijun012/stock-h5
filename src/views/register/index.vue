<template>
  <div class="register-page">
    <van-sticky>
      <van-nav-bar title="注册" />
    </van-sticky>
    
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          v-model="form.username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        
        <van-field
          v-model="form.password"
          name="password"
          label="密码"
          type="password"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        
        <van-field
          v-model="form.confirmPassword"
          name="confirmPassword"
          label="确认密码"
          type="password"
          placeholder="请再次输入密码"
          :rules="[
            { required: true, message: '请填写确认密码' },
            {
              validator: (value) => {
                return value === form.password
              },
              message: '两次输入的密码不一致'
            }
          ]"
        />
        
        <van-button type="primary" block round native-type="submit">
          注册
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

// 表单数据
const form = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

// 提交表单
const onSubmit = async (values) => {
  try {
    // 模拟API调用
    const response = await fetch('/api/cc/login/components/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
    
    if (response.ok) {
      const data = await response.json()
      Toast.success('注册成功')
      // 跳转到登录页面
      window.location.href = '/login'
    } else {
      const errorData = await response.json()
      Toast.fail(errorData.message || '注册失败')
    }
  } catch (error) {
    Toast.fail('网络错误，请检查网络连接')
  }
}
</script>

<style lang="less" scoped>
.register-page {
  background-color: var(--bg-color);
  min-height: 100%;
}

.content {
  padding: 20px;
  padding-bottom: 60px;
}

.van-form {
  margin-top: 40px;
}

.van-field {
  margin-bottom: 15px;
}

.van-button {
  margin-top: 20px;
}
</style>