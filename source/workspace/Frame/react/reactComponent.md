---
abbrlink: d82f441
title: React封装的组件
date: 2019-03-17
categories: 
- FE框架 
- React
---

<strong class='old-blog'>React封装的组件</strong>

[[toc]]

### 高阶函数 ，封装context

```javascript
import React, { Component,createContext } from 'react';

export const Context = createContext();

export const ContextProvider = ({ context, children }) => {
    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    );
}
export const getChildrenContext = (contexts) => RealComponent => {
    return class extends Component {
        render() {
            return (
                <Context.Consumer>
                    {context => {
                        // 将顶层的context分发到各层
                        let mapContext = {};
                        if (Array.isArray(contexts)) {
                            contexts.map(item => mapContext[item] = context[item]);
                        } else {
                            mapContext = context;
                        }
                        return (
                            <RealComponent {...mapContext} {...this.props} />
                        )
                    }}
                </Context.Consumer>
            );
        }
    };
};

```

### 封装的裁剪功能 带压缩下载

```javascript
import React, {Component, Fragment} from 'react';
import lrz from 'lrz'
import {Upload, message, Button, Icon, Modal} from 'antd';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import "./index.less"

class cropper extends Component {
    state = {
        srcCropper: '', //cropper的图片路径
        selectImgName: '', //文件名称
        selectImgSize: '', //文件大小
        selectImgSuffix: '', //文件类型
        editImageModalVisible: false, //打开控制裁剪弹窗的变量，为true即弹窗
        imgData: [],
        loading: false,
        download: ""
    };
    downLoadImg = () => {
        // this.refs.cropper.getCroppedCanvas({maxWidth: 4096, maxHeight: 4096});
        this.setState({
            download: this.refs.cropper.getCroppedCanvas({
                maxWidth: 4096,
                maxHeight: 4096
            }).toDataURL()
        });


    };

    saveImg = async () => {
        const {loading} = this.state;
        if (loading) return;//防止重复提交
        this.setState({
            loading: true
        });
        // lrz压缩
        // this.refs.cropper.getCroppedCanvas().toDataURL() 为裁剪框的base64的值
        const {base64, base64Len} = await lrz(this.refs.cropper.getCroppedCanvas().toDataURL(), {quality: .6});
        const {imgData} = this.state;
        imgData.push(base64);
        this.setState({
            imgData,
            loading: false
        }, () => {
            this.handleCancel()
        });
        // console.log(base64, base64Len / 1024);
    };

    beforeUpload = (file) => {
        const isLt10M = file.size / 1024 / 1024 >= 10;
        // console.log(file.size / 1024 / 1024);
        if (isLt10M) { //添加文件限制
            message.error({content: '文件大小不能超过10M'});
            return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file); //开始读取文件
        // 因为读取文件需要时间,所以要在回调函数中使用读取的结果
        reader.onload = (e) => {
            this.setState({
                srcCropper: e.target.result,
                selectImgName: file.name,
                selectImgSize: (file.size / 1024 / 1024),
                selectImgSuffix: file.type.split("/")[1],
                editImageModalVisible: true,
            });
        };
        reader.onerror = (e) => {
            new Error('图片加载失败')
        };
        return false;
    };
    handleCancel = () => {
        this.setState({
            editImageModalVisible: false,
        });
    };


    render() {
        const {ratio, title} = this.props;
        const {srcCropper, editImageModalVisible, imgData, loading, download} = this.state;
        const props = {
            name: 'file',
            accept: "image/*",//文件类型
            showUploadList: false, //不以默认的列表显示
            beforeUpload: this.beforeUpload, //阻止自动上传
            onCancel: this.handleCancel
        };

        return (
            <Fragment>
                <Upload {...props}>
                    <Button htmlType={'button'} type="dashed">
                        <Icon type="upload"/>{title}
                    </Button>
                </Upload>

                <Modal
                    title="裁剪"
                    visible={editImageModalVisible}
                    loading={true}
                    closable={false}
                    footer={[
                        <Button key={'取消'}
                                icon={'redo'}
                                htmlType={'button'}
                                onClick={this.handleCancel}>
                            取消
                        </Button>,
                        <Button key={'保存'}
                                icon={'save'}
                                htmlType={'button'}
                                type="primary"
                                onClick={this.saveImg}
                                loading={loading}>
                            保存
                        </Button>,
                        <Button key={'下载'}
                                htmlType={'button'}
                                icon="download"
                                type="primary"
                                onClick={this.downLoadImg}>

                            <a href={download}
                               style={{color: '#fff', marginLeft: 5}}
                               download="cropped.jpg">下载</a>
                        </Button>
                    ]}
                >

                    <Cropper
                        key={'cropper'}
                        ref='cropper'
                        src={srcCropper}
                        style={{height: 300, width: '100%'}}
                        viewMode={1} //定义cropper的视图模式
                        zoomable={true} //是否允许放大图像
                        aspectRatio={ratio} //image的纵横比
                        guides={true} //显示在裁剪框上方的虚线
                        background={false} //是否显示背景的马赛克
                        rotatable={false} //是否旋转
                    />

                </Modal>
                <div className={'imgBox'}>
                    {
                        imgData.map((item, index) => {
                            return (<img
                                    src={item}
                                    alt={item}
                                    key={index}/>
                            )
                        })
                    }

                </div>

            </Fragment>

        )
    }
}

export default cropper;
cropper.defaultProps = {
    ratio: 1,
    src: 'https://fengyuanchen.github.io/cropperjs/images/picture.jpg',
    quality: 0.6,
    title: '上传图片'
};


```
