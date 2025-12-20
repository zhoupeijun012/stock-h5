<template>
  <nav-warp title="数据管理">
    <div class="data-wrap">
      <van-button
        class="logout-btn"
        type="primary"
        v-for="item in optionList"
        :key="item.value + 'init'"
        block
        @click="initPage(item.value)"
        >初始化{{ item.label }}</van-button
      >

      <van-button
        class="logout-btn"
        type="info"
        block
        v-for="item in optionList"
        :key="item.value + 'update'"
        @click="updatePage(item.value)"
        >更新{{ item.label }}</van-button
      >

      <van-button
        class="logout-btn"
        type="warning"
        block
        v-for="item in optionList"
        :key="item.value + 'k'"
        @click="initK(item.value)"
        >更新{{ item.label }}K线</van-button
      >

      <van-button class="logout-btn" type="danger" block @click="clearQueue"
        >清空任务</van-button
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
    return {
      optionList: [
        {
          label: "所有",
          value: "ALL",
        },
        {
          label: "股票",
          value: "STOCK",
        },
        {
          label: "行业",
          value: "INDUSTRY",
        },
        {
          label: "概念",
          value: "CONCEPT",
        },
        {
          label: "地区",
          value: "REGION",
        },
        {
          label: "ETF",
          value: "ETF",
        },
        {
          label: "LOF",
          value: "LOF",
        },
        {
          label: "指数",
          value: "INDICATOR",
        },
      ],
    };
  },
  methods: {
    initPage(mode) {
      Dialog.confirm({
        title: "提示",
        message: "确定初始化系统吗？",
        showCancelButton: true,
      })
        .then(() => {
          this.$api
            .taskInitPage({ mode })
            .then(() => {
              Toast.success("提交任务成功");
            })
            .catch(() => {
              Toast.fail("提交任务失败");
            });
        })
        .catch(() => {});
    },
    updatePage(mode) {
      Dialog.confirm({
        title: "提示",
        message: "确定更新列表吗？",
        showCancelButton: true,
      })
        .then(() => {
          this.$api
            .taskUpdatePage({ mode })
            .then(() => {
              Toast.success("提交任务成功");
            })
            .catch(() => {
              Toast.fail("提交任务失败");
            });
        })
        .catch(() => {});
    },
    initK(mode) {
      Dialog.confirm({
        title: "提示",
        message: "确定更新K线吗？",
        showCancelButton: true,
      })
        .then(() => {
          this.$api
            .taskInitK({ mode })
            .then(() => {
              Toast.success("提交任务成功");
            })
            .catch(() => {
              Toast.fail("提交任务失败");
            });
        })
        .catch(() => {});
    },
    clearQueue() {
      Dialog.confirm({
        title: "提示",
        message: "确定清空列表吗？",
        showCancelButton: true,
      })
        .then(() => {
          this.$api
            .taskClear()
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
  padding: 20px 10px;
  overflow: hidden;
  overflow-y: scroll;
}
.logout-btn {
  margin-bottom: 20px;
}
</style>
