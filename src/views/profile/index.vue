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
            <div class="user-name">Hi,小灰灰</div>
            <div class="user-phone">123****8911</div>
          </div>
        </div>
      </div>

      <!-- 功能列表 -->
      <van-cell-group class="function-list">
        <van-cell is-link title="个人信息" value="修改资料" clickable>
          <template #right-icon>
            <van-icon name="arrow" color="#969799" size="16" />
          </template>
        </van-cell>

        <van-cell is-link title="修改密码" clickable>
          <template #right-icon>
            <van-icon name="arrow" color="#969799" size="16" />
          </template>
        </van-cell>

        <van-cell is-link title="意见反馈" clickable>
          <template #right-icon>
            <van-icon name="arrow" color="#969799" size="16" />
          </template>
        </van-cell>
      </van-cell-group>

      <!-- 退出登录 -->
      <div class="function-list">
        <van-button class="logout-btn" block>退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  name: 'Profile',
};
</script>

<style lang="less" scoped>
.profile {
  background-color: var(--bg-color);
  min-height: 100%;
}
.header-warp {
  height: 200px;
  position: relative;
  .header-bg { 
    height: calc(100% - 10px);
    background: linear-gradient(135deg, #001f3f, #0088a9, #00c9a7, #92d5c6, #92d5c6);

  }
  .user-info-wrap {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    background: #fff;
    padding: 15px;
    display: flex;
    align-items: center;
    position: absolute;
    left: 10px;
    bottom: 0;
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
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.logout-btn {
  border-radius: 12px;
  color: var(--text-color);
  border: none;
  font-size: 14px;
  box-sizing: border-box;
}
</style>
