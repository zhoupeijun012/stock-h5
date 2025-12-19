<template>
  <nav-warp title="收藏列表" :showBack="false">
    <van-tabs
      type="card"
      class="my-tabs"
      :value="focusType"
      @change="tabChange"
    >
      <van-tab
        v-for="tabItem in options"
        :key="tabItem.name"
        :title="tabItem.title"
        :name="tabItem.name"
        title-class="tab-item"
      ></van-tab>
    </van-tabs>
    <ft-list :requestFunction="$api.getFocusList" ref="ft-list">
      <template v-slot:list="{ list }">
        <stock-card
          v-for="item in list"
          :key="item.id"
          :info="item"
          :cardType="focusType"
          @click.native="toDetail(item)"
        ></stock-card>
      </template>
    </ft-list>
  </nav-warp>
</template>

<script>
import FtList from "@/components/ft-list";
import StockCard from "@/components/stock-card";
import * as StoreTypes from "@/store/store_types";
import NavWarp from "@/components/nav-warp/index.vue";
export default {
  name: "favorite",
  components: {
    FtList,
    StockCard,
    NavWarp,
  },
  data() {
    return {
      focusType: "STOCK",
      options: [
        { title: "股票", name: "STOCK" },
        { title: "ETF", name: "ETF" },
        { title: "LOF", name: "LOF" },
        { title: "板块", name: "INDUSTRY" },
        { title: "概念", name: "CONCEPT" },
        { title: "地区", name: "REGION" },
      ],
    };
  },

  mounted() {
    this.getDetail();
    this.$store.dispatch(StoreTypes.ACTION_GET_FOCUS_LIST);
  },
  methods: {
    tabChange(newVal) {
      this.focusType = newVal;
      this.getDetail();
    },
    getDetail() {
      const params = [
        {
          field: "f1024",
          target: "f1024",
          operator: "eq",
          value: this.focusType,
        },
      ];
      this.$refs["ft-list"].query({
        order: [{ prop: "createdAt", order: "descending" }],
        where: params,
        matchKeys: [
          "f14",
          "f3",
          "f40014",
          "f41006",
          "f40006",
          "f40008",
          "f40009",
          "f40010",
          "f40011",
          "f40012",
          "f40013",
          "f40017",
          "f6",
          "c_f103",
          "f12",
          "f21",
          "f20",
          "f2",
          "f12",
          "f7",
          "f23",
          "c_f100",
          "c_f102",
          "f8",
          "f9",
          "f11",
          "f41003",
          "f41004",
          "f24",
          "f62",
          "f267",
          "f164",
          "f63",
          "f17",
          "f2",
          "f15",
          "f16",
          "f5",
          "f4",
          "f41006",
          "f40016",
        ],
      });
    },
    toDetail(item) {
      const routerNameMap = {
        'STOCK': 'stock-detail',
        'INDUSTRY': 'industry-detail',
        'CONCEPT': 'concept-detail',
        'REGION': 'region-detail',
        'ETF': 't1-detail',
        'LOF': 'lof-detail'
      }
      this.$router.push({
        name: routerNameMap[this.focusType],
        query: {
          f12: item.f12,
          f14: item.f14,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.favorite {
  box-sizing: border-box;
  height: 100%;
  position: relative;
}

.van-card {
  background: #fff;
  margin: 10px;
  border-radius: 8px;
}
.my-tabs {
  border: 1px solid #07c160;
  /deep/.van-tabs__nav {
    margin: 0;
  }
  /deep/.tab-item {
    color: #000;
    border: none;
    border-right: 1px solid #07c160;
    &:last-child {
      border-right: none;
    }
  }
  /deep/.van-tab--active {
    background-color: #07c160;
    color: #fff;
  }
  /deep/.van-tabs__nav--card {
    border: none;
  }
}
</style>
