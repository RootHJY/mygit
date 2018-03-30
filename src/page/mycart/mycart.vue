<template>
    <div id="container" class="paddingBt80">
        <v-title> {{ pageTitle }}</v-title>
        <div id="loading" v-show="!showAllDiv">
            <img src="../../../static/img/logo2.png" alt="loading">
        </div>
        <div class="myCart">
            <div class="editCart" @click="editCartF()" v-show="!isEdit">
                <span class="icon-edit"></span>
                <p>编辑购物车</p>
            </div>
            <div class="editCart" v-show="isEdit" @click="editCartF()">
                <span class="icon-finish"></span>
                <p>完成编辑</p>
            </div>
            <div class="reduced clearfix" v-show="discountTip">
                <span v-if="discountTip.type == 'mj'">满减</span>
                <p>
                    <marquee behavior="1" direction="left" loop="-1"> 
                        {{ discountTip.desc }}
                    </marquee>
                    </p>
                <div class="right">
                    <router-link :to="'/list?promotionType=' + discountTip.type + '&promotionId=' + discountTip.promotionId"> 去凑单 </router-link>
                </div> 
            </div>
            <!-- 购物车商品 -->
            <div class="listCart">
                <div class="item justify" v-for="(item,index) in itemList">
                    <label class="choseThis box">
                        <input type="checkbox" :name="item.index" :value="item.index" v-model="selectIndex" />
                    </label>
                    <div class="orderListInfo box justify">
                        <div class="img box">
                            <router-link :to="{ path: 'shopDetails', query: { id: item.product.id}}">
                                <img :src="item.product.specImage" v-if="item.product.specImage" alt="" />
                                <img :src="item.product.image" v-if="!item.product.specImage" alt="" />
                            </router-link>
                        </div>
                        <router-link :to="{ path: 'shopDetails', query: { id: item.product.id}}" class="des box" v-show="!isEdit">
                            <b>
                                <i v-if="item.product.productMark">{{ item.product.productMark}}</i> 
                                {{ item.product.name }}
                            </b>
                            <p>{{ item.specDesc }}</p>
                            <div class="price clearfix">
                                <p>¥{{ item.price }}  <i v-show="item.stockOver">库存不足</i></p>
                                <span class="tright">x{{ item.quantity }}</span>
                            </div>
                        </router-link>
                        <div class="operating" v-show="isEdit">
                            <editInfo :itemInfo="item" v-on:postList="childGetValue"></editInfo>
                            <div class="del" @click="delItemF(item.id,item.index)">
                                <span class="icon-delete"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 失效商品 -->
            <div class="listCart ed" v-if="invalidItemList" >
                <div class="item justify"  v-for="(item,index) in invalidItemList">
                    <div class="choseThis box">
                        <em>失效</em>
                    </div>
                    <div class="orderListInfo box justify">
                        <div class="img box">
                            <router-link :to="{ path: 'shopDetails', query: { id: item.id}}">
                                <img :src="item.product.image" alt="">
                                <img src="../../../static/img/fff.png" v-if="!item.product.image">
                            </router-link>
                        </div>
                        <router-link :to="{ path: 'shopDetails', query: { id: item.id}}" class="des box">
                            <b>{{ item.product.name }}</b>
                            <p>规格：{{ item.specDesc }}</p>
                            <div class="price clearfix">
                                <p>¥{{ item.price }} </p>
                                <span>x{{ item.quantity }}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="clearFailure" v-show="invalidItemList.length" @click="clearInvalid()"> 清空失效商品 </div>
        </div>
        <!-- 购物车为空 -->
        <div class="popNotCart" v-show="!itemList.length && !invalidItemList.length">
            <router-link to="/" class="content">
                <img src="../../../static/img/not_cart.png" alt="" />
                <p>购物车快饿瘪了 T.T <br/> 快给我挑点宝贝</p>
                <span>去逛逛</span>
            </router-link>
        </div>

        <!-- 付款 购物车全选 -->
        <div class="popChoose hasFooter justify" v-show="!isEdit && itemList.length ">
            <div class="box choseThis">
                <label>
                    <input type="checkbox" name="checkAll" :checked="itemList.length == selectIndex.length" @click="chooseAllF" /> 
                    <p>全选</p>
                </label>
            </div>
            <div class="box total" >
                <p>合计：<b>{{ totalPrice }}</b></p>
                <span>不含运费</span>
            </div>  
            <div class="box">
                <div class="sureBtn" :class="{active:selectIndex.length > 0}" @click="accountF">
                    结算({{selectIndex.length}})
                </div>
            </div>
        </div>

         <!-- 删除购物车 全选 -->
        <div class="popChoose justify" v-show="isEdit && itemList.length">
            <div class="box choseThis">
                <label>
                    <input type="checkbox" name="checkAll2" :checked="itemList.length == selectIndex.length"  @click="chooseAllF" /> 
                    <p>全选</p>
                </label>
            </div>
            <div class="box rightBtn">
                <div class="sureBtn" :class="{active:selectIndex.length > 0}"  @click="delMoreF()">
                    删除({{selectIndex.length}})
                </div>
            </div>
        </div>

        <!-- 删除商品提示 -->
        <div class="popBg" v-show="isShowPop" @click="isShowPop = false"></div>
        <div class="popOr" v-show="isShowPop">
            <div class="tip">{{ delTxt }}</div>
            <div class="clearfix">
                <div class="fleft btn" @click="isShowPop = false">取消</div>
                <div class="fright btn" @click="sureDelThisF">确认</div>
            </div>
        </div>
        <footerLay :fIndex="3"></footerLay>
        <login></login>
    </div>
</template>

<script>
    import popMin from '@/components/popMin'
    import common from '@/components/common'
    import VTitle from '@/components/title'
    import login from '@/components/login'
    import footerLay from '@/components/footer'
    import editInfo from './editInfo'
    export default {
        data () {
            return {
                pageTitle: '购物车',
                chooseAll: false,
                isEdit: false,
                discountTip: '', 
                itemList: '',
                invalidItemList: '',
                invalidArr: [],   // 无效购物车
                isShowPop: false,
                selectIndex: [],
                delId: '-1',   //删除单个的id
                delIndex: '-1', //删除单个的下标
                delIdArr: [],   //删除多个的id
                delIdIndex: [], //删除多个的下标
                isDelOne: false,
                isDelMore: false,
                delTxt: '',
                showAllDiv: false,
            }
        },
        components: {
            editInfo,
            footerLay,
            login,
            VTitle
        },
        created () {
            this.getMyCart()
        },
        methods: { 
            editCartF:function(){
                this.isEdit = !this.isEdit
            },
            getMyCart:function(){
                var _this = this
                var myCaryUrl = "/wechatecom/appserver/cart/myCart.do"
                this.ajaxDataFun('post',myCaryUrl,function(obj){
                    if(obj.code == '200'){
                        _this.showAllDiv = true
                        var _data = obj.data
                        _this.discountTip = _data.discountTip  //购物车列表
                        _this.itemList = _data.itemList  //购物车列表
                        //失效商品ids
                        _this.invalidItemList = _data.invalidItemList 
                        var invLen = _this.invalidItemList.length
                        var j = 0
                        for(j; j < invLen; j++){
                            _this.invalidArr.push(_data.invalidItemList[j].id)
                        }
                    }
                })
            },
            removeArr:function(arr,val) {
                var index = arr.indexOf(val);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            },
            chooseAllF:function(event){   //全选功能
                var _this = this
                if(event.currentTarget.checked) {
                    _this.selectIndex = []
                    _this.itemList.forEach(function(item, i) {
                        _this.selectIndex.push(item.index)
                    });
                }else{
                    _this.selectIndex = []
                }
            },
            childGetValue:function(v){
                console.log("反应过来。。。")
                this.itemList = v
            },
            //删除单个
            delItemF:function(id,indexId){
                this.isDelOne = true
                this.isDelMore = false
                this.delTxt = '确定要删除这个商品吗？'
                this.isShowPop = true
                this.delId = id
                this.delIndex = indexId
            },
            //删除多个
            delMoreF:function(){
                var _this = this
                this.isDelOne = false
                this.isDelMore = true
                if(this.selectIndex.length){
                    _this.delIdArr = []
                    _this.delIdIndex = []
                    _this.delTxt = '确定要删除选中的商品吗？'
                    _this.isShowPop = true
                    _this.selectIndex.forEach(function(s, i) {
                        for(let item of _this.itemList){
                            if(s == item.index){
                                _this.delIdArr.push(item.id)
                                _this.delIdIndex.push(item.index)
                            }
                        }
                    });
                }
            },
            //确定删除
            sureDelThisF:function(){
                this.isShowPop = false
                if(this.isDelOne){
                    this.delFun(this.delId)
                }
                if(this.isDelMore){
                    this.delFun(this.delIdArr)
                }
            },
            //删除事件
            delFun:function(ids){
                var _this = this
                var delUrl = ''
                if(_this.isDelOne){
                    delUrl = '/wechatecom/appserver/cart/delete.do?cartItemIds=' + ids
                }

                if(_this.isDelMore){
                    delUrl = '/wechatecom/appserver/cart/delete.do?cartItemIds=' + ids.toString()
                }

                this.ajaxDataFun('post',delUrl,function(obj){
                    if(obj.code == '200'){
                        popMin.show("icon-icon_selected","删除成功")
                        if(_this.isDelOne){
                            _this.removeArr(_this.selectIndex,_this.delIndex)
                        }

                        if(_this.isDelMore){
                            var l = _this.selectIndex.length - 1 
                            for(l; l > -1; l--){
                                if(_this.selectIndex.indexOf(_this.delIdIndex[l]) > -1){
                                    _this.removeArr(_this.selectIndex,_this.delIdIndex[l])
                                }
                            }
                            _this.isEdit = false
                        }
                        _this.itemList = obj.data.itemList
                        _this.invalidItemList = obj.data.invalidItemList
                        _this.getMcartNum()
                    }
                })
            },
            clearInvalid:function(){
                this.isDelMore = true
                var ids = this.invalidArr.toString()
                this.delFun(ids)
            },
            accountF:function(){  //结算
                if(!this.selectIndex.length){
                    popMin.show("icon-sign","您还未选择商品哦")
                    return
                }

                var _this = this
                var billStr = ''

                this.$store.state.orderItems = ''
                this.$store.state.promotionId = ''
                this.$store.state.promotionType = ''
                this.$store.state.ptId = ''

                localStorage.removeItem("orderItems")
                localStorage.removeItem("promotionId")
                localStorage.removeItem("promotionType")
                localStorage.removeItem("ptId")
                localStorage.removeItem('orderId')

                if(_this.selectIndex.length){
                    _this.selectIndex.forEach(function(s, i) {
                        for(let item of _this.itemList){
                            if(s == item.index){
                                billStr += item.product.productWareId + ':' + item.quantity + ':' + item.id + ','
                            }
                        }
                    });
                    _this.$store.state.orderItems = billStr.slice(0,-1)
                    localStorage.setItem('orderItems', _this.$store.state.orderItems);

                    if(!this.$store.state.isLogin){
                        this.$store.state.loginToPage = '/payment'
                        this.$store.state.isShowLogin = true
                    }else{
                        _this.$router.push('/payment') 
                    }
                }else{
                    console.log("未选中")
                }
            },
            getMcartNum:function(){
                var _this = this
                var numUrl = "/wechatecom/appserver/cart/getCartSkuCount.do"
                this.ajaxDataFun('post',numUrl,function(obj){
                    if(obj.code == '200'){
                        _this.$store.state.cartNum = obj.data.count
                        localStorage.setItem('cartNum',obj.data.count)
                        console.log(_this.$store.state.cartNum)
                    }
                })
            }
        },
        computed:{
            totalPrice:function(){
                let v = 0;
                var _this = this
                _this.selectIndex.forEach(function(s, i) {
                    for(let item of _this.itemList){
                        if(s == item.index){
                            v += item.price * item.quantity
                        }
                    }
                });
                return v.toFixed(2)
            }
        }
    }
</script>

