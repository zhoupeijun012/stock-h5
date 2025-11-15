<template>
  <div>
    <k-line-chart ref="k-line-chart" /> 
  </div>
</template>
<script>
import KLineChart from "@/components/k-line-chart";
import { getKLineOne } from "@/api/index";
import { formatMoney, valueStyle, formatPrec, stockKMap } from "@/utils/tool";
export default {
  name: "stock-detail",
  components: {
    KLineChart,
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
            f12: this.$route.query.f12,
            f40001: "day",
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
