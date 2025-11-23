<template>
  <div class="nav-bar-wrap">
    <div class="nav-bar-top">
      <van-nav-bar
        :title="title"
        :left-text="showBack ? '返回' : ''"
        :left-arrow="showBack"
        @click-left="onClickLeft"
        class="nav-bar"
      >
        <template #right >
          <van-icon v-if="searchOptions.length > 0" name="search" @click="showSearchPanel = true" size="24"/>
          <slot name="nav-right"></slot>
        </template>
      </van-nav-bar>
    </div>
    <div class="page-content">
      <slot></slot>
    </div>
    <search-panel
      v-model="showSearchPanel"
      :options="searchOptions"
      v-bind="$attrs"
      v-on="$listeners"
    ></search-panel>
  </div>
</template>
<script lang="js">
import SearchPanel from "../search-panel/index.vue";
export default {
  name: "nav-warp",
  components: {
    [SearchPanel.name]: SearchPanel,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    showBack: {
      type: Boolean,
      default: true,
    },
    searchOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showSearchPanel: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
}
</script>

<style lang="less" scoped>
.nav-bar-wrap {
  height: 100%;
}
.nav-bar {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  /deep/.van-nav-bar__text {
    color: #323233 !important;
    font-size: 16px;
  }
  /deep/.van-icon {
    font-size: 18px;
    color: #323233;
    line-height: 22px;
  }
}
.nav-bar-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.page-content {
  background-color: #f5f5f5;
  margin-top: 46px;
  height: calc(100% - 46px);
  display: flex;
  flex-direction: column;
}
</style>
