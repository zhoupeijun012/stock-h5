import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { userLogin } from "@/api/index";
import { MD5 } from "@/utils/tool";
import { getFocusList, focusAdd, focusDelete } from "@/api/index";
import * as StoreTypes from "./store_types";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    fullScreen: false,
    userInfo: null,
    token: null,
    tableShowType: "table",
    focusList: [],
    includeRoutes: [],
  },
  mutations: {
    [StoreTypes.UPDATE_FULL_SCREEN](state, poly) {
      state.fullScreen = poly;
    },
    [StoreTypes.UPDATE_USER_INFO](state, poly) {
      state.userInfo = poly;
    },
    [StoreTypes.UPDATE_TOKEN](state, poly) {
      state.token = poly;
    },
    [StoreTypes.CLEAR_ALL](state) {
      state.token = "";
      state.userInfo = null;
    },
    [StoreTypes.UPDATE_FOCUS_LIST](state, poly) {
      state.focusList = poly;
    },
    [StoreTypes.UPDATE_SHOW_TYPE](state, poly) {
      state.tableShowType = poly;
    },
    [StoreTypes.UPDATE_INCLUDE_ROUTES](state, poly) {
      state.includeRoutes = poly;
    },
  },
  actions: {
    async [StoreTypes.ACTION_LOGIN](store, poly) {
      const params = JSON.parse(JSON.stringify(poly));
      params["password"] = MD5(params["password"]);
      const res = await userLogin(params);
      store.commit(StoreTypes.UPDATE_TOKEN, res.token);
      store.commit(StoreTypes.UPDATE_USER_INFO, res.userInfo);
    },
    async [StoreTypes.ACTION_GET_FOCUS_LIST](store) {
      getFocusList({
        pageNum: 1,
        pageSize: 99999,
        matchKeys: ["f12"],
      }).then((res) => {
        store.commit(
          StoreTypes.UPDATE_FOCUS_LIST,
          res.list.map((item) => item.f12) || []
        );
      });
    },
    async [StoreTypes.ACTION_FOCUS_ADD](store, poly) {
      focusAdd({ f12: poly.f12, f14: poly.f14 }).then(() => {});
      store.state.focusList.push(poly.f12);
    },
    async [StoreTypes.ACTION_FOCUS_DELETE](store, poly) {
      focusDelete({
        where: [{ field: "f12", operator: "eq", value: poly.f12 }],
      }).then(() => {});
      store.state.focusList.splice(store.state.focusList.indexOf(poly.f12), 1);
    },
  },
  plugins: [
    createPersistedState({
      key: "v1", // 存储键名
      storage: localStorage,
      reducer: (state) => ({
        fullScreen: state.fullScreen,
        userInfo: state.userInfo,
        token: state.token,
        tableShowType: state.tableShowType,
      }),
    }),
  ],
});
