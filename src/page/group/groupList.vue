<template>
    <div class="groupList">
        <div class="tip">TA们已经开团</div>
        <div class="item justify" v-for="item in ptList" @click="joinGroup(item.tId)">
            <img :src="item.image" alt="logo" />
            <div class="box info">
                <b>{{ item.nickName }}</b>
                <p>还差<span>{{ item.num }}</span>人，剩余 <count :seconds="item.expireSeconds" style="display:inline"></count>开团</p>
            </div>
            <div class="box btn">
                去参团
            </div>
        </div>
    </div>
</template>

<script>
    import count from '@/components/count'

    export default {
        data () {
            return {
                pageTitle: '促销列表',
            }
        },
        components: {
            count
        },
        props: ['ptList', 'pid'],
        created () {
            
        },
        methods: {
            joinGroup:function(tid){
                if(!this.$store.state.isLogin){
                    this.$store.state.isShowLogin = true
                    this.$store.state.loginToPage = '/groupDetails?tid=' + tid + '&pid=' + this.pid
                }else{
                    this.$router.push('/groupDetails?tid=' + tid + '&pid=' + this.pid) 
                }
            },
        }
    }
</script>


