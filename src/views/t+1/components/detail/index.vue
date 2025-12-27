<template>
  <van-popup
    v-model="visible"
    position="bottom"
    :closeable="false"
    round
    :style="{ width: '100%', height: '90%' }"
  >
    <div class="t1-detail">
      <div class="sticky-header">
        <div class="sticky-left" @click="visible = false">
          <van-icon name="cross" />
        </div>
        <div class="sticky-title">{{ title }}</div>
        <div class="sticky-right">
          <focus-icon :info="info" cardType="ETF"></focus-icon>
        </div>
      </div>
      <div class="t1-content">
        <list-grid
          :colNum="3"
          :labelWidth="8"
          v-if="infoOptions.length > 0"
          :list="infoOptions"
        />
        <k-line-chart ref="k-line-chart" />
        <div class="holding-wrap" v-if="f1888List.length > 0">
          <div class="holding-title">持仓明细</div>
          <stock-card
            v-for="item in f1888List"
            :key="item.id"
            :info="item"
            cardType="STOCK"
            @click.native="toDetail(item)"
          ></stock-card>
        </div>
      </div>
    </div>
  </van-popup>
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
      return `${this.routerInfo.f14} (${this.routerInfo.f12})`;
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
    f1888List() {
      if (!this.info || !this.info.f1888) {
        return [];
      }
      return this.info.f1888.sort((cur, next) => next.ccRate - cur.ccRate);
    },
  },
  data() {
    return {
      info: null,
      visible: false,
      routerInfo: {},
    };
  },
  methods: {
    getInfo() {
      const t1DetailParams = {
        where: [
          {
            field: "f12",
            operator: "eq",
            value: this.routerInfo.f12,
          },
          {
            field: "f14",
            operator: "eq",
            value: this.routerInfo.f14,
          },
        ],
      };
      return getEftOne(t1DetailParams).then((res) => {
        this.info = res || null;
      });
    },
    getKline() {
      const t1KlineParams = {
        where: [
          {
            field: "f12",
            operator: "eq",
            value: this.routerInfo.f12,
          },
        ],
      };
      return getKLineOne(t1KlineParams).then((res) => {
        let { f40001, f40002 = "[]" } = res || {};
        let chartData = JSON.parse(f40002);
        //  时间/开/收/最高/最低/成交量/成交额/震幅/涨跌幅/涨跌额/换手率/流通股本
        chartData = stockKMap(chartData);
        this.$refs["k-line-chart"].refresh(chartData);
      });
    },
    show(info) {
      this.visible = true;
      this.routerInfo = info;
      this.$nextTick(() => {
        Toast.loading({
          forbidClick: true, // 是否禁止背景点击
          loadingType: "spinner", // 加载图标类型，可选 spinner/circular
          duration: 0, // 持续时间，0 表示不会自动关闭
        });
        Promise.all([this.getInfo(), this.getKline()]).finally(() => {
          Toast.clear();
        });
      });
    },
    toDetail(item) {
      // 这里可以调用stock-detail组件的show方法来显示详情
      // 如果需要跳转到其他页面，保持原来的逻辑
      this.$stockDetail({
        f12: item.f12,
        f14: item.f14,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.t1-detail {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.sticky-header {
  height: 48px;
  display: flex;
  box-shadow: rgba(100, 101, 102, 0.12) 0px 2px 4px 0px;
  border-bottom: 1px solid #ebedf0;
  z-index: 100;
  .sticky-left,
  .sticky-right {
    width: 48px;
    height: 48px;
    font-size: 24px;
    text-align: center;
    line-height: 48px;
  }
  .sticky-title {
    flex: 1;
    line-height: 48px;
    text-align: center;
    font-size: 16px;
  }
}
.t1-content {
  height: calc(100% - 48px);
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
