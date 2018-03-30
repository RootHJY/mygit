<template>
	<section>
		<mt-swipe :auto="3000">
			<mt-swipe-item v-for="(item,index) in swipeList">
				<div class="sildeWrap normal">
	                <div class="num">
	                    <span>{{index + 1}}</span>／{{ swipeList.length }}
	                </div>
	                <router-link class="slide" :to="'shopDetails?id=' + item.id">
	                    <div class="img">
	                        <img :src="item.thumbnail" alt="" />
	                    </div>
	                    <div class="title">{{ item.fullName }}</div>
	                    <div class="price">
	                        <span class="minIconM">¥</span>{{ item.price }}
	                    </div>
	                </router-link>
	            </div>
			</mt-swipe-item>
		</mt-swipe>
	</section>
</template>
<script>
	import { Swipe, SwipeItem } from 'mint-ui';
	
	export default {
		data () {
			return {
				pageTitle: '订单分享swiper'
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
	.mint-swipe{ height: 340px; }
	.mint-swipe img{ width: 100%; }
	.mint-swipe-item{ color:white; }
</style>

