<template>
	<div id="container" class="bgf noPad">
        <v-title> {{ pageTitle }}</v-title>
        <form class="myWhiteBg refunds ">
            <div class="refunds">
                <div class="normal">
                    <div class="clearfix">
                    <div class="fleft"><span class="requied"></span>物流公司 </div>
                        <div class="fright" @click="isLogistic = true">
                            <p class="gray"> {{logisticTip}} </p>
                            <span class="icon-arrow"></span>
                        </div>
                    </div>
                </div>
                <div class="normal">
                    <div class="clearfix">
                        <div class="fleft"><span class="requied"></span>物流单号 </div>
                        <div class="fleft refLeft">
                            <input type="number" name="logisNum" v-model="logisNum" placeholder="填写物流单号" />
                        </div>
                    </div>
                </div>
                <div class="normal">
                    <div class="clearfix">
                        <div class="fleft"><span class="requied"></span>手机号码 </div>
                        <div class="fleft refLeft">
                            <input type="number" name="phone" v-model="phone" placeholder="填写手机号" />   
                        </div>
                    </div>
                </div>
                <div class="normal textarea">
                    <div class="clearfix">
                        <div class="fleft">备注信息</div>
                        <div class="fright">
                            <textarea name="memo" v-model="memo" maxlength="200" placeholder="最多可填写200个字"></textarea>
                        </div>
                    </div>
                </div>
                <div class="normal">
                    <div class="clearfix">
                        <div class="fleft">图片举证</div>
                        <div class="fleft refLeft"><p>最多可上传4张图片</p></div>
                    </div>
                    <div class="addImg clearfix">
                        <div class="box refundImg" v-if="idx==0||item!=''||activeIdx==idx" :style="showImgCss[idx]" v-for="(item, idx) in imageLists">
                            <label :class="{active:item==''}">
                                <input type="file" name="filemImg" @change="getFileTest($event,idx)" accept="image/jpeg,image/jpg,image/png" style="font-size: 0;border:0;width:0;"/>
                                <em v-if="idx===loadingIdx">上传中...</em>
                            </label>
                            <span v-if="item!=''" @click="clearImgTest(idx)">x</span>
                        </div>
                    </div>
                </div>
                <div class="tip">
                    <div class="sureBtn" :class="{active:logisticCom!='' && rightPhone && isLogisNum}" @click="saveRefund($event)"> 提交 </div>
                </div>
            </div>
        </form>
        <div class="popBg" v-if="isLogistic"></div>
        <div class="popSendMethod" v-if="isLogistic">
            <div class="tip">
                <p>物流公司</p>
                <span class="icon-close" @click="isLogistic = false"></span>
            </div>
            <div class="corp">
                <label v-for="(item,idx) in corpList" @click="changeCorp(item.name)">
                    <ul>
                        <li class="item justify">
                            <div class="box left">
                                <b style="margin-left: 0;"> {{ item.name }}</b>
                            </div>
                            <div class="box right">
                                <input type="radio" name="logisticCom" :value="item.id" v-model="logisticCom"/>
                            </div>
                        </li>
                    </ul>
                </label>
            </div>
            <div class="bg">
                <div class="closeBtn sureBtn active" @click="isLogistic = false">关闭 </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
    import popMin from '@/components/popMin.js'
    import common from '@/components/common'
    import _axios from 'axios'
    import VTitle from '@/components/title'
    export default {
        data () {
            return {
                pageTitle: '填写物流',
                itemId: '',
                corpList: '',
                logisticTip:'请选择',
                logisticCom:'',
                isLogistic: false,
                reasonsList: ['多买/买错/不想要','快递无记录','少货/空包裹','未按约定时间发货','快递一直未到达','其他'],
                phone:'',
                rightPhone: false,
                logisNum:'',//物流单号
                isLogisNum:false,
                memo: '',
                file: '',
                // 数组图片测试
                imageLists:['','','',''],
                activeIdx:'',
                listlength:0,
                showImgCss:[{
                    'backgroundImage':''
                },{
                    'backgroundImage':''
                },{
                    'backgroundImage':''
                },{
                    'backgroundImage':''
                }],
                loadingIdx:'',
            }
        },
        components: { 
            common,
            popMin,
            VTitle,
        },
        created () {
            var urlList = common.getUrlPars(window.location.href);
            this.itemId = urlList.id;
            var _this = this;
            var _corpList = '/api/deliveryCorp/deliveryCorpList';
            this.ajaxDataFun('post', _corpList, function(obj){
                if(obj.code == '200'){
                    _this.corpList = obj.data;
                }
            })
        },
        methods: {
            getFileTest: function(event,idx) {
                var _this = this;
                this.file = event.target.files[0];
                if(this.file){
                    this.loadingIdx = idx;
                    let formData = new FormData();
                    formData.append('file', this.file);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    _axios.post('/wechatecom/upload/uploadImage', formData, config).then(function (res) {
                        var _res = res.data;
                        if (_res.code == 200) {
                            _this.imageLists[idx] = _res.data;
                            _this.getTrueLength();
                            _this.showImgCss[idx].backgroundImage = 'url('+_this.imageLists[idx]+')';
                            _this.loadingIdx = '';
                            if(idx<3){
                                _this.activeIdx = _this.listlength;
                            }else{
                                _this.activeIdx = 3;
                            }
                        }
                    })
                }
            },
            clearImgTest:function(idx){
                this.showImgCss.splice(idx,1);
                this.showImgCss.push({'backgroundImage':''});

                this.imageLists.splice(idx,1);
                this.imageLists.push('');
                this.getTrueLength();
                if(idx<3){
                    this.activeIdx = this.listlength;
                }else{
                    this.activeIdx = 3;
                }
            },
            getTrueLength:function() {
                this.listlength = 0;
                for(var i=0;i<4;i++){
                    if(this.imageLists[i]!=''){
                       this.listlength++;
                    }
                }
            },
            changeCorp: function(name) {
                this.isLogistic = false;
                this.logisticTip = name;
            },
            toastPhone: function() {
                if(!this.phone){
                    popMin.show("icon-sign","请填写手机电话")
                    this.requireNum++;
                }else if(!this.isPhone){
                    popMin.show("icon-sign","请填写正确的手机电话")
                }else{
                }
            },
            saveRefund:function(event){
                var _this = this
                var file = this.imageLists[0] + ',' + this.imageLists[1] + ',' + this.imageLists[2] + ',' + this.imageLists[3];
                var _refundUrl = '/api/refund/updateRefund?id='+ this.itemId + '&deliveryCorpId=' + this.logisticCom + '&trackingNo=' + this.logisNum + '&phone=' + this.phone + '&memo=' + this.memo + '&imageUrl=' + file;
                if(!this.logisticCom){
                    popMin.show("icon-sign","请选择物流公司")
                }else if(!this.logisNum){
                    popMin.show("icon-sign","请填写物流单号")
                }else if(!this.rightPhone){
                    this.toastPhone();
                }else{
                    this.ajaxDataFun('post', _refundUrl, function(obj){
                        if(obj.code == '200'){
                            popMin.show("icon-success","提交成功");
                            _this.$router.push('/refunds/refundDetails?id='+obj.data.id);
                        }
                    })
                }
            },
        },
        mounted (){
            
        },
        watch:{
            phone:function(){
                let phonTest = (/^1[34578]\d{9}$/.test(this.phone));
                if(phonTest){
                    this.rightPhone = true;
                }else{
                    this.rightPhone = false
                }
                console.log(this.rightPhone)
            },
            logisNum:function(){
                if(this.logisNum!==''){
                    this.isLogisNum = true;
                }else{
                    this.isLogisNum = false;
                }
                console.log(this.isLogisNum)
            },
            logisticCom:function(){
                console.log(this.logisticCom)
            }
        },
    }
</script>
<style lang="scss" scoped>
    .textarea .fright{padding-left: 0; }
    .mustM input{color:red;}
    .line{width:22.085%}
    .popSendMethod{ height: 70%;}
    .corp{ overflow-y: scroll;height:100%; padding-bottom: 100px;}
    .bg{position: fixed;bottom:0;left:0;right:0;background-color:#fff;}
    .refundImg{float:left;margin-right:2%;}
</style>
