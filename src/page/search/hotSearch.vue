<template>
	<div class="popSearch">
		<div class="title">
			<p>大家都在搜</p> 
		</div> 
		<ul>
			<li v-for="item in hotSearch " @click="postValue(item)">
				{{ item }}
			</li>
		</ul>
		<br/>
		<div class="title">
			<p>最近搜索</p> 
			<span @click="clearSCK">清除</span>
		</div>
		<ul>
			<li v-for="item in postChildCook" @click="postValue(item)">
				{{ item }}
			</li>
		</ul>
	</div>
</template>

<script>
	import common from '@/components/common.js'

	export default {
		data () {
			return {
				pageTitle: '热门搜索',
				hotSearch: ['蛋糕','甜点','肉','虾'],
			}
		},
		components: { 
			
		},
		props: ['postChildCook'],
		created () {

		},
		methods: { 
			postValue:function(v){
				this.$emit('childFun',v)
			},
			clearSCK:function(){
				this.$emit('childFunTwo')
			}
		}
	}
</script>

