---
abbrlink: 51a6c0df
title: Dva封装
date: 2018-01-17
categories: 
- FE框架 
- React
- Dva封装
---

<strong class='old-blog'>Dva封装</strong>


```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider,connect} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import * as effects from 'redux-saga/effects';
import {createHashHistory} from 'history';
const NAMESPACE_SEPERATOR = '/';
export {
    connect
}
export default function(){
    let app = {
        model,
        _models:[],
        router,
        _router:null,
        start
    }
    function model(model){
        app._models.push(model);//把传入的model存放起来
    }
    function router(routeConfig){
        app._router = routeConfig;//把路由的配置暂存起来
    }
    function start(root){//启动渲染
        let reducers = {};
        for(let model of app._models){
            reducers[model.namespace] = function(state=model.state,action){
                let actionType = action.type;//获取动作类型 counter/add  ['counter','add']
                let values = actionType.split(NAMESPACE_SEPERATOR);
                if(values[0] == model.namespace){//如果说命名空间的名字和动作命名空间一样的话
                    let reducer = model.reducers[values[1]];//获取要进行计算状态的reducer
                    if(reducer)
                      return reducer(state,action);
                }
                return state;
            }
        }
        let reducer = combineReducers(reducers);//合并reducers
        let sagaMiddleware = createSagaMiddleware();
        function* rootSaga(){
            for(const model of app._models){
                for(const key in model.effects){
                    yield effects.takeEvery(`${model.namespace}${NAMESPACE_SEPERATOR}${key}`,model.effects[key],effects);
                }
            }
        }
        let store = createStore(reducer,applyMiddleware(sagaMiddleware));//创建仓库
        sagaMiddleware.run(rootSaga);
        const history = createHashHistory();
        let App = app._router({app,history});//获取要渲染的组件
        ReactDOM.render(//执行渲染
            <Provider store={store}>
                {App}
            </Provider>,document.querySelector(root)
        );
    }
    return app;
}
```

简单使用

```javascript
import {adminCharacters, adminCharactersDelete} from 'src/api/admin';

export default {
    namespace: 'roleAdmin',
    state: {
        dataSource: [],
    },
    effects: {
        * fetchData ({id}, {call, put, select}) {
            const {data} = yield call(adminCharacters);
            yield put({
                type: 'save',
                payload: {
                    dataSource: data,
                },
            });
        },
        * deleteData ({id, cb}, {call, put}) {
            const {success} = yield call(adminCharactersDelete, id);
            if (success) {
                cb()
            }
        },
    },
    reducers: {
        save(state, {payload}) {
            return {...state, ...payload};
        },
    },
};
```
