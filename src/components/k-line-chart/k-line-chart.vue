<template>
  <div class="k-line-chart-warp">
    <div class="line-chart-warp-top">
      <el-checkbox-group v-model="showIndicators" size="small" @change="indicatorChange">
        <el-checkbox-button
          v-for="indicator in indicatorOptions"
          :label="indicator.name"
          :key="indicator.name"
          :disabled="indicator.disabled ? true : false"
          >{{ indicator.label }}</el-checkbox-button
        >
      </el-checkbox-group>
    </div>
    <div class="line-chart-warp-right">
      <div ref="chart" style="height: 100%; width: 100%" />
    </div>
  </div>
</template>
<script>
import { init, dispose, registerLocale, registerIndicator } from 'klinecharts';

import trendLine from './plugins/trend-line.js';
registerIndicator(trendLine);

import moveAverage from './plugins/move-average.js';
registerIndicator(moveAverage);

import distanceIndicator from './plugins/distance.js';
registerIndicator(distanceIndicator);

import controlDegree from './plugins/control-degree.js';
registerIndicator(controlDegree);

import fundFlow from './plugins/fund-flow.js';
registerIndicator(fundFlow);

// 主力趋势
import majorTrend from './plugins/major-trend.js';
registerIndicator(majorTrend);

import { formatMoney } from '@/utils/tool';
export default {
  data() {
    this.chart = null;
    return {
      indicatorOptions: [
        {
          label: '距今涨幅',
          name: 'distance',
          id: 'candle_pane',
          order: 3,
        },
        {
          label: '股价趋势',
          name: 'trend-line',
          order: 4,
          id: 'candle_pane',
        },
        {
          label: '主力趋势',
          name: 'major-trend',
          order: 5,
          id: 'major-trend',
        },
        {
          label: '主力控盘',
          name: 'control-degree',
          order: 6,
          id: 'control-degree',
        },
        {
          label: '资金流向',
          name: 'fund-flow',
          order: 7,
          id: 'fund-flow',
        },
        {
          label: '均线',
          name: 'move-average',
          order: 8,
          id: 'candle_pane',
        },
        {
          label: '成交量',
          name: 'VOL',
          order: 9,
          id: 'VOL',
        },
        {
          label: 'MACD',
          name: 'MACD',
          order: 10,
          id: 'MACD',
        },
        {
          label: 'KDJ',
          name: 'KDJ',
          order: 11,
          id: 'KDJ',
        },
      ],
      showIndicators: ['distance', 'trend-line', 'major-trend', 'control-degree'],
      preIndicators: [],
    };
  },
  computed: {
    chartConfig() {
      return {
        locale: 'zh-CN',
        zoom: {
          // 初始缩放比例设置为 0.8
          defaultScale: 0.6,
          step: 0.1, // 每次缩放的步长，可根据需要调整
          enabled: false, // 是否启用缩放功能
          minScale: 0.2, // 最小缩放比例
          maxScale: 2.0, // 最大缩放比例
        },
        layout: [{ type: 'xAxis', options: { order: 5 } }],
        customApi: {
          formatDate(timestamp, _, type) {
            return timestamp;
          },
          formatBigNumber: formatMoney,
        },
        styles: {
          grid: {
            show: true,
            horizontal: {
              show: true,
            },
            vertical: {
              show: false,
            },
          },
          candle: {
            bar: {
              compareRule: 'current_open',
              upColor: '#F92855',
              downColor: '#2DC08E',
              noChangeColor: '#888888',
              upBorderColor: '#F92855',
              downBorderColor: '#2DC08E',
              noChangeBorderColor: '#888888',
              upWickColor: '#F92855',
              downWickColor: '#2DC08E',
              noChangeWickColor: '#888888',
            },
            tooltip: {
              // follow_cross是指图表失焦时不展示顶部文案
              showRule: 'always', // 'always' | 'follow_cross' | 'none'
              // rect是指顶部文案垂直排列
              showType: 'rect', // 'standard' | 'rect'
              values: null,
              defaultValue: '-',
              custom: [
                { title: 'time', value: '{time}' },
                { title: 'open', value: '{open}' },
                { title: 'high', value: '{high}' },
                { title: 'low', value: '{low}' },
                { title: 'close', value: '{close}' },
                { title: 'turnover', value: '{turnover}' },
                { title: 'change', value: '{change}' },
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
                show: true,
                color: '#f00',
                textMargin: 5,
                textSize: 14,
              },
              low: {
                show: true,
                color: '#2DC08E',
                textMargin: 5,
                textSize: 14,
              },
              last: {
                show: true,
                upColor: '#f00',
                downColor: '#2DC08E',
                noChangeColor: '#888888',
                textMargin: 5,
                size: 14,
              },
            },
          },
          yAxis: {
            tickText: {
              show: true,
              weight: 'normal',
              size: 14,
              marginStart: 4,
              marginEnd: 4,
            },
          },
          xAxis: {
            tickText: {
              show: true,
              weight: 'normal',
              size: 14,
              marginStart: 4,
              marginEnd: 4,
            },
          },
          indicator: {
            tooltip: {
              defaultValue: '-',
              showRule: 'always',
              // rect是指顶部文案垂直排列
              showType: 'rect', // 'standard' | 'rect'
              text: {
                size: 14,
              },
            },
            bars: [
              {
                style: 'fill',
                // 'solid' | 'dashed'
                borderStyle: 'solid',
                borderSize: 1,
                borderDashedValue: [2, 2],
                upColor: '#F92855',
                downColor: '#2DC08E',
                noChangeColor: '#888888',
              },
            ],
          },
        },
      };
    },
  },
  mounted() {
    const chart = init(this.$refs.chart, this.chartConfig);
    chart.setOffsetRightDistance(28);
    this.chart = chart;
    this.indicatorChange();
  },
  methods: {
    refresh(data) {
      this.chart.applyNewData(data);
    },
    reDraw() {
      setTimeout(() => {
        this.chart && this.chart.resize();
      }, 300);
    },
    indicatorChange() {
      this.initIndicator();
      this.preIndicators = JSON.parse(JSON.stringify(this.showIndicators));
    },
    initIndicator() {
      const addArr = this.showIndicators.filter((item) => !this.preIndicators.includes(item));
      const removeArr = this.preIndicators.filter((item) => !this.showIndicators.includes(item));

      addArr.forEach((indicatorName) => {
        const findItem = this.indicatorOptions.find((item) => item.name == indicatorName);
        this.chart.createIndicator(findItem.name, true, {
          id: findItem.id,
          order: findItem.order,
        });
      });
      removeArr.forEach((indicatorName) => {
        const findItem = this.indicatorOptions.find((item) => item.name == indicatorName);
        this.chart.removeIndicator({
          name: findItem.name,
        });
      });
    },
  },
  beforeDestroy() {
    dispose(this.chart);
  },
  watch: {
    '$store.state.fullScreen': {
      handler(newVal) {
        this.reDraw();
      },
    },
  },
};
</script>
<style lang="less" scoped>
.k-line-chart-warp {
  width: 100%;
  height: 100%;
  position: relative;
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
