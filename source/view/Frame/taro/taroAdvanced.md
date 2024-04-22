---
abbrlink: 83d5db7a
title: Taro一些配置
date: 2019-07-01
categories: 
- FE框架 
- Taro
- Taro一些配置
---

<strong class='old-blog'>Taro一些配置</strong>

[[toc]]

```typescript
/*获取当前页url*/
export const getCurrentPageUrl = (): string => {
    if (process.env.TARO_ENV === 'h5') {
        return window.location.pathname
    }
    let pages = Taro.getCurrentPages();

    if (process.env.TARO_ENV === 'tt') {
        return pages[pages.length - 1]['__route__']
    }

    let currentPage = pages[pages.length - 1];
    return currentPage.route;
};

```

```typescript jsx

/*基于Promise二次封装Taro.request*/

import Taro from '@tarojs/taro'
import qs from 'qs'
import {BASE_URL, HTTP_ERROR} from "./config.default";
import {getCurrentPageUrl} from "../utils/common";

export default {
  request(options: any, method?: string) {
    const {url, data} = options;
    let contentType = "application/json";
    contentType = options.contentType || contentType;
    //基于Promise二次封装，方便使用
    return new Promise((resolve, reject) => {
      let params: any = {
        url: `${BASE_URL}${url}`,
        data: data,
        method: method || 'GET',
        header: {
          'content-type': contentType,
          'Authorization': Taro.getStorageSync("Authorization"),
        }
      };

      Taro.request(params).then((res) => {
        let {statusCode, data} = res;
        if (statusCode >= 200 && statusCode < 300) {
          return resolve(data);
        } else {
          if (statusCode === 401) {
            Taro.setStorageSync("Authorization", "");
            let path = getCurrentPageUrl();
            if (path !== "pages/login/login") {
              Taro.navigateTo({
                url: "/pages/login/login"
              });
            }
          } else {
            throw new Error(HTTP_ERROR[statusCode]);
          }
        }
      }).catch(err => {
        reject('服务器正在维护中!');
        if (err.msg) throw new Error('服务器正在维护中!')
      })
    })
  },
  get(url: String, data: any) {
    const params = {url, data};
    return this.request(params)
  },
  post(url: String, data: any) {
    data = qs.stringify(data);
    const params = {url, data};
    return this.request(params, 'POST');
  },
  put(url: String, data: any) {
    const params = {url, data};
    return this.request(params, 'PUT')
  },
  delete(url: String, data: any) {
    const params = {url, data};
    return this.request(params, 'DELETE')
  }
}

```

```typescript
/*路由的跳转*/
export const jumpUrl = (url: string, options = {} as IOptions) => {
    let pages: any[] = [];
    if (process.env.TARO_ENV !== 'h5') {
        pages = Taro.getCurrentPages();

    }
    let method = options.method || 'navigateTo';

    const tabList = [
        'pages/functionArea/index',
        'pages/personCenter/index',
        'pages/message/index'
    ];

    if (url) {
        if (tabList.findIndex(x => '/' + x == url) != -1) {
            Taro['switchTab']({
                url
            })
        } else if (method == 'navigateTo' && pages.length === PAGE_LEVEL_LIMIT) {
            Taro['redirectTo']({
                url
            });
        } else if (method == 'redirectTo') {
            Taro['redirectTo']({
                url
            });
        } else {
            Taro['navigateTo']({
                url
            }).then(() => {
              let page: any = Taro.getCurrentPages().pop();
              if (page === undefined || page === null) return;
              page.onLoad()
          })
        }
    }
};

```
