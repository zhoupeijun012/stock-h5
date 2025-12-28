<template>
  <div class="login-page">
    <div class="content">
      <div class="login-form-container">
        <van-form ref="formRef" class="login-form" @submit="onSubmit">
          <div class="title-container">账号注册</div>
          <van-field
            class="login-form-field"
            v-model.trim="form.username"
            autocomplete="off"
            name="username"
            placeholder="账户名允许输入字母/数字，长度3-16位"
            :rules="rules.username"
            :border="false"
            :error="false"
          />
          <van-field
            class="login-form-field"
            v-model.trim="form.password"
            name="password"
            ref="password"
           autocomplete="new-password"
            placeholder="密码为字母、数字、特殊符号，长度8-16位"
            :type="passwordType"
            :rules="rules.password"
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
          <van-field
            class="login-form-field"
            v-model.trim="form.confirmPassword"
            name="confirmPassword"
            type="password"
            autocomplete="new-password"
            placeholder="请再次输入密码"
            :rules="rules.confirmPassword"
            :border="false"
            :error="false"
          />
          <van-button
            :loading="loading"
            :disabled="loading"
            style="margin-top: 10px"
            type="primary"
            block
            round
            native-type="submit"
          >
            注册
          </van-button>
          <div class="form-actions">
            <div class="register" @click="goToLogin">
              <span style="color: #323233; margin-right: 10px">已有账号?</span>
              立即登录
            </div>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
import { userRegister } from "@/api/index";
import { MD5 } from "@/utils/tool";

export default {
  name: "register",
  data() {
    // 正则表达式常量
    const USERNAME_REGEX = /^[a-zA-Z0-9]{3,16}$/;
    const PASSWORD_REGEX =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@#$%^&*!~])[A-Za-z\d_@#$%^&*!~]{8,16}$/;

    return {
      // 表单数据
      form: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      passwordType: "password",
      rules: {
        username: [
          { required: true, message: "请输入账户名", trigger: "blur" },
          {
            validator: (value, rule) => {
              return USERNAME_REGEX.test(value);
            },
            message: "账户名只能包含字母、数字，长度3-16位",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: (value, rule) => {
              return PASSWORD_REGEX.test(value);
            },
            message: "密码为字母、数字、_@#$%^&*!~，长度8-16位",
          },
        ],
        confirmPassword: [
          { required: true, message: "请再次确认密码", trigger: "blur" },
          {
            validator: (value, rule) => {
              return value == this.form.password;
            },
            trigger: "blur",
            message: "两次输入的密码不一致",
          },
        ],
      },
      loading: false,
    };
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

    // 提交表单
    onSubmit(values) {
      this.$refs.formRef.validate().then(() => {
          this.loading = true;
          const params = JSON.parse(JSON.stringify(this.form));
          params["password"] = MD5(params["password"]);

          userRegister(params)
            .then(() => {
              Dialog.alert({
                title: "提示",
                message: "注册成功，请等待管理员审核通过！",
                showCancelButton: false,
              }).then(() => {
                this.$router.replace("/login");
              });
            })
            .catch((error) => {
              Toast.fail({
                message:error.message || "注册失败",
                icon: '123'
              });
            })
            .finally(() => {
              this.loading = false;
            });
      }).catch((error) => {
        console.log(error);
      });
    },

    // 跳转到登录页面
    goToLogin() {
      this.$router.replace("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.login-page {
  padding-top: 1px;
  box-sizing: border-box;
  height: 100%;
  position: relative;
  overflow: hidden;
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
