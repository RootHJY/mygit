webpackJsonp([24],{Cp1q:function(t,s,e){"use strict";function a(t){e("hinZ")}Object.defineProperty(s,"__esModule",{value:!0});var n=e("g5vs"),i=e("MnvO"),r=e("Z0/y"),o=a,u=r(n.a,i.a,!1,o,"data-v-3205ea40",null);s.default=u.exports},G4V1:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement;t._self._c;return t._e()},n=[],i={render:a,staticRenderFns:n};s.a=i},MnvO:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"bgf",attrs:{id:"container"}},[a("v-title",[t._v(" "+t._s(t.pageTitle))]),t._v(" "),t._l(t.refundsData,function(s){return a("div",{staticClass:"orderList "},[a("div",{staticClass:"orderItem"},[a("div",{staticClass:"orderListTop"},[a("div",{staticClass:"clearfix"},[a("div",{staticClass:"orderNum"},[t._v("服务编号:"+t._s(s.refundsSn))])])]),t._v(" "),a("div",{staticClass:"orderListInfo justify"},[a("div",{staticClass:"img box"},[a("img",{attrs:{src:s.orderItem.thumbnail,alt:""}})]),t._v(" "),a("div",{staticClass:"des box min"},[a("b",[t._v(t._s(s.orderItem.fullName)),a("span",[t._v("x"+t._s(s.orderItem.quantity))])]),t._v(" "),s.orderItem.specDesc?a("p",[t._v("规格："+t._s(s.orderItem.specDesc))]):t._e(),t._v(" "),a("span",{staticClass:"backM"},[t._v("退款金额：¥"+t._s(s.orderItem.paymentMoney))])])]),t._v(" "),a("div",{staticClass:"orderListbottom"},[a("div",{staticClass:"justify"},[a("div",{staticClass:"box leftStatus"},[2==s.status?a("span",{staticClass:"icon-icon_selected"}):t._e(),t._v(" "),0==s.status||5==s.status||7==s.status||8==s.status?a("span",{staticClass:"icon-omited"}):t._e(),t._v(" "),4==s.status||1==s.status||6==s.status?a("span",{staticClass:"icon-sign"}):t._e(),t._v(" "),0==s.status?a("p",[t._v("待审核")]):t._e(),t._v(" "),1==s.status?a("p",[t._v("退款失败")]):t._e(),t._v(" "),2==s.status?a("p",[t._v("退款成功")]):t._e(),t._v(" "),7==s.status?a("p",[a("router-link",{attrs:{to:"/refunds/addLogistic?id="+s.id}},[t._v("\n                                    请退货并填写物流信息\n                                ")])],1):t._e(),t._v(" "),8==s.status?a("p",[t._v("待确认收货")]):t._e(),t._v(" "),4==s.status?a("p",[t._v("退款失败")]):t._e(),t._v(" "),6==s.status?a("p",[t._v("退款关闭")]):t._e(),t._v(" "),5==s.status?a("p",[t._v("卖家确认收货")]):t._e()]),t._v(" "),a("div",{staticClass:"box"},[a("div",{staticClass:"nobgBtn"},[a("router-link",{attrs:{to:{path:"/refunds/refundDetails",query:{id:s.id}}}},[t._v("查看详情")])],1)])])])])])}),t._v(" "),0==t.refundsData.length?a("div",{staticClass:"popNotCart"},[a("div",{staticClass:"content"},[a("img",{attrs:{src:e("rZav"),alt:""}}),t._v(" "),a("p",[t._v("WORD天!怎么没订单!?")]),t._v(" "),a("span",[a("router-link",{attrs:{to:{path:"/"}}},[t._v(" 去逛逛 ")])],1)])]):t._e()],2)},n=[],i={render:a,staticRenderFns:n};s.a=i},OCEQ:function(t,s,e){"use strict";s.a={created:function(){this.updateTitle()},beforeUpdate:function(){this.updateTitle()},methods:{updateTitle:function(){var t=this.$slots.default;if(!(void 0===t||t.length<1||"string"!=typeof t[0].text)){var s=t[0].text;s!==document.title&&(document.title=s)}}}}},Pexp:function(t,s,e){"use strict";var a=e("OCEQ"),n=e("G4V1"),i=e("Z0/y"),r=i(a.a,n.a,!1,null,null,null);s.a=r.exports},g5vs:function(t,s,e){"use strict";var a=e("Pexp");s.a={data:function(){return{pageTitle:"退款／售后",showLogin:!0,refundsData:[],endListen:!1,currentPage:1,pageSize:10}},components:{VTitle:a.a},created:function(){this.refundList()},methods:{refundList:function(t){var s=this;s.endListen=!1;var e="/api/refund/refundList?currentPage="+this.currentPage+"&pageSize="+this.pageSize;this.ajaxDataFun("post",e,function(e){if("200"==e.code)if(t){var a=e.data.length;if(a){for(var n=0;n<a;n++)s.refundsData.push(e.data[n]);s.$set(s.$data,"refundsData",s.refundsData)}else s.endListen=!0,s.$store.state.loadingTxt=""}else s.refundsData=e.data})}},mounted:function(){var t,s,e=this,a=document.getElementById("container"),n=a.clientHeight;a.addEventListener("scroll",function(){t=a.scrollTop,s=a.scrollHeight,t+n==s&&(e.endListen||(e.currentPage++,e.refundList(1)),console.log(e.currentPage))})}}},hinZ:function(t,s,e){var a=e("yQ6H");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("FIqI")("65ac6184",a,!0,{})},rZav:function(t,s,e){t.exports=e.p+"dist/img/notorder.084972e.png"},yQ6H:function(t,s,e){s=t.exports=e("UTlt")(!0),s.push([t.i,"#container[data-v-3205ea40]{padding-top:14px}","",{version:3,sources:["G:/gitHub/shopVue/src/page/order/afterSale.vue"],names:[],mappings:"AACA,4BACE,gBAAkB,CACnB",file:"afterSale.vue",sourcesContent:["\n#container[data-v-3205ea40] {\n  padding-top: 14px;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=24.a199d573a6b726edb2d2.js.map