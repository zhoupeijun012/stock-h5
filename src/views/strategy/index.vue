<template>
  <div class="strategy">
    <ft-list :requestFunction="$api.getFocusList" ref="ft-list">
      <template v-slot:list="{ list }">
        <van-card v-for="item in list" :key="item.id" :title="item.f14">
        </van-card>
      </template>
    </ft-list>
  </div>
</template>

<script>
import FtList from "@/components/ft-list";
export default {
  name: 'strategy',
  components: {
    FtList,
  },
  data() {
    return {
    };
  },
  mounted() {
    this.$refs["ft-list"].query({
      order: [{ prop: "f3", order: "descending" }],
      where: [],
      matchKeys: [
        "f14",
        "f3",
        "f12",
        "f21",
        "f20",
        "f2",
        "f12",
        "f7",
      ],
    });
  },
};
</script>

<style lang="less" scoped>
.strategy {
  box-sizing: border-box;
  height: 100%;
  position: relative;
}

.van-card {
  background: #fff;
  margin: 10px;
  border-radius: 8px;
}
</style>
