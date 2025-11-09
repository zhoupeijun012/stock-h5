<template>
  <div class="login-page">
    <div class="content">
      <div class="login-form-container">
        <van-form class="login-form" @submit="onSubmitLogin">
          <van-field
            class="login-form-field"
            v-model.trim="loginForm.username"
            name="username"
            placeholder="请输入账户名"
            :rules="[{ required: true, message: '请填写账户名' }]"
            :error-message="false"
            :border="false"
            :error="false"
          />

          <van-field
            class="login-form-field"
            v-model.trim="loginForm.password"
            name="password"
            type="password"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            :error-message="false"
            :border="false"
            :error="false"
          />

          <van-button style="margin-top:10px" type="primary" block round native-type="submit">
            登录
          </van-button>

          <div class="form-actions" style="margin-top: 20px">
            <div class="forgot-password" @click="goToForgotPassword">
              忘记密码?
            </div>
            <div
              class="register"
              style="margin-top: 20px"
              @click="goToRegister"
            >
              立即注册
            </div>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";

export default {
  name: "LoginPage",
  data() {
    return {
      // 登录表单数据
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    // 登录提交
    onSubmitLogin(values) {
      return fetch("/api/cc/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            return response.json().then((data) => {
              Toast.success("登录成功");
              // 跳转到首页
              this.$router.push("/home");
            });
          } else {
            return response.json().then((errorData) => {
              Toast.fail(errorData.message || "登录失败");
            });
          }
        })
        .catch((error) => {
          Toast.fail("网络错误，请检查网络连接");
        });
    },

    // 跳转到注册页面
    goToRegister() {
      this.$router.replace("/register");
    },

    // 跳转到忘记密码页面
    goToForgotPassword() {
      Dialog.confirm({
        title: "提示",
        message: "忘记密码请联系管理员",
        showCancelButton: false,
      })
        .then(() => {})
        .catch(() => {});
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
  padding: 50px 20px 20px;
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
