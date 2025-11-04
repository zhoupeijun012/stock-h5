/**
 * Service Worker 脚本
 */
const CACHE_NAME = 'pwa-app-cache-v4';
const VERSION_FILE = '/version.json';
const MANIFEST_FILE = '/assets-manifest.json';

// 安装事件 - 缓存预加载资源
self.addEventListener('install', function () {
  self.skipWaiting();
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter((cacheName) => {
          // 返回需要删除的旧缓存
          return cacheName.startsWith('pwa-app-cache-') && cacheName !== CACHE_NAME;
        });
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// fetch 事件 - 拦截网络请求
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  // 忽略跨域请求
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  // 对不同类型的请求使用不同的缓存策略
  if (requestUrl.pathname === VERSION_FILE || requestUrl.pathname.includes('/api/')) {
    // 版本文件 - 始终从网络获取
    event.respondWith(fetch(event.request));
  } else if (/\.[a-f0-9]{8}\./.test(requestUrl.pathname)) {
    // 带8位hash的静态资源 - 使用缓存优先策略
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // 如果缓存中没有，从网络获取并缓存
        return fetch(event.request).then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
    );
  } else if (event.request.destination == 'document') {
    requestUrl.pathname = '/index.html';
    const originalRequest = event.request;
    const requestOptions = {
      method: originalRequest.method,
      headers: originalRequest.headers,
      credentials: originalRequest.credentials,
      cache: originalRequest.cache,
      redirect: originalRequest.redirect,
      referrer: originalRequest.referrer,
    };
    if (originalRequest.mode !== 'navigate') {
      requestOptions.mode = originalRequest.mode;
    }
    const modifiedRequest = new Request(requestUrl, requestOptions);
    // 请求的是网页，history模式下，要模拟try-files
    event.respondWith(
      caches.match(modifiedRequest).then((response) => {
        // 返回备用页面或空响应
        if (response) {
          return response;
        }
        return fetch(modifiedRequest).then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(modifiedRequest, responseToCache);
          });
          return response;
        });
      })
    );
  } else {
    // 其他资源 - 使用网络优先策略
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // 如果缓存中没有，从网络获取并缓存
        return fetch(event.request).then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
    );
  }
});

// 监听来自页面的消息
self.addEventListener('message', async (event) => {
  if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
    // 这里可以实现更复杂的更新逻辑，获取新的资源清单并缓存
    try {
      // 清除所有旧缓存
      const allCacheKeys = await caches.keys();
      await Promise.all(allCacheKeys.map((cacheName) => caches.delete(cacheName)));
      const res = await fetch(MANIFEST_FILE + '?t=' + Date.now(), { cache: 'no-store' });
      const data = await res.json();
      const cacheInstance = await caches.open(CACHE_NAME);
      await cacheInstance.addAll(Object.values(data));
      // 通知所有客户端更新已准备好
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'UPDATE_READY',
            version: event.data.version,
            loaded: event.data.loaded,
          });
        });
      });
    } catch (error) {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'UPDATE_ERROR',
            version: event.data.version,
            loaded: event.data.loaded,
          });
        });
      });
    }
  } else if (event.data && event.data.type === 'SKIP_WAITING') {
    // 立即激活等待中的 service worker
    self.skipWaiting();
  }
});
