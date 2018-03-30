<template>
    <router-link to="/center/myaddress?fromOrder=1" class="addList">
        <div class="justify top">
            <div class="box name">
                <p>{{ $store.state.orderAddName }}</p>
            </div>
            <div class="box tel">{{ $store.state.orderAddTel }}</div>
        </div>
        <div class="info justify" style="font-size:0">
            <p class="box">{{ $store.state.orderAddDes }}</p>
            <span class="icon-arrow box absoluteIcon"></span>
        </div>
    </router-link>
</template>

<script>

    export default {
        data () {
            return {
                pageTitle: '订单地址',
            }
        },
        components: { 
            
        },
        created () {
            
        },
        methods: { 
           
        }
    }
</script>

