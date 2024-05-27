<template>
    <div class="dynamic">
        <vue-seamless-scroll :data='dynamicList' class="dynamic-warp">
            <div class="dynamic-list" v-for="item in dynamicList" :key="item.name">
                <div class="dynamic-list-left">
                    <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                </div>
                <div class="dynamic-list-right">
                    <p class="dynamic-list-right-top">
                        <span>{{item.name}}</span>
                        <span>{{item.type}}</span>
                        <span>{{item.msg}}</span>
                    </p>
                    <p class="dynamic-list-right-bottom">
                        {{item.time}}
                    </p>
                </div>
            </div>
        </vue-seamless-scroll>
    </div>
</template>

<script>
// 滚动样式详见: https://chenxuan1993.gitee.io/component-document/index_prod#/component/seamless-default
export default {
    data(){
        return {
            dynamicList:[
                {
                    name: '小张',
                    type: '提交了',
                    msg: '低保人群申请',
                    time: '12-10 10:12'
                },
                {
                    name: '小李',
                    type: '提交了',
                    msg: '重疾申请',
                    time: '12-10 10:12'
                },
                {
                    name: '小王',
                    type: '审批通过了',
                    msg: '重疾申请',
                    time: '12-10 10:12'
                },
                {
                    name: '小林',
                    type: '打回了',
                    msg: '低保申请',
                    time: '12-10 10:12'
                },
                {
                    name: '小时',
                    type: '提交了',
                    msg: '低保申请',
                    time: '12-10 10:12'
                },
                {
                    name: '小七',
                    type: '提交了',
                    msg: '残疾人申请',
                    time: '12-10 10:12'
                },
                {
                    name: '小齐',
                    type: '审批了',
                    msg: '残疾人申请',
                    time: '12-10 10:12'
                },
                {
                    name: '小新',
                    type: '创建了',
                    msg: '社区管理员账号',
                    time: '12-10 10:12'
                },
                {
                    name: '小金',
                    type: '创建了',
                    msg: '街道管理员账号',
                    time: '12-10 10:12'
                },
                {
                    name: '小毛',
                    type: '提交了',
                    msg: '残疾人申请',
                    time: '12-10 10:12'
                }
            ]
        }
    }
}
</script>

<style scoped>
.dynamic{
    width: 100%;
    height: auto;
}
.dynamic-warp{
    height: 651px;
    overflow: hidden;
}
.dynamic-list{
    width: 100%;
    height: 93px;
    padding: 25px 0;
    border-bottom: 1px solid #dcdfe6;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}
.dynamic-list:hover{
    background: #DBFEFB;
}
.dynamic-list-left,.dynamic-list-left img{
    width: 42px;
    height: 42px;
    border-radius: 21px;
    overflow: hidden;
    margin-right: 25px;
}
.dynamic-list-right{
    flex: 1;
    height: 42px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    
}
.dynamic-list-right .dynamic-list-right-top{
    font-size: 14px;
}
.dynamic-list-right-top span:nth-child(1){
    color: #3B3C3C;
    margin-right: 15px;
}
.dynamic-list-right-top span:nth-child(2){
    color: #7C7E81;
    margin-right: 5px;
}
.dynamic-list-right-top span:nth-child(3){
    color: #2E93FD;
}
.dynamic-list-right-bottom{
    color: #999999;
    font-size: 12px;
}
</style>