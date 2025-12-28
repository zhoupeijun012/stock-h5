<template>
  <nav-warp
    title="任务管理"
    :searchOptions="searchOptions"
    @confirm="onConfirm"
  >
    <list-grid :colNum="3" :labelWidth="10" :list="pageInfo"></list-grid>
    <ft-list style="flex: 1" :requestFunction="$api.getQueueList" ref="ft-list">
      <template v-slot:list="{ list }">
        <van-swipe-cell v-for="item in list" :key="item.id">
          <div
            class="ft-card-item"
            :style="{
              background: item.status === TASK_STATUS.FAIL ? 'red' : '#fff',
            }"
          >
            <div class="card-info">
              <div>任务名称：{{ item.taskName }}</div>
              <van-row>
                <van-col span="6">执行次数：</van-col>
                <van-col span="6">
                  {{ item.retryCount }}
                </van-col>
                <van-col span="6">状态：</van-col>
                <van-col span="6">
                  {{ getStatus(item.status) }}
                </van-col>
              </van-row>
              <div>错误原因：{{ item.message }}</div>
              <div>执行时间：{{ getDuration(item) + "ms" }}</div>
            </div>
          </div>
          <template #right>
            <van-button
              style="height: 100%"
              class="action-btn"
              square
              type="primary"
              v-if="item.status == TASK_STATUS.FAIL"
              text="重试"
              @click="handleRetry(item)"
            />
          </template>
        </van-swipe-cell>
      </template>
    </ft-list>
  </nav-warp>
</template>

<script>
import NavWarp from "@/components/nav-warp";
import FtList from "@/components/ft-list";
import ListGrid from "@/components/list-grid";
import { Dialog, Toast } from "vant";
import {
  getSearchParams,
  getSearchFilters,
} from "@/components/search-panel/index.js";
const TASK_STATUS = {
  WAITING: 1,
  RUNNING: 2,
  SUCCESS: 3,
  FAIL: 4,
};
const taskOptions = [
  {
    label: "等待中",
    value: TASK_STATUS.WAITING,
  },
  {
    label: "执行中",
    value: TASK_STATUS.RUNNING,
  },
  {
    label: "成功",
    value: TASK_STATUS.SUCCESS,
  },
  {
    label: "失败",
    value: TASK_STATUS.FAIL,
  },
];
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
      TASK_STATUS,
      searchOptions: [
        {
          prop: "taskName",
          title: "名称",
          component: "input",
          defaultValue: "",
          value: "",
          operator: "like",
          target: "taskName",
          style: {
            position: "sticky",
            top: "0",
            margin: "0 -10px 0",
            zIndex: "10",
          },
        },
        {
          prop: "status",
          title: "状态",
          component: "radio",
          defaultValue: "",
          value: "",
          operator: "eq",
          options: [
            { label: "等待中", value: "1", realValue: "1" },
            { label: "进行中", value: "2", realValue: "2" },
            { label: "成 功", value: "3", realValue: "3" },
            { label: "失 败", value: "4", realValue: "4" },
          ],
        },
      ],
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
        // {
        //   title: "重试中",
        //   value: this.dataInfo.retriable || 0,
        // },
      ];
    },
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getStatus(val) {
      return taskOptions.find((item) => item.value == val).label;
    },
    getDuration(item) {
      if (!item.startTime || !item.endTime) {
        return "-";
      }
      return item.endTime - item.startTime;
    },

    handleRetry(item) {
      Dialog.confirm({
        title: "提示",
        message: "确定重试吗？",
        showCancelButton: true,
      })
        .then(() => {
          this.$api
            .taskRetry({
              taskId: item.taskId,
            })
            .then(() => {
              item.status = TASK_STATUS.WAITING;

              Toast.success({
                message: "提交任务成功",
                icon: '123'
              });
            })
            .catch(() => {
              Toast.fail({
                message:"提交任务失败",
                icon: '123'
              });
            });
        })
        .catch(() => {});
    },
    onConfirm() {
      this.getDetail();
    },
    getDetail() {
      const params = getSearchParams(this.searchOptions);
      this.$refs["ft-list"].query(
        {
          order: [{ prop: "taskLevel", order: "ascending" }],
          where: [...params],
        },
        (res) => {
          this.dataInfo = res.summary || {};
        }
      );
    },
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
  margin-bottom: 0;
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
.action-btn {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
</style>
