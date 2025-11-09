<template>
  <div class="register-page">
    <div class="content">
      <div class="login-form-container">
        <van-form class="login-form" @submit="onSubmit">
          <van-field
            class="login-form-field"
            v-model="form.username"
            name="username"
            placeholder="请输入账户名"
            :rules="[{ required: true, message: '请填写账户名' }]"
            :error-message="false"
            :border="false"
            :error="false"
          />
          <van-field
            class="login-form-field"
            v-model="form.password"
            name="password"
            type="password"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            :error-message="false"
            :border="false"
            :error="false"
          />
          <van-field
            class="login-form-field"
            v-model="form.confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            :rules="[
              { required: true, message: '请填写确认密码' },
              {
                validator: (value) => {
                  return value === form.password;
                },
                message: '两次输入的密码不一致',
              },
            ]"
            :error-message="false"
            :border="false"
            :error="false"
          />
          <van-button type="primary" block round native-type="submit">
            注册
          </van-button>
          <div class="form-actions">
            <div class="register" @click="goToLogin">
              <span style="color: #323233; margin-right: 10px">已有账号?</span
              >立即登录
            </div>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "RegisterPage",
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    // 提交表单
    onSubmit(values) {
      return fetch("/api/cc/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            return response.json().then((data) => {
              Toast.success("注册成功");
              // 跳转到登录页面
              this.$router.push("/login");
            });
          } else {
            return response.json().then((errorData) => {
              Toast.fail(errorData.message || "注册失败");
            });
          }
        })
        .catch((error) => {
          Toast.fail("网络错误，请检查网络连接");
        });
    },

    // 跳转到登录页面
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.login-page {
  position: relative;
  height: 100%;
  left: 0;
  top: 0;
}

.content {
  position: absolute;
  top: 20%;
  left: 20px;
  right: 20px;
}

.login-form-container {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 50px 30px 20px;
  .form-actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .register {
      margin-top: 20px;
      color: #07c160;
    }
  }
}
.login-form-field {
  position: relative;
  padding: 0;
  /deep/.van-field__body {
    border: 1px solid #dcdfe6;
    border-radius: 28px;
    padding: 10px 20px;
  }
  /deep/.van-field__error-message {
    position: absolute;
    bottom: 0;
    left: 20px;
  }

  /deep/.van-cell__value {
    padding-bottom: 22px;
  }
}
</style>
