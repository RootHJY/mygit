webpackJsonp([19],{"62Nr":function(t,e,i){var s=i("5I2C");s(s.S+s.F*!i("eOPJ"),"Object",{defineProperty:i("8tNu").f})},ELNT:function(t,e,i){"use strict";var s=i("dbJu"),a=i.n(s),n=i("HFN4"),o=i.n(n),c=function(){function t(){a()(this,t)}return o()(t,[{key:"createPop",value:function(t,e,i){document.querySelectorAll(".popMin").length&&this.delete();var s=document.createElement("div");return s.className="popMin animated "+i,s.innerHTML='<span class="icon_imp '+t+'" ></span><p class="txt">'+e+"</p>",s}},{key:"show",value:function(t,e){var i=this,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=this.createPop(t,e,s);a.classList.add("fadeIn"),document.body.appendChild(a),setTimeout(function(){i.close()},2e3)}},{key:"close",value:function(){for(var t=this,e=document.querySelectorAll(".popMin"),i=0;i<e.length;i++){var s=e[i];s.classList.remove("fadeIn"),s.classList.add("fadeOut")}setTimeout(function(){t.delete()},1e3)}},{key:"delete",value:function(){for(var t=document.querySelectorAll(".popMin"),e=0;e<t.length;e++){var i=t[e];i.parentNode.removeChild(i)}}}]),t}();e.a=new c},HFN4:function(t,e,i){"use strict";e.__esModule=!0;var s=i("HmUy"),a=function(t){return t&&t.__esModule?t:{default:t}}(s);e.default=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),(0,a.default)(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}()},HRY1:function(t,e,i){"use strict";var s=i("ELNT"),a=i("E7z3"),n=i("xY2u"),o=i.n(n),c=i("Pexp");e.a={data:function(){return{pageTitle:"填写物流",itemId:"",corpList:"",logisticTip:"请选择",logisticCom:"",isLogistic:!1,reasonsList:["多买/买错/不想要","快递无记录","少货/空包裹","未按约定时间发货","快递一直未到达","其他"],phone:"",rightPhone:!1,logisNum:"",isLogisNum:!1,memo:"",file:"",imageLists:["","","",""],activeIdx:"",listlength:0,showImgCss:[{backgroundImage:""},{backgroundImage:""},{backgroundImage:""},{backgroundImage:""}],loadingIdx:""}},components:{common:a.a,popMin:s.a,VTitle:c.a},created:function(){var t=a.a.getUrlPars(window.location.href);this.itemId=t.id;var e=this;this.ajaxDataFun("post","/wechatecom/appserver/deliveryCorp/deliveryCorpList",function(t){"200"==t.code&&(e.corpList=t.data)})},methods:{getFileTest:function(t,e){var i=this;if(this.file=t.target.files[0],this.file){this.loadingIdx=e;var s=new FormData;s.append("file",this.file);var a={headers:{"Content-Type":"multipart/form-data"}};o.a.post("/wechatecom/upload/uploadImage",s,a).then(function(t){var s=t.data;200==s.code&&(i.imageLists[e]=s.data,i.getTrueLength(),i.showImgCss[e].backgroundImage="url("+i.imageLists[e]+")",i.loadingIdx="",i.activeIdx=e<3?i.listlength:3)})}},clearImgTest:function(t){this.showImgCss.splice(t,1),this.showImgCss.push({backgroundImage:""}),this.imageLists.splice(t,1),this.imageLists.push(""),this.getTrueLength(),this.activeIdx=t<3?this.listlength:3},getTrueLength:function(){this.listlength=0;for(var t=0;t<4;t++)""!=this.imageLists[t]&&this.listlength++},changeCorp:function(t){this.isLogistic=!1,this.logisticTip=t},toastPhone:function(){this.phone?this.isPhone||s.a.show("icon-sign","请填写正确的手机电话"):(s.a.show("icon-sign","请填写手机电话"),this.requireNum++)},saveRefund:function(t){var e=this,i=this.imageLists[0]+","+this.imageLists[1]+","+this.imageLists[2]+","+this.imageLists[3],a="/wechatecom/appserver/refund/updateRefund?id="+this.itemId+"&deliveryCorpId="+this.logisticCom+"&trackingNo="+this.logisNum+"&phone="+this.phone+"&memo="+this.memo+"&imageUrl="+i;this.logisticCom?this.logisNum?this.rightPhone?this.ajaxDataFun("post",a,function(t){"200"==t.code&&(s.a.show("icon-success","提交成功"),e.$router.push("/refunds/refundDetails?id="+t.data.id))}):this.toastPhone():s.a.show("icon-sign","请填写物流单号"):s.a.show("icon-sign","请选择物流公司")}},mounted:function(){},watch:{phone:function(){var t=/^1[34578]\d{9}$/.test(this.phone);this.rightPhone=!!t,console.log(this.rightPhone)},logisNum:function(){""!==this.logisNum?this.isLogisNum=!0:this.isLogisNum=!1,console.log(this.isLogisNum)},logisticCom:function(){console.log(this.logisticCom)}}}},HmUy:function(t,e,i){t.exports={default:i("kYqm"),__esModule:!0}},Pexp:function(t,e,i){"use strict";var s=i("t/3t"),a=i("pDxG"),n=i("mPyB"),o=n(s.a,a.a,!1,null,null,null);e.a=o.exports},U3Yl:function(t,e,i){e=t.exports=i("bKW+")(!0),e.push([t.i,".textarea .fright[data-v-fa9c3a60]{padding-left:0}.mustM input[data-v-fa9c3a60]{color:red}.line[data-v-fa9c3a60]{width:22.085%}.popSendMethod[data-v-fa9c3a60]{height:70%}.corp[data-v-fa9c3a60]{overflow-y:scroll;height:100%;padding-bottom:100px}.bg[data-v-fa9c3a60]{position:fixed;bottom:0;left:0;right:0;background-color:#fff}.refundImg[data-v-fa9c3a60]{float:left;margin-right:2%}","",{version:3,sources:["/Users/roothjy/git/weShop/wechatecom/src/main/webapp/h5/shop/src/page/refunds/addLogistics.vue"],names:[],mappings:"AACA,mCACE,cAAgB,CACjB,AACD,8BACE,SAAW,CACZ,AACD,uBACE,aAAe,CAChB,AACD,gCACE,UAAY,CACb,AACD,uBACE,kBAAmB,AACnB,YAAa,AACb,oBAAsB,CACvB,AACD,qBACE,eAAgB,AAChB,SAAU,AACV,OAAQ,AACR,QAAS,AACT,qBAAuB,CACxB,AACD,4BACE,WAAY,AACZ,eAAiB,CAClB",file:"addLogistics.vue",sourcesContent:["\n.textarea .fright[data-v-fa9c3a60] {\n  padding-left: 0;\n}\n.mustM input[data-v-fa9c3a60] {\n  color: red;\n}\n.line[data-v-fa9c3a60] {\n  width: 22.085%;\n}\n.popSendMethod[data-v-fa9c3a60] {\n  height: 70%;\n}\n.corp[data-v-fa9c3a60] {\n  overflow-y: scroll;\n  height: 100%;\n  padding-bottom: 100px;\n}\n.bg[data-v-fa9c3a60] {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: #fff;\n}\n.refundImg[data-v-fa9c3a60] {\n  float: left;\n  margin-right: 2%;\n}\n"],sourceRoot:""}])},bTkh:function(t,e,i){"use strict";function s(t){i("y2s8")}Object.defineProperty(e,"__esModule",{value:!0});var a=i("HRY1"),n=i("olP8"),o=i("mPyB"),c=s,l=o(a.a,n.a,!1,c,"data-v-fa9c3a60",null);e.default=l.exports},dbJu:function(t,e,i){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},kYqm:function(t,e,i){i("62Nr");var s=i("ZBPP").Object;t.exports=function(t,e,i){return s.defineProperty(t,e,i)}},olP8:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bgf noPad",attrs:{id:"container"}},[i("v-title",[t._v(" "+t._s(t.pageTitle))]),t._v(" "),i("form",{staticClass:"myWhiteBg refunds "},[i("div",{staticClass:"refunds"},[i("div",{staticClass:"normal"},[i("div",{staticClass:"clearfix"},[t._m(0),t._v(" "),i("div",{staticClass:"fright",on:{click:function(e){t.isLogistic=!0}}},[i("p",{staticClass:"gray"},[t._v(" "+t._s(t.logisticTip)+" ")]),t._v(" "),i("span",{staticClass:"icon-arrow"})])])]),t._v(" "),i("div",{staticClass:"normal"},[i("div",{staticClass:"clearfix"},[t._m(1),t._v(" "),i("div",{staticClass:"fleft refLeft"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.logisNum,expression:"logisNum"}],attrs:{type:"number",name:"logisNum",placeholder:"填写物流单号"},domProps:{value:t.logisNum},on:{input:function(e){e.target.composing||(t.logisNum=e.target.value)}}})])])]),t._v(" "),i("div",{staticClass:"normal"},[i("div",{staticClass:"clearfix"},[t._m(2),t._v(" "),i("div",{staticClass:"fleft refLeft"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],attrs:{type:"number",name:"phone",placeholder:"填写手机号"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value)}}})])])]),t._v(" "),i("div",{staticClass:"normal textarea"},[i("div",{staticClass:"clearfix"},[i("div",{staticClass:"fleft"},[t._v("备注信息")]),t._v(" "),i("div",{staticClass:"fright"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.memo,expression:"memo"}],attrs:{name:"memo",maxlength:"200",placeholder:"最多可填写200个字"},domProps:{value:t.memo},on:{input:function(e){e.target.composing||(t.memo=e.target.value)}}})])])]),t._v(" "),i("div",{staticClass:"normal"},[t._m(3),t._v(" "),i("div",{staticClass:"addImg clearfix"},t._l(t.imageLists,function(e,s){return 0==s||""!=e||t.activeIdx==s?i("div",{staticClass:"box refundImg",style:t.showImgCss[s]},[i("label",{class:{active:""==e}},[i("input",{staticStyle:{"font-size":"0",border:"0",width:"0"},attrs:{type:"file",name:"filemImg",accept:"image/jpeg,image/jpg,image/png"},on:{change:function(e){t.getFileTest(e,s)}}}),t._v(" "),s===t.loadingIdx?i("em",[t._v("上传中...")]):t._e()]),t._v(" "),""!=e?i("span",{on:{click:function(e){t.clearImgTest(s)}}},[t._v("x")]):t._e()]):t._e()}))]),t._v(" "),i("div",{staticClass:"tip"},[i("div",{staticClass:"sureBtn",class:{active:""!=t.logisticCom&&t.rightPhone&&t.isLogisNum},on:{click:function(e){t.saveRefund(e)}}},[t._v(" 提交 ")])])])]),t._v(" "),t.isLogistic?i("div",{staticClass:"popBg"}):t._e(),t._v(" "),t.isLogistic?i("div",{staticClass:"popSendMethod"},[i("div",{staticClass:"tip"},[i("p",[t._v("物流公司")]),t._v(" "),i("span",{staticClass:"icon-close",on:{click:function(e){t.isLogistic=!1}}})]),t._v(" "),i("div",{staticClass:"corp"},t._l(t.corpList,function(e,s){return i("label",{on:{click:function(i){t.changeCorp(e.name)}}},[i("ul",[i("li",{staticClass:"item justify"},[i("div",{staticClass:"box left"},[i("b",{staticStyle:{"margin-left":"0"}},[t._v(" "+t._s(e.name))])]),t._v(" "),i("div",{staticClass:"box right"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.logisticCom,expression:"logisticCom"}],attrs:{type:"radio",name:"logisticCom"},domProps:{value:e.id,checked:t._q(t.logisticCom,e.id)},on:{change:function(i){t.logisticCom=e.id}}})])])])])})),t._v(" "),i("div",{staticClass:"bg"},[i("div",{staticClass:"closeBtn sureBtn active",on:{click:function(e){t.isLogistic=!1}}},[t._v("关闭 ")])])]):t._e()],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"fleft"},[i("span",{staticClass:"requied"}),t._v("物流公司 ")])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"fleft"},[i("span",{staticClass:"requied"}),t._v("物流单号 ")])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"fleft"},[i("span",{staticClass:"requied"}),t._v("手机号码 ")])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"clearfix"},[i("div",{staticClass:"fleft"},[t._v("图片举证")]),t._v(" "),i("div",{staticClass:"fleft refLeft"},[i("p",[t._v("最多可上传4张图片")])])])}],n={render:s,staticRenderFns:a};e.a=n},pDxG:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c;return t._e()},a=[],n={render:s,staticRenderFns:a};e.a=n},"t/3t":function(t,e,i){"use strict";e.a={created:function(){this.updateTitle()},beforeUpdate:function(){this.updateTitle()},methods:{updateTitle:function(){var t=this.$slots.default;if(!(void 0===t||t.length<1||"string"!=typeof t[0].text)){var e=t[0].text;e!==document.title&&(document.title=e)}}}}},y2s8:function(t,e,i){var s=i("U3Yl");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);i("6imX")("02b0bf99",s,!0)}});
//# sourceMappingURL=19.141432d16269e0ef18df.js.map