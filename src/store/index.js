import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
    count: 1,
    loadingTxt: '加载中...',
    hotSearch: ['蛋糕','甜点','肉','虾'],
    hotTxt: '',
    isWeChatLogin: false,
    isShowLogin: false,
    isLogin: false,
    loginToPage: '', 
    catagoryIndex: 0,
    catagoryId: '',
    cartNum: 0,
    promotionId: '',  //商品活动ID
    promotionType: '',  //商品活动类型
    ptId: '',             //参团Id
    orderItems: '',       //订单商品productWareId:quantity:cartItemId
    orderAddId: '',       //订单配送地址id
    orderAddName: '',
    orderAddTel: '',
    orderAddDes: '',
    orderCouponId: '',          
    orderCouponMoney: 0,
    orderMemo: '',          //订单留言
    orderTabActive: '',     //订单列表当前项
    wxOpenId: '',
    wxUid: '',
}

const mutations = {
    // increment(state){
    //     state.count += 1;
    // },
    // decrement(state){
    //     state.count -= 1;
    // },
    // iCartNum(state){
    //     state.cartNum++
    // },
    // dCartNum(state){
    //     state.cartNum--
    //     if(state.cartNum < 0){
    //         state.cartNum = 0
    //     }
    // }
}

export default new Vuex.Store({
    state,
    mutations
});