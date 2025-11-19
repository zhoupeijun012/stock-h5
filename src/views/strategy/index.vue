<template>
  <div class="strategy">
    <div
      class="ft-card-item"
      style="margin-bottom: 0"
      v-for="item in list"
      :key="item.queryId"
    >
      <div class="card-name">
        {{ item.title }}
      </div>

      <div class="index-text">
        推荐指数：<span style="color: red">{{ item.index }}</span
        >星
      </div>
      <div class="index-text">
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "strategy",
  data() {
    return {
      list: [
        {
          queryId: "1",
          index: 5,
          title: "龙头探底金叉",
          description: "自由流通市值大于500亿，且触底反弹",
        },
        {
          queryId: "2",
          index: 5,
          title: "ETF探底金叉",
          description:  "ETF触底反弹",
        },
      ],
    };
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.strategy {
  box-sizing: border-box;
  height: 100%;
  position: relative;
}
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
  font-size: 18px;
  line-height: 26px;
}
.index-text {
  font-size: 14px;
  line-height: 22px;
  color: #646566;
}
</style>
