// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.min.css'
import mintUI  from 'mint-ui'
import token from '@/components/token'
import common from '@/components/common'
import wx from 'weixin-js-sdk';

require('./mock/mock.js')
Vue.use(mintUI);

Vue.config.productionTip = false

Vue.prototype.GoTop = function (el, end, time = 300){
	let elTop = el.scrollTop
	let timer = setInterval(function(){
		elTop -= 40
		el.scrollTop = elTop
		if(elTop <= end){
			clearInterval(timer)
		}
	},10)
};

Vue.directive('title', {
	inserted: function (el, binding) {
		document.title = el.innerText
		el.remove()
	}
})

Vue.filter('formatDate',function(value){
	var setv = function(v){v = v < 10?'0' + v : v; return v}
	var v = new Date(value);
	var y = v.getFullYear();   //年
	var m = v.getMonth() + 1; //上个月
	var d = v.getDate();      //天getDate.getDate()
	return y + '/' + setv(m) + '/' + setv(d)
})

Vue.filter('formatDateMore',function(value){
	var setv = function(v){v = v < 10?'0' + v : v; return v}
	if(value){
	    var v = new Date(value);
	    var y = v.getFullYear();   //年
	    var mt = v.getMonth() + 1; //上个月
	    var d = v.getDate();      //天getDate.getDate()
	    var h = v.getHours()
	    var m = v.getMinutes()
	    var s = v.getSeconds()
	    return y + '/' + setv(mt) + '/' + setv(d) + " " +  setv(h) + ':' + setv(m) + ':' + setv(s)
    }
})

Vue.filter('leftPrice',function(value){  //商品价格左边大
	let v = value.toString()
	if(v.indexOf('.') > -1){
	    return v.split('.')[0]
	}else{
	    return value
	}
})

Vue.filter('rightPrice',function(value){  //商品价格右边小
	let v = value.toString()
	if(v.indexOf('.') > -1){
	    return '.' + v.split('.')[1] 
	}else{
	    return ''
	}
})

Vue.filter('splitString',function(arr){  //商品描述信息
	let l = arr.length
	let i = 0
	var str = ''
	for(i; i < l; i++){
		if(arr[i]){
	    	str += arr[i] + ' / '
		}
	}
	return str.slice(0,-2)
})

router.beforeEach((to, from, next) => {
	var isLogin = localStorage.getItem('isLogin')
	if(isLogin == 'true'){
		store.state.isLogin = true
		console.log('小哥已登录...')
	}else{
		store.state.isLogin = false
		console.log('小哥木有登录!!!')
	}
    if(to.meta.requireAuth) {  		// 判断该路由是否需要登录权限
        if(isLogin == 'true') {  	// 通过vuex state获取是否登录
            next()
        }else{
            next({ path: '/'})
        }
    }else{
        next();
    }
})

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App },
	created () {
		// this.weChatLogin()  //微信登录 函数内判断s
	    // this.hotTxtInit()  //随机搜素热词
		this.getMcartNum()  //刷新页面的时候重新获取 
    },
	methods:{
		hotTxtInit:function(){
			let hotLen = this.$store.state.hotSearch.length - 1 
			let hotNum = Math.ceil(Math.random()*hotLen)
				this.$store.state.hotTxt = this.$store.state.hotSearch[hotNum]
		},
		getLoginType:function(){
		    var u = navigator.userAgent
		    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
		    var isIOS = !! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		    if(isIOS){// 登录类型1.android 2.ios 3.pc端
		        return 2
		    }else if(isAndroid){
		        return 1
		    }else{
		        return 3
		    }
		},
		weChatLogin:function(){
			var _this = this 
			var _locaUrl = window.location.href 
			var _isWx = this.isWeChatFun()   //在微信里面
			var _wxCode = ''			//微信code 
			var _getWxInfoUrl = ''
			var _wxOpenId = localStorage.getItem('wxOpenId');

			if(!_isWx){
				console.log("不是微信浏览器")
			}else if(_wxOpenId){
				console.log("微信浏览器！已获取过openId")
			}else if(_locaUrl.indexOf('code=') < 0){
				console.log('微信浏览器！url无code,重定向到api > code')

				var _toUrl =  _locaUrl.split('#/')[1]  //路由地址
				var _redirectUrl = ''  //授权的参数地址
				var _href = ''  //授权的所有地址

				// console.log("_toUrl==" + _toUrl)

				var _leftStr = _toUrl
				var _rightStr = ''
				if(_toUrl.indexOf('?') > -1){
					_leftStr = _toUrl.split('?')[0]
					_rightStr = _toUrl.split('?')[1]
					_redirectUrl = 'http://api.daydaycook.com.cn/daydaycook/page/h5/wechat/redirect.html?' + _rightStr
				}else{
					_redirectUrl = 'http://api.daydaycook.com.cn/daydaycook/page/h5/wechat/redirect.html'
				}

				_href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3f387bc42ee75493&redirect_uri=' + _redirectUrl + '&response_type=code&scope=snsapi_userinfo&state=' + _leftStr + '#wechat_redirect'
				// console.log(_redirectUrl)
				// console.log(_href)
				
				window.location.href = _href

			}else if(_locaUrl.indexOf('code=') > -1){
				console.log('微信浏览器！url存在code')
				_wxCode = common.getUrlPars(_locaUrl).code || ''
				_getWxInfoUrl = '/wechatecom/appserver/wechat/getInfo.do?code=' + _wxCode
				_this.ajaxDataFun('post',_getWxInfoUrl,function(obj){
					if(obj.code == '200'){
						var _data = obj.data
						_this.$store.state.wxOpenId = _data.openId
						localStorage.setItem('wxOpenId', _data.openId)

						var _upWxInfoUrl = "/wechatecom/appserver/login/getWxUserInfo.do?username=" + _data.unionid + "&imageUrl=" + _data.imageUrl + "&sex=" + _data.sex + "&nickName=" + _data.userName + "&openId=" + _data.openId + "&type=" + _this.getLoginType()
						_this.ajaxDataFun('post',_upWxInfoUrl,function(obj){
							if(obj.code == '200'){
								_this.$store.state.wxUid = obj.data.id
								localStorage.setItem('wxUid', obj.data.id)
								console.log('更新微信用户成功！')
							}
						})
					}
				})
			}else{
				console.log("其它特殊情况")
			}
		},
		getMcartNum:function(){
			if(this.$store.state.cartNum){
			    console.log("购物车商品已存在==" + this.$store.state.cartNum)
			    return
			}else{
				localStorage.removeItem('cartNum')  
			    var _this = this
			    var numUrl = "/api/cart/getCartSkuCount.do"
			    this.ajaxDataFun('post',numUrl,function(obj){
			    	console.log(obj)
			        if(obj.data.code == '200'){
			            _this.$store.state.cartNum = obj.data.count
			            localStorage.setItem('cartNum', obj.data.count)
			        }
			    })
			}
		},
		isWeChatFun: function (){ 
		    var ua = window.navigator.userAgent.toLowerCase(); 
		    if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
		        return true
		    }else{ 
		        return false
		    } 
		}
	}
})

