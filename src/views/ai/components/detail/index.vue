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
    <div class="ai-detail">
      <div class="sticky-header">
        <div class="sticky-left" @click="onHandClose">
          <van-icon name="cross" />
        </div>
        <div class="sticky-title">{{ title }}</div>
        <div class="sticky-right"></div>
      </div>
      <div class="ai-content">
        <iframe :src="showUrl" class="ai-iframe"></iframe>
      </div>
    </div>
  </van-popup>
</template>
<script>
import NavWarp from "@/components/nav-warp";
import { Toast } from "vant";
export default {
  name: "ai-detail",
  components: {
    NavWarp,
  },
  computed: {
    title() {
      return "问AI";
    },
    showUrl() {
      const queryArr = [];
      if (this.routerConfig.key) {
        queryArr.push(`key=${this.routerConfig.key}`);
      }
      if (this.routerConfig.type) {
        queryArr.push(`type=${this.routerConfig.type}`);
      }
      return `${location.protocol}//ai.amdyes.asia/#/?${queryArr.join("&")}`;
    },
  },
  data() {
    return {
      visible: false,
      routerConfig: {},
    };
  },
  methods: {
    show(info = {}) {
      this.visible = true;
      this.routerConfig = info;
    },
  },
};
</script>
<style lang="less" scoped>
.ai-detail {
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
  }.sticky-right { width: 96px;}
  .sticky-title {
    flex: 1;
    line-height: 48px;
    text-align: center;
    font-size: 16px;    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.ai-content {
  height: calc(100% - 48px);
  overflow: hidden;
}
.ai-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>