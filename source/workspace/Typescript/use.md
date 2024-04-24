---
abbrlink: 927852b
title: 使用指南（antdp）
date: 2019-05-11
categories: 
- TypeScript
- 使用指南（antdp）
---

<strong class='old-blog'>使用指南（antdp）</strong>

[[toc]]

```javascript
export type SiderTheme = 'light' | 'dark';
export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

validateFields((err: unknown, fieldsValue: searchParamsType) => {});

interface IProps {
 form: FormComponentProps['form'];
}

(e: React.FormEvent)=>{}
    
```


**d.ts**

```javascript
import {
  Reducer,
  AnyAction,
  ReducersMapObject,
  Dispatch,
  MiddlewareAPI,
  StoreEnhancer
} from 'redux';

import { History } from "history";

export interface onActionFunc {
  (api: MiddlewareAPI<any>): void,
}

export interface ReducerEnhancer {
  (reducer: Reducer<any>): void,
}

export interface Hooks {
  onError?: (e: Error, dispatch: Dispatch<any>) => void,
  onAction?: onActionFunc | onActionFunc[],
  onStateChange?: () => void,
  onReducer?: ReducerEnhancer,
  onEffect?: () => void,
  onHmr?: () => void,
  extraReducers?: ReducersMapObject,
  extraEnhancers?: StoreEnhancer<any>[],
}

export type DvaOption = Hooks & {
  initialState?: Object,
  history?: Object,
}

export interface EffectsCommandMap {
  put: <A extends AnyAction>(action: A) => any,
  call: Function,
  select: Function,
  take: Function,
  cancel: Function,
  [key: string]: any,
}

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;
export type EffectType = 'takeEvery' | 'takeLatest' | 'watcher' | 'throttle';
export type EffectWithType = [Effect, { type : EffectType }];
export type Subscription = (api: SubscriptionAPI, done: Function) => void;
export type ReducersMapObjectWithEnhancer = [ReducersMapObject, ReducerEnhancer];

export interface EffectsMapObject {
  [key: string]: Effect | EffectWithType,
}

export interface SubscriptionAPI {
  history: History,
  dispatch: Dispatch<any>,
}

export interface SubscriptionsMapObject {
  [key: string]: Subscription,
}

export interface Model {
  namespace: string,
  state?: any,
  reducers?: ReducersMapObject | ReducersMapObjectWithEnhancer,
  effects?: EffectsMapObject,
  subscriptions?: SubscriptionsMapObject,
}

export interface RouterAPI {
  history: History,
  app: DvaInstance,
}

export interface Router {
  (api?: RouterAPI): JSX.Element | Object,
}

export interface DvaInstance {
  /**
   * Register an object of hooks on the application.
   *
   * @param hooks
   */
  use: (hooks: Hooks) => void,

  /**
   * Register a model.
   *
   * @param model
   */
  model: (model: Model) => void,

  /**
   * Unregister a model.
   *
   * @param namespace
   */
  unmodel: (namespace: string) => void,

  /**
   * Config router. Takes a function with arguments { history, dispatch },
   * and expects router config. It use the same api as react-router,
   * return jsx elements or JavaScript Object for dynamic routing.
   *
   * @param router
   */
  router: (router: Router) => void,

  /**
   * Start the application. Selector is optional. If no selector
   * arguments, it will return a function that return JSX elements.
   *
   * @param selector
   */
  start: (selector?: HTMLElement | string) => any,
}

export default function dva(opts?: DvaOption): DvaInstance;

/**
 * Connects a React component to Dva.
 */
export function connect(
  mapStateToProps?: Function,
  mapDispatchToProps?: Function,
  mergeProps?: Function,
  options?: Object
): Function;

```


**model**


```javascript
import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';

import { NoticeIconData } from '@/components/NoticeIcon';
import { queryNotices } from '@/services/user';
import { ConnectState } from './connect.d';

export interface NoticeItem extends NoticeIconData {
  id: string;
  type: string;
  status: string;
}

export interface GlobalModelState {
  collapsed: boolean;
  notices: NoticeItem[];
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetchNotices: Effect;
    clearNotices: Effect;
    changeNoticeReadState: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    saveNotices: Reducer<GlobalModelState>;
    saveClearedNotices: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount: number = yield select(
        (state: ConnectState) => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count: number = yield select((state: ConnectState) => state.global.notices.length);
      const unreadCount: number = yield select(
        (state: ConnectState) => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices: NoticeItem[] = yield select((state: ConnectState) =>
        state.global.notices.map(item => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        }),
      );

      yield put({
        type: 'saveNotices',
        payload: notices,
      });

      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter((item): boolean => item.type !== payload),
      };
    },
  },

  subscriptions: {
    setup({ history }): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }): void => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;

```


**connect**

```javascript
import { Dispatch, AnyAction } from 'redux';

interface LoginProps {
  dispatch: Dispatch<AnyAction>;
}



@connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  login: LoginModelType;
}
```
