/**
 * Service Worker 注册和版本检查模块
 */
(function () {
  const LOCAL_VERSION = 'LOCAL_VERSION';
  // 版本检查间隔（毫秒）
  const CHECK_INTERVAL = 120; // 60秒
  // 版本号文件路径
  const VERSION_FILE = '/version.json';

  let inDownload = false;

  const channel = new BroadcastChannel('service-work');
  // 注册 Service Worker
  window.registerServiceWorker = function () {
    // 注册 service worker
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(function (registration) {
        // 定期检查版本
        registration &&
          startCheckVersion((version, loaded) => {
            if (!inDownload) {
              // 更新中，就不触发了
              inDownload = true;
              registration.active.postMessage({
                type: 'UPDATE_AVAILABLE',
                version,
                loaded,
              });
              channel.postMessage('UPDATING');
            }
          });
        // 监听来自 service worker 的消息
        navigator.serviceWorker.addEventListener('message', (event) => {
          const { version, type, loaded = false } = event.data;
          if (type === 'UPDATE_READY') {
            inDownload = false;
            window.localStorage.setItem(LOCAL_VERSION, version);
            loaded && channel.postMessage('UPDATED');
          }
          if (type === 'UPDATE_ERROR') {
            inDownload = false;
          }
        });
      })
      .catch((error) => {
        console.error('Service Worker 注册失败:', error);
      });
  };

  /**
   * 检查版本更新
   */
  function startCheckVersion(updateCallback) {
    const updateMin = () => {
      // 请求版本号文件
      fetch(VERSION_FILE + '?t=' + Date.now(), { cache: 'no-store' })
        .then((response) => response.json())
        .then((response) => {
          const remoteVersion = response.version;
          const currentVersion = window.localStorage.getItem(LOCAL_VERSION);
          if (Number(remoteVersion) > (isNaN(Number(currentVersion)) ? '0' : Number(currentVersion))) {
            updateCallback(remoteVersion, !!currentVersion);
          }
        });
    };
    animateEveryMinute(updateMin);
    updateMin();
  }

  function animateEveryMinute(callback) {
    const interval = CHECK_INTERVAL * 1000; // 60秒（毫秒）
    let lastTime = performance.now();

    function animationLoop(timestamp) {
      if (timestamp - lastTime >= interval) {
        callback();
        lastTime = timestamp;
      }
      requestAnimationFrame(animationLoop);
    }

    requestAnimationFrame(animationLoop);

    return () => cancelAnimationFrame(animationLoop);
  }

  window.addEventListener('load', () => {
    // 自动注册 service worker
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }
  });

  window.addEventListener('beforeinstallprompt', function (e) {
    // 阻止 Chrome 67 及更早版本自动显示安装提示
    e.preventDefault();
    // 保存事件用于后续触发安装
    window.pwaInstaller = e;
  });
})();
