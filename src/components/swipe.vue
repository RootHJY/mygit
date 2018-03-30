<template>
	<section v-show="swipeList != ''">
		<mt-swipe :auto="5000">
			<mt-swipe-item v-for="item in swipeList">
				<template v-if="item.type == '0'">
					<router-link :to="'/shopDetails?id=' + item.url">
						<img :src="item.path">
					</router-link>
				</template>
				<template v-if="item.type == '1'">
					<a :href="item.url" target="_blank">
						<img :src="item.path">
					</a>
				</template>
			</mt-swipe-item>
		</mt-swipe>
	</section>
</template>
<script>
	import { Swipe, SwipeItem } from 'mint-ui';
	
	export default {
		data () {
			return {
				pageTitle: '首页banner'
			}
		},
		components: { 

		},
		props: ['swipeList'],
		created () {},
		methods: { }
	}
</script>
<style scoped>
	.mint-swipe{ height: 200px; }
	.mint-swipe img{ width: 100%; }
	.mint-swipe-item{ color:white; }
</style>

