<template>
    <div class="couponMin leng_3 ">
        <div class="item active">
            <div class="title">
                <span>20</span>元
            </div>
            <div class="des">龙虾类满100元</div>
            <div class="btn">
                <span>领券</span>
            </div>
            <!-- <div class="btn">已领完</div> -->
            <!-- <div class="btn">已领取</div> -->
        </div>
        <div class="item active">
            <div class="title">
                <span>20</span>元
            </div>
            <div class="des">龙虾类满100元</div>
            <div class="btn">
                <span>领券</span>
            </div>
        </div>
        <div class="item ">
            <div class="title">
                <span>20</span>元
            </div>
            <div class="des">龙虾类满100元</div>
            <div class="btn">
                <span>已领券</span>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                pageTitle: '领取优惠券'
            }
        },
        components: { 
            
        },
        created () {
            var url = "/daydaycook/server/recipe/search.do?currentPage=1&pageSize=20&name=饭&catalogId=&parentId=&screeningId=&tagId=&username=&password=&languageId=3&mainland=156&deviceId=&sortType=&sortKey=&htagId=&notheme=2&categoryId="
            // this.ajaxDataFun(url,function(obj){})
        },
        methods: { }
    }
</script>

