<template>
    <section v-show="$store.state.isShowLogin">
        <div class="popBg than" @click="$store.state.isShowLogin = false"></div>
        <div class="loginMain ">
            <div class="loginTitle">登陆/注册</div>
            <ul>
                <li class="first">
                    <input class="input" type="number" name="phone" v-model="phoneVal"  @keyup.enter="getCodeF()" placeholder="请输入手机号" />
                    <button class="getCode" @click="getCodeF()" :class="{active:rightPhone,hide:beginCount || reSend}">获取验证码</button>
                    <button class="getCode" v-show="beginCount">已发送({{timeLeng}}s)</button>
                    <button class="getCode active" @click="getCodeF()" v-show="reSend">重新发送</button>
                    <span class="clearTel clear" v-show="hasPhone" @click="phoneVal = ''">
                        <img src="../../static/img/cha.png" alt="" />
                    </span>
                </li>
                <li class="second">
                    <input class="input" type="number" name="code" v-model="codeVal"  @keyup.enter="loginFun()"  placeholder="请输入验证码" />
                    <span class="clearCode clear" @click="codeVal =''" v-show="hasCode">
                        <img src="../../static/img/cha.png" alt="" />
                    </span>
                </li>
                <li class="third">
                    <div class="loginButton" :class="{active:rightPhone && rightCode}" @click="loginFun()" >
                        {{ loginTxt }}
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import popMin from '@/components/popMin.js'
    import common from '@/components/common.js'

    export default {
        name: 'login',
        data () {
            return {
                pageTitle: '登陆/注册',
                loginTxt: '登录',
                phoneVal: '',
                codeVal: '',
                hasPhone: false,
                rightPhone: false,
                hasCode: false,
                rightCode: false,
                isgetCode: false,
                timeLeng: 60,
                timeTxt: '',
                timeInt: null,
                reSend: false,
                beginCount: false,
                loginType:' ',
                isWeChat: true,
            }
        },
        created () {
            this.getLoginType()
        },
        components: {},
        props: ['isFrom'],
        methods: { 
            isWeChatFun: function (){ 
                var _this = this
                var ua = window.navigator.userAgent.toLowerCase()
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
                    this.isWeChat = true
                }else{ 
                    this.isWeChat = false
                } 
                console.log("_this.isWeChat ______" + this.isWeChat )
            },
            getLoginType:function(){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
                var isIOS = !! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                if(isIOS){ // 登录类型1.android 2.ios 3.pc端
                    this.loginType = 2
                }else if(isAndroid){
                    this.loginType = 1
                }else{
                    this.loginType = 3
                }
            },
            getCodeF: function() {
                var _this = this
                // _codeUrl = "/daydaycook/server/utils/getRegCode.do?&type=2&languageId=3&mainland=1&deviceId=PC&username=" + _this.phoneVal
                var _codeUrl = "/wechatecom/appserver/login/getCMSRegCode.do?mobile=" + _this.phoneVal
                if(_this.rightPhone){
                    this.timefunc()  // 倒计时
                    this.ajaxDataFun('post', _codeUrl,function(obj){
                        if(obj.code == '200'){
                            _this.isgetCode = true
                        }else if(obj.code == '4010'){
                            _this.countDown()
                        }
                    })
                }else if(!_this.rightPhone){
                     popMin.show("icon-sign","请填写正确的手机号码")
                }
            },
            loginFun:function(){
                var _this = this
                _this.isWeChatFun()

                console.log("_this.isWeChat===" + _this.isWeChat)
                console.log("_this.loginType===" + _this.loginType)
                if(_this.isWeChat){
                    console.log("微信中登录！")
                    _this.loginInWechat()
                }else{
                    console.log("微信外面登录！")
                    _this.loginOutWechat()
                }
            },
            loginInWechat:function(){  //微信里登录
                var _this = this
                var wxUid = _this.$store.state.wxUid || localStorage.getItem('wxUid')

                if(_this.rightPhone && _this.rightCode){  //手机号正确 验证码正确
                    _this.loginTxt = "登录中..."
                    var _checkPhoneUrl = '/wechatecom/appserver/login/checkUserByPhone.do?mobile=' + _this.phoneVal + "&uid=" + wxUid 

                    this.ajaxDataFun('post', _checkPhoneUrl, function(obj){
                        if(obj.code == '200'){
                            var _loginUrl = "/wechatecom/appserver/login/registeredByPhone.do?mobile=" + _this.phoneVal + "&uid=" + wxUid + "&code=" + _this.codeVal  +  "&type=" + _this.loginType

                            _this.ajaxDataFun('post',_loginUrl,function(obj){
                                if(obj.code == '200'){
                                    _this.loginSuccess()
                                }else{
                                    popMin.show("icon-sign", obj.msg)
                                    _this.loginTxt = "登录"
                                }
                            })
                        }else{
                            _this.loginOutWechat()
                        }
                    })
                }else if(!_this.rightPhone){
                    popMin.show("icon-sign","请填写正确的手机号")
                    _this.loginTxt = "登录"
                }else if(!_this.isgetCode){
                    popMin.show("icon-sign","请获取验证码")
                    _this.loginTxt = "登录"
                }else if(_this.isgetCode && !_this.rightCode){
                    popMin.show("icon-sign","请填写正确的验证码")
                    _this.loginTxt = "登录"
                }
            },
            loginOutWechat:function(){  //微信外登录
                var _this = this
                if(_this.rightPhone && _this.rightCode){  //手机号正确 验证码正确
                    _this.loginTxt = "登录中..."
                    // var _loginUrl = "/wechatecom/appserver/login/login.do?mobile=" + _this.phoneVal + "&regCode=" + _this.codeVal  +  "&type=" + _this.loginType

                    var _loginUrl = "/wechatecom/appserver/login/registeredByPhone.do?mobile=" + _this.phoneVal + "&code=" + _this.codeVal  +  "&type=" + _this.loginType


                    this.ajaxDataFun('post',_loginUrl,function(obj){
                        if(obj.code == '200'){
                            _this.loginSuccess()
                        }else{
                            popMin.show("icon-sign", obj.msg)
                            _this.loginTxt = "登录"
                        }
                    })
                }else if(!_this.rightPhone){
                    popMin.show("icon-sign","请填写正确的手机号")
                    _this.loginTxt = "登录"
                }else if(!_this.isgetCode){
                    popMin.show("icon-sign","请获取验证码")
                    _this.loginTxt = "登录"
                }else if(_this.isgetCode && !_this.rightCode){
                    popMin.show("icon-sign","请填写正确的验证码")
                    _this.loginTxt = "登录"
                }
            },
            loginSuccess:function(){
                this.loginTxt = "登录"
                popMin.show("icon-success","登录成功")
                this.clearCountF()
                localStorage.setItem('isLogin','true')
                this.$store.state.isLogin = true
                this.$store.state.isShowLogin = false
                this.getMcartNum()

                if(this.isFrom == '1'){  //如果是个人中心页面
                    console.log("出发11111")
                    this.$emit('getInfo')
                }

                if(this.$store.state.loginToPage){
                    this.$router.push(this.$store.state.loginToPage) 
                }
            },
            countDown: function(){  //倒计时函数
                var _this = this
                console.log("开始倒计时")
                if(_this.rightPhone){
                    _this.timeLeng--
                    if(_this.timeLeng <= 0){
                        _this.clearCountF()
                    }
                }
            },
            clearCountF:function(){
                var _this = this
                if(_this.timeInt){
                    clearInterval(_this.timeInt)
                    _this.timeLeng = 60
                    _this.timeInt = null
                    _this.beginCount = false
                    _this.reSend = true
                }
            },
            timefunc:function(){
                this.beginCount = true
                this.reSend = false
                this.timeInt = setInterval(this.countDown,1000)
            },
            getMcartNum:function(){
                var _this = this
                var numUrl = "/wechatecom/appserver/cart/getCartSkuCount.do"
                this.ajaxDataFun('post',numUrl,function(obj){
                    if(obj.code == '200'){
                        _this.$store.state.cartNum = obj.data.count
                        localStorage.setItem('cartNum',obj.data.count)
                        console.log(_this.$store.state.cartNum)
                    }
                })
            },
        },
        watch:{
            phoneVal:function(){
                let phonTest = (/^1[34578]\d{9}$/.test(this.phoneVal));
                if(this.phoneVal.length > 0){
                    this.hasPhone = true
                }else{
                    this.hasPhone = false
                }
     
                if(phonTest){
                    this.rightPhone = true
                }else{
                    this.rightPhone = false
                }

            },
            codeVal:function(){
                if(this.codeVal.length > 0){
                    this.hasCode = true
                }else{
                    this.hasCode = false
                }

                if(this.codeVal.length == 4 && this.isgetCode){
                    this.rightCode = true
                }else{
                    this.rightCode = false
                }
            }
        },
    }
</script>
