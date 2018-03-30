<template>
    <div id="container">    
        <v-title> {{ pageTitle }} </v-title>
        <div class="popBg" v-show="showUl" @click="hideSortFun"></div>
        <div id="top" :class="{scrollFixed:isFixed}"> 
            <div class="searchBar justify">
                <div class="search box" :class="{min:isEnter}">
                    <label class="icon-search"></label>
                    <input type="text" v-model="searchVal" :placeholder="this.$store.state.hotTxt" v-on:focus="entInput()" v-on:blur="outInput()"  @keyup.enter="searchFun()" ref="input"/>
                    <span class="close" @click="clearInput()" v-show="searchVal">
                        <img src="../../../static/img/cha.png" alt="" />
                    </span>
                    <label class="txt" @click="enterLabel()" v-show="showLabel">   
                        {{ searchVal }}
                    </label>
                </div>
                <div class="searchBtn box" v-show="isValue && isEnter" @click="searchFun()">搜索</div>
                <div class="searchBtn box" v-show="!isValue && isEnter" @click="cancelSearch()">取消</div>
            </div>
            <div class="filterWrap " v-show="!noResult && showFilter">  
                <div class="menu">
                    <span class="menu icon-menu" @click="togColNum(2)" v-show="colNumSh == 1"></span>
                    <span class="menu icon-btn_liebiao" @click="togColNum(1)" v-show="colNumSh == 2"></span>
                </div>
                <div class="tagContent">
                    <div class="tagArea">
                        <div class="name" :class="{active:showUl}" @click="showSort">{{ sortTxt }}</div>
                    </div>
                    <ul v-show="showUl">
                        <li @click="postSortFun(0,'综合排序')" :class="{active:sortType == 0}">
                            综合排序 
                            <span class="icon-gou"></span>
                        </li>
                        <li @click="postSortFun(1,'价格由低到高')" :class="{active:sortType == 1}">
                            价格由低到高 
                            <span class="icon-gou"></span>
                        </li>
                        <li @click="postSortFun(2,'价格由高到低')" :class="{active:sortType == 2}">
                            价格由高到低 
                            <span class="icon-gou"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="noGoods" v-show="noResult">
            您搜索的“{{ searchVal | nomore }}”没有相关商品
        </div>
        <shopList :dataList="dataList" :col="colNumSh" :class="{paddingTop84:isFixed}"></shopList>
        <div id="searchRemd" class="section" style="margin-top:30px;" v-show="!noRemd">
            <h2 style="font-size:16px;">为您推荐</h2>
            <shopList :dataList="remDataList" col="2"></shopList>
        </div>
        <hotSearchPop v-show="isEnter" v-on:childFun="childGetValue"  v-on:childFunTwo="clearShCookie"  :postChildCook="filterItems"></hotSearchPop>
    </div>
</template>

<script>
    import VTitle from '@/components/title'
    import common from '@/components/common.js'
    import hotSearchPop from './hotSearch'
    import shopList from '@/components/shopList'

    export default {
        data () {
            return {
                pageTitle: '小煮集市',
                colNumSh: '',
                searchVal: '',
                searchVal_back: '',
                showLabel: false,   
                isValue: true,    //是否有搜索值
                isEnter: true,    //input 是否聚焦
                postChildCook: '',
                dataList: '',
                remDataList: '',
                noRemd: '',
                currentPage: 1,
                pageSize: 20,
                sortType: 0,
                noResult: false,
                showPop: false,
                sortTxt: '综合排序',
                showUl: false,
                showFilter: true,
                isFixed: false,
                isEnd: false,
                endListen: false,
                inputFocus: false
            }
        },
        components: { 
            VTitle,
            hotSearchPop,
            shopList,
        },
        created () {
            this.colNumSh = localStorage.getItem('colNumSh') || '2'
            this.searchVal = ''
            this.searchVal_back = this.$store.state.hotTxt
            this.getSearchCkFun()
        },
        methods: { 
            //视图切换
            togColNum:function(val){
                this.colNumSh = val
                localStorage.setItem('colNumSh',val)
            },
            entInput:function(){
                this.isEnter = true
                this.showUl = false
            },
            outInput:function(){
                this.showLabel = true
            },
            enterLabel:function(){
                this.showLabel = false
                this.inputFocus = true
                this.$refs['input'].focus()
            },
            clearInput:function(){
                this.searchVal = ''
                this.isValue = false
                this.showLabel = false
                if(this.noResult){
                    this.noResult = false
                    this.showFilter = false
                }
            },
            //点击搜索按钮
            searchFun:function(){
                this.currentPage = 1
                if(!this.searchVal){
                    this.searchVal = this.$store.state.hotTxt
                }
                this.searchVal_back = this.searchVal
                this.isEnter = false

                let historyVal = localStorage.getItem('hisSearch') + ',' + this.searchVal
                localStorage.setItem('hisSearch',historyVal)

                this.getSearchCkFun()   
                this.shopListFun(this.searchVal,this.sortType)
                this.getRecomd()
            },
            //清空搜索
            cancelSearch:function(){
                this.$router.go(-1)
            },
            //点击历史搜索
            childGetValue:function(v){
                this.currentPage = 1 
                this.isEnter = false
                this.searchVal = v
                this.searchVal_back = v
                this.getRecomd()
                this.shopListFun(v,this.sortType)
            },
            //清空历史搜索
            clearShCookie:function(){
                localStorage.removeItem('hisSearch')
                this.postChildCook = ''
            },
            //获取历史搜索缓存
            getSearchCkFun:function(){  
                let historyVal = localStorage.getItem('hisSearch')
                if(historyVal){
                    this.postChildCook = historyVal.split(',')
                    console.log("=====")
                    console.log(this.postChildCook)
                    this.postChildCook = common.uniqueArr(this.postChildCook).reverse()
                }
            },
            getRecomd:function(){
                var _this = this;
                var searchUrl = "/api/product/recommendForYou.do?name=" + _this.searchVal;
                this.ajaxDataFun('post',searchUrl,function(obj){
                    console.log("请求为您推荐")
                    if(obj.code == '200'){
                        if(obj.data.length == 0){
                            _this.noRemd = true
                        }else{
                            _this.noRemd = false
                        }
                        _this.remDataList = obj.data
                    }
                })
            },
            //获取商品列表
            shopListFun:function(val,sort,method){  
                var _this = this;
                    _this.endListen = false

                var searchUrl = "/api/product/search.do?name=" + val + "&currentPage=" + this.currentPage + "&pageSize=" + this.pageSize + "&sortType=" + sort;
                this.ajaxDataFun('post',searchUrl,function(obj){
                    if(obj.code == '200'){
                        var objLen = obj.data.length;
                        if(objLen < _this.pageSize){
                            _this.isEnd = true
                        }
                        if(method){
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
                            if(objLen == 0){
                                _this.noResult = true
                                _this.isEnd = true
                            }else{
                                _this.noResult = false
                                _this.showFilter = true
                            }
                            _this.dataList = obj.data
                        }
                    }
                })
            },
            //显示筛选
            showSort:function(){
                this.showUl = !this.showUl 
            },
            //筛选排序
            postSortFun:function(v,txt){
                this.currentPage = 1
                this.isEnd = false
                this.sortType = v
                this.sortTxt = txt
                this.showUl = false
                if(this.searchVal){
                    this.shopListFun(this.searchVal,v)
                }else{
                    this.shopListFun(this.searchVal_back,v)
                }
            },
            //隐藏排序ul
            hideSortFun:function(){
                this.showUl = false
            },
            removeArr:function(arr,val) {
                var index = arr.indexOf(val);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            },
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
                if(scrollTopTop + innerHt ==  allHeight){
                    if(!_this.endListen){
                        _this.currentPage++
                        if(_this.searchVal){
                            _this.shopListFun(_this.searchVal,_this.sortType,1)
                        }else{
                            _this.shopListFun(_this.searchVal_back,_this.sortType,1)
                        }
                    }
                    console.log(_this.currentPage)
                }
            })
        },
        watch:{
            searchVal:function(){
                if(this.searchVal.trim() == '' || this.searchVal.length == 0){
                    this.isValue = false
                    this.searchVal = ''
                }else{
                    this.isValue = true
                }
            }
        },        
        computed: {
            filterItems: function () {
                this.removeArr(this.postChildCook, 'null')

                return this.postChildCook.slice(0, 50)
            }
        },
        filters: {
            nomore:function(v){
                let l = v.length
                if(l > 6){
                    return v.slice(0,5) + '...'
                }
                return v
            }
        }
    }
</script>

