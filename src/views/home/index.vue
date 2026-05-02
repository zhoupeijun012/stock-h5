<template>
  <div class="home-wrapper">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="content">
        <van-grid :gutter="0" square v-if="Array.isArray(homeInfo.np)">
          <van-grid-item
            v-for="(item, index) in homeInfo.np"
            :key="'list-item-' + index"
            @click="handleIndexClick(item)"
          >
            <div class="index-warp ins">
              <div class="index-num" :style="valueStyle(item.f3)">
                {{ formatPrec(item.f2) }}
              </div>
              <div class="index-info" :style="valueStyle(item.f3)">
                {{ formatPrec(item.f3, "%") }}
              </div>
              <div class="index-info" :style="valueStyle(item.f62)">
                {{ formatMoney(item.f62) }}
              </div>
              <div
                class="index-title"
                :style="{
                  color: item.f40014 > 0 ? getBgColor(item.f40016) : '#000',
                }"
              >
                {{ item.f14 }}
              </div>
            </div>
          </van-grid-item>
        </van-grid>
        <van-grid :gutter="0" square style="margin-top: 10px">
          <van-grid-item>
            <div class="index-warp ins">
              <div class="index-info">
                {{
                  (homeInfo.summary && homeInfo.summary.goldenCrossCount) || "-"
                }}
              </div>
              <div class="index-title">金叉数</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="index-warp des">
              <div class="index-info">
                {{
                  (homeInfo.summary && homeInfo.summary.weekCrossCount) || "-"
                }}
              </div>
              <div class="index-title">周金叉数</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="index-warp des">
              <div class="index-info">
                {{
                  (homeInfo.summary && homeInfo.summary.deathCrossCount) || "-"
                }}
              </div>
              <div class="index-title">死叉数</div>
            </div>
          </van-grid-item>
        </van-grid>
        <van-grid :gutter="0" square style="margin-top: 10px">
          <van-grid-item>
            <div class="index-warp des">
              <div class="index-info">
                {{ (homeInfo.summary && homeInfo.summary.upCount) || "-" }}
              </div>
              <div class="index-title">上涨</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="index-warp des">
              <div class="index-info">
                {{ (homeInfo.summary && homeInfo.summary.eqCount) || "-" }}
              </div>
              <div class="index-title">平盘</div>
            </div>
          </van-grid-item>
          <van-grid-item>
            <div class="index-warp des">
              <div class="index-info">
                {{ (homeInfo.summary && homeInfo.summary.downCount) || "-" }}
              </div>
              <div class="index-title">下跌</div>
            </div>
          </van-grid-item>
        </van-grid>

        <van-grid :gutter="0" square style="margin-top: 10px" class="list-grid">
          <van-grid-item
            v-for="(item, index) in list"
            :key="'list-item-' + index"
            :icon="item.icon"
            :text="item.title"
            @click="handleClick(item)"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getHomeInfo } from "@/api";
import { formatMoney, valueStyle, formatPrec, getValColor } from "@/utils/tool";
export default {
  name: "home",
  data() {
    return {
      refreshing: false,
      list: [
        { title: "股票", icon: "cash-back-record-o", name: "stock" },
        { title: "T+0", icon: "goods-collect-o", name: "t0" },
        { title: "T+1", icon: "discount-o", name: "t1" },
        // { title: "LOF", icon: "shopping-cart-o", name: "lof" },
        { title: "板块", icon: "award-o", name: "industry" },
        { title: "概念", icon: "shop-collect-o", name: "concept" },
        { title: "地区", icon: "hot-o", name: "region" },
      ],
      valueStyle,
      formatPrec,
      formatMoney,
      getValColor,
      homeInfo: {},
    };
  },
  mounted() {
    this.onRefresh();
  },
  methods: {
    getBgColor(value) {
      // 核心逻辑：RGB通道随数值线性变化
      // 绿色系（0-100）：G通道线性降低，R/B小幅变化
      // 红色系（100-250）：R通道线性升高（255封顶），G/B线性降低（0封底）
      const colorKeyPoints = [
        { val: 0, rgb: [48, 204, 90] }, // #30cc5a（绿：G=204）
        { val: 50, rgb: [47, 170, 81] }, // #2faa51（绿：G=170，线性降低）
        { val: 75, rgb: [49, 137, 78] }, // #31894e（绿：G=137，线性降低）
        { val: 100, rgb: [100, 80, 80] }, // #645050（基准：R=100，G/B=80，绿转红起点）
        { val: 125, rgb: [140, 60, 60] }, // #8c3c3c（红：R+40，G/B-20）
        { val: 150, rgb: [180, 40, 40] }, // #b42828（红：R+40，G/B-20）
        { val: 175, rgb: [210, 20, 20] }, // #d21414（红：R+30，G/B-20）
        { val: 200, rgb: [235, 10, 10] }, // #eb0a0a（红：R+25，G/B-10）
        { val: 225, rgb: [245, 5, 5] }, // #f50505（红：R+10，G/B-5）
        { val: 250, rgb: [255, 0, 0] }, // #ff0000（红：R=255，G/B=0，极致红）
      ];

      const numValue = Number(value);
      if (isNaN(numValue) || !isFinite(numValue)) {
        return "#645050"; // 异常值返回基准色
      }

      // 边界处理
      if (numValue <= 0) return "#30cc5a";
      if (numValue >= 250) return "#ff0000";

      // 找到数值所在的两个线性节点
      let prevPoint, nextPoint;
      for (let i = 0; i < colorKeyPoints.length - 1; i++) {
        const current = colorKeyPoints[i];
        const next = colorKeyPoints[i + 1];
        if (
          numValue >= current.val - Number.EPSILON &&
          numValue <= next.val + Number.EPSILON
        ) {
          prevPoint = current;
          nextPoint = next;
          break;
        }
      }

      // 兜底逻辑
      if (!prevPoint || !nextPoint) return "#645050";

      // 线性插值计算（核心：保证颜色随数值均匀变化）
      const ratio =
        (numValue - prevPoint.val) / (nextPoint.val - prevPoint.val);
      const r = Math.round(
        prevPoint.rgb[0] + (nextPoint.rgb[0] - prevPoint.rgb[0]) * ratio,
      );
      const g = Math.round(
        prevPoint.rgb[1] + (nextPoint.rgb[1] - prevPoint.rgb[1]) * ratio,
      );
      const b = Math.round(
        prevPoint.rgb[2] + (nextPoint.rgb[2] - prevPoint.rgb[2]) * ratio,
      );

      // RGB转十六进制
      const toHex = (num) => num.toString(16).padStart(2, "0");
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    },

    onRefresh() {
      this.getHomeInfo();
    },
    handleClick(item) {
      this.$router.push({ name: item.name });
    },
    handleIndexClick(item) {
      this.$indexDetail(item);
    },
    getHomeInfo() {
      getHomeInfo()
        .then((res) => {
          this.homeInfo = res || {};
        })
        .finally(() => {
          this.refreshing = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.home-wrapper {
  height: 100%;
  overflow: hidden;
}
/deep/.van-pull-refresh {
  height: 100%;
  overflow-y: auto;
}
.content {
  padding: 10px;
}

.index-warp {
  &.ins {
    color: red;
  }
  &.des {
    color: green;
  }
  .index-num {
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .index-info {
    text-align: center;
    font-size: 14px;
    line-height: 1.5;
  }

  .index-title {
    text-align: center;
    color: #646566;
    font-size: 14px;
    line-height: 1.5;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.list-grid {
  /deep/.van-grid-item__text {
    font-size: 14px;
  }
}
</style>
