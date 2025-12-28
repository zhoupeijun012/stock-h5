import store from '@/store/index';

// 全局弹窗栈，用于管理所有打开的弹窗实例
const dialogStack = [];

// 处理浏览器返回事件的全局函数
let globalBackHandler = null;

/**
 * 创建通用的Detail组件插件
 * @param {Vue.Component} Component - Vue组件对象
 * @param {string} name - 挂载到Vue.prototype上的属性名，例如'stockDetail'
 * @returns {Object} - Vue插件对象
 */
export default function createDetailPlugin(Component, name) {
  return {
    install(Vue) {
      const ComponentStructor = Vue.extend(Component);
      
      // 初始化全局返回事件监听
      if (!globalBackHandler) {
        globalBackHandler = () => {
          if (dialogStack.length > 0) {
            // 如果有弹窗打开，先关闭最顶层的弹窗
            const topDialog = dialogStack[dialogStack.length - 1];
            if (topDialog && topDialog.instance && topDialog.instance.visible) {
              topDialog.instance.visible = false;
              // 阻止默认的返回行为
              if (event) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
          // 如果没有弹窗打开，浏览器会执行默认的返回操作
        };
        // 添加全局返回事件监听
        window.addEventListener('popstate', globalBackHandler, false);
      }
      
      const openDialog = function (porpsData) {
        const dom = document.createElement("div");
        const rootDom = document.querySelector("#app");
        rootDom.appendChild(dom);

        let instance = new ComponentStructor({ store }).$mount(dom);

        const destroyDialog = () => {
          // 从弹窗栈中移除当前实例
          const index = dialogStack.findIndex(item => item.instance === instance);
          if (index > -1) {
            dialogStack.splice(index, 1);
          }
          
          rootDom.removeChild(instance.$el);
          instance.$destroy();
          instance = null;
        };

        if (instance && instance.show) {
          setTimeout(() => {
            instance.show(porpsData);
            // 将实例添加到弹窗栈顶
            dialogStack.push({ instance, name });
            // 添加历史记录
            window.history.pushState(null, null, document.URL);
          }, 0);
        }

        return new Promise((resolve, reject) => {
          instance.$watch("visible", (val) => {
            if (!val) {
              resolve();
              setTimeout(() => {
                destroyDialog();
              }, 200);
            }
          });
        });
      };
      
      Vue.prototype[`$${name}`] = openDialog;
    }
  };
}
