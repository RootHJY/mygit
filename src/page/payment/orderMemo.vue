<template>
    <div class="normal textarea">
        <div class="clearfix">
            <div class="fleft">买家留言</div>
            <div class="fright">
                <textarea placeholder="不超过100字" v-model="$store.state.orderMemo" maxlength="100"></textarea>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                pageTitle: '买家留言',
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

