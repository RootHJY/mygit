<template>
    <div id="container" class="paddingBt50">
        <v-title> {{ pageTitle }}</v-title>
        <headerLay :fixedTop="fixedTop"></headerLay>
        <swipe :swipeList="swipeList"  :class="{paddingTop84:fixedTop}"></swipe>
        <!-- 首页推荐 -->
        <categoryItem></categoryItem>
        <!-- 小煮头条 -->
        <headlines></headlines>
        <!-- 限时秒杀 -->
        <timeLimit ></timeLimit>
        <!-- 三个栏目 -->
        <threeCol></threeCol>
        <!-- 底部为您推荐 -->
        <recommend></recommend>
        <footerLay fIndex="1"></footerLay>
        <div class="gotop" @click="goTopF" v-show="showGoTop">
            <span class="icon-top"></span>
            <p>顶部</p>
        </div>
    </div>
</template>

<script>
    import headerLay from './header'
    import swipe from '@/components/swipe'
    import VTitle from '@/components/title'
    import categoryItem from './categoryItem'
    import headlines from './headlines'
    import timeLimit from './timeLimit'
    import threeCol from './threeList'
    import recommend from './recommend'
    import footerLay from '@/components/footer'
    import common from '@/components/common'
    
    export default {
        data () {
            return {
                pageTitle: '小煮集市',
                swipeList:[],
                fixedTop: false,
                showGoTop: false,
            }
        },
        components: { 
            headerLay,
            swipe,
            VTitle,
            categoryItem,
            headlines,
            timeLimit,
            footerLay,
            threeCol,
            recommend
        },
        created () {
            this.getBanner()
        }, 
        methods: { 
            getBanner:function(){
                var _this = this
                var banUrl = "/api/ad/findAdByCode.do?code=P_INDEX&type=0"
                this._axios('post',banUrl,function(obj){
                    if(obj.code == '200'){
                        _this.swipeList = obj.data.adList
                    }
                })
            },
            goTopF:function(){
                var warpDom = document.getElementById('container')
                this.GoTop(warpDom,0)
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

                if(scrollTopTop >= 44){
                    _this.fixedTop = true
                }else{
                    _this.fixedTop = false
                }

                if(scrollTopTop >= 300){
                    _this.showGoTop = true
                }else{
                    _this.showGoTop = false
                }

            })
            common.wxShare()
        }
    }
</script>

