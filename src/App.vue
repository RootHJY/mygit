<template>
	<div id="app">
		<router-view></router-view>
        <oneTip></oneTip>
	</div>
</template>
<script type="text/javascript">
    import '../static/css/page.css?ver=2017092'
    import '../static/css/animate.min.css?ver=2017092'
    import '../static/css/fonts.css?ver=2017092'

    import oneTip from '@/components/oneTip'
    
    export default {
        data () {
            return {}
        },
        components: {
            oneTip
        },
        created () {},
        methods: {}
    }
</script>