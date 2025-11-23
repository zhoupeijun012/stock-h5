<template>
  <div class="ft-card-item" >
    <div class="card-name" style="font-size: 18px; line-height: 24px">
      {{ info.f14 }}
      <span :style="valueStyle(info.f3)" style="font-size: 18px; line-height: 24px" class="card-prec">{{ formatPrec(info.f3, '%') }}</span>
    </div>
    <div class=""></div>
    <div class="card-col">
      <div class="card-title">成交额：</div>
      <div class="card-text" style="color: red">
        {{ formatMoney(info.f6) }}
      </div>
    </div>
    <div class="card-col">
      <div class="card-title">流通市值：</div>
      <div class="card-text" style="color: red">
        {{ formatMoney(info.f21) }}
      </div>
    </div>
    <div class="card-col">
      <div class="card-title">924涨幅：</div>
      <div class="card-text" :style="valueStyle(info.f40006)">
        {{ formatPrec(info.f40006, '%', 0) }}
      </div>
    </div>
    <div class="card-col">
      <div class="card-title">控盘：</div>
      <div class="card-text">
        <span style="color: #f00">{{ info.f40016 }}</span>
      </div>
    </div>
    <div class="card-col">
      <div class="card-title">金叉：</div>
      <div class="card-text">
        <span style="color: #f00">{{ info.f40014 }}</span>
      </div>
    </div>
    <div class="card-col">
      <div class="card-title">周金叉：</div>
      <div class="card-text">
        <span style="color: #f00">{{ info.f41006 }}</span>
      </div>
    </div>
    <div class="card-col">
      <div class="card-title">均线多头：</div>
      <div class="card-text">
        <span style="color: #f00">{{ info.f40008 }}</span
        >天<span :style="valueStyle(info.f40009)">{{ formatPrec(info.f40009, '%', 0) }}</span>
      </div>
    </div>
    <div class="card-col">
      <div class="card-title">60日线：</div>
      <div class="card-text">
        <span style="color: #f00">{{ info.f40010 }}</span
        >天<span :style="valueStyle(info.f40011)" style="font-size: 14px">{{ formatPrec(info.f40011, '%', 0) }}</span>
      </div>
    </div>
    <div class="card-col">
      <div class="card-title">流入天数：</div>
      <div class="card-text">
        <span style="color: #f00">{{ info.f40017 }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { formatMoney, valueStyle, formatPrec } from '@/utils/tool';
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    formatMoney,
    valueStyle,
    formatPrec
  },
};
</script>
<style lang="less" scoped>
.ft-card-item {
  border-radius: 8px;
  background: #fff;
  margin-bottom: 8px;
  position: relative;
  padding: 6px 8px;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  margin: 10px;
  &.gold {
    background: rgba(255, 215, 0, 0.08);
  }
  &.silver {
    background: rgba(218, 112, 214, 0.08);
  }
  &:active {
    background: #f3f4f5;
  }
}
.card-name {
  color: red;
  font-size: 16px;
}
.card-prec {
  font-size: 16px;
  margin-left: 8px;
}
.card-col {
  float: left;
  width: 50%;
  display: flex;
}
.card-title {
  width: 70px;
  text-align-last: justify;
  color: #606266;
}
.card-text {
  color: #606266;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
}
.goto-link {
  position: absolute;
  right: 10px;
  top: 6px;
  font-size: 18px;
  line-height: 24px;
  color: #409eff;
  font-weight: bold;
  .el-icon-arrow-right {
    &::before {
      font-weight: bold;
    }
  }
}
</style>
