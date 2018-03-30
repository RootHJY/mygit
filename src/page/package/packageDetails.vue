<template>
    <div id="container">
        <div id="loading" v-show="!showAllDiv">
            <img src="../../../static/img/logo2.png" alt="loading">
        </div>
        <v-title> {{ pageTitle }}</v-title>
        <div class="listCart">
            <editInfo v-for="(item,index) in dataList" :index="index" :pId="item.id" v-on:childF="sortWareId">
            </editInfo>
        </div>
        <div class="popChoose justify">
            <div class="box total" style="width:55%;">
                套餐价<p style="display:inline-block">¥{{ totalPrice - discount }}<span>(不含运费)</span></p>
                <p><span>为您节省￥{{ discount }} </span></p>
            </div>  
            <div class="box" style="width:144px;">
                <div class="sureBtn active" @click="buyNow">立即购买</div>
            </div>
        </div>
        <login></login>
    </div>
</template>

<script>
    import VTitle from '@/components/title'
    import common from '@/components/common'
    import popMin from '@/components/popMin'
    import editInfo from './editInfo'
    import login from '@/components/login'

    export default {
        data () {
            return {
                pageTitle: '套餐详情',
                id: '',
                promotionId: '',
                dataList: '',
                index: '',
                wareIdArr: [],
                orderItems: '',
                allPrice: [],
                discount: '',
                totalPrice: 0,
                showAllDiv: false,
            }
        },
        components: {
            VTitle,
            editInfo,
            login
        },
        created () {
            this.init()
            this.getAllData('')
        },
        methods: {
            init:function(){
                var locaUrl = window.location.href
                if(locaUrl.indexOf('id=') > -1){
                    this.id = common.getUrlPars(locaUrl).id
                    this.index = common.getUrlPars(locaUrl).index
                }
            },
            getAllData:function(val){
                var _this = this
                var detailsUrl = "/wechatecom/appserver/product/details.do?productId=" + this.id + "&specVals=" + val
                this.ajaxDataFun('post',detailsUrl,function(obj){
                    if(obj.code == '200'){
                        _this.showAllDiv = true
                        _this.wareIdArr = []
                        var _data = obj.data

                        for(let item of _data.productSetList[_this.index].productList){
                            _this.allPrice.push(item.price)
                        }

                        _this.discount = _data.productSetList[_this.index].costPrice -  _data.productSetList[_this.index].price
                        _this.dataList = _data.productSetList[_this.index].productList
                        _this.pageTitle = _data.productSetList[_this.index].name     
                        _this.promotionId = _data.productSetList[_this.index].id     
                        for(let item of _this.dataList){
                            _this.wareIdArr.push(item.productWareId)
                            _this.orderItems += item.productWareId + ':1,' 
                        }
                        _this.orderItems = _this.orderItems.slice(0,-1)
                    }
                })
            },
            sortWareId:function(wareId, index, price){
                this.orderItems = ''
                this.wareIdArr[index] = wareId
                for(let item of this.wareIdArr){
                    this.orderItems += item + ':1,' 
                }
                this.allPrice[index] = price

                console.log(this.allPrice)

                this.totalPrice = 0
                for(let item of this.allPrice){
                    this.totalPrice += item
                }

                this.orderItems = this.orderItems.slice(0,-1)
            },
            buyNow:function(){
                this.$store.state.orderItems = ''
                this.$store.state.promotionId = ''
                this.$store.state.promotionType = ''
                this.$store.state.ptId = ''

                localStorage.removeItem("orderItems")
                localStorage.removeItem("promotionId")
                localStorage.removeItem("promotionType")
                localStorage.removeItem("ptId")
                localStorage.removeItem('orderId')

                this.$store.state.orderItems = this.orderItems
                this.$store.state.promotionId = this.promotionId
                this.$store.state.promotionType = 'tc'

                localStorage.setItem('orderItems', this.orderItems);
                localStorage.setItem('promotionId', this.promotionId);
                localStorage.setItem('promotionType', 'tc');

                if(!this.$store.state.isLogin){
                    this.$store.state.loginToPage = '/payment'
                    this.$store.state.isShowLogin = true
                    return
                }else{
                    this.getOrderList()
                }
            },
            getOrderList:function(){
                var _this = this
                var _billUrl = "/wechatecom/appserver/order/bill.do?items=" + this.orderItems + "&promotionId=" + _this.promotionId + "&promotionType=tc&ptId=&receiverId=&couponRecordId="
                this.ajaxDataFun('post',_billUrl,function(obj){
                    if(obj.code == '610'){
                        popMin.show('icon-sign', obj.msg, 'big')
                    }else{
                        _this.$router.push('/payment') 
                    }
                })
            },
        },
        watch:{
            allPrice:function(){
                let total = 0
                for(let item of this.allPrice){
                    total += item
                }
                this.totalPrice = total
                return total
            }
        }
    }
</script>
<style lang="scss" scoped>
    .listCart .item .orderListInfo{ width:100%; padding:10px 0;}
</style>


