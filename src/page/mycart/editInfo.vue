<template>
    <section>
        <div class="choseNum">
            <span @click="reduceCartNum()">-</span>
            <input type="number" v-model="quantity" v-on:input="inputF" v-on:focus="selectTxt($event)" />
            <span @click="addCartNum()" class="tright">+</span>
        </div>
        <div class="choseInfo" @click="getAllData('')" v-show="specTxtStr.length">
            规格：{{ specTxtStr }} 
        </div>
        <div class="popBg" v-show="isShow" @click="isShow = false"></div>
        <div class="popShop" v-show="isShow">
            <div class="close icon-close" @click="isShow = false"></div>
            <div class="top">
                <div class="img">
                    <img :src="image" v-if="!specImage" alt="" />
                    <img :src="specImage" v-if="specImage" alt="" />
                </div>
                <div class="info">
                    <span class="flag" v-if="promotion">限时折扣</span>
                    <div class="price">
                        <em>¥</em>{{ price | leftPrice}}<em>{{ price | rightPrice}}</em>
                        <span v-show="costPrice">¥{{ costPrice }}</span>
                    </div>
                    <div class="txt" v-show="specTxtStr.length != 0">已选: {{ specTxtStr }} </div>
                </div>
            </div>
            <p> {{ specList }} </p>
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
                    <li @click="reduceCartNum"><span :class="{blank:quantity == 1}">-</span></li>
                    <li><input type="number" v-model="quantity" v-on:input="inputF" v-on:focus="selectTxt($event)" /></li>
                    <li @click="addCartNum"><span :class="{blank:quantity == stock}">+</span></li>
                </ul>
                <div class="tip" v-show="stock < 11">库存仅剩{{ stock }}件</div>
            </div>
            <div class="btn">
                <div class="sureBtn only" :class="{active:stock}" @click="updataWare">确定</div> 
            </div>
        </div>
    </section>
</template>

<script>
    import popMin from '@/components/popMin.js'
    export default {
        data () {
            return {
                pageTitle: '修改购物车信息',
                isShow: false,
                cartId: '',
                productId: '',
                quantity: '1',  // 当前购物车数量
                productWareId: '',  //加入购物车ID
                specVals: [],
                specTxtArr: [],
                promotion: '', //是否有活动 包含折扣信息
                tagList: [],  //标签列表
                price: '',   //单个价格
                costPrice: '', //拿掉的价格
                stock: 0, //虚假库存
                specList: '', //商品规格
                image: '',
                specImage: '',  //规格图片
                timeF: '',
                specTxtStr:'',
            }
        },
        components: { 

        },
        props: ['itemInfo'],
        created () {
            this.cartId = this.itemInfo.id   //加入购物车ID
            this.productId = this.itemInfo.product.id   //加入购物车ID
            this.quantity = this.itemInfo.quantity   //数量
            this.stock = this.itemInfo.stock   //库存
            this.specTxtStr = this.itemInfo.specDesc   //库存
        },
        methods: { 
            selectTxt:function(e){
                let item = e.target
                item.select()
            },
            updataQuaF:function(){   // 更新数量
                var _this = this
                var updataNumUrl = "/api/cart/update.do?cartItemId=" + _this.cartId + "&quantity=" + this.quantity
                this.ajaxDataFun('post',updataNumUrl,function(obj){
                    if(obj.code == '200'){
                        _this.$emit('postList',obj.data.itemList)
                    }
                })
            }, 
            updataWare:function(){   // 更新详细参数
                if(this.stock == '0'){
                    popMin.show('icon-sign','库存不足')
                    return 
                }

                if(!this.quantity){
                    popMin.show('icon-sign','至少选择一件商品')
                    return 
                }

                var _this = this
                var updataUrl = "/api/cart/update.do?cartItemId=" + this.cartId + "&productWareId=" + this.productWareId + "&quantity=" + this.quantity
                this.ajaxDataFun('post',updataUrl,function(obj){
                    if(obj.code == '200'){
                        _this.isShow = false
                        _this.$emit('postList',obj.data.itemList)
                    }
                })
            },
            getAllData:function(val){  // 获取单个详细参数
                var _this = this
                var _data = _this.itemInfo
                _this.isShow = true
                _this.productWareId = _data.productWareId
                var detailsUrl = ''
                if(val){
                    detailsUrl = "/api/product/details.do?productId=" + _this.productId 
                    + "&specVals=" + val
                }else{
                    detailsUrl = "/api/product/details.do?productId=" + _this.productId 
                    + "&productWareId=" + _this.productWareId
                }

                this.ajaxDataFun('post',detailsUrl,function(obj){
                    if(obj.code == '200'){
                        var _async = obj.data
                        _this.promotion = _async.promotion   //是否有活动 包含折扣信息
                        _this.tagList = _async.tagList        //标签列表
                        _this.price = _async.price      //真实价格
                        _this.productWareId = _async.productWareId   //加入购物车ID
                        _this.costPrice = _async.costPrice      //打折前的价格
                        _this.stock = _async.stock  //当前型号库存
                        _this.image = _async.image   //默认图片
                        _this.specImage = _async.specImage   //规格图片
                        _this.specList = _async.specList   //商品规格
                        var specLen = _async.specList.length   //给规格赋值
                        _this.specVals = []   //请求规格ids
                        _this.specTxtArr = []    //默认规格文字
                        _this.specTxtStr = ''
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

                            for(let item of _this.specTxtArr){
                                if(item){
                                    _this.specTxtStr += ' / ' + item 
                                }
                            }
                            _this.specTxtStr = _this.specTxtStr.slice(2, _this.specTxtStr.length)
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
            inputF:function(){   //改变文本  不用监听是因为初次加载请求太多
                this.watchNum()
            },
            reduceCartNum:function(){  //减少数量
                this.quantity--
                this.watchNum()
            },
            addCartNum:function(){  //增加数量
                this.quantity++
                this.watchNum()
            },
            watchNum:function(){
                var _this = this

                this.quantity = Math.floor(this.quantity)

                if(this.quantity < 1){
                    popMin.show("icon-sign","商品数量至少选择一件")
                    this.quantity = 1
                }

                if(this.quantity >= this.stock){
                    popMin.show("icon-sign","商品数量超出库存")
                    this.quantity = this.stock
                }

                if(!this.isShow){
                    if(_this.timeF){
                        clearTimeout(_this.timeF)   
                    }
                    _this.timeF = setTimeout(_this.updataQuaF,2000)
                }
            },
        },
    }
</script>

