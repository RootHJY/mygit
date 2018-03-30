<template>
<div id="container" class="bgf">
    <div class="couponRules">
        <v-title> {{ pageTitle }} </v-title>
        <ul>
            <li><span>01</span><p>优惠券仅限日日煮商城使用；</p></li>
            <li><span>02</span><p>部分优惠券订单金额必须满足一定条件时才可以使用，具体以优惠券说明为准；</p></li>
            <li><span>03</span><p>部分优惠券特价折扣秒杀团购等营销活动不可使用，具体以优惠券说明为准；</p></li>
            <li><span>04</span><p>使用优惠券提交的订单，在订单未支付时取消订单，则订单取消后，系统自动返还相应的优惠券；
            若订单被支付后，取消某一子单或取消全部子单，优惠券均不返还；</p></li>
            <li><span>05</span><p>使用优惠券的订单，若发生非商品质量问题的售后退货，优惠券不予返还；</p></li>
            <li><span>06</span><p>优惠券不能进行兑现、出售、转让或其他用途；</p></li>
            <li><span>07</span><p>本规则由日日煮商城依据国家相关法律法规及规章制度予以解释，最终解释权归日日煮公司所有。</p></li>
        </ul>
    </div>
</div>
</template>

<script>
    import VTitle from '@/components/title'
    export default {
        data () {
            return {
                pageTitle: '使用说明',
            }
        },
        components: {
            VTitle
        },
        created () {},
        methods: {}
    }
</script>

