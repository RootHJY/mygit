webpackJsonp([14],{"1Mjn":function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"goodsList",class:{threeCol:3==t.col,twoCol:2==t.col,oneCol:1==t.col}},[t._l(t.dataList,function(s){return a("router-link",{staticClass:"box",attrs:{to:{path:"shopDetails",query:{id:s.id}}}},[a("div",{staticClass:"img"},[s.image?[a("img",{attrs:{src:s.image,alt:""}})]:[a("img",{attrs:{src:e("lJF1"),alt:""}})],t._v(" "),"售罄"==s.productMark?a("span",[t._v(t._s(s.productMark))]):t._e(),t._v(" "),"新品"==s.productMark?a("em",[t._v(t._s(s.productMark))]):t._e(),t._v(" "),"特惠"==s.productMark?a("i",[t._v(t._s(s.productMark))]):t._e(),t._v(" "),"拼团"==s.productMark?a("i",[t._v(t._s(s.productMark))]):t._e()],2),t._v(" "),a("div",{staticClass:"title"},[t._v(t._s(s.name))]),t._v(" "),a("div",{staticClass:"price"},[a("span",{staticClass:"sale"},[a("em",[t._v("¥")]),t._v(t._s(s.price))]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:s.costPrice,expression:"item.costPrice"}],staticClass:"discount"},[t._v("¥"+t._s(s.costPrice))]),t._v(" "),a("span",{staticClass:"cart icon-cart"})])])}),t._v(" "),a("p",{staticClass:"isLoading"},[t._v(" "+t._s(t.$store.state.loadingTxt))])],2)},i=[],o={render:a,staticRenderFns:i};s.a=o},B0CD:function(t,s,e){"use strict";s.a={name:"shopList",data:function(){return{}},props:["col","dataList"],created:function(){},methods:{}}},CkEF:function(t,s,e){"use strict";var a=e("MxvF"),i=e("ZjR9"),o=e("mPyB"),n=o(a.a,i.a,!1,null,null,null);s.a=n.exports},MxvF:function(t,s,e){"use strict";s.a={name:"searchBar",data:function(){return{pageTitle:"搜索Bar"}},created:function(){},methods:{}}},Pexp:function(t,s,e){"use strict";var a=e("t/3t"),i=e("pDxG"),o=e("mPyB"),n=o(a.a,i.a,!1,null,null,null);s.a=n.exports},QOZO:function(t,s,e){"use strict";var a=e("Pexp"),i=e("E7z3"),o=e("mzkE"),n=e("CkEF"),c=e("wC/b");s.a={data:function(){return{pageTitle:"小煮集市",catagory:"",colNum:"2",shopData:"",isShowSortPrice:!1,groupId:"",promotionType:"",promotionId:"",couponId:"",sortType:0,sortTxt:"综合排序",currentPage:1,pageSize:10,isFixed:!1,endListen:!1,showGoTop:!1}},components:{VTitle:a.a,searchBar:n.a,shopList:c.a,footerLay:o.a},created:function(){var t=window.location.href;this.colNum=localStorage.getItem("colNum")||"2",t.indexOf("name=")>-1&&(this.groupId=i.a.getUrlPars(t).id,this.pageTitle=decodeURI(i.a.getUrlPars(t).name),this.getShopList())},methods:{showCol:function(t){this.colNum=t,localStorage.setItem("colNum",t)},showSortPriceF:function(){this.isShowSortPrice=!this.isShowSortPrice},sortPriceF:function(t,s){this.sortType=t,this.isShowSortPrice=!1,this.sortTxt=s,this.currentPage=1,this.getShopList()},getShopList:function(t){var s=this;s.endListen=!1;var e="/wechatecom/appserver/group/groupSearch.do?groupId="+this.groupId+"&sortType="+this.sortType+"&currentPage="+this.currentPage+"&pageSize="+this.pageSize;this.ajaxDataFun("post",e,function(e){if("200"==e.code){var a=e.data.length;if(t)if(a){for(var i=0;i<a;i++)s.shopData.push(e.data[i]);s.$set(s.$data,"shopData",s.shopData)}else s.endListen=!0,s.$store.state.loadingTxt="";else s.shopData=e.data}})},goTopF:function(){var t=document.getElementById("container");this.GoTop(t,0)}},mounted:function(){var t,s,e=this,a=document.getElementById("container"),i=a.clientHeight;a.addEventListener("scroll",function(){t=a.scrollTop,s=a.scrollHeight,t>=300?(e.isFixed=!0,e.showGoTop=!0):(e.isFixed=!1,e.showGoTop=!1),t+i==s&&(e.endListen||(e.currentPage++,e.getShopList(1)),console.log(e.currentPage))})}}},RfIW:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"paddingBt50",attrs:{id:"container"}},[e("v-title",[t._v(" "+t._s(t.pageTitle))]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowSortPrice,expression:"isShowSortPrice"}],staticClass:"popBg"}),t._v(" "),e("div",{class:{scrollFixed:t.isFixed},attrs:{id:"top"}},[e("searchBar"),t._v(" "),e("div",{staticClass:"filterWrap"},[e("div",{staticClass:"menu"},[e("span",{directives:[{name:"show",rawName:"v-show",value:1==t.colNum,expression:"colNum == 1"}],staticClass:"icon-menu",on:{click:function(s){t.showCol(2)}}}),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:2==t.colNum,expression:"colNum == 2"}],staticClass:"icon-btn_liebiao",on:{click:function(s){t.showCol(1)}}})]),t._v(" "),e("div",{staticClass:"tagContent"},[e("div",{staticClass:"tagArea"},[e("div",{staticClass:"name",on:{click:function(s){t.showSortPriceF()}}},[t._v(t._s(t.sortTxt))])]),t._v(" "),e("ul",{directives:[{name:"show",rawName:"v-show",value:t.isShowSortPrice,expression:"isShowSortPrice"}]},[e("li",{class:{active:0==t.sortType},on:{click:function(s){t.sortPriceF(0,"综合排序")}}},[t._v("\n                        综合排序\n                        "),e("span",{staticClass:"icon-gou"})]),t._v(" "),e("li",{class:{active:1==t.sortType},on:{click:function(s){t.sortPriceF(1,"价格由低到高")}}},[t._v("\n                        价格由低到高\n                        "),e("span",{staticClass:"icon-gou"})]),t._v(" "),e("li",{class:{active:2==t.sortType},on:{click:function(s){t.sortPriceF(2,"价格由高到低")}}},[t._v("\n                        价格由高到低\n                        "),e("span",{staticClass:"icon-gou"})])])])])],1),t._v(" "),e("shopList",{attrs:{col:t.colNum,dataList:t.shopData}}),t._v(" "),e("footerLay",{attrs:{fIndex:2}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.showGoTop,expression:"showGoTop"}],staticClass:"gotop",on:{click:t.goTopF}},[e("span",{staticClass:"icon-top"}),t._v(" "),e("p",[t._v("顶部")])])],1)},i=[],o={render:a,staticRenderFns:i};s.a=o},YQeH:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("QOZO"),i=e("RfIW"),o=e("mPyB"),n=o(a.a,i.a,!1,null,null,null);s.default=n.exports},ZjR9:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"searchBar "},[e("router-link",{staticClass:"search",attrs:{to:"/search"}},[e("label",{staticClass:"cart icon-search"}),t._v(" "),e("input",{attrs:{type:"text",placeholder:t.$store.state.hotTxt,disabled:"disabled"}})])],1)},i=[],o={render:a,staticRenderFns:i};s.a=o},cQmP:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"footer"}},[e("ul",{staticClass:"justify"},[e("li",{staticClass:"box",class:{active:1==t.fIndex}},[e("router-link",{attrs:{to:"/index"}},[e("span",{staticClass:"icon icon_a icon-home_nomal"}),t._v(" "),e("span",{staticClass:"icon icon_b icon-home_selected"}),t._v(" "),e("p",[t._v("首页")])])],1),t._v(" "),e("li",{staticClass:"box",class:{active:2==t.fIndex}},[e("router-link",{attrs:{to:"/category"}},[e("span",{staticClass:"icon icon_a icon-classify"}),t._v(" "),e("span",{staticClass:"icon icon_b icon-selected"}),t._v(" "),e("p",[t._v("商品分类")])])],1),t._v(" "),e("li",{staticClass:"box",class:{active:3==t.fIndex}},[e("router-link",{attrs:{to:"/mycart"}},[e("span",{staticClass:"icon icon_a icon-cart_nomal"}),t._v(" "),e("span",{staticClass:"icon icon_b icon-cart_selected"}),t._v(" "),e("p",[t._v("购物车")]),t._v(" "),0!=t.$store.state.cartNum?e("em",[t._v(t._s(t.$store.state.cartNum))]):t._e()])],1),t._v(" "),e("li",{staticClass:"box",class:{active:4==t.fIndex}},[e("router-link",{attrs:{to:"/center"}},[e("span",{staticClass:"icon icon_a icon-tab_nomal"}),t._v(" "),e("span",{staticClass:"icon icon_b icon-tab_selected"}),t._v(" "),e("p",[t._v("个人中心")])])],1)])])},i=[],o={render:a,staticRenderFns:i};s.a=o},lJF1:function(t,s,e){t.exports=e.p+"dist/img/error.e15f37f.png"},lMd0:function(t,s,e){"use strict";e("E7z3");s.a={name:"footer",data:function(){return{}},props:["fIndex"],created:function(){},methods:{}}},mzkE:function(t,s,e){"use strict";var a=e("lMd0"),i=e("cQmP"),o=e("mPyB"),n=o(a.a,i.a,!1,null,null,null);s.a=n.exports},pDxG:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement;t._self._c;return t._e()},i=[],o={render:a,staticRenderFns:i};s.a=o},"t/3t":function(t,s,e){"use strict";s.a={created:function(){this.updateTitle()},beforeUpdate:function(){this.updateTitle()},methods:{updateTitle:function(){var t=this.$slots.default;if(!(void 0===t||t.length<1||"string"!=typeof t[0].text)){var s=t[0].text;s!==document.title&&(document.title=s)}}}}},"wC/b":function(t,s,e){"use strict";var a=e("B0CD"),i=e("1Mjn"),o=e("mPyB"),n=o(a.a,i.a,!1,null,null,null);s.a=n.exports}});
//# sourceMappingURL=14.4ac9980869be3fd0b7a9.js.map