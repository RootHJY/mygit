<template>
    <div id="container" class="paddingBt50">
        <v-title> {{ pageTitle }}</v-title>
        <div id="loading" v-show="!showAllDiv">
            <img src="../../../static/img/logo2.png" alt="loading">
        </div>
        <div class="shopDetails">
            <div class="shopSlide">
                <img :src="image" alt="" v-if="swipeList.length < 2" />
                <swipe :swipeList="swipeList" v-if="swipeList.length > 1"></swipe>
            </div>
            <div class="disLimit justify" v-if="isActive && marketable">
                <div class="box" v-if="minPrice">
                    <div class="priceReal">
                        <em>¥</em>
                        <span>{{ promotion.minPrice | leftPrice }}</span>
                        <em>{{ promotion.minPrice | rightPrice }}</em>
                        -
                        <em>¥</em>
                        <span>{{ promotion.maxPrice | leftPrice }}</span>
                        <em>{{ promotion.maxPrice | rightPrice}}</em>
                    </div>
                    <div class="priceOld"> 
                        <span  v-if="promotion.type == 'pt'">单买价</span>
                        <em>¥{{minPrice}}-¥{{maxPrice}} </em>
                    </div>
                </div>
                <div class="box" v-if="!minPrice">
                    <div class="priceReal">
                        <em>¥</em>
                        <span>{{ price | leftPrice }}</span>
                        <em>{{ price | rightPrice }}</em>
                    </div>
                    <div class="priceOld">
                        <span  v-if="promotion.type == 'pt'">单买价</span>
                        <em>¥{{ costPrice }}</em>
                    </div>
                </div>
                <div class="box right">
                    <p>距结束仅剩</p>
                    <countDown :seconds="promotion.expireSeconds"></countDown>
                </div>
            </div>
            <div class="shopInfo">
                <div class="tip" v-if="isActive">
                    <span class="bg" v-show="promotion.tag"> {{ promotion.tag }}</span>
                    <span v-for="item in tagList">{{ item }}</span>
                </div>
                <div class="title" :class="{limit:!isActive}">{{ pageTitle }}</div>
                <div class="tip" v-if="!isActive">
                    <span v-for="item in tagList">{{ item }}</span>
                </div>
                <div class="price" v-if="!isActive && minPrice">
                    <em>¥</em>
                    <span>{{ minPrice | leftPrice }}</span>
                    <em>{{ minPrice | rightPrice }}</em>
                    -
                    <em>¥</em>
                    <span>{{ maxPrice | leftPrice }}</span>
                    <em>{{ maxPrice | rightPrice }}</em>
                </div>
                <div class="price" v-if="!isActive && !minPrice">
                    <em>¥</em>
                    <span>{{ price | leftPrice }}</span>
                    <em>{{ price | rightPrice }}</em>
                </div>
                <div class="justify more">
                    <div class="box">快递：{{ freightDesc }}</div>
                    <div class="box">剩余{{ totalStock }}件</div>
                </div>
            </div>
            <couponLay :id="id"></couponLay>
            <proTxt :promotionList="promotionList" v-if="promotionList != ''"></proTxt>
            <div class="norm" @click="showChooseF(0,'00')" v-show="specList.length > 0">
                <span>已选</span>  
                <p v-show="!specTxtStr.length">默认规格</p>  
                <p v-show="specTxtStr.length">{{ specTxtStr }}</p>  
            </div>
            <groupList :ptList="ptList" :pid="id" v-if="ptList != ''"></groupList>
            <groupGame v-if="promotion.type == 'pt'"></groupGame>
            <packageList :productSetList="productSetList" :id="id" v-if="productSetList != ''"></packageList>
            <div class="shopMore" style="margin-top:30px;">
                <div class="title">商品详情</div>
                <div class="shopContent" v-html="introduction"></div>
            </div>
            <remmendLay :dataList="recommendList"></remmendLay> 
        </div>
        <div id="footer" v-show="showAllDiv">
            <ul class="justify">
                <li class="box minCol">
                    <router-link to="/index">
                        <span class="icon icon_a icon-home_nomal"></span>
                        <span class="icon icon_b icon-home_selected"></span>
                        <p>首页</p>
                    </router-link>
                </li>
                <li class="box minCol">
                    <router-link to="/mycart">
                        <span class="icon icon_a icon-cart_nomal"></span>
                        <span class="icon icon_b icon-cart_selected"></span>
                        <p>购物车</p>
                        <em v-if="$store.state.cartNum != 0">{{ $store.state.cartNum  }}</em>
                    </router-link>
                </li>
                <li class="box largeCol" v-show="totalStock && marketable && promotion.type != 'pt'">
                    <div class="noBgBtn active" @click="showChooseF(1,'01')">加入购物车</div>
                </li>
                <li class="box largeCol" v-show="promotion.type == 'pt'">
                    <div class="noBgBtn more active" @click="showChooseF(1,'02')">
                        <p>¥{{ costPrice }}</p>
                        <span>单独购买</span>
                    </div>
                </li>
                <li class="box largeCol" v-show="promotion.type == 'pt'">
                    <div class="sureBtn active" @click="showChooseF(1,'03')" v-show="promotion.ptFlag == '0'">
                        开启拼团
                    </div>
                    <div class="sureBtn active" @click="showChooseF(1,'04')" v-show="promotion.ptFlag == '1'">
                        立即参团
                    </div>
                </li>
                <li class="box largeCol" v-show="totalStock && marketable && promotion.type != 'pt' ">
                     <div class="sureBtn" :class="{active:stock}" @click="showChooseF(1,'05')"> 立即购买 </div>
                </li>
                <li class="box bigCol" v-show="!totalStock && marketable">
                    <div class="edBtn">已售罄</div>
                </li>
                <li class="box bigCol" v-show="!marketable">
                    <div class="edBtn">已下架</div>
                </li>
            </ul>
        </div>
        <div class="popBg" v-show="isShowChoose" @click="isShowChoose = false"></div>
        <div class="popShop" v-show="isShowChoose">
            <div class="close icon-close" @click="isShowChoose = false"></div>
            <div class="top">
                <div class="img">
                    <img :src="specImage" v-if="specImage" alt="" />
                    <img :src="image" v-if="!specImage" alt="" />
                </div>
                <div class="info">
                    <span class="flag" v-show="promotion.tag && btnStatus != '02'">{{ promotion.tag }}</span>
                    <div class="price" v-show="btnStatus != '02'">
                        <em>¥</em>{{ price | leftPrice}}<em>{{ price | rightPrice }} </em>
                        <span v-show="costPrice">¥{{ costPrice }}</span>
                    </div>
                    <div class="price" v-show="btnStatus == '02'">
                        <em>¥</em>{{ costPrice }}
                    </div>
                    <div class="txt" v-show="specTxtStr.length > 0">已选: {{ specTxtStr }} </div>
                </div>
            </div>
            <div class="chooseWrap">
                <div class="chose" v-for="(list,Pindex) in specList">
                    <div class="title">
                        <p>{{ list.name }}</p>
                    </div>
                    <ul class="clearfix">
                        <li v-for="(val,Cindex) in list.valueList" :class="{active:val.isSelected,blank:!val.retainStock}" @click="chooseSpelF(Pindex,val.id,val.retainStock)">{{ val.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="number">
                <div class="title">
                    <b>数量</b>
                    <p v-show="promotion.buyLimit"> (每人限购{{ promotion.buyLimit }}件，超出按非活动价计算)</p>
                </div>
                <ul class="add clearfix">
                    <li @click="cutNumF"><span :class="{blank:quantity == 1}">-</span></li>
                    <li><input type="number" v-model="quantity" v-on:focus="selectTxt($event)" /></li>
                    <li @click="addNumF"><span :class="{blank:quantity == stock}">+</span></li>
                </ul>
                <div class="tip" v-show="stock < 11">库存仅剩{{ stock }}件</div>
            </div>
            <div class="btn" v-show="popFromFoot">
                <div class="sureBtn active only" @click="buyAllBtn">确定</div> 
            </div>
            <div class="btn" v-show="promotion.type != 'pt' && !popFromFoot">
                <ul>
                    <li>
                        <div class="noBgBtn active" @click="addCartF">加入购物车</div> 
                    </li>
                    <li>
                        <div class="sureBtn active" @click="buyNow(1)">立即购买</div> 
                    </li>
                </ul>
            </div>
            <div class="btn" v-show="promotion.type == 'pt' && !popFromFoot">
                <ul>
                    <li>
                        <div class="noBgBtn more active" @click="buyNow(0)">
                            <p>¥{{ costPrice }}</p>
                            <span>单独购买</span>
                        </div>
                    </li>
                    <li v-show="promotion.ptFlag == '1'">
                        <div class="sureBtn active" @click="joinGroup" >立即参团</div> 
                    </li>
                    <li v-show="promotion.ptFlag == '0'">
                        <div class="sureBtn active" @click="buyNow(0)">开启拼团</div> 
                    </li>
                </ul>
            </div>
        </div>
        <login v-show="isShowLogin" v-on:childClose="hideLoginF"></login>
    </div>
</template>

<script>
    import common from '@/components/common'
    import popMin from '@/components/popMin'
    import login from '@/components/login'
    import swipe from '@/components/swipeShop'
    import countDown from '@/components/countDown'
    import VTitle from '@/components/title'
    import couponLay from './coupon'
    import proTxt from './proTxt'
    import groupList from '../group/groupList'
    import groupGame from '../group/groupGame'
    import packageList from '../package/packageList'
    import remmendLay from './remmendLay'
    export default {
        data () {
            return {
                pageTitle: '',  //商品名称
                id: '',         //商品ID
                specVals: [],
                specTxtArr: [],
                image: '',  //主图
                swipeList: [],  //图片列表
                promotion: '', //是否有活动 包含折扣信息
                promotionList: '', //促销文字
                ptList: '', //活动信息
                isActive: false,
                tagList: [],  //标签列表
                price: '',   //单个价格
                costPrice: '', //拿掉的价格
                minPrice: '', //最小价格
                maxPrice: '', //最小价格
                freightDesc: '',  //运送描述
                marketable:true,
                totalStock: '', //虚假库存
                stock: '', //虚假库存
                introduction: '', //富文本描述
                productWareId: '',  //加入购物车ID
                specList: '', //商品规格
                specImage: '',
                recommendList: '',  //为您推荐
                productSetList: '', //套餐
                quantity: 1,    //加入购物车数量
                isShowChoose: false,
                isChoose: false,
                isShowLogin: false,
                popFromFoot: false,
                btnStatus: '',  //  01加入购物车  02单独购买 立即购买  03 开启拼团  04立即参团
                showAllDiv: false,
            }
        },
        components: { 
            login,
            countDown,
            VTitle,
            swipe,
            couponLay,
            proTxt,
            packageList,
            groupList,
            groupGame,
            remmendLay,
        },
        created () {

            this.$store.state.cartNum = localStorage.getItem('cartNum') //获取购物车数量
            this.getUrlId() //获取商品ID

            let locaUrl = window.location.href 
            if(locaUrl.indexOf('channelId=') > -1){
                this.getAllData('',locaUrl)  //获取所有商品信息
            }else{
                this.getAllData('')  //获取所有商品信息
            }
        },
        methods: { 
            selectTxt:function(e){
                let item = e.target
                item.select()
            },
            showLoginF:function(){
                this.isShowLogin = true
            },
            hideLoginF:function(v){
                this.isShowLogin = false
                if(v){
                    this.getInfo()
                }
            },
            getMcartNum:function(){
                var _this = this
                var numUrl = "/wechatecom/appserver/cart/getCartSkuCount.do"
                this.ajaxDataFun('post',numUrl,function(obj){
                    if(obj.code == '200'){
                        _this.$store.state.cartNum = obj.data.count
                        localStorage.setItem('cartNum',obj.data.count)
                    }
                })
            },
            getAllData:function(val,source){
                var _this = this;
                var detailsUrl = ''

                if(source){
                    detailsUrl = "/wechatecom/appserver/product/details.do?productId=" + this.id + "&specVals=" + val + "&channelId=" + common.getUrlPars(source).channelId + "&putProjectId=" + common.getUrlPars(source).putProjectId 
                }else{
                    detailsUrl = "/wechatecom/appserver/product/details.do?productId=" + this.id + "&specVals=" + val
                }

                this.ajaxDataFun('post',detailsUrl,function(obj){
                    if(obj.code == '200'){
                        _this.showAllDiv = true

                        var _data = obj.data
                        _this.image = _data.image   //图片列表
                        _this.swipeList = _data.imageList   //图片列表
                        _this.pageTitle = _data.name
                        _this.promotion = _data.promotion   //是否有活动 包含折扣信息
                        _this.promotionList = _data.promotionList   //促销文字
                        _this.ptList = _data.ptList   //组团信息
                        _this.tagList = _data.tagList       //标签列表
                        _this.price = _data.price      //真实价格
                        _this.productSetList = _data.productSetList      //套餐
                        _this.costPrice = _data.costPrice      //单个价格
                        _this.minPrice = _data.minPrice      //最小价格
                        _this.maxPrice = _data.maxPrice      //最小价格
                        _this.freightDesc = _data.freightDesc  //运送描述
                        _this.marketable = _data.marketable   //是否下架
                        _this.totalStock = _data.totalStock  //虚假库存
                        _this.stock = _data.stock  //虚假库存
                        _this.introduction = _data.introduction  //富文本描述
                        _this.productWareId = _data.productWareId   //加入购物车ID
                        _this.specImage = _data.specImage   //商品规格
                        _this.specList = _data.specList   //商品规格
                        var specLen = _data.specList.length   //给规格赋值

                        if(_this.quantity > _this.stock){
                            _this.quantity = _this.stock
                        }

                        if(_this.promotion){
                            if(_data.promotion.type == 'ms' || _data.promotion.type == 'zk' || _data.promotion.type == 'pt'){
                                _this.isActive = true
                            }
                        }

                        _this.specVals = []   //请求规格ids
                        _this.specTxtArr = []    //默认规格文字
                        if(specLen){
                            for(let i = 0;i < specLen; i++){
                                for(let j = 0; j < _this.specList[i].valueList.length; j++){
                                    if(_this.specList[i].valueList[j].isSelected){
                                        _this.specVals[i] = _this.specList[i].valueList[j].id
                                        _this.specTxtArr[i] = _this.specList[i].valueList[j].name
                                    }
                                }
                                if(!_this.specVals[i]){
                                    _this.specVals[i] = ''
                                    _this.specTxtArr[i] = ''
                                }
                            }
                        }
                        _this.recommendList = _data.recommendProductList  //为您推荐
                    }
                })
            },
            getUrlId:function(){
                let locaUrl = window.location.href
                if(locaUrl.indexOf('id=') > -1){
                    this.id = common.getUrlPars(locaUrl).id
                }
            },
            showChooseF:function(where,to){  //footer 1来自底部 0来自规格选取
                if(!this.marketable){
                    popMin.show("icon-sign","该商品已下架")
                    return
                }

                if(this.stock == '0'){
                    popMin.show("icon-sign","该商品已售罄，去看看其他商品吧","big")
                    return
                }

                if(where){
                    this.popFromFoot = true
                }else{
                    this.popFromFoot = false
                }

                this.btnStatus = to
                this.isShowChoose = true

                console.log('按钮类型:' + to)
            },
            chooseSpelF:function(i,id,can){
                if(can){
                    this.quantity = 1;
                    this.specVals[i] = id
                    var idStr = ''
                    for (let item of this.specVals){
                        if(item != ''){
                            idStr += item + ','
                        }
                    }
                    idStr = idStr.slice(0,-1)
                    this.getAllData(idStr)
                }else{
                    popMin.show("icon-sign","该商品规格暂时缺货")
                    return
                }
            },
            buyAllBtn:function(){
                let s = this.btnStatus
                //  01加入购物车  02单独购买  03 开启拼团  04立即参团 05立即购买 
                console.log(s)
                // alert("确定按钮类型:" + s)
                if(s == '01'){
                    this.addCartF()
                }else if(s == '02'){
                    this.buyNow(1)
                }else if(s == '03'){
                    this.buyNow(0)
                }else if(s == '04'){
                    this.joinGroup()
                }else if(s == '05'){
                    this.buyNow(1)
                }
            },
            addCartF:function(){
                var _this = this
                if(!_this.stock){
                    popMin.show('icon-sign','库存不足')
                    return 
                }else{
                    _this.isShowChoose = false
                    let addCartUrl = '/wechatecom/appserver/cart/add.do?productWareId=' + _this.productWareId + "&quantity=" + _this.quantity
                    this.ajaxDataFun('post',addCartUrl,function(obj){
                        if(obj.code == '200'){
                            popMin.show("icon-success","加入购物车成功")
                            _this.getMcartNum()
                        }else if(obj.code == '200'){
                            popMin.show("icon-success", obj.data.msg)
                        }else if(obj.code == '601'){
                            popMin.show("icon-sign", obj.msg)
                        }else if(obj.code == '610'){
                            popMin.show("icon-sign big", obj.msg)
                        }
                    })
                }
            },
            buyNow:function(type){  
                // type 1 正常购买  0 拼团
                this.$store.state.orderItems = ''
                this.$store.state.promotionId = ''
                this.$store.state.promotionType = ''
                this.$store.state.ptId = ''
                this.$store.state.orderCouponId = ''

                localStorage.removeItem("orderItems")
                localStorage.removeItem("promotionId")
                localStorage.removeItem("promotionType")
                localStorage.removeItem("ptId")
                localStorage.removeItem('orderId')

                if(!this.stock){
                    popMin.show('icon-sign','库存不足')
                    return
                }

                var billStr =  this.productWareId + ':' + this.quantity
                this.$store.state.orderItems = billStr
                localStorage.setItem('orderItems', billStr);

                if(this.promotion != ''){
                    this.$store.state.promotionId = this.promotion.id
                    if(type && this.promotion.type == 'pt'){
                        this.$store.state.promotionType = ''
                    }else{
                        this.$store.state.promotionType = this.promotion.type
                    }
                    localStorage.setItem('promotionId', this.$store.state.promotionId);
                    localStorage.setItem('promotionType', this.$store.state.promotionType);
                }

                console.log("billStr=" + billStr)
                console.log("promotionId=" + this.$store.state.promotionId)
                console.log("promotionType=" + this.$store.state.promotionType)

                if(!this.$store.state.isLogin){
                    this.$store.state.isShowLogin = true
                    this.$store.state.loginToPage = '/payment'
                    return 
                }else{
                    this.$router.push('/payment') 
                }
            },
            joinGroup:function(){
                if(!this.$store.state.isLogin){
                    this.$store.state.isShowLogin = true
                    this.$store.state.loginToPage = '/groupDetails?tid=' + this.ptList[0].tId + '&pid=' + this.id
                    return 
                }else{
                    this.$router.push('/groupDetails?tid=' + this.ptList[0].tId + '&pid=' + this.id) 
                }
            },
            cutNumF:function(){
                this.quantity--
            },
            addNumF:function(){
                this.quantity++
            }
        },
        watch: {
           '$route':function(to, from) {
                this.showAllDiv = false
                var warpDom = document.getElementById('container')
                this.GoTop(warpDom,0)
                this.getUrlId()
                this.getAllData('') 
            },
            quantity:function(){
                this.quantity = Math.floor(this.quantity)

                if(this.quantity < 1){
                    popMin.show("icon-sign","商品数量至少选择一件")
                    this.quantity = 1
                }

                if(this.quantity >= this.stock){
                    popMin.show("icon-sign","商品数量超出库存")
                    this.quantity = this.stock 
                }else if(this.promotion.buyLimit && this.quantity > this.promotion.buyLimit){
                    popMin.show("icon-sign","活动商品每人限购" + this.promotion.buyLimit + "件,超出按原价计算")
                }
            },
        },
        computed:{
            specTxtStr:function(){
                var s = ''
                for(let item of this.specTxtArr){
                    if(item){
                        s += ' / ' + item 
                    }
                }
                return s.slice(2,s.length)
            }
        },
    }
</script>

<style lang="scss" scoped>
    #footer{ background: linear-gradient(-180deg, rgba(255,255,255,0.00) 0%, #FFFFFF 40%, #FFFFFF 100%); padding-top:40px; padding-bottom:7px; white-space:nowrap;box-shadow: 0 0 0 0 rgba(238,238,238,0.5); }
    #footer li>a em{ right:8px;}
</style>

