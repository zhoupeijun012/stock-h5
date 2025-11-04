<template>
  <div class="favorite">
    <van-sticky>
      <van-nav-bar title="收藏" />
    </van-sticky>
    
    <div class="content">
      <van-empty 
        v-if="favoriteList.length === 0" 
        description="暂无收藏内容"
      />
      
      <van-list v-else>
        <van-swipe-cell 
          v-for="item in favoriteList" 
          :key="item.id"
          :right-width="65"
        >
          <van-cell :title="item.title" :value="item.date" />
          <template #right>
            <van-button square type="danger" text="删除" />
          </template>
        </van-swipe-cell>
      </van-list>
    </div>
  </div>
</template>

<script >

export default {
  data() {
    return {
      favoriteList: []
    }
  },
  created() {
    this.favoriteList = [
      {
        id: 1,
        title: '标题1',
        date: '2020-01-01'
      },
      {
        id: 2,
        title: '标题2',
        date: '2020-01-02'
      }
    ]
  }
}

</script>

<style lang="less" scoped>
.favorite {
  background-color: var(--bg-color);
  min-height: 100%;
}

.content {
  padding: 10px;
  padding-bottom: 20px;
}

.van-swipe-cell {
  margin: 10px 0;
  border-radius: 8px;
  overflow: hidden;
}
</style>