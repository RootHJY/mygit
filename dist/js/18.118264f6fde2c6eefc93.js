webpackJsonp([18],{"/84K":function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"container"}},[a("v-title",[t._v(" "+t._s(t.pageTitle)+" ")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.showUl,expression:"showUl"}],staticClass:"popBg",on:{click:t.hideSortFun}}),t._v(" "),a("div",{class:{scrollFixed:t.isFixed},attrs:{id:"top"}},[a("div",{staticClass:"searchBar justify"},[a("div",{staticClass:"search box",class:{min:t.isEnter}},[a("label",{staticClass:"icon-search"}),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchVal,expression:"searchVal"}],ref:"input",attrs:{type:"text",placeholder:this.$store.state.hotTxt},domProps:{value:t.searchVal},on:{focus:function(s){t.entInput()},blur:function(s){t.outInput()},keyup:function(s){if(!("button"in s)&&t._k(s.keyCode,"enter",13,s.key))return null;t.searchFun()},input:function(s){s.target.composing||(t.searchVal=s.target.value)}}}),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.searchVal,expression:"searchVal"}],staticClass:"close",on:{click:function(s){t.clearInput()}}},[a("img",{attrs:{src:e("ZVGX"),alt:""}})]),t._v(" "),a("label",{directives:[{name:"show",rawName:"v-show",value:t.showLabel,expression:"showLabel"}],staticClass:"txt",on:{click:function(s){t.enterLabel()}}},[t._v("   \n                    "+t._s(t.searchVal)+"\n                ")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isValue&&t.isEnter,expression:"isValue && isEnter"}],staticClass:"searchBtn box",on:{click:function(s){t.searchFun()}}},[t._v("搜索")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.isValue&&t.isEnter,expression:"!isValue && isEnter"}],staticClass:"searchBtn box",on:{click:function(s){t.cancelSearch()}}},[t._v("取消")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.noResult&&t.showFilter,expression:"!noResult && showFilter"}],staticClass:"filterWrap "},[a("div",{staticClass:"menu"},[a("span",{directives:[{name:"show",rawName:"v-show",value:1==t.colNumSh,expression:"colNumSh == 1"}],staticClass:"menu icon-menu",on:{click:function(s){t.togColNum(2)}}}),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:2==t.colNumSh,expression:"colNumSh == 2"}],staticClass:"menu icon-btn_liebiao",on:{click:function(s){t.togColNum(1)}}})]),t._v(" "),a("div",{staticClass:"tagContent"},[a("div",{staticClass:"tagArea"},[a("div",{staticClass:"name",class:{active:t.showUl},on:{click:t.showSort}},[t._v(t._s(t.sortTxt))])]),t._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:t.showUl,expression:"showUl"}]},[a("li",{class:{active:0==t.sortType},on:{click:function(s){t.postSortFun(0,"综合排序")}}},[t._v("\n                        综合排序 \n                        "),a("span",{staticClass:"icon-gou"})]),t._v(" "),a("li",{class:{active:1==t.sortType},on:{click:function(s){t.postSortFun(1,"价格由低到高")}}},[t._v("\n                        价格由低到高 \n                        "),a("span",{staticClass:"icon-gou"})]),t._v(" "),a("li",{class:{active:2==t.sortType},on:{click:function(s){t.postSortFun(2,"价格由高到低")}}},[t._v("\n                        价格由高到低 \n                        "),a("span",{staticClass:"icon-gou"})])])])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.noResult,expression:"noResult"}],staticClass:"noGoods"},[t._v("\n        您搜索的“"+t._s(t._f("nomore")(t.searchVal))+"”没有相关商品\n    ")]),t._v(" "),a("shopList",{class:{paddingTop84:t.isFixed},attrs:{dataList:t.dataList,col:t.colNumSh}}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.noRemd,expression:"!noRemd"}],staticClass:"section",staticStyle:{"margin-top":"30px"},attrs:{id:"searchRemd"}},[a("h2",{staticStyle:{"font-size":"16px"}},[t._v("为您推荐")]),t._v(" "),a("shopList",{attrs:{dataList:t.remDataList,col:"2"}})],1),t._v(" "),a("hotSearchPop",{directives:[{name:"show",rawName:"v-show",value:t.isEnter,expression:"isEnter"}],attrs:{postChildCook:t.filterItems},on:{childFun:t.childGetValue,childFunTwo:t.clearShCookie}})],1)},i=[],o={render:a,staticRenderFns:i};s.a=o},"1Mjn":function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"goodsList",class:{threeCol:3==t.col,twoCol:2==t.col,oneCol:1==t.col}},[t._l(t.dataList,function(s){return a("router-link",{staticClass:"box",attrs:{to:{path:"shopDetails",query:{id:s.id}}}},[a("div",{staticClass:"img"},[s.image?[a("img",{attrs:{src:s.image,alt:""}})]:[a("img",{attrs:{src:e("lJF1"),alt:""}})],t._v(" "),"售罄"==s.productMark?a("span",[t._v(t._s(s.productMark))]):t._e(),t._v(" "),"新品"==s.productMark?a("em",[t._v(t._s(s.productMark))]):t._e(),t._v(" "),"特惠"==s.productMark?a("i",[t._v(t._s(s.productMark))]):t._e(),t._v(" "),"拼团"==s.productMark?a("i",[t._v(t._s(s.productMark))]):t._e()],2),t._v(" "),a("div",{staticClass:"title"},[t._v(t._s(s.name))]),t._v(" "),a("div",{staticClass:"price"},[a("span",{staticClass:"sale"},[a("em",[t._v("¥")]),t._v(t._s(s.price))]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:s.costPrice,expression:"item.costPrice"}],staticClass:"discount"},[t._v("¥"+t._s(s.costPrice))]),t._v(" "),a("span",{staticClass:"cart icon-cart"})])])}),t._v(" "),a("p",{staticClass:"isLoading"},[t._v(" "+t._s(t.$store.state.loadingTxt))])],2)},i=[],o={render:a,staticRenderFns:i};s.a=o},"8HyC":function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"popSearch"},[t._m(0),t._v(" "),e("ul",t._l(t.hotSearch,function(s){return e("li",{on:{click:function(e){t.postValue(s)}}},[t._v("\n\t\t\t"+t._s(s)+"\n\t\t")])})),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"title"},[e("p",[t._v("最近搜索")]),t._v(" "),e("span",{on:{click:t.clearSCK}},[t._v("清除")])]),t._v(" "),e("ul",t._l(t.postChildCook,function(s){return e("li",{on:{click:function(e){t.postValue(s)}}},[t._v("\n\t\t\t"+t._s(s)+"\n\t\t")])}))])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"title"},[e("p",[t._v("大家都在搜")])])}],o={render:a,staticRenderFns:i};s.a=o},B0CD:function(t,s,e){"use strict";s.a={name:"shopList",data:function(){return{}},props:["col","dataList"],created:function(){},methods:{}}},BYbf:function(t,s,e){"use strict";var a=e("YPGO"),i=e("8HyC"),o=e("mPyB"),n=o(a.a,i.a,!1,null,null,null);s.a=n.exports},KwWb:function(t,s,e){"use strict";var a=e("Pexp"),i=e("E7z3"),o=e("BYbf"),n=e("wC/b");s.a={data:function(){return{pageTitle:"小煮集市",colNumSh:"",searchVal:"",searchVal_back:"",showLabel:!1,isValue:!0,isEnter:!0,postChildCook:"",dataList:"",remDataList:"",noRemd:"",currentPage:1,pageSize:20,sortType:0,noResult:!1,showPop:!1,sortTxt:"综合排序",showUl:!1,showFilter:!0,isFixed:!1,isEnd:!1,endListen:!1,inputFocus:!1}},components:{VTitle:a.a,hotSearchPop:o.a,shopList:n.a},created:function(){this.colNumSh=localStorage.getItem("colNumSh")||"2",this.searchVal="",this.searchVal_back=this.$store.state.hotTxt,this.getSearchCkFun()},methods:{togColNum:function(t){this.colNumSh=t,localStorage.setItem("colNumSh",t)},entInput:function(){this.isEnter=!0,this.showUl=!1},outInput:function(){this.showLabel=!0},enterLabel:function(){this.showLabel=!1,this.inputFocus=!0,this.$refs.input.focus()},clearInput:function(){this.searchVal="",this.isValue=!1,this.showLabel=!1,this.noResult&&(this.noResult=!1,this.showFilter=!1)},searchFun:function(){this.currentPage=1,this.searchVal||(this.searchVal=this.$store.state.hotTxt),this.searchVal_back=this.searchVal,this.isEnter=!1;var t=localStorage.getItem("hisSearch")+","+this.searchVal;localStorage.setItem("hisSearch",t),this.getSearchCkFun(),this.shopListFun(this.searchVal,this.sortType),this.getRecomd()},cancelSearch:function(){this.$router.go(-1)},childGetValue:function(t){this.currentPage=1,this.isEnter=!1,this.searchVal=t,this.searchVal_back=t,this.getRecomd(),this.shopListFun(t,this.sortType)},clearShCookie:function(){localStorage.removeItem("hisSearch"),this.postChildCook=""},getSearchCkFun:function(){var t=localStorage.getItem("hisSearch");t&&(this.postChildCook=t.split(","),console.log("====="),console.log(this.postChildCook),this.postChildCook=i.a.uniqueArr(this.postChildCook).reverse())},getRecomd:function(){var t=this,s="/wechatecom/appserver/product/recommendForYou.do?name="+t.searchVal;this.ajaxDataFun("post",s,function(s){console.log("请求为您推荐"),"200"==s.code&&(0==s.data.length?t.noRemd=!0:t.noRemd=!1,t.remDataList=s.data)})},shopListFun:function(t,s,e){var a=this;a.endListen=!1;var i="/wechatecom/appserver/product/search.do?name="+t+"&currentPage="+this.currentPage+"&pageSize="+this.pageSize+"&sortType="+s;this.ajaxDataFun("post",i,function(t){if("200"==t.code){var s=t.data.length;if(s<a.pageSize&&(a.isEnd=!0),e)if(s){for(var i=0;i<s;i++)a.dataList.push(t.data[i]);a.$set(a.$data,"dataList",a.dataList)}else a.endListen=!0,a.$store.state.loadingTxt="";else 0==s?(a.noResult=!0,a.isEnd=!0):(a.noResult=!1,a.showFilter=!0),a.dataList=t.data}})},showSort:function(){this.showUl=!this.showUl},postSortFun:function(t,s){this.currentPage=1,this.isEnd=!1,this.sortType=t,this.sortTxt=s,this.showUl=!1,this.searchVal?this.shopListFun(this.searchVal,t):this.shopListFun(this.searchVal_back,t)},hideSortFun:function(){this.showUl=!1},removeArr:function(t,s){var e=t.indexOf(s);e>-1&&t.splice(e,1)}},mounted:function(){var t,s,e=this,a=document.getElementById("container"),i=a.clientHeight;a.addEventListener("scroll",function(){t=a.scrollTop,s=a.scrollHeight,e.isFixed=t>=44,t+i==s&&(e.endListen||(e.currentPage++,e.searchVal?e.shopListFun(e.searchVal,e.sortType,1):e.shopListFun(e.searchVal_back,e.sortType,1)),console.log(e.currentPage))})},watch:{searchVal:function(){""==this.searchVal.trim()||0==this.searchVal.length?(this.isValue=!1,this.searchVal=""):this.isValue=!0}},computed:{filterItems:function(){return this.removeArr(this.postChildCook,"null"),this.postChildCook.slice(0,50)}},filters:{nomore:function(t){return t.length>6?t.slice(0,5)+"...":t}}}},Pexp:function(t,s,e){"use strict";var a=e("t/3t"),i=e("pDxG"),o=e("mPyB"),n=o(a.a,i.a,!1,null,null,null);s.a=n.exports},YPGO:function(t,s,e){"use strict";e("E7z3");s.a={data:function(){return{pageTitle:"热门搜索",hotSearch:["蛋糕","甜点","肉","虾"]}},components:{},props:["postChildCook"],created:function(){},methods:{postValue:function(t){this.$emit("childFun",t)},clearSCK:function(){this.$emit("childFunTwo")}}}},ZVGX:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABGdBTUEAALGPC/xhBQAAAzZJREFUWAnFmL9OG0EQxs9nBHLhxsgygtLYlijSWC7zAiRR2pR5BpSQPEICEW8QKWXaKAkvQOkuBZKxKUEgC0uIwjKS7cxvdXO6W27tOxOHkdb7b2a+b2f3bvac8zLI+fl5bTwev55MJs/FbEvKppR1KTdSLqVc+L5/ks/nf1Sr1a70U0luntZ0Os13Op23uVxuT9o78/R1XvRPRf+o0Wh8k/ZYx5PqmSTOzs5eiKODLOA2CGSk7Nfr9d/2nPYTSQioL6v/JErvVfEf1IcSlY9CaGL7ekCi3+8XB4PBdyGyays/ti8Ejkul0ptyuXwX9eVHO0RgWQTAYWGB/xhurCNb8HkZEbAWuhtsdTgcbgeHUB69X+HMkhvyKL/Uw2oiIavPSzlw4Y5GI+/uLraNLtVwHH3sXAIeuMyv8MN7QKrEdwCO2u02++lVKhVP2GMyUySq3vX1tScH0Wu1Wt7a2toDffG3E+B+NZEQ5b0HWsHA/f29IUAXx93u7Bch8+ghEMfeJYrr8yqGlUuxWCyaCOj81dWVkwgEmFchcti7BFzwfXKBS0nH2YKNjQ3tGiA7IjYB9NNsHfgrQTIKAVyNWq1mpnSlWm9vb3u9Xi8WAQiovsufjoPPwSQbphJ1rASob29vveFwGNpnIRAYbXEwScepBSLRrXkkAXA3IcF9IJOwBYVCIWZDn/EFZB0SXEgyCWcgGgGM6TO+gNxAghtRarGfgmhEOCP2U5PC8SUkLlIoGhWbAGej2WzGzsgCRLgS+idpSCQR4JDyarYPaxYi4PtcSueRIBfgWCXpMUwigt08Ad/nViyrOXUpkw01F6CTREBtbSLYzcq+4ILPmSDRHKkju15dXTUhZ5xcANAsYR49hK3C3iWKay410slL6P6QUJIMSOdkw1nJyLYjAhBISuPoEgXJLc+kHptI0JCybzvSPo6yEMAOfRcB5sEDl7YhQUNY8V1wSPs/yGGAZ6DCOyY92Q5ftuWn1LvLIiKrPxYCr6QOvz/CSADKBN8FKC6DBH4D/yEBg5sERkS4/svcu6T5Bce+yBfYh2gE1E9sO3RQa9map/sWVRLUEpWn/SqPkqG9rP8n/gLyYbuDCok/MAAAAABJRU5ErkJggg=="},lJF1:function(t,s,e){t.exports=e.p+"dist/img/error.e15f37f.png"},pDxG:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement;t._self._c;return t._e()},i=[],o={render:a,staticRenderFns:i};s.a=o},"t/3t":function(t,s,e){"use strict";s.a={created:function(){this.updateTitle()},beforeUpdate:function(){this.updateTitle()},methods:{updateTitle:function(){var t=this.$slots.default;if(!(void 0===t||t.length<1||"string"!=typeof t[0].text)){var s=t[0].text;s!==document.title&&(document.title=s)}}}}},vCr1:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("KwWb"),i=e("/84K"),o=e("mPyB"),n=o(a.a,i.a,!1,null,null,null);s.default=n.exports},"wC/b":function(t,s,e){"use strict";var a=e("B0CD"),i=e("1Mjn"),o=e("mPyB"),n=o(a.a,i.a,!1,null,null,null);s.a=n.exports}});
//# sourceMappingURL=18.118264f6fde2c6eefc93.js.map