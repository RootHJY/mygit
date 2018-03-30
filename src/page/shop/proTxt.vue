<template>
    <div class="pro">
        <ul>
            <li v-for="item in promotionList"><span>促</span><p>{{ item.name }}</p></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                pageTitle: '促销列表',
            }
        },
        components: {
            
        },
        props: ['promotionList'],
        created () {},
        methods: {}
    }
</script>


