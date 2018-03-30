<template>
    <div id="container" class="bgf">
        <div id="myCoupon">
            <v-title> {{ pageTitle }} </v-title>
            <div class="myCoupon">
                <div class="justify tip coupon" v-show="!selectHis">
                    <router-link to="/center/couponRules" class="box">
                        <span class="icon icon-help"></span>
                        <p>使用说明</p>
                    </router-link>
                    <div class="box" @click="getCouponHis()">查看历史优惠券</div>
                </div>
                <div v-for="(item,index) in dataList" class="couList" :class="{active:!selectHis}" @click="userCouponF(item.couponId,item.status)">
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
                    <div class="justify bottom" v-show="!selectHis">
                        <div class="box time">
                            {{ item.content }} 
                        </div>
                        <div class="box status">
                            <p>立即使用</p>
                        </div>
                    </div>
                    <div class="justify bottom" v-show="selectHis">
                        <div class="box time"></div> <!-- 占位用 -->
                        <div class="box status" v-show="item.status == '1'">
                            <p>已使用</p>
                        </div>
                        <div class="box status" v-show="item.status == '2'">
                            <p>已过期</p>
                        </div>
                    </div>
                </div>
                <p class="isLoading"> {{ $store.state.loadingTxt }}</p>
            </div>
            <div class="popNotCart" v-show="!dataList.length">
                <router-link to="/category" class="content">
                    <img src="../../../static/img/not_cart.png" alt="" />
                    <p>叔翻遍口袋，还没有优惠券哦</p>
                </router-link>
            </div>
        </div>   
    </div>
</template>

<script>
    import VTitle from '@/components/title'
    import common from '@/components/common'
    export default {
        data () {
            return {
                pageTitle: '我的优惠券',
                currentPage: 1,
                pageSize: 10,
                dataList: '',
                endListen: false,
                selectHis: '',  //是否历史优惠券
            }
        },
        components: { 
            VTitle
        },
        created () {
            var locaStr = window.location.href
            if(locaStr.indexOf('selectHis=') > -1){
                this.selectHis = 'yes'
            }
            this.getCoupon()
        },
        methods: { 
            getCouponHis:function(){
                this.$router.push('/center/mycoupon?selectHis=1')
            },
            getCoupon:function(scroll){
                var _this = this
                    _this.endListen = false

                var locaStr = window.location.href
                var url = "/api/coupon/list.do?currentPage=" + _this.currentPage + "&pageSize=" + _this.pageSize + "&selectHis=" + _this.selectHis

       
                this.ajaxDataFun('post',url,function(obj){
                    if(obj.code == '200'){
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
            userCouponF:function(id,v){
                if(v == '2'){
                    return 
                }else{
                    this.$router.push('/list?couponId=' + id)
                }
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
                        _this.getCoupon(1)
                    }
                    console.log(_this.currentPage)
                }
            })
        },
        watch: {
           '$route':function(to, from) {
                var locaStr = window.location.href
                if(locaStr.indexOf('selectHis=') > -1){
                    this.selectHis = true
                }else{
                    this.selectHis = false
                }
                this.getCoupon()
            },
        }
    }
</script>
<style lang="scss" scoped>
    .coupon{margin-bottom:20px;margin-top:0px;}
    .coupon span{ vertical-align: middle;}
    .coupon p{ vertical-align: middle; display: inline-block;}
</style>

