<template>
  <nav-warp :title="title">
    <list-grid v-if="infoOptions.length > 0" :options="infoOptions" />
    <k-line-chart ref="k-line-chart" />
  </nav-warp>
</template>
<script>
import NavWarp from "@/components/nav-warp";
import KLineChart from "@/components/k-line-chart";
import { getKLineOne, getStockOne } from "@/api/index";
import { stockKMap } from "@/utils/tool";
import ListGrid from "@/components/list-grid";
import { Toast } from "vant";
export default {
  name: "stock-detail",
  components: {
    NavWarp,
    KLineChart,
    ListGrid,
  },
  computed: {
    title() {
      return `${this.$route.query.f14} (${this.$route.query.f12})`;
    },
    infoOptions() {
      return [
        // {
        //   title: item.title,
        //   value: item.value,
        // }
      ];
    },
  },
  data() {
    return {
      info: null,
    };
  },
  mounted() {
    Toast.loading({
      forbidClick: true, // 是否禁止背景点击
      loadingType: "spinner", // 加载图标类型，可选 spinner/circular
      duration: 0, // 持续时间，0 表示不会自动关闭
    });
    Promise.all([this.getInfo(), this.getKline()]).finally(() => {
      Toast.clear();
    });
  },
  methods: {
    getInfo() {
      const stockDetailParams = {
        where: [
          {
            field: "f12",
            operator: "eq",
            value: this.$route.query.f12,
          },
          {
            field: "f14",
            operator: "eq",
            value: this.$route.query.f14,
          },
        ],
      };
      return getStockOne(stockDetailParams).then((res) => {
        this.info = res || null;
      });
    },
    getKline() {
      const stockKlineParams = {
        where: [
          {
            field: "f12",
            operator: "eq",
            value: this.$route.query.f12,
          },
        ],
      };
      return getKLineOne(stockKlineParams).then((res) => {
        let { f40001, f40002 = "[]" } = res || {};
        let chartData = JSON.parse(f40002);
        //  时间/开/收/最高/最低/成交量/成交额/震幅/涨跌幅/涨跌额/换手率/流通股本
        chartData = stockKMap(chartData);
        this.$refs["k-line-chart"].refresh(chartData);
      });
    },
  },
};
</script>
