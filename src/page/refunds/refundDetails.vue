<template>
	<div id="container" class="bgf">
        <v-title> {{ pageTitle }}</v-title>
        <div class="myWhiteBg ">
            <div class="normal resStatus" style="padding:0 14px;">
                <div class="justify" v-if="refundDetails.status=='3'">
                    <div class="box  left">
                        <b>请退货并填写物流信息</b>
                        <p>请在<span>6天23时46分30秒</span>内退货 给商家，否则将自动关闭退款 申请</p>
                    </div>
                    <div class="box right">
                        <img src="../../../static/img/refSus.png" alt="">
                    </div>
                </div>
                <div class="justify" v-if="refundDetails.status=='6'">
                    <div class="box left">
                        <b>退款关闭</b>
                    </div>
                    <div class="box right">
                        <img src="../../../static/img/refSus.png" alt="">
                    </div>
                </div>
                <div class="justify" v-if="refundDetails.status=='0'">
                    <div class="box left">
                        <b>退款待审核</b>
                    </div>
                    <div class="box right">
                        <img src="../../../static/img/refing.png" alt="">
                    </div>
                </div>
                <div class="justify" v-if="refundDetails.status=='8'">
                    <div class="box left">
                        <b>待确认收货</b>
                    </div>
                    <div class="box right">
                        <img src="../../../static/img/refing.png" alt="">
                    </div>
                </div>
                <div class="justify" v-if="refundDetails.status=='2'">
                    <div class="box left">
                        <b>退款成功 </b>
                        <p>退款原路退还：<span class="minIcon">¥</span><span class="big">{{orderItem.paymentMoney}}</span></p>
                    </div>
                    <div class="box right">
                        <img src="../../../static/img/refSus.png" alt="">
                    </div>
                </div>
                <div class="justify" v-if="refundDetails.status=='1'||refundDetails.status=='4'">
                    <div class="box left">
                        <b>退款失败 </b>
                        <p>商家已拒绝您的退款</p>
                    </div>
                    <div class="box right">
                        <img src="../../../static/img/refSus.png" alt="">
                    </div>
                </div>
            </div>
            <!-- 退款关闭提示语 -->
            <div class="normal" v-if="refundDetails.status=='6'">
                <p class="gray">您已主动关闭退款申请，无法再次发起退款，如有疑 问请联系商家协商处理。</p>
                <p class="gray">结束时间：{{ refundDetails.updateDate | formatDateMore }}</p>
            </div>
            <!-- 退货地址 -->
            <div class="addList" v-if="refundDetails.status=='7'||refundDetails.status=='8'">
                <div class="justify top">
                    <div class="box name">
                        <p>收货人：{{ refundDetails.businessReceive }}</p>
                    </div>
                    <div class="box tel">{{ refundDetails.businessPhone }}</div>
                </div>
                <div class="info">退货地址：{{ refundDetails.businessAddress }}</div>
            </div>
            <!-- 拒绝理由 -->
            <div class="normal" v-if="refundDetails.status=='1'||refundDetails.status=='4'">
                <p class="gray">商家拒绝理由：{{ refundDetails.rejectRefundsDesc }}</p>
            </div>
            <!-- 退款关闭提示语 -->
            <div class="historyTwo" v-if="refundDetails.status=='2'||refundDetails.status=='99'">
                <ul>
                    <li class="ed">
                        <p>卖家退款</p>
                        <span>{{ refundDetails.updateDate | formatDateMore }}</span>
                    </li>
                    <li :class="{ed:refundDetails.status=='2',active:refundDetails.status=='99'}">
                        <p>受理中</p>
                        <span>{{ refundDetails.updateDate | formatDateMore }}</span>
                    </li>
                    <li :class="{active:refundDetails.status=='2',light:refundDetails.status=='99'}">
                        <p>确认到账</p>
                        <span v-if="refundDetails.status=='2'">{{ refundDetails.updateDate | formatDateMore }}</span>
                    </li>
                </ul>
            </div>
            <div class="normal">
                <div class="orderListInfo justify" style="padding:0; margin: 0;">
                    <div class="img box">
                        <img :src="orderItem.thumbnail" alt="">
                    </div>
                    <div class="des box">
                        <b>{{ orderItem.fullName }}</b>
                        <p>规格：{{ orderItem.specDesc }}
                            <span>x{{ orderItem.quantity }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="normal">
                <ul class="leftLeft">
                    <li class="justify">
                        <b class="box">退款编号</b>
                        <p class="box">{{ refundDetails.refundsSn }}</p>
                    </li>
                    <li class="justify">
                        <b class="box">申请时间</b>
                        <p class="box">{{ refundDetails.createDate | formatDateMore }}</p>
                    </li>
                    <li class="justify">
                        <b class="box">退款原因</b>
                        <p class="box">{{ refundDetails.refundsDesc }}</p>
                    </li>
                    <li class="justify">
                        <b class="box">退款金额</b>
                        <p class="box" style="font-weight:bold;">￥{{ orderItem.paymentMoney }}</p>
                    </li>
                    <li class="justify" v-if="refundDetails.memo">
                        <b class="box">备注信息</b>
                        <p class="box">{{ refundDetails.memo}}</p>
                    </li>
                    <li class="justify" v-if="pics.length>0">
                        <div class="imgExp">
                            <div class="tit">
                                图片举证
                            </div>
                            <div class="clearfix">
                                <div class="box" v-for="item in pics">
                                    <img :src="item" alt="" />
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="normal" style="margin:14px 0; padding:9px 14px; margin-bottom:80px;" v-if="refundDetails.status=='8'">
                <router-link class="clearfix" :to="{ path: '/center/logistics', query: { id: refundDetails.trackingNo}}">
                    <div class="box fleft">
                        退货物流详情 
                    </div>
                    <div class="box fright">
                        <span class="icon-arrow"></span>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="botBtn justify" v-if="refundDetails.status=='0'||refundDetails.status=='3'">
            <div class="sureBtn min" style="font-size: 16px; color: #FF5D31;background: #FFFFFF; border: 1px solid #FF5D31; border-radius: 100px;" @click="cancelRef=true" v-if="refundDetails.status=='7'">取消申请</div>
            <div class="sureBtn active min" v-if="refundDetails.status=='7'">
                <router-link :to="{ path: 'addLogistic', query: { id: refundDetails.id}}">填写物流</router-link>
            </div>

            <div class="sureBtn active" v-if="refundDetails.status=='0'" @click="cancelRef=true">取消申请</div>
        </div>
        <!-- 删除商品提示 -->
        <div class="popBg" v-if="cancelRef"></div>
        <div class="popOr big" v-if="cancelRef">
            <div class="tip">确定要取消申请？</div>
            <div class="des">如您取消正在处理的退款，您无法再次发起退款申请</div>
            <div class="clearfix">
                <div class="fleft btn" @click="cancelRef=false">再考虑下</div>
                <div class="fright btn" @click="cancelRefund(refundDetails.id)">取消申请</div>
            </div>
        </div>
    </div>
</template>
<script>
    import popMin from '@/components/popMin.js'
    import VTitle from '@/components/title'
    import common from '@/components/common'
    export default {
        data () {
            return {
                pageTitle: '退款详情',
                refundId:'',
                refundDetails:'',
                orderItem: '',
                cancelRef: false,
                pics:[],
            }
        },
        components: { 
            common,
            VTitle,
            popMin,
        },
        created () {
            var obj = common.getUrlPars(window.location.href);
            this.refundId = obj.id;
        	this.getDetials();
        },
        methods: { 
            getDetials:function(v) {
            	var _this = this;
            	var _refDetailsUrl = '/wechatecom/appserver/refund/refundDetail?id='+ this.refundId;
            	_this.ajaxDataFun('post',_refDetailsUrl,function(obj){
                    if(obj.code == '200'){
                        _this.refundDetails = obj.data;
                        _this.orderItem = obj.data.orderItem;
                        if(obj.data.pics!=',,,'){
                            _this.pics = obj.data.pics.split(',');
                        }
                    }
                })
            },
            cancelRefund: function(id) {
                this.cancelRef = false;
                var _this = this;
                var _cancelUrl = '/wechatecom/appserver/refund/cancelRefunds?id='+ id +'&status=6';
                _this.ajaxDataFun('post',_cancelUrl,function(obj){
                    if(obj.code == '200'){
                        popMin.show("icon-success","取消成功");
                        _this.getDetials();
                    }
                })
            },
            closeBg: function() {
                this.active = 0;
                this.isRefund = !this.isRefund;
            }
        },
        mounted (){
        }
    }
</script>
<style lang="scss" scoped>
    .myWhiteBg{ margin-bottom: 80px; }
    .light p{color:#A5A4A4!important;}
    .imgExp{margin-top:0}
</style>