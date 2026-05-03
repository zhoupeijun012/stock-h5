<template>
  <NavWarp title="问AI" :showBack="false" :showNav="false">
    <div class="iframe-box">
      <iframe
        :src="showUrl"
        class="ai-iframe"
        ref="iframe"
        frameborder="0"
      ></iframe>
    </div>
  </NavWarp>
</template>

<script>
import NavWarp from "@/components/nav-warp";
export default {
  name: "ai",
  components: { NavWarp },
  computed: {
    showUrl() {
      return `${location.protocol}//www.amdyes.asia`;
    },
  },
  mounted() {
    this.fitIframe();
    window.addEventListener("resize", this.fitIframe);
  },
  destroyed() {
    window.removeEventListener("resize", this.fitIframe);
  },
  methods: {
    fitIframe() {
      const iframe = this.$refs.iframe;
      if (!iframe) return;

      // 屏幕宽度 / 1400 = 缩放比例
      const scale = window.innerWidth / 1400;

      // ✅ 核心：宽度1400，高度用 100% / 缩放比例，抵消高度缩小
      iframe.style.width = "1400px";
      iframe.style.height = `${100 / scale}%`; // 关键！抵消scale带来的高度变短

      // 等比缩放宽度
      iframe.style.transform = `scale(${scale})`;
      iframe.style.transformOrigin = "top left";
    },
  },
};
</script>

<style lang="less" scoped>
.iframe-box {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.ai-iframe {
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
}
</style>