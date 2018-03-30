<template>
    <div class="divWrap">
        <div class="section" v-for="item in dataList" v-show="item.isShow == 0" >
            <h2> {{ item.name }}</h2>
             <shopList col="3" :dataList="item.productList"></shopList>
        </div>
    </div>

</template>

<script>
    import shopList from '@/components/shopList'

    export default {
        data () {
            return {
                pageTitle: '首页商品列表',
                dataList: [],
            }
        },
        components: { 
            shopList
        },
        created () {
            var _this = this;
            var _listUrl = "/api/module/findModuleList"

            this.ajaxDataFun('post',_listUrl,function(obj){
                console.log(obj)
                if(obj.code == '200'){
                    _this.dataList = obj.data
                }
            })
        },
        methods: { }
    }
</script>

