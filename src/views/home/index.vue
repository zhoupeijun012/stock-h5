<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
  <div class="home">
    <div class="content">
      <van-grid :gutter="0" square>
        <van-grid-item
          v-for="(item, index) in indexList"
          :key="'list-item-' + index"
        >
          <div class="index-warp ins">
            <div class="index-num">20000</div>
            <div class="index-info">-0.20%</div>
            <div class="index-title">{{ item.title }}</div>
          </div>
        </van-grid-item>
      </van-grid>
      <van-grid :gutter="0" square style="margin-top: 10px">
        <van-grid-item>
          <div class="index-warp ins">
            <div class="index-info">208</div>
            <div class="index-title">金叉数</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="index-warp des">
            <div class="index-info">2000</div>
            <div class="index-title">死叉数</div>
          </div>
        </van-grid-item>
      </van-grid>

      <van-grid :gutter="0" square style="margin-top: 10px" class="list-grid">
        <van-grid-item
          v-for="(item, index) in list"
          :key="'list-item-' + index"
          :icon="item.icon"
          :text="item.title"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
  </van-pull-refresh>
</template>

<script>
export default {
  data() {
    return {
      refreshing: false,
      indexList: [
        { title: "沪指" },
        { title: "创业板" },
        { title: "创业50" },
        { title: "科创" },
        { title: "科创50" },
        { title: "中证2000" },
        { title: "中证500" },
        { title: "恒科" },
        { title: "证券" },
        { title: "香港证券" },
        { title: "美元指数" },
        { title: "北证50" },
      ],
      list: [
        { title: "股票", icon: "cash-back-record-o" },
        { title: "ETF(T+0)", icon: "goods-collect-o" },
        { title: "ETF(T+1)", icon: "discount-o" },
        { title: "LOF", icon: "shopping-cart-o" },
        { title: "板块", icon: "award-o" },
        { title: "概念", icon: "shop-collect-o" },
        { title: "地区", icon: "hot-o" },
      ],
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.refreshing = false;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  min-height: calc(100vh - 50px);
}
.content {
  padding: 10px;
}

.index-warp {
  &.ins {
    color: red;
  }
  &.des {
    color: green;
  }
  .index-num {
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
  }
  .index-info {
    text-align: center;
    font-size: 14px;
    line-height: 1.5;
  }

  .index-title {
    text-align: center;
    color: #646566;
    font-size: 14px;
    line-height: 1.5;
  }
}
.list-grid {
  /deep/.van-grid-item__text {
    font-size: 14px;
  }
}
</style>
