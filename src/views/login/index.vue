<template>
  <div class="login-page">
    <van-sticky>
      <van-nav-bar title="登录" />
    </van-sticky>
    
    <div class="content">
      <!-- 登录/注册切换 -->
      <div class="tab-switch">
        <van-tabs v-model:active="activeTab" animated>
          <van-tab title="登录">
            <van-form @submit="onSubmitLogin">
              <van-field
                v-model="loginForm.username"
                name="username"
                label="手机号"
                placeholder="请输入手机号"
                :rules="[{ required: true, message: '请填写手机号' }]"
                :error-message="false"
                :border="true"
                :class="{ 'field-error': loginForm.username === '' }"
              />
              
              <van-field
                v-model="loginForm.password"
                name="password"
                label="密码"
                type="password"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                :error-message="false"
                :border="true"
                :class="{ 'field-error': loginForm.password === '' }"
              />
              
              <van-button type="primary" block round native-type="submit">
                登录
              </van-button>
            </van-form>
          </van-tab>
          
          <van-tab title="注册">
            <van-form @submit="onSubmitRegister">
              <van-field
                v-model="registerForm.username"
                name="username"
                label="手机号"
                placeholder="请输入手机号"
                :rules="[{ required: true, message: '请填写手机号' }]"
                :error-message="false"
                :border="true"
                :class="{ 'field-error': registerForm.username === '' }"
              />
              
              <van-field
                v-model="registerForm.password"
                name="password"
                label="密码"
                type="password"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                :error-message="false"
                :border="true"
                :class="{ 'field-error': registerForm.password === '' }"
              />
              
              <van-field
                v-model="registerForm.confirmPassword"
                name="confirmPassword"
                label="确认密码"
                type="password"
                placeholder="请再次输入密码"
                :rules="[
                  { required: true, message: '请填写确认密码' },
                  {
                    validator: (value) => {
                      return value === registerForm.password
                    },
                    message: '两次输入的密码不一致'
                  }
                ]"
                :error-message="false"
                :border="true"
                :class="{ 'field-error': registerForm.confirmPassword === '' || registerForm.confirmPassword !== registerForm.password }"
              />
              
              <van-button type="primary" block round native-type="submit">
                注册
              </van-button>
            </van-form>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Toast } from 'vant'

// 当前激活的标签页
const activeTab = ref(0)

// 登录表单数据
const loginForm = ref({
  username: '',
  password: ''
})

// 注册表单数据
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

// 登录提交
const onSubmitLogin = async (values) => {
  try {
    // 模拟API调用
    const response = await fetch('/api/cc/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
    
    if (response.ok) {
      const data = await response.json()
      Toast.success('登录成功')
      // 跳转到首页
      window.location.href = '/'
    } else {
      const errorData = await response.json()
      Toast.fail(errorData.message || '登录失败')
    }
  } catch (error) {
    Toast.fail('网络错误，请检查网络连接')
  }
}

// 注册提交
const onSubmitRegister = async (values) => {
  try {
    // 模拟API调用
    const response = await fetch('/api/cc/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
    
    if (response.ok) {
      const data = await response.json()
      Toast.success('注册成功')
      // 切换到登录标签页
      activeTab.value = 0
      // 清空注册表单
      registerForm.value = {
        username: '',
        password: '',
        confirmPassword: ''
      }
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
.login-page {
  background-color: var(--bg-color);
  min-height: 100%;
}

.content {
  padding: 20px;
  padding-bottom: 60px;
}

.tab-switch {
  margin-top: 40px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.van-tabs {
  background-color: #fff;
}

.van-tab {
  padding: 30px;
}

.van-form {
  margin-top: 20px;
}

.van-field {
  margin-bottom: 15px;
}

.van-button {
  margin-top: 20px;
}

.van-tabs__nav {
  background-color: #f5f5f5;
}

.van-tabs__nav--line {
  height: 40px;
}

.van-tabs__nav .van-tab--active {
  color: #1989fa;
}

.van-tabs__nav .van-tab--inactive {
  color: #999;
}

.field-error {
  border-color: #ff4d4f !important;
}
</style>