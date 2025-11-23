import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import type { PiniaPluginContext } from "pinia";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  function persistPlugin({ store }: PiniaPluginContext) {
    const key = `pinia-${store.$id}`;
    try {
      const from = uni.getStorageSync(key);
      if (from) store.$patch(from);
    } catch (e) {}
    store.$subscribe((_mutation, state) => {
      try {
        uni.setStorageSync(key, state);
      } catch (e) {}
    });
  }
  pinia.use(persistPlugin);
  app.use(pinia);
  return {
    app,
  };
}
