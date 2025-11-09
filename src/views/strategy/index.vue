<template>
  <div class="strategy">
    <van-sticky>
      <van-nav-bar title="投资策略" />
    </van-sticky>
    <van-list>
      <van-card
        v-for="item in hotStrategies"
        :key="item.id"
        :title="item.title"
        :desc="item.desc"
        :thumb="item.image"
      >
        <template #tags>
          <van-tag plain type="primary">{{ item.tag }}</van-tag>
        </template>
        <template #footer>
          <van-button size="mini">查看详情</van-button>
        </template>
      </van-card>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      hotStrategies: [
        {
          id: 1,
          title: "投资策略A",
          desc: "高收益低风险的投资方案",
          image: "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
          tag: "热门",
        },
        {
          id: 2,
          title: "理财策略B",
          desc: "稳健型长期理财计划",
          image: "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
          tag: "推荐",
        },
      ],
      newStrategies: [
        {
          id: 3,
          title: "新策略C",
          desc: "最新推出的智能投顾方案",
          image: "https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg",
          tag: "新品",
        },
        {
          id: 4,
          title: "策略D",
          desc: "基于AI算法的量化交易策略",
          image: "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
          tag: "2323",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.strategy {
  box-sizing: border-box;
}

.content {
  padding: 10px;
  padding-bottom: 20px;
}

.van-card {
  background: #fff;
  margin: 10px;
  border-radius: 8px;
}
</style>
