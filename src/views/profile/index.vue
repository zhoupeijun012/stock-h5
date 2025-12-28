<template>
  <div class="profile">
    <div class="content">
      <!-- 用户信息卡片 -->
      <div class="header-warp">
        <div class="header-bg"></div>
        <div class="user-info-wrap">
          <van-image
            round
            width="60"
            height="60"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            style="margin-right: 10px"
          />
          <div class="user-info-right">
            <div class="user-name">Hi,{{ userInfo.username }}</div>
            <div class="user-phone">{{ userInfo.userId }}</div>
          </div>
        </div>
      </div>

      <!-- 功能列表 -->
      <van-cell-group class="function-list" style="margin-top: 30px">
        <template v-if="isAdmin">
          <van-cell title="用户管理" is-link @click="toUserManage"/>
          <van-cell title="登录记录" is-link @click="toLoginRecord"/>
          <van-cell title="任务列表" is-link @click="toTaskList"/>
          <van-cell title="数据管理" is-link @click="toDataManage"/>
        </template>
        <template v-if="!isAdmin">
          <van-cell title="个人信息" is-link value="修改资料" />
          <van-cell title="修改密码" is-link />
          <van-cell title="意见反馈" is-link />
        </template>
      </van-cell-group>

      <!-- 退出登录 -->
      <div class="function-list" style="margin-top: 20px">
        <van-button class="logout-btn" type="danger" block @click="logout"
          >退出登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import * as StoreTypes from "@/store/store_types";
export default {
  name: "profile",
  computed: {
    userInfo() {
      return this.$store.state.userInfo || {};
    },
    isAdmin() {
      return this.userInfo.isAdmin;
    },
  },
  methods: {
    toUserManage() {
      this.$router.push({ name: "user" });
    },
    toLoginRecord() {
      this.$router.push({ name: "record" });
    },
    toTaskList() {
      this.$router.push({ name: "task-queue" });
    },
    toDataManage() {
      this.$router.push({ name: "data-manage" });
    },
    logout() {
      Dialog.confirm({
        title: "提示",
        message: "确定退出登录吗？",
        showCancelButton: true,
      })
        .then(() => {
          // 退出登录逻辑
          this.$store.commit(StoreTypes.CLEAR_ALL);

          Toast.success({
            message: "退出登录成功",
            icon: '123'
          });
          setTimeout(() => {
            this.$router.replace("/login");
          }, 2000);
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.profile {
  background-color: var(--bg-color);
  position: relative;
  height: 100%;
}
.header-warp {
  height: 200px;
  position: relative;
  .header-bg {
    height: calc(100% - 10px);
    background: linear-gradient(
      135deg,
      #809fc0,
      #26c5eb,
      #00c9a7,
      #92d5c6,
      #92d5c6
    );
  }
  .user-info-wrap {
    border-radius: 12px;
    overflow: hidden;
    // box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    background: #fff;
    padding: 20px 15px;
    display: flex;
    align-items: center;
    position: absolute;
    left: 10px;
    bottom: -10px;
    right: 10px;
    .user-info-right {
      flex: 1;
    }
  }
}

.user-name {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 4px;
}

.user-phone {
  font-size: 14px;
  color: var(--text-color);
}

.function-list,
.history-list,
.other-function-list {
  margin: 10px;
  border-radius: 12px;
  box-sizing: border-box;
  overflow: hidden;
  // box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  /deep/.van-cell {
    padding: 14px;
  }
}

.logout-btn {
  border-radius: 28px;
  border: none;
  font-size: 14px;
  box-sizing: border-box;
}
</style>
