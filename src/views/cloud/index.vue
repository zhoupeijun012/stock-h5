<template>
    <NavWarp title="问AI" :showBack="false" :showNav="false">
      <iframe :src="showUrl" class="ai-iframe"></iframe>
    </NavWarp>
</template>
<script>
import NavWarp from "@/components/nav-warp";
export default {
  name: "ai",
  components: {
    NavWarp,
  },
  computed: {
    showUrl() {
      const queryArr = [];
      if (this.routerConfig.key) {
        queryArr.push(`key=${this.routerConfig.key}`);
      }
      if (this.routerConfig.type) {
        queryArr.push(`type=${this.routerConfig.type}`);
      }
      return `${location.protocol}//www.amdyes.asia`;
    },
  },
  data() {
    return {
      routerConfig: {},
    };
  },
  mounted() {
    this.routerConfig = this.$route.query || {};
  },
};
</script>
<style lang="less" scoped>
.ai-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.ai-content {
  flex: 1;
  overflow: hidden;
}
.ai-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
