import _axios from 'axios'
import wx from 'weixin-js-sdk'

export default{
	setCookie: function (cname, cvalue, exdays) {
		var d = new Date()
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
		var expires = 'expires=' + d.toUTCString() + ';path=/'
		cvalue = encodeURI(cvalue, 'utf-8')
		document.cookie = cname + '=' + cvalue + '; ' + expires
	},
	getCookie: function (cname) {
		var name = cname + '='
		var ca = decodeURI((document.cookie), 'utf-8').split(';')
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i].trim()
			if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
		}
		return ''
	},
	clearCookie: function (cname) {
		this.setCookie(cname, '', -1)
	},
	uniqueArr:function(arr) { //数组去重
		var n = [];
		for (var i = 0; i < arr.length; i++) {
			if (n.indexOf(arr[i]) == -1) {
				n.push(arr[i]);
			}
		}
		return n;
	},
	getUrlPars: function (u){
	    if(u.indexOf("?")  > -1){
	        var o = {};
            var s;
            if(u.split('?').length>2){
	            s = u.split('?')[2];
            }else{
                s = u.split('?')[1];
            }
	        var t = s.split('&');
	        var i = 0;
	        var x;
	        for(i; i < t.length; i++) {
	             x = t[i].split('=');
	             o[x[0]] = x[1];
	        }
	        return o;
	    }
	},
	wxShare:function (title, desc, img, url){
	    var _thisUrl = window.location.href
	    var _shareTitle = title || '小煮集市'
	    var _shareDesc = desc || '小煮集市'
	    var _shareImg = img || window.location.protocol + '//' + window.location.host + '/wechatecom/h5/shop/static/img/logo2.png'
	    var _shareUrl = url || _thisUrl
	    var _configUrl = "/wechatecom/appserver/wechat/getSignature.do?url=" + window.location.href

	    var ua = window.navigator.userAgent.toLowerCase(); 
	    if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
	        _axios.get(_configUrl)
	        .then(function (obj) {
	            var thisId = obj.data.appId
	            var thisTimestamp = obj.data.timestamp
	            var thisNonceStr = obj.data.nonceStr
	            var thisSignature = obj.data.signature
	            wx.config({
	                debug: false,
	                appId: thisId,
	                timestamp: thisTimestamp,
	                nonceStr: thisNonceStr,
	                signature: thisSignature,
	                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'chooseWXPay']
	            })

	            wx.ready(function() {
	                // 获取“ 分享到朋友圈” 按钮点击状态及自定义分享内容接口
	                wx.onMenuShareTimeline({
	                    title: _shareTitle, // 分享标题
	                    link: _shareUrl,
	                    imgUrl: _shareImg, // 分享图标
	                    success: function() {},
	                    cancel: function() {}
	                })
	                // 获取“ 分享给朋友” 按钮点击状态及自定义分享内容接口
	                wx.onMenuShareAppMessage({
	                    title: _shareTitle, // 分享标题
	                    desc: _shareDesc, // 分享描述
	                    link: _shareUrl,
	                    imgUrl: _shareImg, // 分享图标
	                    type: '', // 分享类型,music、video或link，不填默认为link
	                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	                    success: function() {},
	                    cancel: function() {}
	                })
	                // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
	                wx.onMenuShareQQ({
	                    title: _shareTitle, // 分享标题
	                    desc: _shareDesc, // 分享描述
	                    link: _shareUrl, // 分享链接
	                    imgUrl: _shareImg, // 分享图标
	                    success: function() {},
	                    cancel: function() {}
	                })
	                // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
	                wx.onMenuShareWeibo({
	                    title: _shareTitle, // 分享标题
	                    desc: _shareDesc, // 分享描述
	                    link: _shareUrl, // 分享链接
	                    imgUrl: _shareImg, // 分享图标
	                    success: function() {},
	                    cancel: function() {}
	                })
	                // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
	                wx.onMenuShareQZone({
	                    title: _shareTitle, // 分享标题
	                    desc: _shareDesc, // 分享描述
	                    link: _shareUrl, // 分享链接
	                    imgUrl: _shareImg, // 分享图标
	                    success: function() {},
	                    cancel: function() {}
	                })
	            })
	        }).catch(function (error) {console.log(error)})
	    }
	},
}


