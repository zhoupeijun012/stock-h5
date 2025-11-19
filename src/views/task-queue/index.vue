<template>
  <nav-warp title="任务管理">
    <ft-list :requestFunction="$api.getQueueList" ref="ft-list">
      <template v-slot:list="{ list }">
        <div v-for="item in list" :key="item.id" class="ft-card-item" :style="{
          background: item.status === 'failed' ? 'red' : '#fff',
        }">
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
export default {
  name: "t1",
  components: {
    NavWarp,
    FtList,
  },
  data() {
    return {};
  },
  mounted() {
    this.$refs["ft-list"].query({
      order: [{ prop: "taskLevel", order: "ascending" }],
      where: [],
    });
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
