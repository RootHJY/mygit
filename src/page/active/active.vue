<template>
    <div id="container">
        <v-title> {{ pageTitle }}</v-title>
        <div class="filterMenu">
            <ul class="clearfix">
                <li><a href="#section_1">限时秒杀</a></li>
                <li class="active"><a href="#section_2">买一送一</a></li>
                <li><a href="#section_2">第二份半价</a></li>
                <li><a href="#section_2">满99减10</a></li>
                <li><a href="#">送小金砖</a></li>
                <li><a href="#">更多福利</a></li>
            </ul>
        </div>
        <swipe :swipeList="swipeList"></swipe>
        <coupon></coupon>
        <div id="section_1" class="section" style="padding-top:10px; margin-top: 20px;">  
            <h2>限时秒杀</h2>
            <shopList col="2"></shopList>
        </div>
        <div id="section_2" class="section" style="padding-top:10px; margin-top: 20px;">  
            <h2>买一送一</h2>
            <shopList col="2"></shopList>
        </div>
        <footerLay></footerLay>
    </div>
</template>

<script>
    import VTitle from '@/components/title'
    import swipe from '@/components/swipe'
    import footerLay from '@/components/footer'
    import coupon from './coupon'
    import shopList from '@/components/shopList'

    export default {
        data () {
            return {
                pageTitle: '小煮集市'
            }
        },
        components: { 
            VTitle,
            swipe,
            footerLay,
            coupon,
            shopList,
        },
        created () {
            var url = "/daydaycook/server/recipe/search.do?currentPage=1&pageSize=20&name=饭&catalogId=&parentId=&screeningId=&tagId=&username=&password=&languageId=3&mainland=156&deviceId=&sortType=&sortKey=&htagId=&notheme=2&categoryId="
            // this.ajaxDataFun(url,function(obj){})
        },
        methods: { }
    }
</script>

