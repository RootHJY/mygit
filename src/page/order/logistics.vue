<template>
	<div id="container" class="bgf">
        <v-title> {{ pageTitle }}</v-title>
        <div class="logistics" v-for="(i,pIdx) in logistics">
            <div class="top">
                <p v-if="isSend[pIdx]!=''">包裹{{ pIdx+1 }}：共{{ i.shippingItems.length }}件</p>
                <p v-if="isSend[pIdx]==''">待发包裹：共{{ i.shippingItems.length }}件</p>
            </div>
            <div class="info">
                <div class="imgList">
                    <div class="item" v-for="img in i.shippingItems"><img :src="img.image" alt="" /></div>
                </div>
                <p v-if="i.deliveryCorp.name">承运来源：{{ i.deliveryCorp.name }}</p>
                <p v-if="i.jsonObject.LogisticCode">快递单号：{{ i.jsonObject.LogisticCode }}</p>
                <p v-if="i.deliveryCorp.name">官方电话：1234</p>
            </div>
            <div class="history">
                <ul>
                    <li :class="{active:idx==0}" v-for="(item,idx) in Traces[pIdx]" v-if="isSend[pIdx]!=''&&isSend[pIdx]!='0'">
                        <p>{{ item.AcceptStation }}</p>
                        <span>{{ item.AcceptTime }}</span>
                    </li>
                    <li v-if="isSend[pIdx]!=''" class="active">
                        <p v-if="isSend[pIdx]==='0'">暂无轨迹信息</p>
                    </li>
                </ul>
                <div class="toggle" v-if="isSend[pIdx]!=''&&isSend[pIdx]!='0'">
                    <span class="icon-arrow" @click="toggle(pIdx)"></span>
                    <!--  :class="iTraces[pIdx].length>1? 'up' : 'down'"  -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import VTitle from '@/components/title'
    import common from '@/components/common'
    export default {
        data () {
            return {
                pageTitle: '物流追踪',
                batchNo: '',//订单批次号
                logistics: '',
                isToggle: '',
                pIndex: '',
                Traces: [],
                TracesBack: [],
                isSend: [],
                iTraces: ''
            }
        },
        components: { 
            common,
            VTitle,
        },
        created () {
            var obj = common.getUrlPars(window.location.href);
            this.batchNo = obj.id;
        	this.getLogistics();
        },
        methods: { 
            getLogistics:function(v) {
            	var _this = this;
            	var _logisticsUrl = '/wechatecom/appserver/shipping/queryLogisticsInfo?batchNo='+ this.batchNo;
            	_this.ajaxDataFun('post',_logisticsUrl,function(obj){
                    if(obj.code == '200'){
                    	var _obj = obj.data;
                        for(var i = 0;i<_obj.length;i++){
                            if(_obj[i].jsonObject!==''){
                                if(_obj[i].jsonObject.State!='0'){
                                	_obj[i].jsonObject.Traces = _obj[i].jsonObject.Traces.reverse();
                                	_this.TracesBack[i] = _obj[i].jsonObject.Traces;
                                	if(i>0){
        				        		_obj[i].jsonObject.Traces = [];
        				            	_obj[i].jsonObject.Traces.push(_this.TracesBack[i][0]);
        			            	}
        			            	_this.Traces[i] = _obj[i].jsonObject.Traces;
                                }
                                _this.isSend[i] = _obj[i].jsonObject.State;
                            }else{
                                _this.Traces[i] = [];
                            }
			        	}
			        	_this.logistics = _obj;
                    }
                })
            },
            toggle: function(p) {
            	var _this = this;
        		if(_this.Traces[p].length == 1){
            		_this.Traces[p] = _this.TracesBack[p];
            		_this.$set(_this.Traces, p, _this.TracesBack[p]);
            	}else{
            		_this.Traces[p] = [];
            		_this.$set(_this.Traces, p, []);
            		_this.Traces[p][0] = _this.TracesBack[p][0];
            		_this.$set(_this.Traces[p], 0, _this.TracesBack[p][0]);
            	}
            }
        },
        mounted (){
        }
    }
</script>