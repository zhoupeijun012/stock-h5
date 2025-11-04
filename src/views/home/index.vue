<template>
  <div class="home">
    <van-sticky>
      <van-nav-bar title="首页" />
    </van-sticky>

    <div class="content">
      <van-swipe class="banner-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img
            src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
            alt="banner"
          />
        </van-swipe-item>
        <van-swipe-item>
          <img
            src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
            alt="banner"
          />
        </van-swipe-item>
        <van-swipe-item>
          <img
            src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg"
            alt="banner"
          />
        </van-swipe-item>
      </van-swipe>

      <van-grid :column-num="4" :border="false">
        <van-grid-item icon="wap-home-o" text="分类一" />
        <van-grid-item icon="apps-o" text="分类二" />
        <van-grid-item icon="shopping-cart-o" text="分类三" />
        <van-grid-item icon="user-o" text="分类四" />
      </van-grid>

      <van-list>
        <van-cell
          v-for="item in list"
          :key="item.id"
          :title="item.title"
          :label="item.content"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, title: "推荐内容 1", content: "这是首页推荐内容的详细描述" },
        { id: 2, title: "推荐内容 2", content: "这是首页推荐内容的详细描述" },
        { id: 3, title: "推荐内容 3", content: "这是首页推荐内容的详细描述" },
        { id: 4, title: "推荐内容 4", content: "这是首页推荐内容的详细描述" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  background-color: var(--bg-color);
  min-height: 100%;
}

.content {
  padding: 10px;
}

.banner-swipe {
  height: 180px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.van-grid {
  background: #fff;
  margin: 10px 0;
  border-radius: 8px;
}
</style>
