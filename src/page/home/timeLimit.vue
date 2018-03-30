<template>
    <section>
        <div class="timeLimit justify">
            <div class="box left">
                <router-link :to="{ path: 'shopDetails', query: { id: limit.url}}" v-if="expireSeconds">
                    <h2 v-if="expireSeconds">限时秒杀</h2>
                    <div class="limit">
                        <div class="item">
                            <count :seconds="expireSeconds" v-on:setMsg="getMsg" v-if="expireSeconds"></count>
                            <div class="img">
                                <img :src="limit.path" alt="" v-if="expireSeconds"/>
                            </div>
                        </div>
                    </div>
                </router-link>
                <div class="limit" v-if="!expireSeconds">
                    <div class="item">
                        <div class="img">
                            <img src="../../../static/img/inw.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box right">
                <div class="list clearfix">
                    <router-link :to="{ path: 'shopDetails', query: { id: ad1.url}}">
                        <div class="info fleft">
                            <h2>{{ ad1.title }}</h2>
                            <p>{{ ad1.subTitle }}</p>
                        </div>
                        <div class="img fright">
                            <img :src="ad1.path" alt="" />
                        </div>
                    </router-link>
                </div>
                <div class="list clearfix">
                    <router-link :to="{ path: 'shopDetails', query: { id: ad2.url}}">
                        <div class="info fleft">
                            <h2>{{ ad2.title }}</h2>
                            <p>{{ ad2.subTitle }}</p>
                        </div>
                        <div class="img fright">
                            <img :src="ad2.path" alt="" />
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="marketing">
            <div class="justify">
                <div class="box">
                    <router-link :to="{ path: 'shopDetails', query: { id: ad3.url}}">
                        <div class="title">{{ ad3.title }}</div>
                        <div class="des">{{ ad3.subTitle }}</div>
                        <div class="img"><img :src="ad3.path" alt="" /></div>
                    </router-link>
                </div>
                <div class="box">
                    <router-link :to="{ path: 'shopDetails', query: { id: ad4.url}}">
                        <div class="title">{{ ad4.title }}</div>
                        <div class="des">{{ ad4.subTitle }}</div>
                        <div class="img"><img :src="ad4.path" alt="" /></div>
                    </router-link>
                </div>
                <div class="box">
                    <router-link :to="{ path: 'shopDetails', query: { id: ad5.url}}">
                        <div class="title">{{ ad5.title }}</div>
                        <div class="des">{{ ad5.subTitle }}</div>
                        <div class="img"><img :src="ad5.path" alt="" /></div>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import count from '@/components/count'
    export default {
        data () {
            return {
                pageTitle: '营销位',
                limit:'',
                ad1:'',
                ad2:'',
                ad3:'',
                ad4:'',
                ad5:'',
                expireSeconds:''
            }
        },
        components: { 
            count
        },
        created () {
            this._limitUrl();
            this._adUrl1();
            this._adUrl2();
            this._adUrl3();
            this._adUrl4();
            this._adUrl5();
        },
        methods: {
            _limitUrl:function() {
                var _this = this;
                var _limitUrl = "/wechatecom/appserver/ad/findAdByCode.do?type=1&code=P_SY_GDW_1"
                this.ajaxDataFun('post',_limitUrl,function(obj){
                    if(obj.code == '200'){
                        _this.expireSeconds = obj.data.expireSeconds;
                        _this.limit = obj.data.ad;
                    }
                })
            },
            _adUrl1:function() {
                var _this = this;
                var _adUrl1 = "/wechatecom/appserver/ad/findAdByCode.do?type=1&code=P_SY_GDW_2"
                this.ajaxDataFun('post',_adUrl1,function(obj){
                    if(obj.code == '200'){
                        _this.ad1 = obj.data.ad;
                    }
                })
            },
            _adUrl2:function() {
                var _this = this;
                var _adUrl2 = "/wechatecom/appserver/ad/findAdByCode.do?type=1&code=P_SY_GDW_3"
                this.ajaxDataFun('post',_adUrl2,function(obj){
                    if(obj.code == '200'){
                        _this.ad2 = obj.data.ad;
                    }
                })
            },
            _adUrl3:function() {
                var _this = this;
                var _adUrl3 = "/wechatecom/appserver/ad/findAdByCode.do?type=1&code=P_SY_GDW_4"
                this.ajaxDataFun('post',_adUrl3,function(obj){
                    if(obj.code == '200'){
                        _this.ad3 = obj.data.ad;
                    }
                })
            },
            _adUrl4:function() {
                var _this = this;
                var _adUrl4 = "/wechatecom/appserver/ad/findAdByCode.do?type=1&code=P_SY_GDW_5"
                this.ajaxDataFun('post',_adUrl4,function(obj){
                    if(obj.code == '200'){
                        _this.ad4 = obj.data.ad;
                    }
                })
            },
            _adUrl5:function() {
                var _this = this;
                var _adUrl5 = "/wechatecom/appserver/ad/findAdByCode.do?type=1&code=P_SY_GDW_6"
                this.ajaxDataFun('post',_adUrl5,function(obj){
                    if(obj.code == '200'){
                        _this.ad5 = obj.data.ad;
                    }
                }) 
            },
             // 接收登录子组件传回来的值
            getMsg: function(data){
                var _this = this;
                if(data== false ){
                    _this.expireSeconds = '';
                }
            }
        }
    }
</script>

