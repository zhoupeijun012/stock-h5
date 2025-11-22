<template>
  <keep-alive :include="includeRoutes" :max="10">
    <router-view></router-view>
  </keep-alive>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      includeRoutes: (state) => state.includeRoutes,
    }),
  },
};
</script>
