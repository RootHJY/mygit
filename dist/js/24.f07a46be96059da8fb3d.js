webpackJsonp([24],{AXTj:function(t,e,s){e=t.exports=s("bKW+")(!0),e.push([t.i,"#container[data-v-803c2430]{padding-top:14px}","",{version:3,sources:["/Users/roothjy/git/weShop/wechatecom/src/main/webapp/h5/shop/src/page/order/afterSale.vue"],names:[],mappings:"AACA,4BACE,gBAAkB,CACnB",file:"afterSale.vue",sourcesContent:["\n#container[data-v-803c2430] {\n  padding-top: 14px;\n}\n"],sourceRoot:""}])},Cp1q:function(t,e,s){"use strict";function a(t){s("aN7g")}Object.defineProperty(e,"__esModule",{value:!0});var n=s("LQ2W"),i=s("KH1d"),r=s("mPyB"),o=a,c=r(n.a,i.a,!1,o,"data-v-803c2430",null);e.default=c.exports},KH1d:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bgf",attrs:{id:"container"}},[a("v-title",[t._v(" "+t._s(t.pageTitle))]),t._v(" "),t._l(t.refundsData,function(e){return a("div",{staticClass:"orderList "},[a("div",{staticClass:"orderItem"},[a("div",{staticClass:"orderListTop"},[a("div",{staticClass:"clearfix"},[a("div",{staticClass:"orderNum"},[t._v("服务编号:"+t._s(e.refundsSn))])])]),t._v(" "),a("div",{staticClass:"orderListInfo justify"},[a("div",{staticClass:"img box"},[a("img",{attrs:{src:e.orderItem.thumbnail,alt:""}})]),t._v(" "),a("div",{staticClass:"des box min"},[a("b",[t._v(t._s(e.orderItem.fullName)),a("span",[t._v("x"+t._s(e.orderItem.quantity))])]),t._v(" "),e.orderItem.specDesc?a("p",[t._v("规格："+t._s(e.orderItem.specDesc))]):t._e(),t._v(" "),a("span",{staticClass:"backM"},[t._v("退款金额：¥"+t._s(e.orderItem.paymentMoney))])])]),t._v(" "),a("div",{staticClass:"orderListbottom"},[a("div",{staticClass:"justify"},[a("div",{staticClass:"box leftStatus"},[2==e.status?a("span",{staticClass:"icon-icon_selected"}):t._e(),t._v(" "),0==e.status||5==e.status||7==e.status||8==e.status?a("span",{staticClass:"icon-omited"}):t._e(),t._v(" "),4==e.status||1==e.status||6==e.status?a("span",{staticClass:"icon-sign"}):t._e(),t._v(" "),0==e.status?a("p",[t._v("待审核")]):t._e(),t._v(" "),1==e.status?a("p",[t._v("退款失败")]):t._e(),t._v(" "),2==e.status?a("p",[t._v("退款成功")]):t._e(),t._v(" "),7==e.status?a("p",[a("router-link",{attrs:{to:"/refunds/addLogistic?id="+e.id}},[t._v("\n                                    请退货并填写物流信息\n                                ")])],1):t._e(),t._v(" "),8==e.status?a("p",[t._v("待确认收货")]):t._e(),t._v(" "),4==e.status?a("p",[t._v("退款失败")]):t._e(),t._v(" "),6==e.status?a("p",[t._v("退款关闭")]):t._e(),t._v(" "),5==e.status?a("p",[t._v("卖家确认收货")]):t._e()]),t._v(" "),a("div",{staticClass:"box"},[a("div",{staticClass:"nobgBtn"},[a("router-link",{attrs:{to:{path:"/refunds/refundDetails",query:{id:e.id}}}},[t._v("查看详情")])],1)])])])])])}),t._v(" "),0==t.refundsData.length?a("div",{staticClass:"popNotCart"},[a("div",{staticClass:"content"},[a("img",{attrs:{src:s("rZav"),alt:""}}),t._v(" "),a("p",[t._v("WORD天!怎么没订单!?")]),t._v(" "),a("span",[a("router-link",{attrs:{to:{path:"/"}}},[t._v(" 去逛逛 ")])],1)])]):t._e()],2)},n=[],i={render:a,staticRenderFns:n};e.a=i},LQ2W:function(t,e,s){"use strict";var a=s("Pexp");e.a={data:function(){return{pageTitle:"退款／售后",showLogin:!0,refundsData:[],endListen:!1,currentPage:1,pageSize:10}},components:{VTitle:a.a},created:function(){this.refundList()},methods:{refundList:function(t){var e=this;e.endListen=!1;var s="/wechatecom/appserver/refund/refundList?currentPage="+this.currentPage+"&pageSize="+this.pageSize;this.ajaxDataFun("post",s,function(s){if("200"==s.code)if(t){var a=s.data.length;if(a){for(var n=0;n<a;n++)e.refundsData.push(s.data[n]);e.$set(e.$data,"refundsData",e.refundsData)}else e.endListen=!0,e.$store.state.loadingTxt=""}else e.refundsData=s.data})}},mounted:function(){var t,e,s=this,a=document.getElementById("container"),n=a.clientHeight;a.addEventListener("scroll",function(){t=a.scrollTop,e=a.scrollHeight,t+n==e&&(s.endListen||(s.currentPage++,s.refundList(1)),console.log(s.currentPage))})}}},Pexp:function(t,e,s){"use strict";var a=s("t/3t"),n=s("pDxG"),i=s("mPyB"),r=i(a.a,n.a,!1,null,null,null);e.a=r.exports},aN7g:function(t,e,s){var a=s("AXTj");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("6imX")("204d932c",a,!0)},pDxG:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c;return t._e()},n=[],i={render:a,staticRenderFns:n};e.a=i},rZav:function(t,e,s){t.exports=s.p+"dist/img/notorder.084972e.png"},"t/3t":function(t,e,s){"use strict";e.a={created:function(){this.updateTitle()},beforeUpdate:function(){this.updateTitle()},methods:{updateTitle:function(){var t=this.$slots.default;if(!(void 0===t||t.length<1||"string"!=typeof t[0].text)){var e=t[0].text;e!==document.title&&(document.title=e)}}}}}});
//# sourceMappingURL=24.f07a46be96059da8fb3d.js.map