<template>
    <div id="container">
        <v-title> {{ pageTitle }}</v-title>
        <div class="myList">
            <div class="cntop">
                <div class="avar">
                    <img src="../../../static/img/logo2.png" alt="" v-show="isLogin != 'true' || avar == ''">
                    <img :src="avar" alt="" v-show="isLogin == 'true'">
                </div>
                <div class="name" @click="$store.state.isShowLogin = true" v-show="isLogin != 'true'"> 
                    登陆/注册
                </div>
                <div class="name" v-show="isLogin == 'true'"> 
                    {{ nickName }}
                </div>
                 <div class="name" v-show="isLogin == 'true' && nickName == ''"> 
                    {{ username | toPass}}
                </div> 
            </div>
            <div class="cnList">
                <ul>
                    <li class="justify" @click="toOrders('')">
                        <p class="box">全部订单</p>
                        <span class="box icon-arrow"></span>
                    </li>
                    <li class="justify">
                        <div class="box cnItem" @click="toOrders('00')">
                            <span class="icon-my_daifukuan">
                                <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span>
                            </span>
                            <p>待付款</p>
                            <i v-if="unpaidCount">{{ unpaidCount }}</i>
                        </div>
                        <div class="box cnItem" @click="toOrders('01')">
                            <span class="icon-my_daifahuo">
                                <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span>
                            </span>
                            <p>待发货</p>
                            <i v-if="paidCount">{{ paidCount }}</i>
                        </div>
                        <div class="box cnItem" @click="toOrders('02')">
                            <span class="icon-my_daishouhuo">
                                <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span>
                            </span>
                            <p>待收货</p>
                            <i v-if="receiverCount">{{ receiverCount }}</i>
                        </div>
                        <div class="box cnItem" @click="toOrders('08')">
                            <span class="icon-my_yiwancheng">
                                <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span>
                            </span>
                            <p>已完成</p>
                        </div>
                        <div class="box cnItem" @click="linkTo('/refunds/afterSale')">
                            <span class="icon-my_tuihuo">
                                <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span>
                            </span>
                            <p>退货/售后</p>
                        </div>
                    </li>
                    <li class="justify" @click="linkTo('/center/mycoupon')">
                        <p class="box">我的优惠券</p>
                        <span class="box icon-arrow"></span>
                    </li>
                    <li class="justify" @click="linkTo('/center/myaddress')">
                        <p class="box">地址管理</p>
                        <span class="box icon-arrow"></span>
                    </li>
               <!--     <li class="justify" @click="linkTo('/center/changeTel')">
                            <p class="box">账号管理</p>
                            <span class="box icon-arrow"></span>
                    </li> -->
                    <li class="justify" @click="linkTo('/server')">
                        <p class="box">联系客服<i class="dot" v-show="isUnReadConsult == '1'"></i></p>
                        <span class="box icon-arrow"></span>
                    </li>
                    <li class="justify" @click="clearCookie">
                        <p class="box">清除缓存(试调专用)</p>
                    </li>
                </ul>
            </div>
            <footerLay :fIndex='4'></footerLay>
            <login :isFrom="1" v-on:getInfo="getInfo"></login>
        </div>
    </div>
</template>

<script>
    import VTitle from '@/components/title'
    import login from '@/components/login'
    import common from '@/components/common'
    import footerLay from '@/components/footer'

    export default {
        data () {
            return {
                pageTitle: '个人中心',
                nickName: '',
                username: '',
                avar: '',
                unpaidCount: '',  //待付款
                paidCount: '',       //待发货
                receiverCount:'',   //待收货
                isUnReadConsult: 0,
                isLogin: 'false',
            }
        },
        components: { 
            login,
            footerLay,
            VTitle,
        },
        created () {
            this.isLogin = localStorage.getItem('isLogin')
            if(this.isLogin == 'true'){
                this.getInfo()
                console.log("====个人中心页已登录====")
            }else{
                console.log("====个人中心页未登录====")
            }
        },
        methods: { 
            clearCookie:function(){
                common.clearCookie('deviceId')
                common.clearCookie('USER_TOKEN')
                common.clearCookie('srCook')

                localStorage.removeItem('isLogin')
                localStorage.removeItem('cartNum')
                localStorage.removeItem('wxOpenId')
                localStorage.removeItem('isComeIn')
                localStorage.removeItem('colNum')
                localStorage.removeItem('orderItems')
                localStorage.removeItem('promotionId')
                localStorage.removeItem('promotionType')
                localStorage.removeItem('tid')
                localStorage.removeItem('orderId')
                localStorage.removeItem('colNumSh')

                window.location.reload()
                alert("清除成功！")
            },
            getInfo:function(){
                console.log("出发2222")
                var _this = this
                this.isLogin = 'true'
                var getInfoUrl = "/api/center/userInfo"
                this.ajaxDataFun('post',getInfoUrl,function(obj){
                    if(obj.code == '200'){
                        var _data = obj.data
                        _this.avar = _data.appUser.image
                        _this.nickName = _data.appUser.nickName
                        _this.username = _data.appUser.username
                        _this.isUnReadConsult = _data.appUser.isUnReadConsult

                        _this.unpaidCount = _data.unPaidCount
                        _this.paidCount = _data.paidCount
                        _this.receiverCount = _data.receiverCount
                    }else {
                        console.log("获取个人信息失败!")
                    }
                })
            },
            linkTo:function(path){
                if(this.isLogin != 'true'){
                    this.$store.state.isShowLogin = true
                    this.$store.state.loginToPage = path
                    return 
                }else{
                    this.$router.push(path);
                }
            },
            toOrders: function(i) {
                if(this.isLogin != 'true'){
                    this.$store.state.isShowLogin = true
                    this.$store.state.loginToPage = '/center/orderList'
                    return 
                }else{
                    this.$store.state.orderTabActive = i;
                    this.$router.push('/center/orderList');
                }
            }
        },
        filters:{
            toPass:function(v){
                if(v){
                    return v.substring(0,3) + '****' + v.substring(7,11)
                }else{
                    return ''
                }
            }
        }
    }
</script>

