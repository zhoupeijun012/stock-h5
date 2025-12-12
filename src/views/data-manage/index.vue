<template>
  <nav-warp title="数据管理">
    <div class="data-wrap">
      <van-button class="logout-btn" type="primary" block @click="initPage"
        >初始化列表</van-button
      >
      <van-button
        class="logout-btn"
        style="margin-top: 20px"
        type="primary"
        block
        @click="updatePage"
        >更新列表</van-button
      >
      <van-button
        class="logout-btn"
        style="margin-top: 20px"
        type="primary"
        block
        @click="initK"
        >更新K线</van-button
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
    initPage() {
      Dialog.confirm({
        title: "提示",
        message: "确定初始化系统吗？",
        showCancelButton: true,
      })
        .then(() => {
          this.$api
            .taskInitPage()
            .then(() => {
              Toast.success("提交任务成功");
            })
            .catch(() => {
              Toast.fail("提交任务失败");
            });
        })
        .catch(() => {});
    },
    updatePage() {
      Dialog.confirm({
        title: "提示",
        message: "确定更新列表吗？",
        showCancelButton: true,
      })
        .then(() => {
          this.$api
            .taskUpdatePage()
            .then(() => {
              Toast.success("提交任务成功");
            })
            .catch(() => {
              Toast.fail("提交任务失败");
            });
        })
        .catch(() => {});
    },
    initK() {
      Dialog.confirm({
        title: "提示",
        message: "确定更新K线吗？",
        showCancelButton: true,
      })
        .then(() => {
          this.$api
            .taskInitK()
            .then(() => {
              Toast.success("提交任务成功");
            })
            .catch(() => {
              Toast.fail("提交任务失败");
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
