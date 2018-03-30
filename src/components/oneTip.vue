<template>
    <section v-show="!isComeIn">
        <div class="popDiscount">
            <div class="img">
                <a :href="linkUrl">
                    <img :src="noticeImg" alt="" />
                </a>
            </div>
            <div class="close icon-close" @click="closePop"></div>
        </div>
        <div class="popBg" @click="closePop"></div>
    </section>
</template>

<script>
    export default {
        data () {
            return {
                pageTitle: '首页优惠弹框',
                noticeImg: '',
                linkUrl: '',
                isComeIn: true
            }
        },
        created () {
            var isShow = localStorage.getItem('isComeIn') 
            if(isShow != 'true'){
                // this.getPopInfo()
            }
        },
        methods: {
            getPopInfo:function(){
                let _this = this
                let popUrl = '/wechatecom/appserver/noticeRead/findNoticeRead' 
                console.log('请求广告')
                this.ajaxDataFun('post', popUrl, function(obj){
                    if(obj.code == '200'){
                        if(obj.data){
                            _this.isComeIn = false
                            _this.noticeImg = obj.data.noticeImg
                            _this.linkUrl = obj.data.linkUrl
                        }
                    }
                })
            },
            closePop:function(){
                localStorage.setItem('isComeIn', true);
                this.isComeIn = true
            }   
        }
    }
</script>

