<template>
    <div class="section" v-show="dataList.length">  
        <h2>为您推荐</h2>
        <shopList col="3" :dataList="dataList"></shopList>
    </div>
</template>

<script>
    import shopList from '@/components/shopList'
    export default {
        data () {
            return {
                pageTitle: '底部为您推荐',
                dataList: ''
            }
        },
        components:{
            shopList
        },
        created () { 
            var _this = this
            var recomdUrl = "/api/product/recommendForYou.do?name="
            this.ajaxDataFun('post',recomdUrl,function(obj){
                _this.dataList = obj.data;
            })
        },
        methods: { }
    }
</script>

