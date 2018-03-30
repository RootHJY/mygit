<template>
    <div id="container" class="bgf paddingBt80">
        <v-title> {{ pageTitle }}</v-title>
        <div class="server">
            <div class="chatBox details">
                <div class="list" v-for="item in dataList":class="{answer:item.isReply == 0}">
                    <span v-if="item.isReply == 1">我</span>
                    <span v-if="item.isReply == 0">客服</span>
                    <p>{{ item.content }}</p>
                    <em>{{ item.createDate | formatDateMore }}</em>
                </div>
            </div>
            <div class="botSendQus">
                <input type="text" placeholder="请输入您要咨询的问题" v-model="content" @keyup.enter="sendF()" />
                <label @click="sendF">发送</label>
            </div>
        </div>
    </div>  
</template>

<script>
    import common from '@/components/common'
    import VTitle from '@/components/title'
    export default {
        data () {
            return {
                pageTitle: '小煮客服',
                id: -1,
                dataList: '',
                currentPage: 1,
                pageSize: 10,
                endListen: false,
                content: '',
            }
        },
        components: { 
            VTitle,
        },
        created () {
            this.getDelsF('')
        },
        methods: { 
            getDelsF:function(scroll){
                var _this = this
                    _this.endListen = false
                var _locaUrl = window.location.href
                if(_locaUrl.indexOf('id') > -1){
                    _this.id = common.getUrlPars(_locaUrl).id
                }
                var getDetailsUrl = "/api/consult/details?id=" + _this.id + "&currentPage=" + this.currentPage + "&pageSize=" + this.pageSize
                // + "&currentPage=" _this.currentPage + "&pageSize=" + _this.pageSize
                this.ajaxDataFun('post',getDetailsUrl,function(obj){
                    if(obj.code == '200'){
                        var objLen = obj.data.length;
                        if(scroll){
                            if(objLen){
                                for(var j=0; j < objLen; j++){
                                    _this.dataList.push(obj.data[j]);
                                }
                                _this.$set(_this.$data, 'dataList', _this.dataList);
                            }else{
                                _this.endListen = true
                                _this.$store.state.loadingTxt = ''
                            }
                        }else{
                            _this.dataList = obj.data
                        }
                    }
                })
            },
            sendF:function(){
                var _this = this
                var sendUrl = "/api/consult/add.do?id=" + _this.id + "&content=" + _this.content + "&currentPage=" + this.currentPage + "&pageSize=" + this.pageSize
                if(_this.content.trim() != ''){
                    this.ajaxDataFun('post',sendUrl, function(obj){
                        if(obj.code == '200'){
                            _this.content = ''
                            _this.dataList = obj.data
                        }
                    })
                }else{
                    console.log("请输入内容")
                }
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
                    if(!_this.endListen) {
                        _this.currentPage++
                        _this.getDelsF(1)
                    }
                    console.log(_this.currentPage)
                }
            })
        },
    }
</script>

