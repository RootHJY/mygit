<template>
    <div id="container" class="bgf noScroll">
        <v-title> {{ pageTitle }}</v-title>
        <div id="loading" v-show="!showAllDiv">
            <img src="../../../static/img/logo2.png" alt="loading">
        </div>
        <div class="myWhiteBg  groupDetails">
            <div class="normal groupInfo">
                <router-link class="justify" :to="{ path: 'shopDetails', query: { id:pid}}">
                    <div class="box img">
                        <img :src="specImage" alt="" />
                        <img :src="image" v-if="!specImage" alt="" />
                    </div>
                    <div class="box info">
                        <p>{{ shopTitle }}</p>
                        <div class="price">
                            <em>{{ shopPeople }}人拼团</em>
                            <span class="minIconM">¥</span>{{ price }}
                        </div>
                        <div class="gray">单买价￥{{ costPrice }}</div>
                    </div>
                </router-link>
            </div>
            <div class="normal joinGroup">
                <div class="tip justify" v-show="status == '0'">  <!-- 未参团 团未满 -->
                    <p class="box left">还差<span>{{ num }}</span>人拼团成功</p>
                    <span class="box right">剩余
                        <count :seconds="expireSeconds" v-on:setMsg="timeEndF" style="display:inline-block;" v-if="expireSeconds"></count>
                    </span>
                </div>
                <div class="tip justify" v-show="isJoin == '1' && status == '1'"> <!-- 已参团 团已满 -->
                    <p class="box left">赞！已顺利成团</p>
                    <span class="box right">商家会尽快为您发货呦</span>
                </div>
                 <div class="tip justify" v-show="isJoin == '0' && status == '1'"> <!-- 未参团 团已满 -->
                    <p class="box left">团长人气太高，已拼团成功啦！</p>
                </div>
                <ul class="clearfix" :class="{min:showAll}">
                    <li v-for="item in joinVos">
                        <img :src="item.image" v-if="item.image" alt="" />
                        <img src="../../../static/img/logo2.png" v-if="!item.image" alt="" />
                        <span v-show="item.userType == '0'">团长</span>
                    </li>
                </ul>
                <div class="toggle" @click="showAll = !showAll" v-show="joinVos.length > 7 ">
                    <p class="all" v-show="showAll">全部</p>
                    <p class="up" v-show="!showAll">收起</p>
                </div>
            </div>
        </div>
            
        <!-- 已参加 进行中 来自订单页面 -->
        <div class="botBtn only" v-show="isJoin == '1' && status == '0' && !fromPay"> 
            <div class="sureBtn active" @click="toShare = true" >
                邀请好友参团
            </div>
        </div>
    
        <!-- 已参加 已结束 来自订单页面 -->
        <div class="botBtn only" v-show="isJoin == '1' && status == '1' && !fromPay"> 
            <div class="sureBtn active" @click="toShare = true" >
                <router-link to="/list?promotionType=pt">
                    更多活动商品
                </router-link>
            </div>
        </div>

        <!-- 已参加 来自刚付款 -->
        <div class="botBtn justify" v-show="isJoin == '1' && fromPay">  
            <div class="box">
                <div class="noBgBtn active" v-show="status == '1'">  <!-- 拼团已结束 -->
                    <router-link to="/list?promotionType=pt">
                        更多活动商品
                    </router-link>
                </div>
                <div class="noBgBtn active" @click="toShare = true"  v-show="status == '0'"><!-- 拼团未结束 -->
                    邀请好友参团
                </div>
            </div>
            <div class="box">
                <div class="sureBtn active">
                    <router-link :to="'/center/orderDetails?id=' + orderId + '&batchNo=' + batchNo">
                        查看订单
                    </router-link>
                </div>
            </div>
        </div>

        <div class="botBtn only" v-show="isJoin == '0'"> 
            <router-link to="/groupRules" class="help">
                <p>拼团玩法</p>
                <span class="icon-help"></span>
            </router-link>
            <div class="sureBtn active" @click="isShowPop = true" v-show="status == '0'">我要参团</div>
            <div class="sureBtn active" @click="isShowPop = true" v-show="status == '1'">我要开团</div>
        </div>
        <div class="popBg" v-show="isShowPop" @click="isShowPop = false"></div>
        <div class="popShop" v-show="isShowPop">
            <div class="close icon-close" @click="isShowPop = false"></div>
            <div class="top">
                <div class="img">
                    <img :src="specImage" alt="" />
                    <img :src="image" v-if="!specImage" alt="" />
                </div>
                <div class="info">
                    <span class="flag" v-show="isActive" v-for="item in tagList">{{ item }}</span>
                    <div class="price">
                        <em>¥</em>{{ price | leftPrice}}<em>{{ price | rightPrice}}</em>
                        <span v-show="costPrice">¥{{ costPrice }}</span>
                    </div>
                    <div class="txt" v-show="specTxtStr.length != 0">已选: {{ specTxtStr }} </div>
                </div>
            </div>
            <div class="chooseWrap">
                <div class="chose" v-for="(list,Pindex) in specList">
                    <div class="title">
                        <p>{{ list.name }}</p>
                    </div>
                    <ul class="clearfix">
                        <li v-for="(val,Cindex) in list.valueList" :class="{active:val.isSelected,blank:!val.retainStock}" @click="chooseSpelF(Pindex, val.id, val.retainStock)">{{ val.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="number">
                <div class="title">数量</div>
                <ul class="add clearfix">
                    <li @click="cutNumF"><span :class="{blank:quantity == 1}">-</span></li>
                    <li><input type="number" value="1" v-model="quantity" /></li>
                    <li @click="addNumF"><span :class="{blank:quantity == stock}">+</span></li>
                </ul>
                <div class="tip" v-show="stock < 11">库存仅剩{{ stock }}件</div>
            </div>
            <div class="btn">
                <div class="sureBtn only" :class="{active:stock != '0'}"  @click="buyNow">确定</div> 
            </div>
        </div>
        <div class="popBg" v-show="toShare" @click="toShare = false"></div>
        <div class="popGroupShare" v-show="toShare">
            <div class="close icon-close" @click="toShare = false"></div>
            <img :src="shareImg" />
        </div>
    </div> 
</template>

<script>
    import common from '@/components/common'
    import popMin from '@/components/popMin'
    import count from '@/components/count'
    import VTitle from '@/components/title'
    export default {
        data () {
            return {
                pageTitle: '组团详情',
                pid: '',
                tid: '',
                orderId: '',
                batchNo: '',
                expireSeconds: '',
                num: '',
                joinVos: '',
                showAll: false,
                shopPeople: '',  //拼团人数
                shopTitle: '', 
                tagList: '',
                image: '',
                promotion: '',
                specVals: [],
                specTxtArr: [],
                price: '',   //单个价格
                costPrice: '', //拿掉的价格
                minPrice: '', //最小价格
                maxPrice: '', //最小价格
                specVals: [],
                stock: '', //虚假库存
                productWareId: '',  //加入购物车ID
                specList: '', //商品规格
                specImage: '',
                quantity: 1,
                isShowPop: false,
                isShowChoose: false,
                isJoin: '',  //0 未参团  1已参团
                status: '', //0 进行中  1结束
                shareImg: '',
                showMore: false,
                toShare: false,
                fromPay: false,
                showAllDiv: false,
            }
        },
        components: { 
            count,
            VTitle,
        },
        created () {
            var _this = this
            var _locaUrl = window.location.href

            if(_locaUrl.indexOf('fromPay=') > -1){
                this.fromPay = true
            }

            _this.pid = common.getUrlPars(_locaUrl).pid
            _this.tid = common.getUrlPars(_locaUrl).tid
            _this.orderId = common.getUrlPars(_locaUrl).orderId
            _this.batchNo = common.getUrlPars(_locaUrl).batchNo

            var isLogin = localStorage.getItem('isLogin')
            if(isLogin == 'true'){ 
                console.log('参团页小哥已登录...')
                _this.$store.state.isLogin = true
                _this.getPeople()
                _this.getDetaisl('')
            }else{
                console.log('参团页小哥木有登录!!!')
                this.$router.push('/shopDetails?id=' + this.pid) 
            }
        },
        methods: { 
            getPeople:function(){
                var _this = this
                var avarUrl = "/wechatecom/appserver/order/ptDetail.do?ptCreateId=" + this.tid
                this.ajaxDataFun('post',avarUrl,function(obj){
                    if(obj.code == '200'){
                        _this.showAllDiv = true
                        let _data = obj.data
                        _this.expireSeconds = _data.expireSeconds
                        _this.num = _data.num
                        _this.joinVos = _data.joinVos
                        _this.isJoin = _data.isJoin
                        _this.status = _data.status
                        _this.shareImg = _data.ossImagePath
                    }
                })
            },
            getDetaisl:function(val){
                var _this = this;
                var _detailsUrl = "/wechatecom/appserver/product/details.do?productId=" + this.pid + "&specVals=" + val
                this.ajaxDataFun('post',_detailsUrl,function(obj){
                    if(obj.code == '200'){
                        var _data = obj.data
                        _this.shopTitle = _data.name
                        _this.tagList = _data.tagList        //标签列表
                        _this.price = _data.price      //单个价格
                        _this.productSetList = _data.productSetList      //单个价格
                        _this.costPrice = _data.costPrice      //单个价格
                        _this.minPrice = _data.minPrice      //最小价格
                        _this.maxPrice = _data.maxPrice      //最小价格
                        _this.stock = _data.stock  //真实库存
                        _this.productWareId = _data.productWareId   //加入购物车ID
                        _this.image = _data.image   //商品规格
                        _this.specImage = _data.specImage   //商品规格
                        _this.specList = _data.specList   //商品规格
                        _this.promotion  = _data.promotion
                        _this.shopPeople  = _data.promotion.ptSuccNum
                        var specLen = _data.specList.length   //给规格赋值
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
                    }
                })
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
            buyNow:function(){

                if(this.stock == '0'){
                    popMin.show('icon-sign','库存不足')
                    return 
                }

                this.$store.state.orderItems = ''
                this.$store.state.promotionId = ''
                this.$store.state.promotionType = ''
                this.$store.state.ptId = ''

                localStorage.removeItem("orderItems")
                localStorage.removeItem("promotionId")
                localStorage.removeItem("promotionType")
                localStorage.removeItem("ptId")

                if(this.stock){
                    var billStr =  this.productWareId + ':' + this.quantity
                    this.$store.state.orderItems = billStr
                    this.$store.state.promotionId = this.promotion.id
                    this.$store.state.ptId = this.tid
                    this.$store.state.promotionType = 'pt'

                    localStorage.setItem('orderItems', billStr);
                    localStorage.setItem('promotionId', this.$store.state.promotionId);
                    localStorage.setItem('tid', this.$store.state.ptId );
                    localStorage.setItem('promotionType', 'pt');
                    localStorage.removeItem('orderId')

                    console.log("billStr=" + billStr)
                    console.log("promotionId=" + this.$store.state.promotionId)
                    console.log("ptId=" + this.$store.state.ptId)
                    console.log("promotionType=" + this.$store.state.promotionType)

                    this.$router.push('/payment') 
                }else{
                    popMin.show('icon-sign','库存不足')
                    return
                }
            },
            timeEndF:function(){  //倒计时结束
                this.status = '1'
            },
            cutNumF:function(){
                this.quantity--
            },
            addNumF:function(){
                this.quantity++
            }
        },
        watch:{
            quantity:function(){
                this.quantity = Math.floor(this.quantity)
                if(this.quantity < 1){
                    this.quantity = 1
                }
                if(this.quantity >= this.stock){
                     this.quantity = this.stock 
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
        }
    }
</script>

