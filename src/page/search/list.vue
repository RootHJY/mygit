<template>
    <div id="container" class="paddingBt50">
        <v-title> {{ pageTitle }}</v-title>
        <div class="popBg" v-show="isShowSortPrice"></div>
        <div id="top" :class="{scrollFixed:isFixed}"> 
            <searchBar></searchBar>    
            <div class="filterWrap">
                <div class="menu">
                    <span class="icon-menu" @click="showCol(2)" v-show="colNumSh == 1"></span>
                    <span class="icon-btn_liebiao" @click="showCol(1)" v-show="colNumSh == 2"></span>
                </div>
                <div class="tagContent">
                    <div class="tagArea">
                        <div class="name" @click="showSortPriceF()">{{ sortTxt }}</div>
                    </div>
                    <ul v-show="isShowSortPrice">
                        <li @click="sortPriceF(0,'综合排序')" :class="{active:sortType == 0}">
                            综合排序
                            <span class="icon-gou"></span>
                        </li>
                        <li @click="sortPriceF(1,'价格由低到高')" :class="{active:sortType == 1}">
                            价格由低到高
                            <span class="icon-gou"></span>
                        </li>
                        <li @click="sortPriceF(2,'价格由高到低')" :class="{active:sortType == 2}">
                            价格由高到低
                            <span class="icon-gou"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <shopList :col="colNumSh" :dataList="shopData"></shopList>
        <footerLay></footerLay>
        <div class="gotop" @click="goTopF" v-show="showGoTop">
            <span class="icon-top"></span>
            <p>顶部</p>
        </div>
    </div>
</template>

<script>
    import VTitle from '@/components/title'
    import common from '@/components/common'
    import footerLay from '@/components/footer'
    import searchBar from '@/components/searchBar'
    import shopList from '@/components/shopList'
    export default {
        data () {
            return {
                pageTitle: '小煮集市',
                catagory: '',
                colNumSh: '2',
                shopData: '',
                isShowSortPrice:false,
                groupId: '',
                promotionType: '',
                promotionId: '',
                couponId: '',
                sortType: 0,
                sortTxt: '综合排序',
                currentPage: 1,
                pageSize: 10,
                isFixed: false,
                endListen: false,
                showGoTop: false,
            }
        },
        components: { 
            VTitle,
            searchBar,
            shopList,
            footerLay,
        },
        created () {
            this.colNumSh = localStorage.getItem('colNumSh') || '2'
            var  locaUrl = window.location.href
            if(locaUrl.indexOf('promotionType=') > -1){
                this.promotionType = common.getUrlPars(locaUrl).promotionType
                this.promotionId = common.getUrlPars(locaUrl).promotionId || ''
            }
            if(locaUrl.indexOf('couponId=') > -1){
                this.couponId = common.getUrlPars(locaUrl).couponId || ''
            }

            this.getShopList()
        },
        methods: { 
            showCol:function(v){
                this.colNumSh = v
                localStorage.setItem('colNumSh', v);
            },
            showSortPriceF:function(){
                this.isShowSortPrice = !this.isShowSortPrice
            },
            sortPriceF:function(sort,txt){
                this.sortType = sort
                this.isShowSortPrice = false 
                this.sortTxt = txt
                this.currentPage = 1
                this.getShopList()
            },
            getShopList:function(scroll,search){
                var _this = this
                    _this.endListen = false
                var  _listUrl = "/wechatecom/appserver/product/search.do?promotionId=" + this.promotionId + "&promotionType=" + this.promotionType + "&sortType=" + this.sortType + "&currentPage=" + this.currentPage + "&pageSize=" + this.pageSize + "&couponId=" + this.couponId
                
                this.ajaxDataFun('post',_listUrl,function(obj){
                    if(obj.code == '200'){
                        var objLen = obj.data.length;
                        if(scroll){
                            if(objLen){
                                for(var j=0; j < objLen; j++){
                                    _this.shopData.push(obj.data[j]);
                                }
                                _this.$set(_this.$data, 'shopData', _this.shopData);
                            }else{
                                _this.endListen = true
                                _this.$store.state.loadingTxt = ''
                            }
                        }else{
                            _this.shopData = obj.data
                        }
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
                    _this.isFixed = true
                }else{
                    _this.isFixed = false
                }


                if(scrollTopTop >= 300){
                    _this.showGoTop = true
                }else{
                    _this.showGoTop = false
                }
                
                if(scrollTopTop + innerHt ==  allHeight){
                    if(!_this.endListen){
                        _this.currentPage++
                        _this.getShopList(1)
                    }
                    console.log(_this.currentPage)
                }
            })
        }
    }
</script>

