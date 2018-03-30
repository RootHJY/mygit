<template>
    <div id="container">
        <div class="changeTel">
            <div class="justify top">
                <div class="box">修改手机号码</div>
                <div class="box"> 
                    <p> 134xxxx1779</p>
                    <span class="icon-arrow"></span>
                </div>
            </div>
            <div class="tip">
                修改后，请使用新手机号登录小煮集市以及日日煮的其他应用。
            </div>
        </div>

        <div class="popBg hide"></div>
        <div class="loginMain hide">
            <div class="loginTitle">
                设置新手机号
            </div>
            <ul>
                <li class="first">
                    <input class="input" type="number" name="phone" placeholder="请输入手机号" />
                    <!-- <button class="getCode">获取验证码</button> -->
                    <button class="getCode active">重新发送</button>
                    <span class="clearTel clear">x</span>
                </li>
                <li class="second">
                    <input class="input" type="number" name="code" placeholder="请输入验证码" />
                    <span class="clearCode clear">x</span>
                </li>
                <li class="third">
                    <div class="loginButton active">确定</div>
                </li>
            </ul>
        </div>
    </div>  
</template>

<script>

    export default {
        data () {
            return {
                pageTitle: '个人中心'
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

