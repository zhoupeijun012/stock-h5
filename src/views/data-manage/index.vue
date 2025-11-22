<template>
  <nav-warp title="数据管理">
    <div class="data-wrap">
      <van-button class="logout-btn" type="primary" block @click="initSystem"
        >初始化系统</van-button
      >
      <van-button
        class="logout-btn"
        style="margin-top: 20px"
        type="primary"
        block
        @click="updateData"
        >更新数据</van-button
      >
    </div>
  </nav-warp>
</template>

<script>
import NavWarp from "@/components/nav-warp";
import { Dialog, Toast } from "vant";
export default {
  name: "data-manage",
  components: {
    NavWarp,
  },
  data() {
    return {};
  },
  methods: {
    initSystem() {
      Dialog.confirm({
        title: "提示",
        message: "确定初始化系统吗？",
        showCancelButton: true,
      })
        .then(() => {
          this.$api
            .taskInit()
            .then(() => {
              Toast.success("初始化系统成功");
            })
            .catch(() => {
              Toast.fail("更新数据失败");
            });
        })
        .catch(() => {});
    },
    updateData() {
      Dialog.confirm({
        title: "提示",
        message: "确定更新数据吗？",
        showCancelButton: true,
      })
        .then(() => {
          this.$api
            .taskUpdate()
            .then(() => {
              Toast.success("更新数据成功");
            })
            .catch(() => {
              Toast.fail("更新数据失败");
            });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.data-wrap {
  margin: 0 10px;
  padding: 20px 0;
}
</style>
