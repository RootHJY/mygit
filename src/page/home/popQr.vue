<template>
    <section>
        <div class="popBg show" @click="closePopQr"></div>
        <div class="popQr show">
            <div class="img">
                <img src="../../../static/img/cus.jpg" alt="" />
            </div>
            <div class="tip"> 扫描关注日日煮，查看更多精彩 </div>
            <div class="close icon-close" @click="closePopQr"></div>
        </div>
    </section>
</template>

<script>
    export default {
        data () {
            return {
                pageTitle: '首页二维码弹框',
            }
        },
        created () {},
        props: ['showMsg'],
        methods: {
            closePopQr:function(){
                this.$emit('sendMsg',false)
            }
        }
    }
</script>

