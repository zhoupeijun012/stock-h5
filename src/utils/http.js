const axios = require('axios');
import store from '@/store/index';
import * as StoreTypes from '@/store/store_types';
import { Toast } from "vant";
// 创建一个具有默认配置的axios实例
const instance = axios.create({
  // baseURL: 'https://120.48.100.49/api',
  // baseURL: '/api',
  baseURL: 'https://www.chives.asia/api',
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    if (token) {
      config.headers['authorization'] = token;
    }
    return config;
  },
  (error) => {
    Toast.fail(error.message || '请求错误');
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response?.data?.success) {
      return response?.data?.data;
    }
    if (response?.data?.errorCode == 401) {
      Toast.fail(response?.data?.message || '网络错误');
      store.commit(StoreTypes.CLEAR_ALL);
      setTimeout(() => {
        window.location.replace('/login');
      }, 2000);
      return '';
    }

    const message = response?.data?.message || '网络错误';
    Toast.fail(message);
    return Promise.reject({
      success: false,
      message: message,
      data: null,
    });
  },
  (error) => {
    if (error?.status != 200) {
      Toast.fail('网络错误');
      return Promise.reject({
        success: false,
        message: error.message || '网络错误',
        data: null,
      });
    }
    const message = error?.response?.data?.message;
    if (message) {
      Toast.fail(message);
    }
    return Promise.reject({
      success: false,
      message: message || '网络错误',
      data: null,
    });
  }
);

export default instance;
