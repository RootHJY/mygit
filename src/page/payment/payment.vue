<template>
    <div id="container" class="bgf paddingBt50 noScroll">
        <v-title> {{ pageTitle }}</v-title>
        <div id="loading" v-show="!showAllDiv">
            <img src="../../../static/img/logo2.png" alt="loading">
        </div>
        <div class="myWhiteBg">
            <div class="notice" style="text-align:left" v-show="notice">
                <span class="icon-notice"></span>
                <p>
                    <marquee behavior="1" direction="left" loop="-1">
                        {{ notice.noticeName }}
                    </marquee>
                </p>
            </div>
            <div class="addAdd" v-show="!receiver">
                <router-link to="/center/editAdd?fromOrder=1"><span class="icon-cart_increase"></span>添加地址 </router-link>
            </div>
            <orderAdd v-show="receiver"></orderAdd>
            <div class="normal">
                <div class="clearfix"> 
                    <div class="fleft"> 配送方式 </div>
                    <div class="fright">
                        <p>普通快递</p>
                    </div>
                </div>
            </div>
            <div class="normal">
                <div class="clearfix" @click="chooseCouponF">
                    <div class="fleft">优惠券</div>
                    <div class="fright">
                        <p class="active" v-show="!$store.state.orderCouponMoney && availableCouponCount"> {{ availableCouponCount }}张可用 </p>
                        <p v-show="!availableCouponCount && !$store.state.orderCouponMoney">无可用优惠券</p>
                        <p class="active" v-show="availableCouponCount && $store.state.orderCouponMoney">- ¥{{ $store.state.orderCouponMoney }}</p>
                        <span class="icon-arrow"></span>
                    </div>
                </div>
            </div>
            <orderMemo></orderMemo>
            <div class="normal">
                <ul class="leftRight">
                    <li class="clearfix">
                        <span class="fleft">商品合计</span>
                        <span class="fright">¥{{ itemTotalPrice }}</span>
                    </li>
                    <li class="clearfix">
                        <span class="fleft">运费</span>
                        <span class="fright">¥{{ shippingPrice }}</span>
                    </li>
                    <li class="clearfix" v-if="promotionPrice">
                        <span class="fleft">优惠</span>
                        <span class="fright">-¥{{ promotionPrice }}</span>
                    </li>
                </ul>
            </div>
            <div class="normal paddingBt50" style="padding-top:0;">
                <div class="orderListInfo justify" v-for="item in itemList">
                    <div class="img box">
                        <router-link :to="{ path: 'shopDetails', query: { id: item.product.id}}">
                            <img :src="item.product.image" alt="">
                            <img src="../../../static/img/fff.png" v-if="!item.product.image">
                        </router-link>
                    </div>
                    <router-link :to="{ path: 'shopDetails', query: { id: item.product.id}}" class="des box">
                        <b>
                            <i v-if="item.product.productMark">{{ item.product.productMark}}</i> 
                            {{ item.product.name }}
                        </b>
                        <p>规格：{{ item.specDesc }}</p>
                        <div class="price clearfix">
                            <p> ¥{{ item.price }} 
                                <i v-show="item.stockOver">库存不足</i>
                                <!-- <i v-show="">超出运送范围</i> -->
                            </p>
                            <span>x{{ item.quantity }}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="totalPrice justify">
            <div class="box left">
                实付款<span><i class="minIcon active">¥</i>{{ needPayPrice }}</span>
            </div>
            <div class="box right">
                <div class="sureBtn" :class="{active:$store.state.orderAddId && !alertMsg}" @click="cerateOrder">
                    去付款({{ itemList.length }}) 
                </div>
            </div>
        </div>
        <payOrder :orderId="orderId" v-show="showPayPop" v-on:closePop="showPayPop = false"></payOrder>
    </div>
</template>

<script>
    import VTitle from '@/components/title'
    import common from '@/components/common'
    import popMin from '@/components/popMin'
    import orderAdd from './orderAdd'
    import orderMemo from './orderMemo'
    import payOrder from '@/components/payOrder'
    export default {
        data () {
            return {
                pageTitle: '填写订单',
                itemList: '',
                itemTotalPrice: '',
                alertMsg: '',
                needPayPrice: '',
                availableCouponCount: '',
                notice: '',
                receiver: '',
                shippingPrice: '',
                promotionPrice: '',
                orderItems: '',
                orderAddId: '',
                promotionId: '',
                promotionType: '',
                ptId: '',
                orderId: [],
                showPayPop: false,
                showAllDiv: false,
            }
        },
        components: { 
            orderAdd,
            orderMemo,
            VTitle,
            payOrder,
            common,
        },
        created () {
            this.initData() //获取订单列表
        },
        methods: { 
            initData:function(){
                this.orderItems = this.$store.state.orderItems || localStorage.getItem('orderItems') || ''
                this.promotionId = this.$store.state.promotionId || localStorage.getItem('promotionId') || ''
                this.promotionType = this.$store.state.promotionType || localStorage.getItem('promotionType') || ''
                this.ptId = this.$store.state.ptId || localStorage.getItem('ptId') || ''
                this.orderId = localStorage.getItem('orderId') || []

                if(this.orderId.length > 0){
                    this.$store.state.orderTabActive = '00'
                    this.$router.push('/center/orderList') 
                }

                console.log("orderItems=" + this.orderItems)
                console.log("promotionId=" + this.promotionId)
                console.log("promotionType=" + this.promotionType)
                console.log("ptId=" + this.ptId)
                console.log("orderId=" + this.orderId)
                this.getOrderList() //获取订单列表
            },
            getOrderList:function(){
                var _this = this
                var _billUrl = "/wechatecom/appserver/order/bill.do?items=" + this.orderItems + "&promotionId=" + _this.promotionId + "&promotionType=" +  _this.promotionType + "&ptId=" + _this.ptId + "&receiverId=" + _this.orderAddId  + "&couponRecordId=" + _this.$store.state.orderCouponId
                this.ajaxDataFun('post',_billUrl,function(obj){
                    if(obj.code == '200'){
                         _this.showAllDiv = true
                        var _data = obj.data;
                        _this.itemList = _data.itemList
                        _this.availableCouponCount = _data.availableCouponCount
                        _this.itemTotalPrice = _data.itemTotalPrice
                        _this.needPayPrice = _data.needPayPrice
                        _this.alertMsg = _data.alertMsg
                        _this.notice = _data.notice
                        _this.receiver = _data.receiver
                        _this.orderAddId = _data.receiver.id

                        if(!_this.$store.state.orderAddId){
                            _this.$store.state.orderAddId = _data.receiver.id
                            _this.$store.state.orderAddName = _data.receiver.consignee
                            _this.$store.state.orderAddTel = _data.receiver.phone
                            _this.$store.state.orderAddDes = _data.receiver.areaName + _data.receiver.address
                        }

                        _this.shippingPrice = _data.shippingPrice
                        _this.promotionPrice = _data.promotionPrice
                    }
                })
            },
            cerateOrder:function(){
                var _this = this

                if(!_this.orderAddId){
                    popMin.show('icon-sign','请填写收货地址')
                    return
                } 

                if(this.alertMsg){
                    popMin.show('icon-sign',this.alertMsg)
                    return 
                }else{
                    if(_this.orderId.length > 0){
                        _this.showPayPop = true
                        console.log("订单ID已存在===" + _this.orderId)
                    }else{
                        var _createUrl = "/wechatecom/appserver/order/create.do?items=" + _this.orderItems + "&promotionId=" +  _this.promotionId + "&promotionType=" +  _this.promotionType + "&ptId=" + _this.ptId + "&receiverId=" + _this.$store.state.orderAddId + "&couponRecordId=" +  _this.$store.state.orderCouponId + "&memo=" +  _this.$store.state.orderMemo

                        this.ajaxDataFun('post',_createUrl,function(obj){
                            if(obj.code == '200'){
                                for(let item of obj.data){
                                    _this.orderId.push(item.id)
                                }

                                localStorage.setItem('orderId', _this.orderId)
                                _this.showPayPop = true
                                _this.getMcartNum()
                                console.log("创建订单成功,订单ID====" + _this.orderId)
                            }
                        })
                    }
                }
            },
            getMcartNum:function(){
                var _this = this
                var numUrl = "/wechatecom/appserver/cart/getCartSkuCount.do"
                this.ajaxDataFun('post',numUrl,function(obj){
                    if(obj.code == '200'){
                        _this.$store.state.cartNum = obj.data.count
                        localStorage.setItem('cartNum', obj.data.count)
                    }
                })
            },
            chooseCouponF:function(){
                this.$router.push('/chooseCoupon') 
            },
        },
    }
</script>
