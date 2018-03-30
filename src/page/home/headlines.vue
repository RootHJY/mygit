<template>
    <div class="headlines">
        <div class="tip">小煮头条</div>
        <div class="slideMid">
            <slider :pages="pages" :sliderinit="sliderinit"></slider>
        </div>
    </div>
</template>

<script>
    import slider from 'vue-concise-slider'
    export default {
        data () {
            return {
                pageTitle: '小煮头条',
                sliderinit: {
                  currentPage: 0,//当前页码
                  thresholdDistance: 500,//滑动判定距离
                  thresholdTime: 100,//滑动判定时间
                  autoplay:3500,//自动滚动[ms]
                  loop:true,//循环滚动
                  direction:'vertical',//方向设置，垂直滚动
                  infinite:1,//无限滚动前后遍历数
                  slidesToScroll:1,//每次滑动项数
                  dots:false
                },
                pages:[],
                title: '',
            }
        },
        components: {
            slider
        },
        created () {
            var _this = this;
            var headlinesUrl = "/wechatecom/appserver/notice/findNoticeList.do?noticeType=1"
            this.ajaxDataFun('post',headlinesUrl,function(obj){
                if(obj.code == '200'){
                    var len  = obj.data.length
                    var i = 0
                    for(i; i<len; i++){
                        _this.pages.push({title:obj.data[i].description})
                    }
                }
            })
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
</style>

