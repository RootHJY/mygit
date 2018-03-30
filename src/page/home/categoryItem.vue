<template>
    <div class="recommendLay">
        <ul class="clearfix">
            <li v-for="item in categoryData">
                <router-link :to="{ path:'categoryList', query:{id:item.id,name:item.name}}">
                    <img :src="item.icoImg" alt="" />
                    <p> {{item.name}} </p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                pageTitle: '',
                categoryData: ''
            }
        },
        created () { 
            // 首页四个分类接口
            var _this = this
            var recomdUrl = "/api/group/getGroupList"
            this.ajaxDataFun('post',recomdUrl,function(obj){
                _this.categoryData = obj.data;
                console.log(_this.categoryData )
            })
        },
        methods: { }
    }
</script>

