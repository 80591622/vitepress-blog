import { createApp } from "vue";
import Overlay from "./Overlay.vue";

/**
 * 创建遮罩层 HTML 元素
 */
export const createOverlay = (onClick: () => void): HTMLElement => {
  const container = document.createDocumentFragment() as unknown as Element;
  const app = createApp(Overlay, { onClick }).mount(container);

  return app.$el as HTMLElement;
};
