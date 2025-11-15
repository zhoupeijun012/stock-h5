<template>
  <div class="k-line-chart-warp" style="height: 420px">
    <div ref="chart" style="height: 100%; width: calc(100% + 52px)" />
  </div>
</template>
<script>
import { init, dispose, registerLocale, registerIndicator } from "klinecharts";

import trendLine from "./plugins/trend-line.js";
registerIndicator(trendLine);

import moveAverage from "./plugins/move-average.js";
registerIndicator(moveAverage);

import distanceIndicator from "./plugins/distance.js";
registerIndicator(distanceIndicator);

import controlDegree from "./plugins/control-degree.js";
registerIndicator(controlDegree);

// import fundFlow from "./plugins/fund-flow.js";
// registerIndicator(fundFlow);

// 主力趋势
import majorTrend from "./plugins/major-trend.js";
registerIndicator(majorTrend);

import { formatMoney } from "@/utils/tool";
export default {
  data() {
    this.chart = null;
    return {
      indicatorOptions: [
        {
          label: "均线",
          name: "move-average",
          order: 1,
          id: "candle_pane",
        },
        {
          label: "距今涨幅",
          name: "distance",
          id: "candle_pane",
          order: 2,
        },
        {
          label: "成交量",
          name: "VOL",
          order: 3,
          id: "VOL",
        },
        {
          label: "主力趋势",
          name: "major-trend",
          order: 4,
          id: "major-trend",
        },
        {
          label: "主力控盘",
          name: "control-degree",
          order: 5,
          id: "control-degree",
        },
        // {
        //   label: "资金流向",
        //   name: "fund-flow",
        //   order: 6,
        //   id: "fund-flow",
        // },
      ],
    };
  },
  computed: {
    chartConfig() {
      return {
        locale: "zh-CN",
        zoom: {
          // 初始缩放比例设置为 0.8
          defaultScale: 1,
          step: 0.1, // 每次缩放的步长，可根据需要调整
          enabled: false, // 是否启用缩放功能
          minScale: 0.2, // 最小缩放比例
          maxScale: 2.0, // 最大缩放比例
        },
        layout: [],
        customApi: {
          formatDate(timestamp, _, type) {
            return timestamp;
          },
          formatBigNumber: formatMoney,
        },
        styles: {
          grid: {
            show: false,
            horizontal: {
              show: false,
            },
            vertical: {
              show: false,
            },
          },
          candle: {
            bar: {
              compareRule: "current_open",
              upColor: "#F92855",
              downColor: "#2DC08E",
              noChangeColor: "#888888",
              upBorderColor: "#F92855",
              downBorderColor: "#2DC08E",
              noChangeBorderColor: "#888888",
              upWickColor: "#F92855",
              downWickColor: "#2DC08E",
              noChangeWickColor: "#888888",
            },
            tooltip: {
              // 将showRule设置为'none'以完全禁用弹窗展示
              showRule: "none", // 'always' | 'follow_cross' | 'none'
              // rect是指顶部文案垂直排列
              showType: "standard", // 'standard' | 'rect'
              values: null,
              defaultValue: "-",
              custom: [
                { title: "time", value: "{time}" },
                { title: "open", value: "{open}" },
                { title: "high", value: "{high}" },
                { title: "low", value: "{low}" },
                { title: "close", value: "{close}" },
                { title: "turnover", value: "{turnover}" },
                { title: "change", value: "{change}" },
              ],
              text: {
                size: 14,
                marginLeft: 8,
                marginTop: 4,
                marginRight: 8,
                marginBottom: 4,
              },
            },
            priceMark: {
              high: {
                show: false,
                color: "#f00",
                textMargin: 5,
                textSize: 14,
              },
              low: {
                show: false,
                color: "#2DC08E",
                textMargin: 5,
                textSize: 14,
              },
              last: {
                show: false,
                upColor: "#f00",
                downColor: "#2DC08E",
                noChangeColor: "#888888",
                textMargin: 5,
                size: 14,
              },
            },

          },
          yAxis: {
            // 隐藏右侧Y轴
            show: false,
            position: 'right',
            tickText: {
              show: false,
              weight: "normal",
              size: 14,
              marginStart: 0,
              marginEnd: 0,
            },
            // 确保轴线和刻度线也隐藏
            axisLine: {
              show: false
            },
            tickLine: {
              show: false
            },
            // 设置最小刻度间距为0
            minTickGap: 0
          },
          xAxis: {
            tickText: {
              show: false,
              weight: "normal",
              size: 14,
              marginStart: 4,
              marginEnd: 4,
            },
            axisLine: {
              show: false,
            },
          },
          indicator: {
            tooltip: {
              defaultValue: "-",
              showRule: "always",
              // rect是指顶部文案垂直排列
              showType: "standard", // 'standard' | 'rect'
              text: {
                size: 14,
              },
            },
            // 隐藏指标的Y轴
            yAxis: {
              show: false,
              position: 'right',
              tickText: {
                show: false,
                marginStart: 0,
                marginEnd: 0
              },
              axisLine: {
                show: false
              },
              tickLine: {
                show: false
              },
              // 设置最小刻度间距为0
              minTickGap: 0
            },
            bars: [
              {
                style: "fill",
                // 'solid' | 'dashed'
                borderStyle: "solid",
                borderSize: 1,
                borderDashedValue: [2, 2],
                upColor: "#F92855",
                downColor: "#2DC08E",
                noChangeColor: "#888888",
              },
            ],
          },
        },
      };
    },
  },
  mounted() {
      const chart = init(this.$refs.chart, this.chartConfig);
      // 调整右侧偏移距离为0，消除空白
      chart.setOffsetRightDistance(10);
      this.chart = chart;
      this.initIndicator();
    },
  methods: {
    refresh(data) {
      this.chart.applyNewData(data);
    },
    initIndicator() {
      // 按照order属性对指标进行排序，确保显示顺序正确
      const sortedIndicators = [...this.indicatorOptions].sort((a, b) => a.order - b.order);
      
      sortedIndicators.forEach((item) => {
        this.chart.createIndicator(item.name, true, {
          id: item.id,
          order: item.order,
          // 设置指标高度，可在indicatorOptions中通过height属性自定义
          height: 70, // 为成交量设置较小高度，其他指标默认高度
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.k-line-chart-warp {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  .line-chart-warp-top {
    padding: 8px;
    box-sizing: border-box;
  }
  .line-chart-warp-right {
    height: calc(100% - 40px);
    padding: 12px;
    box-sizing: border-box;
  }
}
</style>
