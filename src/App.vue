<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { detectPwaMode } from "@/utils/tool.js";
import { Dialog } from "vant";
export default {
  name: "App",
  components: {},
  mounted() {
    if (!detectPwaMode()) {
      navigator
        .getInstalledRelatedApps()
        .then((relatedApps) => {
          if (relatedApps.length > 0) {
            console.log("PWA已安装到主屏幕");
          } else {
            setTimeout(() => {
              if (window.pwaInstaller) {
                Dialog.confirm({
                  title: "提示",
                  message: "是否安装至桌面以提升体验?",
                })
                  .then(() => {
                    window.pwaInstaller.prompt();
                    window.pwaInstaller = null;
                  })
                  .catch(() => {
                    window.pwaInstaller = null;
                  });
              }
            }, 500);
          }
        })
        .catch((error) => {
          console.log("检测失败:", error);
        });
    }

    const channel = new BroadcastChannel("service-work");
    channel.onmessage = (event) => {
      const status = event.data;
      if (status == "UPDATED") {
        Dialog.confirm({
          title: "提示",
          message: "后台更新成功,是否使用最新版本?",
        })
          .then(() => {
            window.location.reload();
          })
          .catch(() => {});
      }
    };
  },
};
</script>
<style lang="less" scoped>
#app {
  height: calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  overflow:hidden;
}
</style>
