<template>
    <section>
        <div class="item justify">
            <div class="orderListInfo box justify">
                <div class="img box">
                    <router-link :to="'/shopDetails?id=' + pId">
                        <img :src="image" alt="" v-if="!specImage">
                        <img :src="specImage" v-if="specImage" alt="" />
                    </router-link>
                </div>
                <div class="des box" @click="isShow = true">
                    <b>{{ name }}</b>
                    <p v-show="specTxtStr.length">规格: {{ specTxtStr }} </p>
                    <div class="price clearfix">
                        <p>¥{{ price }}  <i v-if="!stock">库存不足</i></p>
                        <span class="tright">x1</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="popBg" v-show="isShow" @click="isShow = false"></div>
        <div class="popShop" v-show="isShow">
            <div class="close icon-close" @click="isShow = false"></div>
            <div class="top">
                <div class="img">
                    <img :src="image" alt="" v-if="!specImage">
                    <img :src="specImage" v-if="specImage" alt="" />
                </div>
                <div class="info">
                    <div class="price">
                        <em>¥</em>{{ price | leftPrice}}<em>{{ price | rightPrice}}</em>
                        <span v-show="costPrice">¥{{ costPrice }}</span>
                    </div>
                    <div class="txt" v-show="specTxtStr.length">
                        已选: {{ specTxtStr }} 
                    </div>
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
            <div class="btn">
                <div class="sureBtn only" :class="{active:stock}" @click="upWareIdF">确定</div> 
            </div>
        </div>
    </section>
</template>

<script>

    export default {
        data () {
            return {
                pageTitle: '套餐修改规格',
                isShow: false,
                name: '',
                image: '',
                productWareId: '',  //加入购物车ID
                specVals: [],
                specTxtArr: [],
                price: '',   //单个价格
                costPrice: '', //拿掉的价格
                stock: 0, //虚假库存
                specList: '', //商品规格
                specImage: '',  //规格图片
                orderItems: '',
                promotionId: ''
            }
        },
        components: { 

        },
        props: ['pId','index'],
        created () {
            this.getAllData('')
        },
        methods: { 
            getAllData:function(val){  // 获取单个详细参数
                var _this = this
                var detailsUrl = "/api/product/details.do?productId=" + _this.pId
                    + "&specVals=" + val

                this.ajaxDataFun('post',detailsUrl,function(obj){
                    if(obj.code == '200'){
                        var _data = obj.data
                        _this.name = _data.name      //名称
                        _this.image = _data.image      //名称
                        _this.price = _data.price      //单个价格
                        _this.productWareId = _data.productWareId   //加入购物车ID
                        _this.costPrice = _data.costPrice      //单个价格
                        _this.stock = _data.stock  //当前型号库存
                        _this.specImage = _data.specImage   //商品规格
                        _this.specList = _data.specList   //商品规格
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
            upWareIdF:function(){
                this.isShow = false
                this.$emit("childF",this.productWareId,this.index,this.price)
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

<style lang="scss" scoped>
    .listCart .item .orderListInfo{ width:100%; padding:0 14px;}
    .listCart .item .orderListInfo .des > p{  border: 1px solid #C4C4C4; border-radius: 100px; padding:2px 6px;}

</style>

