<template>
    <section>
        <div class="sendQus" v-show="enterInfo" @click="enterF">
            <label :class="{active:isEnter}">  
                <p>亲，同时在线咨询顾客较多，为了最快了解您的需求，请您按照下方提示留言给我们 </p>
                <p>
                售前咨询：请您留下【售前疑问+联系方式】<br/>
                售后相关：请您留下【售后问题+订单号+联系方式】</p>
            </label>
            <textarea v-model="content" ref="textarea" maxlength="300"></textarea>
            <div class="numTotal">
                <span>{{ txtLen }}</span>/300
            </div>
        </div>
        <div class="sendBtn" v-show="enterInfo">
            <span class="sureBtn" @click="sendF" :class="{active:txtLen}">{{ sendTxt }}</span>  
        </div>
    </section>
</template>

<script>

    export default {
        data () {
            return {
                pageTitle: '小煮客服',
                isEnter: false,
                txtLen: 0,
                content: '',
                currentPage: 1,
                pageSize: 10,
                sendTxt: '发布'
            }
        },
        props: ['enterInfo'],
        components: { 
            
        },
        created () {

        },
        methods: { 
            enterF:function(){
                this.isEnter = true
                this.$refs['textarea'].focus()
            },
            sendF:function(){
                var _this = this
                var sendUrl = "/api/consult/add.do?content=" + _this.content + "&currentPage=" + this.currentPage + "&pageSize=" + this.pageSize
                if(_this.content.trim() != ''){
                    _this.sendTxt = '发布中'
                    this.ajaxDataFun('post',sendUrl,function(obj){
                        if(obj.code == '200'){
                            _this.$emit('childFun',obj.data)
                            _this.sendTxt ='发布'
                            _this.content = ''
                        }
                    })
                }else{
                    console.log("请输入内容")
                }
            }
        },
        watch:{
            content:function(){
                this.txtLen = this.content.length
                if(this.txtLen > 300){
                    return
                }
            }
        }

    }
</script>

