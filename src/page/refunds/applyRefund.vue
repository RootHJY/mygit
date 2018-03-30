<template>
	<div id="container" class="bgf noPad">
        <v-title> {{ pageTitle }}</v-title>
        <form class="myWhiteBg refunds ">
            <div class="refunds">
                <div class="normal" v-if="type==1">
                    <div class="clearfix">
                        <div class="fleft">
                            <span class="requied"></span>货物状态 
                        </div>
                        <div class="fright" @click="goods = true" style="width:70%;text-align:right;">
                            <p class="gray"> {{goodsTip}} </p>
                            <span class="icon-arrow"></span>
                        </div>
                    </div>
                </div>
                <div class="normal">
                    <div class="clearfix">
                        <div class="fleft">
                            <span class="requied"></span>退款原因 
                        </div>
                        <div class="fright" @click="reasons = true"  style="width:70%;text-align:right;">
                             <p class="gray"> {{reasonsTip}} </p>
                            <span class="icon-arrow"></span>
                        </div>
                    </div>
                </div>
                <div class="normal">
                    <div class="clearfix">
                        <div class="fleft"><span class="requied"></span>退款金额</div>
                        <div class="fleft refLeft">
                            <div class="mustM">¥
                                <input type="number" v-on:blur="toastMoney()" name="money" v-model="money" placeholder="请填写" />
                            </div>
                            <p style="font-size: 12px; color: #A5A4A4;">最多￥{{ moneyMax }}（运费不退，优惠差价不退）</p>
                        </div>
                    </div>
                </div>
                <div class="normal">
                    <div class="clearfix">
                        <div class="fleft"><span class="requied"></span>手机号码 </div>
                        <div class="fleft refLeft">
                            <input type="number" name="phone" v-model="phone" placeholder="填写手机号便于客服联系您" style="width:180px;" />   
                        </div>
                    </div>
                </div>
                <div class="normal textarea">
                    <div class="clearfix">
                        <div class="fleft">备注信息</div>
                        <div class="fright">
                            <textarea name="memo" v-model="memo" maxlength="100" placeholder="最多可填写100个字"></textarea>
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
                                <input type="file" :name="'filemImg_' + idx + time" @click="click_up($event,idx)" @change="getFileTest($event,idx)" accept="image/jpeg,image/jpg,image/png" style="font-size: 0;border:0;width:0;" ref="uploadFile"/>
                                <em v-if="idx===loadingIdx">上传中...</em>
                            </label>
                            <span v-if="item!=''" @click="clearImgTest(idx)">x</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tip">
                <p>注意事项：</p>
                <p>1.如需办理退货，请将退款订单下所有数量的商品及赠品一并返回我们办理退货手续。 </p>
                <p>2.使用优惠券支付的订单，如发生退货，结算金额按照商品支付金额减去优惠券的金额退款，优惠券不予兑现。 </p>
                <p>3.订单申请退款，已经发出的优惠券无法进行退回。 </p>
                <p>4.实际退款金额和申请金额或有差额（如运费、商品破损等情况），最终退款金额以商家核对后，实际退款金额为准。 </p>
                <p style="font-size:10px;"> 最终解释权日日煮所有</p>
                <div class="sureBtn" :class="{active:reasonsActive && rightPhone && goodsActive && isMoney}" @click="saveRefund($event)"> 提交 </div>
            </div>
        </form>
        <div class="popBg" v-if="goods" @click="goods = !goods"></div>
        <div class="popSendMethod" v-if="goods">
            <div class="tip">
                <p>货物状态</p>
                <span class="icon-close" @click="goods = !goods"></span>
            </div>
            <ul>
                <li class="item justify" @click="changeGoods(1)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 未收到货 </b>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:goodsActive==1}"></span>
                    </div>
                </li>
                <li class="item justify" @click="changeGoods(2)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 已收到货 </b>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:goodsActive==2}"></span>
                    </div>
                </li>
            </ul>
            <div class="blank"></div>
            <div class="closeBtn sureBtn active">关闭</div>
        </div>
        <!-- type 1 退款  ； type 2 退货退款 -->
        <div class="popBg" v-if="reasons" @click="reasons = !reasons"></div>
        <div class="popSendMethod" v-if="reasons">
            <div class="tip">
                <p>退款原因</p>
                <span class="icon-close"  @click="reasons = !reasons"></span>
            </div>
            <ul>
                <li class="item justify" @click="changeReasons(1)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 多买/买错/不想要 </b>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:reasonsActive==1}"></span>
                    </div>
                </li>
            </ul>
            <ul v-if="type==1">
                <li class="item justify" @click="changeReasons(2)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 快递无跟踪记录 </b>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:reasonsActive==2}"></span>
                    </div>
                </li>
            </ul>
            <ul v-if="type==1">
                <li class="item justify" @click="changeReasons(3)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 少货/空包裹 </b>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:reasonsActive==3}"></span>
                    </div>
                </li>
            </ul>
            <ul v-if="type==1">
                <li class="item justify" @click="changeReasons(4)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 未按约定时间发货 </b>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:reasonsActive==4}"></span>
                    </div>
                </li>
            </ul>
            <ul v-if="type==1">
                <li class="item justify" @click="changeReasons(5)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 快递一直未到达 </b>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:reasonsActive==5}"></span>
                    </div>
                </li>
            </ul>
            <ul v-if="type==2">
                <li class="item justify" @click="changeReasons(7)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 质量有问题 </b>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:reasonsActive==7}"></span>
                    </div>
                </li>
            </ul>
            <ul v-if="type==2">
                <li class="item justify" @click="changeReasons(8)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 商品描述不符 </b>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:reasonsActive==8}"></span>
                    </div>
                </li>
            </ul>
            <ul v-if="type==2">
                <li class="item justify" @click="changeReasons(9)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 卖家发错货 </b>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:reasonsActive==9}"></span>
                    </div>
                </li>
            </ul>
            <ul v-if="type==2">
                <li class="item justify" @click="changeReasons(10)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 收到商品少件或破损 </b>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:reasonsActive==10}"></span>
                    </div>
                </li>
            </ul>
            <ul>
                <li class="item justify" @click="changeReasons(6)">
                    <div class="box left">
                        <b style="margin-left: 0;"> 其他 </b>
                    </div>
                    <div class="box right">
                        <span class="checkRefund" :class="{active:reasonsActive==6}"></span>
                    </div>
                </li>
            </ul>
            <div class="closeBtn sureBtn active">关闭</div>
        </div>
        <!-- 退款提示 -->
        <div class="popBg" v-if="isWatched" @click="isWatched = false"></div>
        <div class="popRefunds" v-if="isWatched">
            <div class="close">
                <span class="icon-close" @click="isWatched = false"></span>                
            </div>
            <div class="logo">
                <img src="../../../static/img/logo2.png" alt="">
            </div>
            <div class="tip">仅退款/退货退款注意事项</div>
            <div class="info">
                <ul>
                    <li><span>01</span>如需办理退货，请将退款订单下所有数量的商品及赠品一并返回我们办理退货手续。</li>
                    <li><span>02</span>使用优惠券支付的订单，如发生退货，结算金额按照商品支付金额减去优惠券的金额退款，优惠券不予兑现。</li>
                    <li><span>03</span>订单申请退款，已经发出的优惠券无法进行退回。</li>
                    <li><span>04</span>实际退款金额和申请金额或有差额（如运费、商品破损等情况），最终退款金额以商家核对后，实际退款金额为准。</li>
                </ul>
            </div>
            <div class="bottom">
                <div class="btn" @click="isWatched = false">知道了</div>
            </div>
            <div class="copyright">本细则最终解释权归小煮集市所有</div>
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
                pageTitle: '申请退款',
                itemId: '',
                type: '', //0-仅退款, 1-退货并退款(this.type-1)
                goods: false,
                reasons: false,
                reasonsActive: 0,
                reasonsTip:'请选择',
                goodsTip:'请选择',
                goodsActive: 0,   //0-未收到货, 1-已收到货(this.goodsActive-1)
                goodsList:['未收到货','已收到货'],
                reasonsList: ['多买/买错/不想要','快递无跟踪记录','少货/空包裹','未按约定时间发货','快递一直未到达','其他','质量有问题','商品描述不符','卖家发错货','收到商品少件或破损',],
                phone:'',
                rightPhone: false,
                isMoney:true,
                money:'',
                moneyMax:'',
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
                time:'',
                isWatched:false,
            }
        },
        components: { 
            common,
            popMin,
            VTitle,
        },
        created () {
            var obj = common.getUrlPars(window.location.href);
            this.itemId = obj.id;
            this.type = obj.type;
            this.moneyMax = obj.itemM;
            this.money = obj.itemM;
            if(this.type!=1){//type1时货物状态默认已收货
                this.goodsActive = 1;
            }
            this.getTime();
            this.getFlag();
        },
        methods: {
            click_up:function(){
                console.log("click")
            },  
            // 获取是否能看见退款提示
            getFlag:function(){
                var _this = this;
                var _getFlagUrl = '/wechatecom/appserver/refund/checkRefundOpen';
                _this.ajaxDataFun('post',_getFlagUrl,function(obj){
                    if(obj.code == '200'){
                        _this.isWatched = obj.data;
                    }
                })
            },
            getFileTest: function(event,idx) {
                console.log(event)
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
                        console.log(res)
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
                            _this.getTime();
                            console.log(event.target.files[0])
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
                this.getTime();
            },
            getTrueLength:function() {
                this.listlength = 0;
                for(var i=0;i<4;i++){
                    if(this.imageLists[i]!=''){
                       this.listlength++;
                    }
                }
            },
            getTime:function(){
                this.time = +new Date;
            },
            changeReasons: function(i) {
                this.reasons = !this.reasons;
                this.reasonsActive = i;
                this.reasonsTip = this.reasonsList[i-1];
            },
            changeGoods: function(i) {
                this.goods = !this.goods;
                this.goodsActive = i;
                this.goodsTip = this.goodsList[i-1];
            },
            toastMoney: function() {
                if(!this.money){
                    popMin.show("icon-sign","请填写退款金额")
                    this.requireNum++;
                }else if(!this.isMoney){
                    popMin.show("icon-sign","退款金额超出，请修改")
                }
            },
            toastPhone: function() {
                if(!this.phone){
                    popMin.show("icon-sign","请填写手机电话")
                    this.requireNum++;
                }else if(!this.isPhone){
                    popMin.show("icon-sign","请填写正确的手机电话")
                }
            },
            saveRefund:function(event){
                var _this = this
                var file = this.imageLists[0] + ',' + this.imageLists[1] + ',' + this.imageLists[2] + ',' + this.imageLists[3];
                var _refundUrl = '/wechatecom/appserver/refund/createRefund?itemId='+ this.itemId + '&refundsType=' + (this.type-1) + '&wareStatus=' + (this.goodsActive-1) + '&refundsDesc=' + this.reasonsList[this.reasonsActive-1] + '&applyAmount=' + this.money + '&phone=' + this.phone + '&memo=' + this.memo + '&imageUrls=' + file;
                if(!this.goodsActive){
                    popMin.show("icon-sign","请选择货物状态")
                }else if(!this.reasonsActive){
                    popMin.show("icon-sign","请选择退款原因")
                }else if(!this.isMoney){
                    this.toastMoney();
                }else if(!this.rightPhone){
                    this.toastPhone();
                }else{
                    this.ajaxDataFun('post', _refundUrl, function(obj){
                        if(obj.code == '200'){
                            popMin.show("icon-success","提交成功");
                            _this.$router.push('/refunds/refundDetails?id='+obj.data.id);
                        }else{
                            // 已经提交过要做提示
                            popMin.show("icon-sign",obj.code+obj.msg);
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
            money:function(){
                let moneyTest = (/^[0-9]+(.[0-9]{0,2})?$/.test(this.money));
                if(moneyTest){
                    if(this.money<=this.moneyMax){
                        this.isMoney = true;
                    }else{
                        this.isMoney = false;
                    }
                }else{
                    this.isMoney = false
                }
                console.log(this.isMoney)
            }
        },
    }
</script>
<style lang="scss" scoped>
    .textarea .fright{padding-left: 0; }
    .mustM input{color:red;}
    .line{width:22.085%}
    .refundImg{float:left;margin-right:2%;}
</style>
