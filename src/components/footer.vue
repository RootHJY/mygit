<template>
	<div id="footer">
        <ul class="justify">
            <li class="box" :class="{active:fIndex == 1}">
                <router-link to="/index">
                    <span class="icon icon_a icon-home_nomal"></span>
                    <span class="icon icon_b icon-home_selected"></span>
                    <p>首页</p>
                </router-link>
            </li>
            <li class="box" :class="{active:fIndex == 2}">
                <router-link to="/category"> 
                    <span class="icon icon_a icon-classify"></span>
                    <span class="icon icon_b icon-selected"></span>
                    <p>商品分类</p>
                </router-link>
            </li>
            <li class="box" :class="{active:fIndex == 3}">
                <router-link to="/mycart">
                    <span class="icon icon_a icon-cart_nomal"></span>
                    <span class="icon icon_b icon-cart_selected"></span>
                    <p>购物车</p>
                    <em v-if="$store.state.cartNum != 0">{{ $store.state.cartNum }}</em>
                </router-link>
            </li>
            <li class="box" :class="{active:fIndex == 4}">
                <router-link to="/center">
                    <span class="icon icon_a icon-tab_nomal"></span>
                    <span class="icon icon_b icon-tab_selected"></span>
                    <p>个人中心</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import common from '@/components/common'
    export default {
        name: 'footer',
        data () {
            return {

            }
        },
        props: ['fIndex'],
        created () {
            
        },
        methods: {
            
        }
    }
</script>