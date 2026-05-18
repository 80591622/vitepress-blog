import type { DefaultTheme } from "vitepress";

/** Algolia 搜索配置（当前未启用，保留备用） */
const algolia: DefaultTheme.AlgoliaSearchOptions = {
  appId: "1L6FRXPKEM",
  apiKey: "934b4c2e67a08d72d379c9af236c5859",
  indexName: "program-learn-notes",
  searchParameters: {
    facetFilters: ["tags:guide,api"],
  },
};

export default algolia;
