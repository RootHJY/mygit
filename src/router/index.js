import Vue from 'vue'
import Router from 'vue-router'

const vuextest = r => require.ensure([], () => r(require('../page/shop/vuextest')), 'vuextest')

//首页
const index = r => require.ensure([], () => r(require('../page/home/index')), 'index')
// const jiami = r => require.ensure([], () => r(require('../page/home/test')), 'jiami')

//搜索
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const list = r => require.ensure([], () => r(require('../page/search/list')), 'list')

//商品分类
const category = r => require.ensure([], () => r(require('../page/category/category')), 'category')
const categoryList = r => require.ensure([], () => r(require('../page/category/list')), 'categoryList')

const shopDetails = r => require.ensure([], () => r(require('../page/shop/shopDetails')), 'shopDetails')
//组团
const groupDetails = r => require.ensure([], () => r(require('../page/group/group')), 'groupDetails')
const groupRules = r => require.ensure([], () => r(require('../page/group/rules')), 'groupRules')
const packageDetails = r => require.ensure([], () => r(require('../page/package/packageDetails')), 'packageDetails')

//营销活动
const active = r => require.ensure([], () => r(require('../page/active/active')), 'active')

//个人中心
const center = r => require.ensure([], () => r(require('../page/center/center')), 'center')
const centerContent = r => require.ensure([], () => r(require('../page/center/centerContent')), 'centerContent')


const myaddress = r => require.ensure([], () => r(require('../page/center/address')), 'myaddress')
const editAdd = r => require.ensure([], () => r(require('../page/center/editAdd')), 'editAdd')


const mycoupon = r => require.ensure([], () => r(require('../page/center/coupon')), 'mycoupon')
const couponRules = r => require.ensure([], () => r(require('../page/center/couponRules')), 'couponRules')


const changeTel = r => require.ensure([], () => r(require('../page/center/changeTel')), 'changeTel')
// 订单列表
const orderList = r => require.ensure([], () => r(require('../page/order/orderList')), 'orderList')
const orderDetails = r => require.ensure([], () => r(require('../page/order/orderDetails')), 'orderDetails')
const logistics = r => require.ensure([], () => r(require('../page/order/logistics')), 'logistics')

//购物车
const mycart = r => require.ensure([], () => r(require('../page/mycart/mycart')), 'mycart')

//填写订单
const payment = r => require.ensure([], () => r(require('../page/payment/payment')), 'payment')
const chooseCoupon = r => require.ensure([], () => r(require('../page/payment/chooseCoupon')), 'chooseCoupon')
const paySuccess = r => require.ensure([], () => r(require('../page/payment/paySuccess')), 'paySuccess')
const orderShare = r => require.ensure([], () => r(require('../page/payment/share')), 'orderShare')

//客服
const server = r => require.ensure([], () => r(require('../page/server/server')), 'server')
const serverDetails = r => require.ensure([], () => r(require('../page/server/details')), 'serverDetails')

// 退货
const refundsWrap = r => require.ensure([], () => r(require('../page/refunds/refundWrap')), 'refundsWrap')
const afterSale = r => require.ensure([], () => r(require('../page/order/afterSale')), 'afterSale')
const applyRefund = r => require.ensure([], () => r(require('../page/refunds/applyRefund')), 'applyRefund')
const refundDetails = r => require.ensure([], () => r(require('../page/refunds/refundDetails')), 'refundDetails')
const addLogistics = r => require.ensure([], () => r(require('../page/refunds/addLogistics')), 'addLogistics')

//领取会员
const member = r => require.ensure([], () => r(require('../page/center/member')), 'member')

Vue.use(Router)

export default new Router({
	mode: 'hash',
	// base: '/daydaycook/page/shop/',
	routes: [
		{
			path: '/',
			name: 'index',
			component: index
		},
		// {
		// 	path: '/jiami',
		// 	name: 'jiami',
		// 	component: jiami
		// },
		{
			path: '/index',
			name: 'index',
			component: index
		},
		{
			path: '/search',
			name: 'search',
			component: search
		},
		{
			path: '/list',
			name: 'list',
			component: list
		},
		{
			path: '/category',
			name: 'category',
			component: category
		},
		{
			path: '/categoryList',
			name: 'categoryList',
			component: categoryList
		},
		{
			path: '/shopDetails',
			name: 'shopDetails',
			component: shopDetails
		},
		{
			path: '/groupDetails',
			name: 'groupDetails',
			component: groupDetails
		},
		{
			path: '/groupRules',
			name: 'groupRules',
			component: groupRules
		},
		{
			path: '/packageDetails',
			name: 'packageDetails',
			component: packageDetails
		},
		{
			path: '/active',
			name: 'active',
			component: active
		},
		{
			path: '/member',
			name: 'member',
			component: member
		},
		{
			path: '/center',
			component: center,
			children: [
				{
	                path: '', 
	                component: centerContent,
	            },
				{
	                path: 'myaddress', 
	                meta: {
                       requireAuth: true, 
                    },
	                component: myaddress,
	            },
	            {
	                path: 'editAdd', 
	                meta: {
                       requireAuth: true, 
                    },
	                component: editAdd,
	            },
	            {
	                path: 'mycoupon', 
	                meta: {
                       requireAuth: true, 
                    },
	                component: mycoupon,
	            },
	            {
	                path: 'couponRules', 
	                meta: {
                       requireAuth: true, 
                    },
	                component: couponRules,
	            },
	            {
	                path: 'changeTel',
	           	 	meta: {
                       requireAuth: true, 
                    },
	                component: changeTel,
	            },
	            {
	                path: 'orderList',
	                meta: {
                       requireAuth: true, 
                    },
	                component: orderList,
	            },
	            {
	                path: 'afterSale',
	                meta: {
                       requireAuth: true, 
                    },
	                component: afterSale,
	            },
	            {
	                path: 'orderDetails',
	                meta: {
                       requireAuth: true, 
                    }, 
	                component: orderDetails,
	            },
	            {
	                path: 'logistics', 
	                meta: {
                       requireAuth: true, 
                    },
	                component: logistics,
	            }
            ]
		},
		{
			path: '/mycart',
			name: 'mycart',
			component: mycart
		},
		{
			path: '/payment',
			name: 'payment',
			meta: {
               requireAuth: true, 
            },
			component: payment
		},
		{
			path: '/chooseCoupon',
			name: 'chooseCoupon',
			meta: {
               requireAuth: true, 
            },
			component: chooseCoupon
		},
		{
			path: '/paySuccess',
			name: 'paySuccess',
			meta: {
               requireAuth: true, 
            },
			component: paySuccess
		},
		{
			path: '/orderShare',
			name: 'orderShare',
			component: orderShare
		},
		{
			path: '/server',
			name: 'server',
			meta: {
               requireAuth: true, 
            },
			component: server,
		},
		{
			path: '/serverDetails',
			name: 'serverDetails',
			meta: {
               requireAuth: true, 
            },
			component: serverDetails,
		},
		{//售后页面
			path: '/refunds',
			component: refundsWrap,
			children: [
				{
	                path: '', 
	                component: refundsWrap,
	            },
	            {
	                path: 'applyRefund', 
	                meta: {
                       requireAuth: true, 
                    },
	                component: applyRefund,
	            },
	            {
	            	path: 'afterSale', 
	                meta: {
                       requireAuth: true, 
                    },
	                component: afterSale,
	            },
	            {
	            	path: 'refundDetails', 
	                meta: {
                       requireAuth: true, 
                    },
	                component: refundDetails,
	            },
	            {
	            	path: 'addLogistic', 
	                meta: {
                       requireAuth: true, 
                    },
	                component: addLogistics,
	            },
	        ]
	    }
	]
})
