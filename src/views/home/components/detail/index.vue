<template>
  <van-popup
    :value="visible"
    position="bottom"
    :closeable="false"
    :close-on-click-overlay="false"
    round
    :style="{ width: '100%', height: '90%' }"
    @click-overlay="onHandClose"
  >
    <div class="index-detail">
      <div class="sticky-header">
        <div class="sticky-left" @click="onHandClose">
          <van-icon name="cross" />
        </div>
        <div class="sticky-title">{{ title }}</div>
        <div class="sticky-right">
          <van-icon name="chat-o" class="chat-icon" @click="openAiDetail" />
        </div>
      </div>
      <div class="index-content">
        <list-grid
          :colNum="3"
          :labelWidth="8"
          v-if="infoOptions.length > 0"
          :list="infoOptions"
        />
        <van-tabs :active="currentIndicators" @change="typeChange" sticky>
          <van-tab
            v-for="item in showIndicators"
            :key="item.value"
            :title="item.label"
            :name="item.value"
          />
        </van-tabs>
        <k-line-chart ref="k-line-chart" />
      </div>
    </div>
  </van-popup>
</template>
<script>
import NavWarp from "@/components/nav-warp";
import KLineChart from "@/components/k-line-chart";
import { getKLineOne } from "@/api/index";
import { stockKMap } from "@/utils/tool";
import ListGrid from "@/components/list-grid";
import { Toast } from "vant";
import { formatMoney, valueStyle, formatPrec } from "@/utils/tool";
export default {
  name: "index-detail",
  components: {
    NavWarp,
    KLineChart,
    ListGrid,
  },
  computed: {
    title() {
      return `${this.routerInfo.f14}`;
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
          title: "主力",
          value: formatMoney(this.info?.f62) || "-",
          style: {
            color: this.info?.f62 > 0 ? "red" : "blue",
          },
        },
      ];
    },
  },
  data() {
    return {
      info: null,
      visible: false,
      routerInfo: {},
      showIndicators: [
        {
          label: "日线",
          value: 101,
        },
        {
          label: "周线",
          value: 102,
        },
        {
          label: "月线",
          value: 103,
        },
      ],
      currentIndicators: 101,
    };
  },
  methods: {
    getInfo() {
      this.info = this.routerInfo;
      return Promise.resolve();
    },
    getKline() {
      const indexKlineParams = {
        where: [
          {
            field: "f12",
            operator: "eq",
            value: this.routerInfo.f12,
          },
          {
            field: "f40001",
            operator: "eq",
            value: this.currentIndicators,
          },
        ],
      };
      return getKLineOne(indexKlineParams).then((res) => {
        let { f40001, f40002 = "[]" } = res || {};
        let chartData = JSON.parse(f40002);
        chartData = stockKMap(chartData);
        this.$refs["k-line-chart"].refresh(chartData);
      });
    },
    typeChange(name) {
      this.currentIndicators = name;
      Toast.loading({
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      this.getKline().finally(() => {
        Toast.clear();
      });
    },
    show(info) {
      this.visible = true;
      this.routerInfo = info;
      this.$nextTick(() => {
        Toast.loading({
          forbidClick: true,
          loadingType: "spinner",
          duration: 0,
        });
        Promise.all([this.getInfo(), this.getKline()]).finally(() => {
          Toast.clear();
        });
      });
    },
    openAiDetail() {
      const { f14 } = this.routerInfo;
      this.$aiDetail({
        key: f14,
        type: "STOCK",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.index-detail {
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
  .chat-icon {
    margin-right: 8px;
    font-size: 24px;
  }
}
.index-content {
  height: calc(100% - 48px);
  overflow: hidden;
  overflow-y: scroll;
}
</style>