<template>
    <div class="section" style="margin-top:30px;">
        <div class="detailsT" style="padding-left:14px;">为您推荐</div>
        <shopList col="3" :dataList="dataList"></shopList>
    </div>
</template>

<script>
    import shopList from '@/components/shopList'
    export default {
        data () {
            return {
                pageTitle: '商品详情底部为您推荐',
            }
        },
        components:{
            shopList
        },
        props:['dataList'],
        created () {},
        methods: { }
    }
</script>


