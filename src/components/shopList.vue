<template>
	<div class="goodsList" :class="{threeCol:col==3, twoCol:col==2, oneCol:col==1}">
        <router-link v-for="item in dataList" :to="{ path: 'shopDetails', query: { id: item.id}}" class="box" >
            <div class="img">
                <template v-if="item.image">
                    <img :src="item.image" alt="" />
                </template>
                <template v-else="item.image">
                    <img src="../../static/img/error.png" alt="" />
                </template>
                <span v-if="item.productMark=='售罄'">{{ item.productMark }}</span>
                <em v-if="item.productMark=='新品'">{{ item.productMark }}</em>
                <i v-if="item.productMark=='特惠'">{{ item.productMark }}</i>
                <i v-if="item.productMark=='拼团'">{{ item.productMark }}</i>
            </div>
            <div class="title">{{ item.name}}</div>
            <div class="price">
                <span class="sale"><em>¥</em>{{ item.price }}</span>
                <span class="discount" v-show="item.costPrice">¥{{ item.costPrice }}</span>
                <span class="cart icon-cart"></span>
            </div>
        </router-link>
        <p class="isLoading"> {{ $store.state.loadingTxt }}</p>
    </div>
</template>
<script>
    export default {
        name: 'shopList',
        data () {
            return {
                dataList:[
                    {
                        "id": "21595",
                        "productWareId": "1143",
                        "quantity": 5,
                        "image": "https://testddc.oss-cn-hangzhou.aliyuncs.com/production/ecom/images/20171127/eb1cdd0c-e1cf-4e7f-9652-ab4b3574539d",
                        "id": "888",
                        "name": "花牛苹果-1",
                        "productMark": "特惠",
                        "costPrice": "",
                        "promotion": "",
                        "specList": "",
                        "productWareId": "1143",
                        "price": 2.0,
                        "isValid": true,
                        "stockOver": false,
                        "freightPrice": "",
                        "specDesc": "1只 / 甜蜜蜜超级超级甜 / 800g / 菱形",
                        "stock": 10,
                    },
                    {
                        "id": "21595",
                        "productWareId": "1143",
                        "quantity": 5,
                        "image": "https://testddc.oss-cn-hangzhou.aliyuncs.com/production/ecom/images/20171127/eb1cdd0c-e1cf-4e7f-9652-ab4b3574539d",
                        "id": "888",
                        "name": "花牛苹果-2",
                        "productMark": "售罄",
                        "costPrice": "",
                        "promotion": "",
                        "specList": "",
                        "productWareId": "1143",
                        "price": 1.0,
                        "isValid": true,
                        "stockOver": false,
                        "freightPrice": "",
                        "specDesc": "1只 / 甜蜜蜜超级超级甜 / 800g / 菱形",
                        "stock": 10,
                    },
                    {
                        "id": "21595",
                        "productWareId": "1143",
                        "quantity": 5,
                        "image": "https://testddc.oss-cn-hangzhou.aliyuncs.com/production/ecom/images/20171127/eb1cdd0c-e1cf-4e7f-9652-ab4b3574539d",
                        "id": "888",
                        "name": "花牛苹果-3",
                        "productMark": "拼团",
                        "costPrice": "",
                        "promotion": "",
                        "specList": "",
                        "productWareId": "1143",
                        "price": 1.0,
                        "isValid": true,
                        "stockOver": false,
                        "freightPrice": "",
                        "specDesc": "1只 / 甜蜜蜜超级超级甜 / 800g / 菱形",
                        "stock": 10,
                    }
                ]
            }
        },
        props: ['col'],
        created () {},
        methods: {

        }
    }
</script>