<template>
  <van-pull-refresh
    style="min-height: 100%"
    v-model="refreshing"
    @refresh="onRefresh"
  >
    <div class="home">
      <div class="content">
        <van-grid :gutter="0" square v-if="Array.isArray(homeInfo.np)">
          <van-grid-item
            v-for="(item, index) in homeInfo.np"
            :key="'list-item-' + index"
          >
            <div class="index-warp ins">
              <div class="index-num" :style="valueStyle(item.f3)">
                {{ item.f2 }}
              </div>
              <div class="index-info" :style="valueStyle(item.f3)">
                {{ item.f3 }}%
              </div>
              <div class="index-title">{{ item.f14 }}</div>
            </div>
          </van-grid-item>
        </van-grid>
        <van-grid :gutter="0" square style="margin-top: 10px">
          <van-grid-item>
            <div class="index-warp ins">
              <div class="index-info">{{ homeInfo.goldenCrossCount }}</div>
              <div class="index-title">金叉数</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="index-warp des">
              <div class="index-info">{{ homeInfo.deathCrossCount }}</div>
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
            @click="handleClick(item)"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import { getHomeInfo } from "@/api";
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
export default {
  name: "home",
  data() {
    return {
      refreshing: false,
      list: [
        { title: "股票", icon: "cash-back-record-o", name: "stock" },
        { title: "T+0", icon: "goods-collect-o", name: "t0" },
        { title: "T+1", icon: "discount-o", name: "t1" },
        { title: "LOF", icon: "shopping-cart-o", name: "lof" },
        { title: "板块", icon: "award-o", name: "industry" },
        { title: "概念", icon: "shop-collect-o", name: "concept" },
        { title: "地区", icon: "hot-o", name: "region" },
      ],
      valueStyle,
      formatPrec,
      homeInfo: {},
    };
  },
  mounted() {
    this.onRefresh();
  },
  methods: {
    onRefresh() {
      this.getHomeInfo();
    },
    handleClick(item) {
      this.$router.push({ name: item.name });
    },
    getHomeInfo() {
      getHomeInfo()
        .then((res) => {
          this.homeInfo = res || {};
        })
        .finally(() => {
          this.refreshing = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
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
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.list-grid {
  /deep/.van-grid-item__text {
    font-size: 14px;
  }
}
</style>
