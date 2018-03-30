<template>
	<div id="container" class="bgf">
        <v-title> {{ pageTitle }}</v-title>
        <div class="orderList " v-for="item in refundsData">
            <div class="orderItem">
                <div class="orderListTop">
                    <div class="clearfix">
                        <div class="orderNum">服务编号:{{ item.refundsSn }}</div>
                    </div>
                </div>
                <div class="orderListInfo justify">
                    <div class="img box">
                        <img :src="item.orderItem.thumbnail" alt="">
                    </div>
                    <div class="des box min">
                        <b>{{ item.orderItem.fullName }}<span>x{{ item.orderItem.quantity }}</span></b>
                        <p v-if="item.orderItem.specDesc">规格：{{ item.orderItem.specDesc }}</p>
                        <span class="backM">退款金额：¥{{ item.orderItem.paymentMoney }}</span>
                    </div>
                </div>
                <div class="orderListbottom">
                    <div class="justify">
                        <div class="box leftStatus">
                            <span v-if="item.status == 2" class="icon-icon_selected"></span>
                            <span v-if="item.status == 0||item.status == 5||item.status == 7||item.status == 8" class="icon-omited"></span>
                            <span v-if="item.status == 4||item.status == 1||item.status == 6" class="icon-sign"></span>
                            <p v-if="item.status == 0">待审核</p>
                            <p v-if="item.status == 1">退款失败</p>
                            <p v-if="item.status == 2">退款成功</p>
                            <p v-if="item.status == 7">
                                 <router-link :to="'/refunds/addLogistic?id=' + item.id">
                                    请退货并填写物流信息
                                </router-link>
                            </p>
                            <p v-if="item.status == 8">待确认收货</p>
                            <p v-if="item.status == 4">退款失败</p>
                            <p v-if="item.status == 6">退款关闭</p>
                            <p v-if="item.status == 5">卖家确认收货</p>
                        </div>
                        <div class="box">
                            <div class="nobgBtn">
                                <router-link :to="{ path: '/refunds/refundDetails', query: { id: item.id}}">查看详情</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popNotCart" v-if="refundsData.length == 0">
            <div class="content">
                <img src="../../../static/img/notorder.png" alt="" />
                <p>WORD天!怎么没订单!?</p>
                <span>
                <router-link :to="{ path: '/'}"> 去逛逛 </router-link>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    // import login from '@/components/login'
    import VTitle from '@/components/title'
    export default {
        data () {
            return {
                pageTitle: '退款／售后',
                showLogin: true,
                refundsData:[],
                endListen: false,
                currentPage:1,
                pageSize:10,
            }
        },
        components: { 
            VTitle,
        },
        created () {
            this.refundList();
        },
        methods: { 
            refundList: function(v){
                var _this = this;
                    _this.endListen = false
                var _refundUrl = '/wechatecom/appserver/refund/refundList?currentPage='+ this.currentPage + '&pageSize=' + this.pageSize;
                this.ajaxDataFun('post',_refundUrl,function(obj){
                    if(obj.code == '200'){
                        if(v){
                            var objLen = obj.data.length;
                            if(objLen){
                                for(var j=0; j < objLen; j++){
                                    _this.refundsData.push(obj.data[j]);
                                }
                                _this.$set(_this.$data, 'refundsData', _this.refundsData);
                            }else{
                                _this.endListen = true
                                _this.$store.state.loadingTxt = ''
                            }
                        }else{
                            _this.refundsData = obj.data
                        }
                    }
                })
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
                    if(!_this.endListen){
                        _this.currentPage++
                        _this.refundList(1)
                    }
                    console.log(_this.currentPage)
                }
            })
        }
    }
</script>
<style lang="scss" scoped>
    #container{padding-top:14px;}
</style>