<template>
    <div id="container" class="noScroll bgf">
        <v-title> {{ pageTitle }}</v-title>
        <div class="myWhiteBg " v-show="isSuccess">
            <div class="normal payment ">
                <img src="../../../static/img/payment.png" alt="" />
                <p>订单支付成功</p> 
                <div class="price">
                    <span class="money">¥</span>{{ amount }}
                </div>               
            </div>
            <div class="normal">
                <ul class="leftRight bigli">
                    <li class="clearfix">
                        <span class="fleft">付款金额：</span>
                        <span class="fright light">¥{{ amount }}</span>
                    </li>
                    <li class="clearfix">
                        <span class="fleft">订单编号：</span>
                        <span class="fright">{{ batchNo }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="botBtn justify" v-show="isSuccess">
            <div class="box">
                <div class="noBgBtn" @click="goOrder">查看订单</div>
            </div>
            <div class="box">
                <div class="sureBtn active"> 
                    <router-link :to="'/orderShare?batchNo=' + batchNo"> 
                        我要晒单 
                    </router-link>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
    import common from '@/components/common'
    import VTitle from '@/components/title'
    export default {
        data () {
            return {
                pageTitle: '支付状态',
                tradeNo: '',
                amount: '',
                batchNo: '',
                orderId: '',
                isSuccess: false,
            }
        },
        components: { 
            VTitle
        },
        created () {
            this.$store.state.orderMemo = ''
            this.getStatus()
        },
        methods: { 
            goOrder:function(){
                this.$store.state.orderTabActive = '01'
                this.$router.push('/center/orderList')
            },
            getStatus:function(){
                var _this = this
                var _locaUrl = window.location.href
                var _tradeUrl = ''

                if(_locaUrl.indexOf('tradeNo=') > -1){
                    this.tradeNo = common.getUrlPars(_locaUrl).tradeNo
                }

                if(_locaUrl.indexOf('isWechat=') > -1){
                    _tradeUrl = "/api/paymentQuery/wxpayTradeQuery.do?tradeNo=" + this.tradeNo
                }else{
                    _tradeUrl = "/api/paymentQuery/alipayTradeQuery.do?tradeNo=" + this.tradeNo
                }

                this.ajaxDataFun('post',_tradeUrl,function(obj){
                    if(obj.code == '200'){
                        _this.isSuccess = true
                        _this.amount = obj.data.amount
                        _this.batchNo = obj.data.batchNo
                        _this.orderId = obj.data.orderId
                        _this.pageTitle = '支付成功'
                    }else{
                        _this.pageTitle = '支付失败'
                        _this.isSuccess = false
                        _this.$router.push('/center/orderList')
                    }
                })
            }
        }
    }
</script>

