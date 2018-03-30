<template>
    <div id="container">
        <v-title> {{ pageTitle }}</v-title>
        <div class="groupRule" style="padding-top:22px;">
            <img src="../../../static/img/g1.jpg" alt="" />
            <img src="../../../static/img/g2.jpg" alt="" />
            <img src="../../../static/img/g3.jpg" alt="" />
            <img src="../../../static/img/g4.jpg" alt="" />
            <img src="../../../static/img/g5.jpg" alt="" />
        </div>
    </div> 
</template>

<script>
    import VTitle from '@/components/title'
    export default {
        data () {
            return {
                pageTitle: '多人拼团玩法'
            }
        },
        components: { 
            VTitle
        },
        created () { },
        methods: { }
    }
</script>

