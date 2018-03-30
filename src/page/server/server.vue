<template>
    <div id="container" class="bgf paddingBt80">
        <v-title> {{ pageTitle }}</v-title>
        <div class="server">
            <div class="notice">
                <span class="icon-notice"></span>
                <p>
                    <marquee behavior="1" direction="left" loop="-1">
                    我们的工作时间为周一至周五9:30-18:30，您的留言我们将尽快回复
                    </marquee>
                </p>
            </div>
            <div class="defaulTip" v-show="!enterInfo">
                <p>*发货时间：每周一至周六安排订单发货（特殊情况如爆仓、法定节假日等除外），周日不发货，请各位亲谅解</p>
                <p>*发货仓库：售卖商品从全国多仓发货，亲们购买了多个商      品会因此产生不同的包裹信息，请耐心等待</p>
                <p>*电话客服：如您情况紧急，也可拨打客服电话，极速帮您处理疑问  400-700-1066</p>
            </div>
            <sendInfo :enterInfo="enterInfo" v-on:childFun="childFun"></sendInfo>
            <section v-show="!enterInfo">
                <router-link v-for="item in dataList" :to="{ path: 'serverDetails', query: { id: item.id}}" class="chatBox" >
                    <div class="list ">
                        <span>我</span>
                        <p class="content">{{ item.content }}</p>
                        <em>{{ item.createDate | formatDateMore}}</em>
                    </div>
                    <div class="list answer" v-for="list in item.consultDetailList">
                        <span :class="{ed:item.isRead == '1'}"> 客服</span>
                        <p class="content"> {{ list.content }}</p>
                        <em>{{ list.createDate | formatDateMore}}</em>
                    </div>
                </router-link>
            </section>
            <div class="fixBottom" v-show="!enterInfo">
                <div class="sureBtn font16 active" @click="enterInfo = true">发布问题</div>
                <div class="addWechat" @click="showQr = true">
                    <span class="icon-kefu"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span>
                    <p>微信客服</p>
                </div>
            </div>
            <div class="popBg" v-show="showQr" @click="showQr = false"></div>
            <div class="popAddCus" v-show="showQr">
                <div class="close" @click="showQr = false">
                    <span class="icon-close"></span>
                </div>
                <b>小煮客服</b>
                <div class="img">
                    <img src="../../../static/img/cus.jpg" alt="" />
                </div>
                <p>微信扫一扫添加客服</p>
            </div>
        </div>
    </div>  
</template>

<script>
    import sendInfo from './sendInfo'
    import VTitle from '@/components/title'
    export default {
        data () {
            return {
                pageTitle: '小煮客服',
                currentPage: 1,
                pageSize: 10,
                dataList: '',
                enterInfo: false,
                isEnter: false,
                showQr: false,
                endListen: false,
            }
        },
        components: { 
            sendInfo,
            VTitle,
        },
        created () {
          this.getListF()
        },
        methods: { 
            getListF:function(scroll){
                var _this = this
                     _this.endListen = false
                var charUrl = "/api/consult/list.do?currentPage=" + this.currentPage + "&pageSize=" + this.pageSize
                this.ajaxDataFun('post',charUrl,function(obj){
                    var objLen = obj.data.length;
                    if(scroll){
                        if(objLen){
                            for(var j=0; j < objLen; j++){
                                _this.dataList.push(obj.data[j]);
                            }
                            _this.$set(_this.$data, 'dataList', _this.dataList);
                        }else{
                            _this.endListen = true
                            _this.$store.state.loadingTxt = ''
                        }
                    }else{
                        _this.dataList = obj.data
                    }
                })
            },
            childFun:function(v){
                this.enterInfo = false
                this.dataList = v
            }
        },
        mounted (){
            var _this = this;
            var warpDom = document.getElementById('container')
            var innerHt = warpDom.clientHeight  //显示区域高度
            var scrollTopTop  //滚动条距离顶部高度
            var allHeight //总高度到底部

            warpDom.addEventListener('scroll', function() {
                scrollTopTop = warpDom.scrollTop;　
                allHeight = warpDom.scrollHeight;　
                if(scrollTopTop + innerHt ==  allHeight){
                    if(!_this.endListen) {
                        _this.currentPage++
                        _this.getListF(1)
                    }
                    console.log(_this.currentPage)
                }
            })
        }
    }

</script>
<style lang="scss" scoped>
.content{-webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; display: -webkit-box!important; padding-left: 15%;width:100%!important;}
</style>
