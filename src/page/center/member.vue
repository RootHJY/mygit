<template>
	<div id="container" class="member">
        <v-title> {{ pageTitle }}</v-title>
        <div class="memberImg">
        	<img src="../../../static/img/lqhy_img_bg.jpg" alt="" />
        	<span v-if="tips=='领取会员'" @click="getMemberCard()">{{ tips }}</span>
        	<span v-if="tips=='去使用'">
        		<router-link :to="{ path: '/category'}">{{ tips }}</router-link>
        	</span>
        </div>
		<div class="mainBox">
            <div class="title"> 会员权益 </div>
            <div class="info">
                <span>1.加入会员，立即获取线上和线下店铺商品98折福利，还有更多满减拼团优惠，赶紧加入吧。</span>
				<span>2.部分特价活动商品不可使用，以具体订单中的商品金额为准。</span>
            </div>
        </div>
        <div class="mainBox">
            <div class="title"> 如何成为会员 </div>
            <div class="info">
            	<span>1.扫码关注日日煮微信服务号（ddcooker）</span>
				<span>2.在菜单栏选择【加入会员】，并填写相关信息</span>
				<span>3.即可成为会员，尊享会员福利</span>
            </div>
        </div>
        <div class="copyright">
        	<img src="../../../static/img/logo.png">
        	<p>本活动的最终解释权归日日煮公司所有</p>
        </div>
        <login></login>
	</div>
</template>
<script>
    import login from '@/components/login'
    import common from '@/components/common'
    import VTitle from '@/components/title'
    import popMin from '@/components/popMin.js'
    export default {
        data () {
            return {
                pageTitle: '日日煮DayDayCook',
                tips:'领取会员',
            }
        },
        components: { 
            login,
            VTitle,
            popMin,
        },
        created () { },
        methods: { 
            getMemberCard:function(){
            	var _this = this
            	if(!this.$store.state.isLogin){
                    this.$store.state.isShowLogin = true
                    this.$store.state.loginToPage = ''
                    return
                }else{
	                var _this = this
	                var _getCardUrl = "/wechatecom/appserver/login/userReceiveMember"
	                this.ajaxDataFun('post',_getCardUrl,function(obj){
	                    if(obj.code == '200'){
	                        _this.tips = '去使用'
	                        popMin.show("icon-success","会员领取成功");
	                    }else if(obj.code == '657'){
	                    	_this.tips = '去使用'
	                    	popMin.show("icon-sign","您已经是日日煮会员，赶快购物享福利", "big");
	                    }else if(obj.code == '999'){
	                    	_this.tips = '领取会员'
	                    	popMin.show("icon-sign","领取失败，稍后重试");
	                    }
	                })
                }
            },
        }
    }
</script>