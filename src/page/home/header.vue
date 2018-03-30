<template>
    <div id="indexTop" :class="{fixed:fixedTop}">
        <div class="topBar">
            <img src="../../../static/img/logo2.png" alt="logo" />
            <div class="info">
              <b>小煮集市</b>
              <p>诱人美食 美好厨房 从这里开始</p>
            </div>
            <div class="btn" @click="showPopQr()">关注</div>
        </div>
        <div class="searchBar">  
            <router-link to="/search" class="search"> 
                <label class="cart icon-search"></label>
                <input type="text" :placeholder="$store.state.hotTxt" disabled="disabled" />
            </router-link>
        </div>
        <popQr v-show="isShow" v-on:sendMsg="showMsg" ></popQr>
    </div>
</template>

<script>
    import popQr from './popQr'

    export default {
        data () {
            return {
                pageTitle: '首页',
                isShow: false
            }
        },
        components: { 
            popQr
        },
        props: ['fixedTop'],
        created () {},
        methods: { 
            showPopQr:function(){
                this.isShow = true
            },
            showMsg:function(){
                this.isShow = false
            }
        }
    }
</script>

