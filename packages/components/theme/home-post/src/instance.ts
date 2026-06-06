import type HomePost from "./index.vue";
import type HomePostItemList from "./home-post-item-list.vue";
import type HomePostItemCard from "./home-post-item-card.vue";

export type TkHomePostInstance = InstanceType<typeof HomePost>;
export type TkHomePostItemListInstance = InstanceType<typeof HomePostItemList>;
export type TkHomePostItemCardInstance = InstanceType<typeof HomePostItemCard>;
