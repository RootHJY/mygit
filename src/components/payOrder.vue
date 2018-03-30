<template>
	<section>
		<div ref="aliPay" v-html="aliPayHtml" style="z-index:999999!important"></div>
		<div class="popBg" @click="closePop"></div>
		<div class="popSendMethod">
			<div class="tip">
				<p>支付方式</p>
				<span class="icon-close" @click="closePop"></span>
			</div>
			<ul>
				<li class="item justify" v-for="item in payMethod" @click="payFun(item.id,item.name)" :class="{hide: isWechat && item.name == 'alipay'}">
					<div class="box left">
						<img :src="item.icon" alt="" />
						<b>{{ item.description }}</b>
					</div>
					<div class="box right">
						<span class="icon-arrow"></span>
					</div>
				</li>
			</ul>
		</div>
	</section>
</template>
<script>
	import wx from 'weixin-js-sdk';
    import common from './common.js'
	export default {
		data() {
			return {
				payMethod: '',
				appId: '',
				timeStamp: '',
				nonceStr: '',
				signType: '',
				paySign: '',
				isWechat: false,
				aliPayHtml: '',
                tradeNo: '',//查询订单状态参数
            }
        },
        props: ['orderId'],
        created() {
        	this.isWeChatF()
            this.getPayMethods()  //获取支付方式
        },
        methods: {
        	closePop:function(){
        		this.$emit('closePop')
        	},
        	getPayMethods:function(){
        		var _this = this
        		var payMethodUrl = "/wechatecom/appserver/order/paymentMethods.do"
        		this.ajaxDataFun('post',payMethodUrl,function(obj){
        			if(obj.code == '200'){
        				_this.payMethod = obj.data
        			}
        		})
        	},
        	isWeChatF: function (){ 
        		var _this = this
        		var ua = window.navigator.userAgent.toLowerCase(); 
        		if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
        			_this.isWechat = true
        		}else{ 
        			_this.isWechat = false
        		} 
        	},
        	payFun:function(method,name){
        		var _this = this
        		var wrap = _this.$refs.aliPay
        		var locaUrl = window.location.href

        		if(name == 'alipay'){
        			var alipayUrl = '/wechatecom/appserver/payment/aliPaySign.do?payMethodId=' + method +'&orderIds=' + _this.orderId.toString()
        			this.ajaxDataFun('post',alipayUrl,function(obj){
        				_this.aliPayHtml = obj
        				_this.$nextTick(function(){
        					if(wrap.querySelector('form')){
        						wrap.querySelector('form').submit()
        					}
        				})
        			},1)
        		}else if(name == 'wxpay'){
        			if(_this.isWechat){
        				var wxOpenId = _this.$store.state.wxOpenId || localStorage.getItem('wxOpenId')
        				var wxPayUrl = '/wechatecom/appserver/payment/wxOpenIdPaySign.do?openId=' + wxOpenId + '&payMethodId=' + method +'&orderIds=' + this.orderId.toString()
        				this.ajaxDataFun('post',wxPayUrl,function(obj){
        					if(obj.code == '200'){
        						var _data = obj.data
                                _this.appId = _data.appId     //公众号名称，由商户传入     
                                _this.timeStamp = _data.timeStamp         //时间戳，自1970年以来的秒数     
                                _this.nonceStr = _data.nonceStr //随机串     
                                _this.package = _data.package     
                                _this.signType = _data.signType         //微信签名方式：     
                                _this.paySign = _data.paySign
                                _this.tradeNo = _data.tradeNo

                                if (typeof WeixinJSBridge == "undefined"){
                                   	if( document.addEventListener ){
                                   		document.addEventListener('wx.WeixinJSBridgeReady', _this.onBridgeReady(_data), false);
                                   	}else if (document.attachEvent){
                                   		document.attachEvent('wx.WeixinJSBridgeReady', _this.onBridgeReady(_data)); 
                                   		document.attachEvent('onwx.WeixinJSBridgeReady', _this.onBridgeReady(_data));
                                   	}
                                }else{
                               	    _this.onBridgeReady(_data);
                                }
                           }
                       })
        			}else{
        				var h5wxPayUrl = '/wechatecom/appserver/payment/wxPaySign.do?payMethodId=' + method +'&orderIds=' + this.orderId.toString()
        				this.ajaxDataFun('post',h5wxPayUrl,function(obj){
        					if(obj.code == '200'){
        						var _data = obj.data 
        						var _openUrl = ''
        						var _eccordUrl = ''
        						if(locaUrl.indexOf('/shop/') > -1){
        							_eccordUrl = window.location.protocol + "//" + window.location.host + "/wechatecom/h5/shop/shop.html#/paySuccess?isWechat=1&tradeNo=" + _data.tradeNo
        						}else{
        							_eccordUrl = window.location.protocol + "//" + window.location.host + "/shop.html#/paySuccess?isWechat=1&tradeNo=" + _data.tradeNo
        						}
        						_openUrl = _data.mwebUrl + "&redirect_url=" + encodeURIComponent(_eccordUrl)
        						window.location.href = _openUrl
        					}
        				})
        			}
        		}
        	},
            onBridgeReady: function (data){  //微信方法
            	console.log('微信自带==ddd')
            	var _this = this;
            	WeixinJSBridge.invoke(
            		'getBrandWCPayRequest', {
            			appId: data.appId,          
            			timeStamp:data.timeStamp,           
            			nonceStr:data.nonceStr,      
            			package:data.package,     
            			signType:data.signType,             
            			paySign:data.paySign,
            		},
            		function(res){  
            			console.log(res)
            			if(res.err_msg == "get_brand_wcpay_request:ok" ) {
            				_this.$router.push('/paySuccess?tradeNo='+_this.tradeNo) 
            			}else{
            				_this.$store.state.orderTabActive = '00';
            				_this.$router.push('/center/orderList') 
            			}     
            		}
            	); 
            },
        },
    }
    
</script>