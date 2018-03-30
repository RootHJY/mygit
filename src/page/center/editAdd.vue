<template>
    <div id="container" class="bgf noScroll">
        <v-title> {{ pageTitle }}</v-title>
        <div class="myWhiteBg  changeAdd">
            <div class="normal setAdd">
                <ul>
                    <li>
                        <input type="text" name="consignee" v-model="consignee" placeholder="请填写联系人(不超过15字)" maxlength="15" /> 
                    </li>
                    <li>
                        <input type="text" name="phone" v-model="phone" placeholder="请填写手机号码" /> 
                    </li>
                    <li>
                        <input type="text" name="areaName"  @click="showPop = true" readonly="" /> 
                        <label  @click="showPop = true">{{ areaName }}</label>
                        <span class="icon-position" @click="getLocation" v-show="!isIOS"></span>
                    </li>
                    <li class="hide">{{ areaCode }}</li>
                    <li>
                        <textarea placeholder="请填写小区、街道、门牌等详细信息" v-model="address" maxlength="60"></textarea>
                        <span class="num"><span style="color:#ff5d31">{{ address.length }} </span>/60</span>
                    </li>
                </ul>
            </div>
            <div class="normal set">
                <label>
                    <input type="checkbox" name="set" v-model="isDefault" />
                    <p>设为默认地址</p>
                </label>
            </div>
        </div>
        <div class="sureBtn saveAddBtn" :class="{active:isConsignee && rightPhone && isAreaName && isAddress}"  @click="saveAddF()">完成</div>
        <div class="popBg" @click="showPop = false" v-show="showPop"></div>
        <div class="chooseAdd" v-show="showPop">
            <ul class="justify topBtn" @click="showPop = false">
                <li class="box">取消</li>
                <li class="box">完成</li>
            </ul>
            <mt-picker ref='addressPicker' :slots="slots" @change="onValuesChange"></mt-picker>
        </div>
    </div>   
</template>

<script>
    import popMin from '@/components/popMin.js'
    import VTitle from '@/components/title'
    import common from '@/components/common.js'
    import myAddress from '@/components/address.json'
    import { Picker } from 'mint-ui'

    export default {
        data () {
            return {
                pageTitle: '地址管理',
                addId: '',
                consignee: '',
                phone: '',
                areaName: '',
                areaCode: '',
                address: '',
                isDefault: false,
                isConsignee: false,
                rightPhone: false,
                isAreaName: false,
                isAddress: false,
                fromOrder: false,
                showPop: false,
                slots: [{
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    defaultIndex: 0,
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: [],
                    className: 'slot3',
                    defaultIndex: 0,
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot4',
                }, {
                    flex: 1,
                    values: [],
                    className: 'slot5',
                    defaultIndex: 0,
                }],
                provinceArr: [],
                cityArr: [],
                townArr: [],
                postionX: '',
                postionY: '',
                isWechat: false,
                isIOS: false,
            }
        },
        components: { 
            VTitle
        },
        created () {
          
            var locaUrl = window.location.href

            this.isWeChatF()

            if(locaUrl.indexOf('id') > -1){
                this.addId = common.getUrlPars(locaUrl).id
                this.getAddData()
            }

            if(locaUrl.indexOf('fromOrder=') > -1){
                this.fromOrder = true
            }

            console.log(this.fromOrder)
        },
        methods: { 
            isWeChatF: function (){ 
                var _this = this
                var u = navigator.userAgent;
                var ua = window.navigator.userAgent.toLowerCase(); 
                let isIOS = !! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                    this.isIOS = isIOS

                    console.log("this.isIOS==" + this.isIOS)
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
                    _this.isWechat = true
                }else{ 
                    _this.isWechat = false
                } 
            },
            getLocation:function(){
                var _this = this
                if (navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(_this.showPosition);
                }else{
                    alert('此浏览器不支持定位功能')
                }
            },
            showPosition:function(position){
                this.postionX = position.coords.latitude
                this.postionY = position.coords.longitude

                var _this = this
                var _xyUrl = "/api/member/receiver/dw.do?lon=" + this.postionY  + "&lat=" + this.postionX

                this.ajaxDataFun('post', _xyUrl, function(obj){
                    if(obj.code == '200'){
                        _this.areaCode = obj.data.areaCode
                        _this.areaName = obj.data.province + '/' + obj.data.city + '/' + obj.data.area
                    }
                })
            },
            onValuesChange:function(picker, values) {
                if(!values[0]){
                    this.provinceArr = []
                    for(let item of myAddress){
                        this.provinceArr.push(item.name)
                    }
                    this.slots[0].values = this.provinceArr
                    picker.setSlotValues(0,this.provinceArr);
                    this.$nextTick(()=>{
                        picker.setValues([this.provinceArr[0],this.cityArr[0],this.townArr[0]])
                    })
                }else{
                    var l  = this.provinceArr.length
                    this.cityArr = []
                    this.townArr = []
                    for(let i = 0; i < l; i++ ){
                        if(values[0] == this.provinceArr[i]){
                            for(let item of myAddress[i].childs){
                                this.cityArr.push(item.name)
                                let n = this.cityArr.length
                                for(let j = 0; j < n; j++ ){
                                    if(values[1] == this.cityArr[j]){
                                        for(let list of myAddress[i].childs[j].childs){
                                            this.townArr.push(list.name)
                                            if(values[2] == list.name){
                                                this.areaCode = list.code
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    picker.setSlotValues(1,this.cityArr)
                    picker.setSlotValues(2,this.townArr)
                    this.areaName = values.join('/');
                    this.isAreaName = true
                }
            },
            saveAddF:function(){
                var addUrl = ''
                var _this = this
                if(this.addId){
                    addUrl = "/api/member/receiver/update.do?phone=" + this.phone + "&consignee=" + this.consignee + "&areaName=" + this.areaName + "&address=" + this.address + "&area=" + this.areaCode + "&isDefault=" + this.isDefault + "&id=" + this.addId
                }else{
                    addUrl = "/api/member/receiver/add.do?phone=" + this.phone + "&consignee=" + this.consignee + "&areaName=" + this.areaName + "&address=" + this.address + "&area=" + this.areaCode + "&isDefault=" + this.isDefault
                }

                if(!this.consignee.trim().length){
                    popMin.show("icon-sign","请填写联系人")
                }else if(!this.rightPhone){
                    popMin.show("icon-sign","请填写正确的手机号码")
                }else if(!this.areaName.trim().length || !this.address.trim().length){
                    popMin.show("icon-sign","请填写完整地址")
                }else{
                    this.ajaxDataFun('post', addUrl, function(obj){
                        if(obj.code == '200'){
                            var del = _this.areaName + _this.address
                            if(_this.addId){
                                if(_this.fromOrder){
                                    _this.returnOrder(_this.addId, _this.consignee, _this.phone, del)
                                }else{
                                    _this.$router.push('/center/myaddress');
                                    popMin.show("icon-success","修改成功")
                                }
                            }else{
                                if(_this.fromOrder){
                                    _this.returnOrder(obj.data.id, _this.consignee, _this.phone, del)
                                }else{
                                    _this.$router.push('/center/myaddress');
                                    popMin.show("icon-success","保存成功")
                                }
                            }
                        }else if(obj.code == '661'){
                            popMin.show("icon-sign","不能把默认地址改为非默认地址")
                        }
                    })
                }
            },
            returnOrder:function(id,name,tel,des){  //返回订单选择地址
                this.$store.state.orderAddId  = id
                this.$store.state.orderAddName = name
                this.$store.state.orderAddTel = tel
                this.$store.state.orderAddDes = des
                this.$router.push('/payment')
            },
            getAddData:function(){
                var _this = this
                var getAddUrl = "/api/member/receiver/detail.do?id=" + this.addId
                this.ajaxDataFun('post', getAddUrl, function(obj){
                    if(obj.code == '200'){
                        var _data = obj.data
                        _this.consignee = _data.consignee
                        _this.phone = _data.phone
                        _this.areaName = _data.areaName
                        _this.areaCode = _data.area
                        _this.address = _data.address
                        _this.isDefault = _data.isDefault
                        _this.$refs.addressPicker.setValues(_data.areaName.split('/'));
                    }
                })
            }
        },
        watch:{
            consignee:function(){
                if(this.consignee.trim().length > 0){
                    this.isConsignee = true
                }else{
                    this.isConsignee = false
                }
            },
            phone:function(){
                let phonTest = (/^1[34578]\d{9}$/.test(this.phone));
                if(phonTest){
                    this.rightPhone = true
                }else{
                    this.rightPhone = false
                }
            },
            address:function(){
                if(this.address.trim().length > 0){
                    this.isAddress = true
                }else{
                    this.isAddress = false
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .chooseAdd{ position:fixed; z-index:1001; left:0; bottom:0; background-color:#fff; width:100%; padding-top:0; padding-bottom:20px;
        .topBtn { padding:14px;
            li{ font-size:14px; color:#707274;}
        }
    }
    .picker-slot{ font-size:16px!important;}
</style>

