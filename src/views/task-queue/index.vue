<template>
  <nav-warp title="任务管理">
    <list-grid :colNum="3" :labelWidth="10" :list="pageInfo"></list-grid>
    <ft-list style="flex: 1" :requestFunction="$api.getQueueList" ref="ft-list">
      <template v-slot:list="{ list }">
        <div
          v-for="item in list"
          :key="item.id"
          class="ft-card-item"
          :style="{
            background: item.status === 'failed' ? 'red' : '#fff',
          }"
        >
          <div class="card-info">
            <div>任务名称：{{ item.handlerName }}</div>
            <van-row>
              <van-col span="6">重试次数：</van-col>
              <van-col span="6">
                {{ item.retries }}
              </van-col>
              <van-col span="6">状态：</van-col>
              <van-col span="6">
                {{ item.status }}
              </van-col>
            </van-row>
            <div>错误原因：{{ item.error }}</div>
            <div>
              执行时间：{{ item.duration ? item.duration + "ms" : "--" }}
            </div>
          </div>
        </div>
      </template>
    </ft-list>
  </nav-warp>
</template>

<script>
import NavWarp from "@/components/nav-warp";
import FtList from "@/components/ft-list";
import ListGrid from "@/components/list-grid";
export default {
  name: "task-queue",
  components: {
    NavWarp,
    FtList,
    ListGrid,
  },
  data() {
    return {
      dataInfo: {},
    };
  },
  computed: {
    pageInfo() {
      return [
        {
          title: "总计",
          value: this.dataInfo.total || 0,
        },
        {
          title: "成功",
          value: this.dataInfo.success || 0,
        },
        {
          title: "失败",
          value: this.dataInfo.failed || 0,
        },
        {
          title: "进行中",
          value: this.dataInfo.running || 0,
        },
        {
          title: "等待中",
          value: this.dataInfo.pending || 0,
        },
        {
          title: "重试中",
          value: this.dataInfo.retriable || 0,
        },
      ];
    },
  },
  mounted() {
    this.$refs["ft-list"].query(
      {
        order: [{ prop: "taskLevel", order: "ascending" }],
        where: [],
      },
      (res) => {
        this.dataInfo = res.summary || {};
      }
    );
  },
};
</script>

<style lang="less" scoped>
.ft-card-item {
  border-radius: 8px;
  background: #fff;
  margin-bottom: 8px;
  position: relative;
  padding: 6px 8px;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  margin: 10px;
  &.gold {
    background: rgba(255, 215, 0, 0.08);
  }
  &.silver {
    background: rgba(218, 112, 214, 0.08);
  }
  &:active {
    background: #f3f4f5;
  }
}
.card-name {
  color: red;
  font-size: 16px;
}
</style>
