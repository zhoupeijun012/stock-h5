<template>
  <div class="favorite">
    <ft-list :requestFunction="$api.getFocusList" ref="ft-list">
      <template v-slot:list="{ list }">
        <stock-card v-for="item in list" :key="item.id" :info="item"></stock-card>
      </template>
    </ft-list>
  </div>
</template>

<script>
import FtList from "@/components/ft-list";
import StockCard from "@/components/stock-card";
export default {
  components: {
    FtList,
    StockCard,
  },
  data() {
    return {

    };
  },
  mounted() {
    this.$refs["ft-list"].query({
      order: [{ prop: "f3", order: "descending" }],
      where: [],
      matchKeys: ["f14","f3","f40014","f41006","f40006","f40008","f40009","f40010","f40011","f40012","f40013","f40017","f6","c_f103","f12","f21","f20","f2","f12","f7","f23","c_f100","c_f102","f8","f9","f11","f41003","f41004","f24","f62","f267","f164","f63","f17","f2","f15","f16","f5","f4","f41006","f40016"],
    });
  },
};
</script>

<style lang="less" scoped>
.favorite {
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
