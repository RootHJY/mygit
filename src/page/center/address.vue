<template>
    <div id="container" class="bgf noScroll">
        <v-title> {{ pageTitle }}</v-title>
        <div id="loading" v-show="!showAllDiv">
            <img src="../../../static/img/logo2.png" alt="loading">
        </div>
        <div id="myAddress" class="myWhiteBg  myAddress paddingBt30">
            <div class="addAdd" @click="toAddList">
                <span class="icon-cart_increase"></span>添加地址
            </div>
            <div class="addList" v-for="(item,index) in addData">
                <div class="justify top">
                    <div class="box name">
                        <p><span v-if="item.isDefault">默认</span>{{ item.consignee }}</p>
                    </div>
                    <div class="box tel">{{ item.phone }}</div>
                </div>
                <div class="info">{{ item.areaName | filAdd}}{{ item.address }} </div>
                <div class="justify bottom">
                    <div class="box left"> 
                        <label v-show="showChose">
                            <input type="radio" name="chooseThis" :value="item.id" v-model="chooseThis" @click="radioChangeF(item.id,item.consignee,item.phone,item.areaName,item.address)" />
                            <p  v-show="item.id == chooseThis">当前选择</p>
                            <p  v-show="item.id != chooseThis">选择这个地址</p>
                        </label>
                    </div>
                    <div class="box right">
                        <span class="icon-edit" @click="toEdit(item.id)"></span>
                        <span class="icon-delete" @click="showDelPopF(item.id,index)"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="popNotCart" v-if="addData.length == 0">
            <div class="content">
                <img src="../../../static/img/noadd.png" alt="" />
                <p>主银！您的地址在哪里？</p>
                <span @click="toEdit()"> 去添加 </span>
            </div>
        </div>

        <div class="popBg" v-show="showdelPop"></div>
        <div class="popOr" v-show="showdelPop">
            <div class="tip">确认要删除这个收货地址吗？</div>
            <div class="clearfix">
                <div class="fleft btn" @click="showdelPop = false">取消</div>
                <div class="fright btn" @click="deleteAddF()">确认</div>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/components/token.js'
    import VTitle from '@/components/title'
    import popMin from '@/components/popMin.js'

    export default {
        data () {
            return {
                pageTitle: '地址管理',
                addData: '',
                showdelPop: false,
                deleteId: '',
                deleteIndex: '',
                currentPage: 1,
                pageSize: 10,
                endListen: false,
                showChose: false,
                chooseThis: '',
                showAllDiv: false,
            }
        },
        components: { 
            VTitle,
        },
        created () {
            var locaStr = window.location.href
            if(locaStr.indexOf('fromOrder=') > -1){
                this.showChose = true
            }
            this.getAddListF()
        },
        methods: { 
            toEdit:function(id){
                if(this.showChose){
                    if(id){
                        this.$router.push('/center/editAdd?fromOrder=1&id=' + id)
                    }else{
                        this.$router.push('/center/editAdd?fromOrder=1')
                    }
                }else{
                    if(id){
                        this.$router.push('/center/editAdd?id=' + id)
                    }else{
                        this.$router.push('/center/editAdd')
                    }
                }
            },
            getAddListF:function(v){
                var _this = this
                var ListUrl = "/wechatecom/appserver/member/receiver/list.do?currentPage=" + this.currentPage +" &pageSize=" + this.pageSize
                    _this.endListen = false
                this.ajaxDataFun('post',ListUrl,function(obj){
                    if(obj.code == '200'){
                        _this.showAllDiv = true
                        if(v){
                            var objLen = obj.data.length;
                            if(objLen){
                                for(var j=0; j < objLen; j++){
                                    _this.addData.push(obj.data[j]);
                                }
                                _this.$set(_this.$data, 'addData', _this.addData);
                            }else{
                                _this.endListen = true
                                _this.$store.state.loadingTxt = ''
                            }
                        }else{
                            _this.addData = obj.data
                            _this.chooseThis = _this.$store.state.orderAddId || '' 
                        }
                    }
                })
            },
            toAddList:function(){
                let locaStr = window.location.href
                if(locaStr.indexOf('fromOrder=') > -1){
                    this.$router.push('/center/editAdd?fromOrder=1')
                }else{
                    this.$router.push('/center/editAdd')
                }
            },
            deleteAddF:function(id){
                var _this = this
                var delUrl = "/wechatecom/appserver/member/receiver/del.do?id=" + this.deleteId
                console.log(this.deleteIndex)

                this.ajaxDataFun('post',delUrl,function(obj){
                    if(obj.code == '200'){
                        _this.showdelPop = false
                        _this.addData.splice(_this.deleteIndex,1)
                        _this.$set(_this.$data, 'addData', _this.addData);
                        popMin.show("icon-success","删除成功")
                    }
                })
            },
            radioChangeF:function(id,name,tel,area,des){  //选择地址
                this.$store.state.orderAddId = id
                this.$store.state.orderAddName = name
                this.$store.state.orderAddTel = tel
                this.$store.state.orderAddDes = area + des
                this.$router.go(-1)
            },
            showDelPopF:function(id,i){  //删除弹框
                this.showdelPop = true
                this.deleteId = id
                this.deleteIndex = i
            }
        },
        mounted (){
            var _this = this;
            var warpDom = document.getElementById('container')
            var innerHt = warpDom.clientHeight  //显示区域高度
            var scrollTopTop  //滚动条距离顶部高度
            var allHeight //总高度到底部

            warpDom.addEventListener('scroll', function() {
                scrollTopTop = warpDom.scrollTop;　
                allHeight = warpDom.scrollHeight;　
                if(scrollTopTop + innerHt ==  allHeight){
                    if(!_this.endListen){
                        _this.currentPage++
                        _this.getAddListF(1)
                    }
                    console.log(_this.currentPage)
                }
            })
        },
        filters:{
            filAdd:function(str){
                return str.replace(/\//g,"");
            }
        }
    }
</script>

