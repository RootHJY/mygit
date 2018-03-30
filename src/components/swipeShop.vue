<template>
    <section>
        <mt-swipe :auto="5000">
            <mt-swipe-item v-for="item in swipeList">
                <img :src="item">
            </mt-swipe-item>
        </mt-swipe>
    </section>
</template>
<script>
    import { Swipe, SwipeItem } from 'mint-ui';
    export default {
        data () {
            return {
                pageTitle: '商品详情页轮播'
            }
        },
        components: { 

        },
        props: ['swipeList'],
        created () {

        },
        methods: { }
    }
</script>
<style scoped>
    .mint-swipe{ height: 200px; }
    .mint-swipe-item{ color:white; }
</style>

