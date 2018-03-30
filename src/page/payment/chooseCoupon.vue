<template>
    <div id="myCoupon" class="paddingBt30">
        <v-title> {{ pageTitle }} </v-title>
        <div id="loading" v-show="!showAllDiv">
            <img src="../../../static/img/logo2.png" alt="loading">
        </div>
        <div class="myCoupon">
            <div v-for="(item,index) in dataList" class="couList" :class="{active:!item.reasonDesc}" @click="userCouponF(item.id,item.minusMoney,item.reasonDesc)">
                <span class="icon-choosecoupon" v-show="index == 0 && !item.reasonDesc">
                <span class="path1"></span><span class="path2"></span>
                </span>
                <div class="justify top">
                    <div class="box des">
                        <b>{{ item.title }}</b>
                        <p>{{ item.startDate | formatDate }}-{{ item.endDate | formatDate}}</p>
                    </div>
                    <div class="box money">
                        <span>¥</span>
                        <p>{{ item.minusMoney }}</p>
                    </div>
                </div>
                <div class="justify bottom">
                    <div class="box time" v-show="!item.reasonDesc">{{ item.content }}</div>
                    <div class="box time" v-show="item.reasonDesc">
                        {{ item.reasonDesc }}
                    </div>
                    <div class="box status" v-show="!item.reasonDesc">
                        <p>可使用</p>
                    </div>
                    <div class="box status" v-show="item.reasonDesc">
                        <p>不可使用</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="popNotCart" v-show="!dataList.length">
            <div class="content">
                <img src="../../../static/img/not_cart.png" alt="" />
                <p>叔翻遍口袋，还没有优惠券哦</p>
            </div>
        </div>
        <div class="notUse" @click="notUseF"> 不使用优惠券 </div>
    </div>   
</template>

<script>
    import VTitle from '@/components/title'
    import common from '@/components/common'
    export default {
        data () {
            return {
                pageTitle: '选取优惠券',
                dataList: '',
                endListen: false,
                showAllDiv: false,
                orderItems: '',
                promotionId: '',
                promotionType: '',
            }
        },
        components: { 
            VTitle
        },
        created () {
            this.orderItems = this.$store.state.orderItems || localStorage.getItem('orderItems') || ''
            this.promotionId = this.$store.state.promotionId || localStorage.getItem('promotionId') || ''
            this.promotionType = this.$store.state.promotionType || localStorage.getItem('promotionType') || ''
            this.getCoupon()
        },
        methods: { 
            getCoupon:function(scroll){
                var _this = this
                    _this.endListen = false
 
                var locaStr = window.location.href
                var url = "/wechatecom/appserver/coupon/availableList.do?promotionId=" + this.promotionId + "&promotionType=" + this.promotionType + "&items=" + this.orderItems

                this.ajaxDataFun('post',url,function(obj){
                    if(obj.code == '200'){
                        _this.showAllDiv = true
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
                    }
                })
            },
            userCouponF:function(id,money,reasonDesc){
                if(!reasonDesc){
                    this.$store.state.orderCouponId = id
                    this.$store.state.orderCouponMoney = money
                    this.$router.go(-1)
                }else{
                    return 
                }
            },
            notUseF:function() {
                this.$store.state.orderCouponId = ''
                this.$store.state.orderCouponMoney = 0
                this.$router.go(-1)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .coupon{margin-bottom:20px;margin-top:0px;}
    .coupon span{ vertical-align: middle;}
    .coupon p{ vertical-align: middle; display: inline-block;}
</style>

