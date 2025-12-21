<template>
  <nav-warp :title="title">
    <template #nav-right>
      <focus-icon :info="info"></focus-icon>
    </template>
    <div class="stock-detail">
      <list-grid
        :colNum="3"
        :labelWidth="8"
        v-if="infoOptions.length > 0"
        :list="infoOptions"
      />
      <k-line-chart ref="k-line-chart" />
      <div class="holding-wrap" v-if="info && Array.isArray(info.f1888) && info.f1888.length > 0">
        <div class="holding-title">持仓明细</div>
        <stock-card
          v-for="item in info.f1888"
          :key="item.id"
          :info="item"
          cardType="STOCK"
          @click.native="toDetail(item)"
        ></stock-card>
      </div>
    </div>
  </nav-warp>
</template>
<script>
import NavWarp from "@/components/nav-warp";
import KLineChart from "@/components/k-line-chart";
import { getKLineOne, getEftOne } from "@/api/index";
import { stockKMap } from "@/utils/tool";
import ListGrid from "@/components/list-grid";
import { Toast } from "vant";
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
import FocusIcon from "@/components/focus-icon";
import StockCard from "@/components/stock-card";
export default {
  name: "t1-detail",
  components: {
    NavWarp,
    KLineChart,
    ListGrid,
    FocusIcon,
    StockCard,
  },
  computed: {
    title() {
      return `${this.$route.query.f14} (${this.$route.query.f12})`;
    },
    infoOptions() {
      if (!this.info) return [];
      return [
        {
          title: "名称",
          value: this.info?.f14 || "-",
        },
        {
          title: "代码",
          value: this.info?.f12 || "-",
          style: {
            color: "red",
          },
        },
        {
          title: "涨跌",
          value: formatPrec(this.info?.f3) + "%" || "-",
          style: valueStyle(this.info?.f3),
        },

        {
          title: "价格",
          value: formatPrec(this.info?.f2) || "-",
          style: {
            color: "red",
          },
        },
        {
          title: "流值",
          value: formatMoney(this.info?.f21) || "-",
          style: {
            color: "red",
          },
        },
        {
          title: "总值",
          value: formatMoney(this.info?.f20) || "-",
        },
        {
          title: "量比",
          value: formatPrec(this.info?.f10) || "-",
          style: {
            color: this.info?.f10 > 100 ? "red" : "blue",
          },
        },
        {
          title: "换手",
          value: parseFloat(this.info?.f8 / 10) + "%" || "-",
        },
        {
          title: "市盈",
          value: formatPrec(this.info?.f9) || "-",
        },
        {
          title: "5分",
          value: formatPrec(this.info?.f11) + "%" || "-",
          style: { color: "red" },
        },
        {
          title: "成交",
          value: formatMoney(this.info?.f6) || "-",
          style: { color: "red" },
        },
        {
          title: "多头",
          value: this.info?.f40008 + "天" || "-",
        },
        {
          title: "流入",
          value: formatMoney(this.info?.f40017) + "天" || "-",
        },
        {
          title: "金叉",
          value: this.info?.f40014 + "天" || "-",
        },
        {
          title: "周叉",
          value: this.info?.f41006 + "天" || "-",
        },
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
      return getEftOne(stockDetailParams).then((res) => {
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
    toDetail(item) {
      this.$router.push({
        name: "stock-detail",
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
.stock-detail {
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.holding-wrap {
  padding-top: 20px;
}
.holding-title {
  padding: 0 10px;
  font-size: 16px;
}
</style>
