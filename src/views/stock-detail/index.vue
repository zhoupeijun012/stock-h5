<template>
  <nav-warp :title="title">
    <k-line-chart ref="k-line-chart" /> 
  </nav-warp>
</template>
<script>
import NavWarp from "@/components/nav-warp";
import KLineChart from "@/components/k-line-chart";
import { getKLineOne } from "@/api/index";
import { stockKMap } from "@/utils/tool";
export default {
  name: "stock-detail",
  components: {
    NavWarp,
    KLineChart,
  },
  computed: {
    title() {
      return `${this.$route.query.f14} (${this.$route.query.f12})`;
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      const stockKlineParams = {
        where: [
          {
            field: "f12",
            operator: "eq",
            value: this.$route.query.f12
          },
        ],
      };
      this.loading = true;
      getKLineOne(stockKlineParams)
        .then((res) => {
          let { f40001, f40002 = "[]" } = res || {};
          let chartData = JSON.parse(f40002);
          //  时间/开/收/最高/最低/成交量/成交额/震幅/涨跌幅/涨跌额/换手率/流通股本
          chartData = stockKMap(chartData);
          this.$refs["k-line-chart"].refresh(chartData);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
