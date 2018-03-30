<template>
    <div id="container" class="paddingBt50">
        <v-title> {{ pageTitle }}</v-title>
        <div class="popBg" v-show="isShowSortChild || isShowSortPrice" @click="closePop"></div>
        <div id="top" :class="{scrollFixed:isFixed}"> 
            <searchBar></searchBar>    
            <div class="tagList">
                <ul class="clearfix">
                    <li  :class="{active:parIndex == 0}" @click="filterShopF(' ',0)">全部商品</li>
                    <li v-for="(item,index) in catagory" :class="{active:parIndex == index + 1}" @click="filterShopF(item.id,index + 1)">{{ item.name }}</li>
                </ul>
            </div>
            <div class="filterWrap">
                <div class="menu">
                    <span class="icon-menu" @click="showCol(2)" v-show="colNum == 1"></span>
                    <span class="icon-btn_liebiao" @click="showCol(1)" v-show="colNum == 2"></span>
                </div>
                <div class="tagContent" v-show="parIndex == 0">
                    <div class="tagArea">
                        <div class="name" @click="showSortPriceF()" :class="{active:isShowSortPrice && 0 == parIndex}"> 
                            {{ sortTxt }} 
                        </div>
                    </div>
                    <ul v-show="isShowSortPrice && parIndex == 0">
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
                <div class="tagContent" v-for="(item,index) in catagory" v-show="(index+1) == parIndex">
                    <div class="tagArea">
                        <div class="name" @click="showSortChildF()" :class="{active:isShowSortChild && (index+1)  == parIndex}" v-if="item.childGroupList.length != ''"> 
                            {{ filterName[(parIndex-1)] }}
                        </div>
                        <div class="name" @click="showSortPriceF()" :class="{active:isShowSortPrice && (index+1) == parIndex}"> 
                            {{ sortTxt }} 
                        </div>
                    </div>
                    <ul v-show="isShowSortChild && (index+1) == parIndex">
                        <li @click="filterNameF(parIndex, item.name, item.id)" :class="{active:filterName[(parIndex-1)] ==  item.name}">
                            {{ item.name }}
                            <span class="icon-gou"></span>
                        </li>
                        <li v-for="(val,i) in item.childGroupList" @click="filterNameF(parIndex, val.name, val.id)" :class="{active:filterName[(parIndex-1)] == val.name}">    
                            {{ val.name }} 
                            <span class="icon-gou"></span>
                        </li>
                    </ul>
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
        <swipe :swipeList="swipeList"></swipe>
        <shopList :col="colNum" :dataList="shopData"></shopList>
        <footerLay :fIndex="2"></footerLay>
        <div class="gotop" @click="goTopF" v-show="showGoTop">
            <span class="icon-top"></span>
            <p>顶部</p>
        </div>
    </div>
</template>

<script>
    import VTitle from '@/components/title'
    import common from '@/components/common'
    import swipe from '@/components/swipeCategory'
    import footerLay from '@/components/footer'
    import searchBar from '@/components/searchBar'
    import shopList from '@/components/shopList'
    export default {
        data () {
            return {
                pageTitle: '商品分类',
                swipeList:[],
                catagory: '',
                colNum: '2',
                shopData: '',
                parIndex: this.$store.state.catagoryIndex,
                isShowSortChild:false,
                isShowSortPrice:false,
                groupId: this.$store.state.catagoryId,
                sortType: 0,
                sortTxt: '综合排序',
                filterName: [],
                currentPage: 1,
                pageSize: 10,
                isFixed: false,
                endListen: false,
                showGoTop: false,
            }
        },
        components: { 
            VTitle,
            swipe,
            searchBar,
            shopList,
            footerLay,
        },
        created () {
            var vm = this;
            this.colNum = localStorage.getItem('colNum') || '2'
            this.getCategory()
            this.getShopList()
            this.getImgList(this.$store.state.catagoryId)
        },
        methods: { 
            getCategory:function(){
                var _this = this
                var cataUrl = "/wechatecom/appserver/group/groupList.do"
                this.ajaxDataFun('post',cataUrl,function(obj){
                    if(obj.code == '200'){
                        _this.catagory = obj.data
                        var catLen = obj.data.length
                        if(catLen){
                            for(var i=0; i< catLen;i++){
                                if(obj.data[i].childGroupList[0] != undefined){
                                    _this.filterName[i] = obj.data[i].name
                                }else{
                                    _this.filterName[i] = ''
                                }
                            }
                        }
                    }
                })
            },
            getImgList:function(){
                var _this = this
                var slideUrl = "/wechatecom/appserver/ad/findAdByGroup.do?groupId=" + this.groupId
                this.ajaxDataFun('post',slideUrl,function(obj){
                    if(obj.code == '200'){
                        _this.swipeList = obj.data
                    }
                })
            },
            showCol:function(v){
                this.colNum = v
                localStorage.setItem('colNum', v);
            },
            filterShopF:function(id,index){
                this.$store.state.catagoryIndex = index
                this.$store.state.catagoryId = id
                this.groupId = id

                this.parIndex = index
                this.isShowSortChild = false
                this.isShowSortPrice = false
                this.currentPage = 1
            },
            showSortChildF:function(){
                this.isShowSortChild = !this.isShowSortChild 
                this.isShowSortPrice = false // 关闭旁边的ul
            },
            showSortPriceF:function(){
                this.isShowSortPrice = !this.isShowSortPrice
                this.isShowSortChild  = false // 关闭旁边的ul
            },
            filterNameF:function(par,val,id){
                this.isShowSortChild = false 
                this.filterName[(par-1)] = val
                this.groupId = id
                this.currentPage = 1
            },
            sortPriceF:function(sort,txt){
                this.sortType = sort
                this.isShowSortPrice = false 
                this.sortTxt = txt
                this.currentPage = 1
                this.goTopF()
            },
            getShopList:function(scroll){
                var _this = this
                    _this.endListen = false
                var listUrl = "/wechatecom/appserver/group/groupSearch.do?groupId=" + this.groupId + "&sortType=" + this.sortType + "&currentPage=" + this.currentPage + "&pageSize=" + this.pageSize

                this.ajaxDataFun('post',listUrl,function(obj){
                    if(obj.code == '200'){
                        var objLen = obj.data.length;
                        console.log("objLen=" + objLen)
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
            closePop:function(){
                this.isShowSortChild = false
                this.isShowSortPrice = false
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

                if(scrollTopTop >= 300){
                    _this.isFixed = true
                    _this.showGoTop = true
                }else{
                    _this.isFixed = false
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
        },
        watch:{
            groupId:function(){
                this.getImgList()
                this.getShopList()
            },
            sortType:function(){
                this.getShopList()
            }
        }
    }
</script>

