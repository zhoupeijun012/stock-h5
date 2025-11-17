<template>
  <div class="ft-list" @scroll="handleScroll" ref="list-warp">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        :finished-text="this.list.length > 0 ? '没有更多了' : undefined"
        :error.sync="error"
        :error-text="this.list.length > 0 ? '请求失败，点击重试' : undefined"
        @load="onLoad"
      >
        <slot name="list" :list="list"></slot>
      </van-list>
    </van-pull-refresh>

    <!-- 空状态显示 -->
    <div
      v-if="!loading && !error && list.length === 0 && !refreshing"
      class="empty-state"
      @click="onRefresh"
    >
      <van-empty
        description="暂无数据，请点击重试"
        image="search"
        icon-size="64"
        class="empty-icon"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    requestFunction: {
      type: Function,
    },
  },
  data() {
    return {
      refreshing: false,
      loading: false,
      error: false,
      finished: false,
      list: [],
      pageNum: 0,
      pageSize: 10,
      requestParams: {},
      scrollTop: 0,
    };
  },
  activated() {
    this.$nextTick(() => {
      this.$refs['list-warp'].scrollTop = this.scrollTop;
    });
  },
  methods: {
    handleScroll(e) {
      this.scrollTop = e.target.scrollTop;
    },
    onRefresh() {
      this.loadFunction(false);
    },
    onLoad() {
      if (this.refreshing) {
        return;
      }
      this.loadFunction(true);
    },
    loadFunction(isMore = true) {
      this.finished = false;
      this.refreshing = !isMore;
      this.error = false;
      this.requestFunction({
        pageNum: isMore ? this.pageNum + 1 : 1,
        pageSize: this.pageSize,
        ...this.requestParams,
      })
        .then((res) => {
          if (isMore) {
            this.list = [...this.list, ...res.list];
          } else {
            this.list = res.list || [];
          }
          this.pageNum = res.pageNum;
          this.finished = this.pageNum >= res.pages;
        })
        .catch((err) => {
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
          this.refreshing = false;
        });
    },
    query(params) {
      this.requestParams = params;
      this.onRefresh();
    },
  },
};
</script>
<style lang="less" scoped>
.ft-list {
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  position: relative;
  /deep/.van-pull-refresh {
    min-height: 100%;
  }
}

.empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
