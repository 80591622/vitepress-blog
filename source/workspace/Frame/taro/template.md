
# Node生成模板
**基于nodejs编写自动生成路由需要的文件**

```javascript
/**
 * pages模版快速生成脚本,执行命令 npm run tep `文件名`
 */

const fs = require('fs');

const dirName = process.argv[2];

if (!dirName) {
    console.log('文件夹名称不能为空！');
    console.log('示例：yarn template goodMenu/test');
    process.exit(0);
}


function titleCase(str) {
    const array = str.toLowerCase().split(' ');
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
    }
    const string = array.join(' ');
    return string;
}

// 页面模版
const indexTep = `
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import PropTypes from "prop-types"
import {Form, Input, Button, DatePicker, Checkbox, InputNumber, Upload, Icon, Modal, Radio, Drawer, Card} from 'antd';

import "./index.less"

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }


    componentDidMount() {

    }

    render() {

        return (
            <div>
                111
            </div>
        )
    }
}

export default Index;

Index.defaultProps = {
    data:[]
};
Index.propTypes = {
    data: PropTypes.array.isRequired//必须有
};
`;

// less文件模版
const lessTep = ``;

// model文件模版
const modelTep = `
import {queryShopList} from './service';
import {scenicid, shopid} from '@/utils/scenicid';

export default {
    namespace: 'groupBuy',
    state: {
        data: [],
    },
    effects: {
        * fetch(action, {call, put}) {
            // const { banner } = yield select(state => state.home);
            const {data} = yield call(queryShopList, scenicid()['id']);
            yield put({
                type: 'save',
                payload: {
                    data: data,
                },
            });
        },
    },
    reducers: {
        save(state, {payload}) {
            return {...state, ...payload};
        },
    },
};
`;

// service页面模版
const serviceTep = `
import axios from '@/api/axios';
import {url} from '@/api/config'

import {getCookie} from "@/utils/cookie";

export const queryShopList = (id) => {
    const baseUrl = '';
    return axios.get(baseUrl);
};
`;


fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync('index.js', indexTep);
fs.writeFileSync('index.less', lessTep);
fs.writeFileSync('model.js', modelTep);
fs.writeFileSync('service.js', serviceTep);

console.log(`模版${dirName}已创建,请手动增加models`);

process.exit(0);



```
