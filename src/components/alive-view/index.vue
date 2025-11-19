<template>
  <keep-alive :include="includeRoutes">
    <router-view></router-view>
  </keep-alive>
</template>
<script>
export default {
  data() {
    return {
      includeRoutes: ["home", "strategy", "favorite", "profile"],
    };
  },
};
</script>
