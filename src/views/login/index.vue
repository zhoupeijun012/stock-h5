<template>
  <div class="login-page">
    <div class="content">
      <div class="login-form-container">
        <van-form ref="loginForm" class="login-form" @submit="onSubmitLogin">
          <div class="title-container">系统登录</div>
          <van-field
            ref="username"
            class="login-form-field"
            v-model.trim="loginForm.username"
            name="username"
            placeholder="请输入账户名"
            :rules="loginRules.username"
            :border="false"
            :error="false"
          />

          <van-field
            ref="password"
            class="login-form-field"
            v-model.trim="loginForm.password"
            :type="passwordType"
            name="password"
            placeholder="请输入密码"
            :rules="loginRules.password"
            :border="false"
            :error="false"
          >
            <template #right-icon>
              <van-icon
                :name="passwordType === 'password' ? 'eye-o' : 'closed-eye'"
                @click="showPwd"
              />
            </template>
          </van-field>

          <van-button
            :loading="loading"
            :disabled="loading"
            style="margin-top: 10px"
            type="primary"
            block
            round
            native-type="submit"
          >
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
import * as storeTypes from "@/store/store_types";

export default {
  name: "LoginPage",
  data() {
    return {
      // 登录表单数据
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入账户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
      passwordType: "password",
      loading: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  mounted() {
    const query = this.$route.query;
    if (query) {
      this.redirect = query.redirect;
      this.otherQuery = this.getOtherQuery(query);
    }
  },
  methods: {
    // 显示/隐藏密码
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      // this.$nextTick(() => {
      //   this.$refs.password.focus();
      // });
    },

    // 登录提交
    onSubmitLogin(values) {
      this.$refs.loginForm
        .validate()
        .then((valid) => {
          this.loading = true;
          this.$store
            .dispatch(storeTypes.ACTION_LOGIN, this.loginForm)
            .then(() => {
              Toast.success("登录成功");
              // 跳转到指定页面或首页
              this.$router.replace({
                path: this.redirect || "/home",
                query: this.otherQuery,
              });
            })
            .catch((error) => {
              Toast.fail(error.message || "登录失败");
            })
            .finally(() => {
              this.loading = false;
            });
        })
        .catch((error) => {
          console.log(error);
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

    // 获取其他查询参数
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="less" scoped>
.login-page {
  position: relative;
  padding-top: 1px;
}

.content {
  margin: 17vh auto 0;
  width: calc(100% - 40px);
}

.login-form-container {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px 20px 20px;
  .title-container {
    font-size: 24px;
    color: #333;
    margin: 0 auto 32px auto;
    text-align: center;
    font-weight: bold;
  }
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
