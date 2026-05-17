// 浏览器搜索配置

const search = {
  provider: 'local',
  options: {
    locales: {
      root: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            displayDetails: '显示详细信息',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '返回搜索结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: 'enter',
              navigateText: '切换',
              navigateUpKeyAriaLabel: 'up arrow',
              navigateDownKeyAriaLabel: 'down arrow',
              closeText: '关闭',
              closeKeyAriaLabel: 'escape'
            }
          }
        }
      }
    },
    
    _render(src, env, md) {
      const html = md.render(src, env);
      if (env.frontmatter?.search === false) return "";
      if (env.relativePath.startsWith("some/path")) return "";
      // 不要前置再渲染 `# title`：正文已有标题时会与 frontmatter.title 生成重复锚点，触发 local search 构建失败
      return html;
    },
    // 搜索配置
    miniSearch: {
      /**
       * @type {Pick<import('minisearch').Options, 'extractField' | 'tokenize' | 'processTerm'>}
       */
      options: {
        /* ... */
      },
      /**
       * @type {import('minisearch').SearchOptions}
       * @default
       * { fuzzy: 0.2, prefix: true, boost: { title: 4, text: 2, titles: 1 } }
       */
      searchOptions: {
        /* ... */
      }
    },
  }
}

export default search;
