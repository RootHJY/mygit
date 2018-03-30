<template>
	<div id="container" class="bgf">
        <v-title> {{ pageTitle }}</v-title>
		<div class="orderFilter">
            <ul class="clearfix">
                <li :class="{active: active==''}" @click="changestatus('')">
                    全部
                </li>
                <li :class="{active: active=='00'}" @click="changestatus('00')">
                    待付款
                </li>
                <li :class="{active: active=='01'}" @click="changestatus('01')">
                    待发货
                </li>
                <li :class="{active: active=='02'}" @click="changestatus('02')">
                    已发货
                </li>
                <li :class="{active: active=='08'}" @click="changestatus('08')">
                    已完成
                </li>
            </ul>
        </div>
        <div class="orderList " v-for="item in orderList" v-if="orderList.length!=0">
            <div class="orderItem">
                <router-link :to="{ path: 'orderDetails', query: { id: item.id,batchNo:item.batchNo}}" class="orderListTop">
                    <div class="clearfix">
                        <div class="orderNum">订单编号{{ item.sn }}</div>
                        <div class="orderStatu" v-if="item.orderStatus=='00'">待付款</div>
                        <div class="orderStatu" v-if="item.orderStatus=='01'">待发货</div>
                        
                        <div class="orderStatu" v-if="item.orderStatus=='02'">已发货</div>
                        <div class="orderStatu" v-if="item.orderStatus=='10'">部分发货</div>

                        <div class="orderStatu" v-if="item.orderStatus=='03'">部分退货</div>
                        <div class="orderStatu" v-if="item.orderStatus=='04'">已退货</div>
                        <div class="orderStatu" v-if="item.orderStatus=='05'">部分退款</div>
                        <div class="orderStatu" v-if="item.orderStatus=='06'">已退款</div>

                        <div class="orderStatu" v-if="item.orderStatus=='08'">已完成</div>
                        <div class="orderStatu" v-if="item.orderStatus=='09'">已取消</div>
                    </div>
                </router-link>
                <router-link :to="{ path: 'orderDetails', query: { id: item.id, batchNo:item.batchNo, sn: item.sn }}" class="orderListInfo justify" v-for="shop in item.orderItems">
                    <div class="img box">
                        <img :src="shop.thumbnail" alt="">
                    </div>
                    <div class="des box">
                        <b>
                            <i v-if="shop.productMark!=''">{{ shop.productMark }}</i>
                            {{ shop.fullName }}
                        </b>
                        <p v-show="shop.specDesc">规格：{{ shop.specDesc }}</p>
                        <div class="price clearfix">
                            <p>¥{{ shop.price }} 
                                <i v-if="shop.status==='0'">待审核</i>
                                <i v-if="shop.status==='1'">拒绝退款</i>
                                <i v-if="shop.status==='2'">退款成功</i>
                                <i v-if="shop.status==='7'">请退货并填写物流信息</i>
                                <i v-if="shop.status==='8'">同意退款</i>
                                <i v-if="shop.status==='4'">拒绝退货</i>
                                <i v-if="shop.status==='5'">确认收货</i>
                                <i v-if="shop.status==='6'">退款关闭</i>
                            </p>
                            <span>x{{ shop.quantity }}</span>
                        </div>
                    </div>
                </router-link>
                <div class="orderListbottom">
                    <div class="justify">
                        <router-link :to="{ path: 'orderDetails', query: { id: item.id,batchNo:item.batchNo}}" class="box total">
                            <span>合计</span> <span class="minIconM">¥</span> {{ item.paymentAmount }}
                        </router-link>
                            <div class="box">
                            <div class="btnStatu" v-if="item.orderStatus=='00'" @click="changeOrderId(item.id)">付款</div>
                            <div class="nobgBtn" v-if="item.orderStatus=='02'||item.orderStatus=='10'">
                                <router-link :to="{ path: 'logistics', query: { id: item.batchNo}}">查看物流</router-link>
                            </div>
                            <div class="nobgBtn" v-if="item.orderStatus=='02'" @click="updateStatus(item.id)">确认收货</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popNotCart" v-if="orderList.length==0">
            <div class="content">
                <img src="../../../static/img/notorder.png" alt="" />
                <p>WORD天!怎么没订单!?</p>
                <span>
                <router-link :to="{ path: '/'}"> 去逛逛 </router-link>
                </span>
            </div>
        </div>
        <payOrder :orderId="orderId" v-show="showPayPop" v-on:closePop="showPayPop = false"></payOrder>
    </div>
</template>
<script>
    import popMin from '@/components/popMin.js'
    import common from '@/components/common'
    import VTitle from '@/components/title'
    import payOrder from '@/components/payOrder'
    export default {
        data () {
            return {
                pageTitle: '我的订单',
                orderList: '',
                currentPage: 1,
                pageSize: 10,
                endListen: false,
                orderStatus: this.$store.state.orderTabActive,
                active: this.$store.state.orderTabActive,
                orderId: '',
                showPayPop: false,
            }
        },
        components: { 
            common,
            popMin,
            VTitle,
            payOrder,
        },
        created () {
            this.$store.state.orderMemo = ''
        	this.getList()
        },
        methods: {
            isWeChatF: function (){ 
                var _this = this
                var ua = window.navigator.userAgent.toLowerCase(); 
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
                    _this.isWechat = true
                }else{ 
                    _this.isWechat = false
                } 
            },
            changeOrderId:function(id){
                this.orderId = id  
                this.showPayPop = true
            },
            getList:function(v) {
            	var _this = this;
                    _this.endListen = false
            	var _listUrl = '/wechatecom/appserver/order/list?orderStatus='+ this.orderStatus +'&currentPage=' + this.currentPage + '&pageSize=' + this.pageSize;
            	_this.ajaxDataFun('post',_listUrl,function(obj){
                    if(obj.code == '200'){
                        if(v){
                            var objLen = obj.data.length;
                            if(objLen){
                                for(var j=0; j < objLen; j++){
                                    _this.orderList.push(obj.data[j]);
                                }
                                _this.$set(_this.$data, 'orderList', _this.orderList);
                            }else{
                                _this.endListen = true
                                _this.$store.state.loadingTxt = ''
                            }
                        }else{
                            _this.orderList = obj.data
                        }
                    }
                })
            },
            changestatus: function(i) {
                this.currentPage = 1;
                this.active = i;
                this.$store.state.orderTabActive = i;
                this.orderStatus = i;
                this.getList()
            },
            updateStatus: function(id) {
                var _this = this;
                var _updateUrl = '/wechatecom/appserver/order/updateStatus?orderId='+ id +'&orderStatus=08';
                _this.ajaxDataFun('post',_updateUrl,function(obj){
                    if(obj.code == '200'){
                        popMin.show("icon-success","已确认收货");
                        _this.getList();  
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
                        _this.getList(1)
                    }
                    console.log(_this.currentPage)
                }
            })
        }
    }
</script>