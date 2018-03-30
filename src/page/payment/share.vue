<template>
    <div id="container" class="bgf">
        <v-title> {{ pageTitle }}</v-title>
        <div class="shareOrderTop">
            <img src="../../../static/img/logo.png" alt="">
            <p>\(^o^)/噢耶！在买买买的路上越战越勇</p>
        </div>
        <div class="myWhiteBg shareOrder ">
            <swipe :swipeList="swipeList"></swipe>
            <div class="toShop normal">
                <p> 来自小煮集市</p>
                <div class="sureBtn active">
                    <router-link to="/" class="search"> 
                        进店逛逛
                    </router-link>
                </div>
            </div>
            <div class="hide"></div>
        </div>      
        <div class="popBg" v-show="showPop" @click="showPop = false"></div>
        <div class="popShare" v-show="showPop">
            <div class="txt">
                <p>买到一件好货！</p>
                <p>快去分享给小伙伴吧！</p>
            </div>
            <span class="icon-marrow"></span>
        </div>
    </div> 
</template>

<script>
    import _axios from 'axios'
    import common from '@/components/common'
    import VTitle from '@/components/title'
    import swipe from './swipeShare'
    export default {
        data () {
            return {
                pageTitle: '分享',
                swipeList:[
                    // {
                    //     fullName: '111',
                    //     thumbnail: 'http://ofv795nmp.bkt.clouddn.com/vuelogobanner1.jpg',
                    //     price: '10'
                    // },
                    // {
                    //     fullName: '111',
                    //     thumbnail: 'http://ofv795nmp.bkt.clouddn.com/vuelogobanner1.jpg',
                    //     price: '10'
                    // }
                ],
                batchNo: '',
                showPop:true,
                timeF: null
            }
        },
        components: { 
            VTitle,
            swipe
        },
        created () {
            var _this = this
            setTimeout(_this.hidePop,3000)

            var _locaUrl = window.location.href
            if(_locaUrl.indexOf('batchNo=') > -1){
                this.batchNo = common.getUrlPars(_locaUrl).batchNo
                this.getShopData()
            }
        },
        methods: { 
           hidePop:function(){
                this.showPop = false
           },
           getShopData:function(){
                var _this = this
                var _batchNoUrl = '/api/order/orderShare.do?batchNo=' + _this.batchNo
                _axios.get(_batchNoUrl)
                .then(function (obj) {
                    if(obj.data.code == '200'){
                        console.log(obj.data)
                        _this.swipeList = obj.data.data
                        console.log(_this.swipeList)
                    }
                })
           }
        }
    }
</script>
