<template>
    <div class="couponTxt" v-show="couponList.length">
        <p v-for="item in couponList">{{ item.title }}</p>
        <div class="pullBtn active" v-show="!isReceiver" @click="getCoupon">领取</div>
        <div class="pullBtn" v-show="isReceiver" @click="showPop">已领取 </div>
        <div class="pullBtn" v-show="isDown" @click="showPop('down')">已领完 </div>
    </div>
</template>

<script>
    import popMin from '@/components/popMin.js'
    export default {
        data () {
            return {
                pageTitle: '领券',
                couponList: '',
                isReceiver: false,
                isDown:false,
                couponIds: [],
            }
        },
        props: ['id'],
        components: {
            
        },
        created () {
            this.getCouponList()
            console.log("idd=" + this.id)
        },
        methods: {
            getCouponList:function(){
                var _this = this;
                var couponUrl = "/api/coupon/productCouponList.do?currentPage=1&pageSize=3&productId=" 
                + this.id
                this.ajaxDataFun('post',couponUrl,function(obj){
                    if(obj.code == '200'){
                        _this.couponList = obj.data
                        for(let item of obj.data){
                            _this.couponIds.push(item.id)
                        }
                    }
                })
            },
            getCoupon:function(){
                if(this.$store.state.isLogin == false){
                    this.$store.state.isShowLogin = true
                    this.$store.state.loginToPage = ''
                    console.log("未登录,不能领取！")
                    return 
                }else{
                    var _this = this
                    var getUrl = "/api/coupon/getCoupon.do?ids=" + _this.couponIds.toString()
                    console.log(getUrl)
                    this.ajaxDataFun('post',getUrl,function(obj){
                        if(obj.code == '200'){
                            _this.isReceiver = true
                            if(obj.data.flag == 1){
                                popMin.show("icon-success", "优惠券领取成功")
                            }else if(obj.data.flag == 2){
                                popMin.show("icon-sign","手慢啦，只抢到部分优惠券，请去个人中心查看", "big")
                            }
                        }else{
                            _this.isDown = true;
                            popMin.show("icon-sign","手慢啦，优惠券已抢完")
                        }
                    }) 
                }
            },
            showPop:function(flag){
                if(flag=='down'){
                    popMin.show("icon-sign","手慢啦，优惠券已抢完")
                }else{
                    popMin.show("icon-sign big","您已领取此券，<br/>请在个人中心查看", "big")
                }
            }
        }
    }
</script>


