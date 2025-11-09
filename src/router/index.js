import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/home/index.vue"),
    meta: { title: "首页", noAuth: true },
  },
  {
    path: "/strategy",
    name: "strategy",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/strategy/index.vue"),
    meta: { title: "策略", noAuth: true },
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/favorite/index.vue"),
    meta: { title: "收藏", noAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName:"stock" */ "@/views/profile/index.vue"),
    meta: { title: "我的", noAuth: true },
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to?.meta?.noAuth) {
    next();
  } else {
    next();
    // store.state.token ? next() : window.location.replace('/login');
  }
});

export default router;
