<template>
	<div id="container" class="bgf noScroll">
        <v-title> {{ pageTitle }}</v-title>
        <div id="loading" v-show="!showAllDiv">
            <img src="../../../static/img/logo2.png" alt="loading">
        </div>
        <div class="myWhiteBg "> <!--  --> 
            <div class="notice tleft" v-if="orderDetails.orderStatus=='00'">
                <p>逾期未支付订单将自动取消</p>
            </div>
            <div class="notice tleft" v-if="orderDetails.orderStatus=='02'">
                <span class="icon-time"></span>
                <p>订单还剩{{ comT }}自动确认完成</p>
            </div>
            <div class="normal" v-if="traceLength>=1&&(orderDetails.orderStatus=='02'||orderDetails.orderStatus=='08')">
                <router-link :to="{ path: 'logistics', query: { id: orderDetails.batchNo}}" class="justify">
                    <div class="box pLeft" v-if="(orderDetails.orderStatus=='02'||orderDetails.orderStatus=='08')&&traceLength==1">
                        <p class="active" v-if="trace">{{ trace.AcceptStation }}</p>
                        <p class="gray" v-if="trace">{{ trace.AcceptTime }}</p>
                        <p class="active" v-if="!trace">{{ traceReason }}</p>
                    </div>
                    <div class="box pLeft" v-if="orderDetails.orderStatus=='10'||traceLength>1"> 
                        <p class="active">该订单已拆成多个包裹发出，请查看详情。</p>
                    </div>
                    <div class="box pRight">
                        <span class="icon-arrow"></span>
                    </div>
                </router-link>
            </div>
            <div class="addList">
                <div class="justify top">
                    <div class="box name">
                        <p>{{ orderDetails.consignee }}</p>
                    </div>
                    <div class="box tel">{{ orderDetails.phone }}</div>
                </div>
                <div class="info">{{ orderDetails.areaName }} {{ orderDetails.address }}</div>
            </div>
            <div class="normal" v-for="(item,i) in orderDetails.orderItems">
                <router-link :to="{ path: '/shopDetails', query: { id: item.productId}}" class="orderListInfo justify">
                    <div class="img box">
                        <img :src="item.thumbnail" alt="">
                    </div>
                    <div class="des box">
                        <b>
                            <i v-if="item.productMark!=''">{{ item.productMark }}</i>
                            {{ item.fullName }}
                        </b>
                        <p v-if="item.specDesc">规格：{{ item.specDesc }}</p>
                        <div class="price clearfix">
                            <p>¥{{ item.price }}</p>
                            <span>x{{ item.quantity }}</span>
                            <!-- <i> 超出配送范围</i> -->
                        </div>
                    </div>
                </router-link>
                <div class="tright">
                    <div class="noBgBtn min" v-if="(orderDetails.orderStatus=='02'||orderDetails.orderStatus=='01')&&item.refunds.id==''" @click="askRefund(item.paymentMoney,item.id)">
                        申请退款
                    </div>
                    <div class="noBgBtn min" v-if="orderDetails.orderStatus=='08'&&item.refunds.id==''" @click="servers(item.id,orderDetails.cancelFlag,item.paymentMoney)">
                        申请售后
                    </div>
                    <router-link :to="{ path: '/refunds/refundDetails', query: { id: item.refunds.id}}" class="noBgBtn min" v-if="orderDetails.orderStatus=='04'||item.refunds.id!=''">
                        退款详情
                    </router-link>
                    <div class="noBgBtn min" v-if="orderDetails.orderStatus=='00'&&i==orderDetails.orderItems.length-1" @click="showdelPop=true">
                        取消订单
                    </div>
                    <div class="noBgBtn active min" v-if="item.type==='pt' && item.ptCreateId">
                        <router-link :to="'/groupDetails?tid=' + orderDetails.ptCreateId + '&pid=' + item.productId + '&orderId=' + orderId + '&batchNo=' + batchNo">
                            拼团详情
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="normal">
                <ul class="leftRight">
                    <li class="clearfix">
                        <span class="fleft">商品合计</span>
                        <span class="fright">¥{{ orderDetails.amount | priceFloat }}</span>
                    </li>
                    <li class="clearfix">
                        <span class="fleft">运费</span>
                        <span class="fright">¥{{ orderDetails.freight }}</span>
                    </li>
                    <li class="clearfix" v-if="orderDetails.deductibleAmount!=0">
                        <span class="fleft">优惠</span>
                        <span class="fright">-¥{{ orderDetails.deductibleAmount }}</span>
                    </li>
                    <li class="clearfix">
                        <span class="fleft">实付金额</span>
                        <span class="fright">¥{{ orderDetails.paymentAmount }}</span>
                    </li>
                </ul>
            </div>
            <div class="normal statuS justify" style="padding-bottom:70px; padding-top:20px;">
                <ul class="left box">
                    <li>下单时间：{{ orderDetails.createDate | formatDateMore }}</li>
                    <li v-if="orderDetails.orderStatus!='00'&&orderDetails.orderStatus!='09'">付款时间：{{ paymentDate | formatDateMore }}</li>
                    <li>订单编号：{{ orderDetails.sn }}</li>
                </ul>
                <router-link :to="{ path: '/server'}" class="right box btn">
                    <span class="icon-message"></span>
                    <p>联系客服</p>
                </router-link>
            </div>
        </div>
        <div class="totalPrice justify" v-if="orderDetails.orderStatus=='00'">
            <div class="box left">
                实付款<span><i class="minIcon active">¥</i>{{ orderDetails.paymentAmount }}</span>
            </div>
            <div class="box right" v-if="orderDetails.orderStatus=='00'">
                <div class="sureBtn active" @click="showPayPop = true">付款 {{ payT }}</div>
            </div>
        </div>
        <div class="totalPrice" v-if="orderDetails.orderStatus=='02'">
            <div class="sureBtn active only" @click="completeOrder()">确认收货</div>
        </div>

        <!-- 是否取消订单 -->
        <div class="popBg" v-show="showdelPop"></div>
        <div class="popOr" v-show="showdelPop">
            <div class="tip">订单还未付款，确定取消吗？</div>
            <div class="clearfix">
                <div class="fleft btn" @click="cancelOrder(orderDetails.id)">取消订单</div>
                <div class="fright btn" @click="showdelPop = false">再考虑下</div>
            </div>
        </div>
        <!-- 无法退款客服 -->
        <div class="popBg" v-show="showshPop" @click="showshPop = false"></div>
        <div class="popRefunds" v-show="showshPop">
            <div class="close">
                <span class="icon-close" @click="showshPop = false"></span>                
            </div>
            <div class="logo">
               <img src="../../../static/img/clock.png" alt="">
            </div>
            <div class="tip">无法退款</div>
            <div class="info">
                <p>该商品已超过7天可退款时间<br/> 暂不支持在线退款申请</p>
            </div>
            <div class="bottom">
                <div class="btn">联系客服</div>
            </div>
        </div>
        <!-- 退款提示 -->
        <div class="popBg" :class="isRefund? 'show' : 'hide'" @click="closeBg()"></div>
        <div class="popRefunds hide">
            <div class="close">
                <span class="icon-close"></span>                
            </div>
            <div class="logo">
                <img src="../../../static/img/logo2.png" alt="">
            </div>
            <div class="tip">仅退款/退货退款注意事项</div>
            <div class="info">
                <ul>
                    <li><span>01</span>如需办理退货，请将退款订单下所有数量的商品及赠品一并返回我们办理退货手续。</li>
                    <li><span>02</span>使用优惠券支付的订单，如发生退货，结算金额按照商品支付金额减去优惠券的金额退款，优惠券不予兑现。</li>
                    <li><span>03</span>订单申请退款，已经发出的优惠券无法进行退回。</li>
                    <li><span>04</span>实际退款金额和申请金额或有差额（如运费、商品破损等情况），最终退款金额以商家核对后，实际退款金额为准。</li>
                </ul>
            </div>
            <div class="bottom">
                <div class="btn">知道了</div>
            </div>
            <div class="copyright">本细则最终解释权归小煮集市所有</div>
        </div>
        <div class="popSendMethod" :class="isRefund? 'show' : 'hide'">
            <div class="tip">
                <p>处理方式</p>
                <span class="icon-close" @click="closeBg()"></span>
            </div>
            <ul>
                <li class="item justify" @click="refund(1)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 仅退款</b>
                        <p> 未收到货（包含签收），或商家协商同意前提下</p>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:active==1}"></span>
                    </div>
                </li>
                <li class="item justify" @click="refund(2)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 退货退款</b>
                        <p> 已收到货，需要退已收到的货物</p>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:active==2}"></span>
                    </div>
                </li>
            </ul>
            <div class="blank"></div>
            <div class="closeBtn sureBtn active" @click="closeBg()">关闭</div>
        </div>
         <payOrder :orderId="orderId" v-show="showPayPop" v-on:closePop="showPayPop = false"></payOrder>
    </div>
</template>
<script>
    import popMin from '@/components/popMin.js'
    import VTitle from '@/components/title'
    import common from '@/components/common'
    import payOrder from '@/components/payOrder'
    export default {
        data () {
            return {
                pageTitle: '',
                orderId:'',
                sn:'',
                batchNo:'',//批次号，用于待付款订单详情页
                orderDetails:'',
                orderStatus:'',
                isRefund: false,
                showdelPop: false,
                showshPop: false,
                paymentDate: '',
                active: '',
                trace: '',
                traceReason:'',
                traceLength:'',
                itemM:'',
                itemId:'',
                commpleteT:'',
                cancelT:'',
                comT: '' ,
                payT: '' ,
                showPayPop:false,
                showAllDiv: false,
            }
        },
        components: { 
            common,
            VTitle,
            popMin,
            payOrder,
        },
        created () {
            var obj = common.getUrlPars(window.location.href)
            this.sn = obj.sn
            this.orderId = obj.orderId
            this.batchNo = obj.batchNo
        	this.getDetials()
        },
        methods: { 
            getDetials:function(v) {
            	var _this = this;
            	var _detailsUrl = '/wechatecom/appserver/order/details?sn='+ this.sn 
            	_this.ajaxDataFun('post',_detailsUrl,function(obj){
                    if(obj.code == '200'){
                        _this.showAllDiv = true
                        let orderStatus = obj.data.orderStatus;
                        _this.orderStatus = orderStatus;
                        _this.orderDetails = obj.data;
                        _this.paymentDate = obj.data.payments[0].paymentDate;
                        _this.traceLength = obj.data.shippings.length;
                        if(obj.data.shippings[0]){
                            if(obj.data.shippings[0].jsonObject){
                                if(obj.data.shippings[0].jsonObject.Traces.length>0){
                                    _this.trace = obj.data.shippings[0].jsonObject.Traces.reverse()[0];
                                }else{
                                    _this.traceReason = obj.data.shippings[0].jsonObject.Reason;
                                }
                            }
                        }
                        if(orderStatus == '02'){//已发货状态下 有自动确认收货的倒计时
                            _this.commpleteT = obj.data.completeTime;
                        }else if(orderStatus == '00'){//待付款状态下 有时间倒计时
                            _this.cancelT = obj.data.expireTime;
                        }
                        if(orderStatus=='00'){
                            _this.pageTitle = '订单待付款';
                        }else if(orderStatus=='01'){
                            _this.pageTitle = '订单待发货';
                        }else if(orderStatus=='02'){
                            _this.pageTitle = '订单已发货';
                        }else if(orderStatus=='10'){
                            _this.pageTitle = '订单部分发货';
                        }else if(orderStatus=='03'){
                            _this.pageTitle = '订单部分退货';
                        }else if(orderStatus=='04'){
                            _this.pageTitle = '订单已退货';
                        }else if(orderStatus=='05'){
                            _this.pageTitle = '订单部分退款';
                        }else if(orderStatus=='06'){
                            _this.pageTitle = '订单已退款';
                        }else if(orderStatus=='08'){
                            _this.pageTitle = '订单已完成';
                        }else if(orderStatus=='09'){
                            _this.pageTitle = '订单已取消';
                        }
                    }
                })
            },
            askRefund:function(itemM,itemId){
                this.itemM = itemM;
                this.itemId = itemId;
                if(this.orderStatus=='01'){
                    // 申请退款
                    this.$router.push('/refunds/applyRefund?id='+itemId+'&type=1&itemM='+itemM);
                }else{
                    this.isRefund = !this.isRefund;
                }
            },
            cancelOrder: function(id) {
                var _this = this;
                _this.showdelPop = false;
                var _updateUrl = '/wechatecom/appserver/order/updateStatus?orderId='+ id +'&orderStatus=09';
                _this.ajaxDataFun('post',_updateUrl,function(obj){
                    if(obj.code == '200'){
                        popMin.show("icon-success","取消成功");
                        _this.getDetials();
                    }
                })
            },
            refund: function(i) {
                this.active = i;
                console.log(i)
                this.$router.push('/refunds/applyRefund?id='+this.itemId+'&type='+i+'&itemM='+this.itemM);
            },
            servers: function(id, flag, itemM) {
                if(flag==1){
                    this.showshPop = true;
                }else{
                    this.askRefund(itemM, id);
                }
            },
            closeBg: function() {
                this.active = 0;
                this.isRefund = !this.isRefund;
            },
            completeOrder:function(status){
                var _this = this;
                var _completeUrl = '/wechatecom/appserver/order/updateStatus?orderId='+ _this.orderId +'&orderStatus=08';
                _this.ajaxDataFun('post',_completeUrl,function(obj){
                    if(obj.code == '200'){
                        popMin.show("icon-success","已确认收货");
                        _this.getDetials();
                    }
                })
            },
            setv:function(v){
                v = v < 10?'0' + v : v;
                return v;
            }
        },
        mounted: function() {
            let count = setInterval(()=>{
                if(this.commpleteT <= 0 || this.commpleteT==''){
                    clearInterval(count);
                }else{
                    this.commpleteT --;
                }
            },1000);
            let countPay = setInterval(()=>{
                if(this.cancelT <= 0 || this.cancelT==''){
                    clearInterval(countPay);
                }else{
                    this.cancelT --;
                }
            },1000);
        },
        watch:{
            commpleteT:function() {
                let _this = this;
                let value = this.commpleteT;
                let mm = Math.floor(value / 60);
                let ss = value % 60;
                let hh = Math.floor(mm / 60);
                mm = mm % 60;
                let day = Math.floor(hh / 24);
                hh = hh % 24;
                if(value == 0){
                    console.log('completeOrder')
                    _this.completeOrder()
                }else if(value > 0){
                    _this.comT = _this.setv(day) + '天' + _this.setv(hh) + '小时' + _this.setv(mm) + '分钟' + _this.setv(ss) + '秒';
                }
            },
            cancelT:function() {
                let _this = this;
                let value = this.cancelT;
                let mm = Math.floor(value / 60);
                let ss = value % 60;
                let hh = Math.floor(mm / 60);
                mm = mm % 60;
                let day = Math.floor(hh / 24);
                hh = hh % 24;
                if(value == 0){
                    console.log('cancelOrder')
                    _this.cancelOrder(_this.orderId)
                }else if(value > 0){
                    _this.payT = _this.setv(hh) + ':' + _this.setv(mm) + ':' + _this.setv(ss);
                }
            }
        },
        filters:{
            priceFloat:function(v){
                if(v){
                    return v.toFixed(2)
                }
            }
        }
    }
</script>