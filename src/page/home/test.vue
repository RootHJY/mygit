<template>
    <section>
        <input type="text" name="url" v-model="url" placeholder="访问URL">
        <ul class="justify">
            <li class="box">
                <label>参数1</label>
                <input type="text" v-model="canshu1" placeholder="参数1">
            </li>
            <li class="box">
                <input type="text" v-model="val1" placeholder="值1">
            </li>
        </ul>
        <ul class="justify">
            <li class="box">
                <label>参数2</label>
                <input type="text" v-model="canshu2" placeholder="参数2">
            </li>
            <li class="box">
                <input type="text" v-model="val2" placeholder="值2">
            </li>
        </ul>
        <ul class="justify">
            <li class="box">
                <label>参数3</label>
                <input type="text" v-model="canshu3" placeholder="参数3">
            </li>
            <li class="box">
                <input type="text" v-model="val3" placeholder="值3">
            </li>
        </ul>
        <ul class="justify">
            <li class="box">
                <label>参数4</label>
                <input type="text" v-model="canshu4" placeholder="参数4">
            </li>
            <li class="box">
                <input type="text" v-model="val4" placeholder="值4">
            </li>
        </ul>
        <ul class="justify">
            <li class="box">
                <label>参数5</label>
                <input type="text" v-model="canshu5" placeholder="参数5">
            </li>
            <li class="box">
                <input type="text" v-model="val5" placeholder="值5">
            </li>
        </ul>
        <ul class="justify">
            <li class="box">
                <label>参数6</label>
                <input type="text" v-model="canshu6" placeholder="参数6">
            </li>
            <li class="box">
                <input type="text" v-model="val6" placeholder="值6">
            </li>
        </ul>
        <ul class="justify">
            <li class="box">
                <label>参数7</label>
                <input type="text" v-model="canshu7" placeholder="参数7">
            </li>
            <li class="box">
                <input type="text" v-model="val7" placeholder="值7">
            </li>
        </ul>
        <ul class="justify">
            <li class="box">
                <label>参数8</label>
                <input type="text" v-model="canshu8" placeholder="参数8">
            </li>
            <li class="box">
                <input type="text" v-model="val8" placeholder="值8">
            </li>
        </ul>
        <ul class="justify">
            <li class="box">
                <label>参数9</label>
                <input type="text" v-model="canshu9" placeholder="参数9">
            </li>
            <li class="box">
                <input type="text" v-model="val9" placeholder="值9">
            </li>
        </ul>
        <ul class="justify">
            <li class="box">
                <label>参数10</label>
                <input type="text" v-model="canshu10" placeholder="参数10">
            </li>
            <li class="box">
                <input type="text" v-model="val10" placeholder="值10">
            </li>
        </ul>
        <ul>
            <li><button @click="getData">提交</button></li>
        </ul>
        <ul>
            <li>访问路径：{{ allUrl }}</li>
        </ul>
    </section>
</template>

<script>

    export default {
        data () {
            return {
                pageTitle: '加密测试',
                url: '',
                canshu1: '',
                canshu2: '',
                canshu3: '',
                canshu4: '',
                canshu5: '',
                canshu6: '',
                canshu7: '',
                canshu8: '',
                canshu9: '',
                canshu10: '',
                val1: '',
                val2: '',
                val3: '',
                val4: '',
                val5: '',
                val6: '',
                val7: '',
                val8: '',
                val9: '',
                val10: '',
                url: '',
                canshuArr:[],
                valArr: [],
                allUrl: '',
                allcanshu:''
            }
        },
        components: { 

        },
        created () {

        },
        methods: { 
            getData:function(){
                var _this = this;
        
                this.canshuArr = [this.canshu1,this.canshu2,this.canshu3,this.canshu4,this.canshu5,this.canshu6,this.canshu7,this.canshu8,this.canshu9,this.canshu10]
                this.valArr = [this.val1,this.val2,this.val3,this.val4,this.val5,this.val6,this.val7,this.val8,this.val9,this.val10]

                _this.allcanshu = ''

                for(var i = 0; i < 10; i++){
                    if(_this.canshuArr[i] != ''){
                        _this.allcanshu += _this.canshuArr[i] + "=" + _this.valArr[i] + "&"
                    }
                }

                _this.allUrl = "/wechatecom" +  this.url + "?" + _this.allcanshu

                this.ajaxDataFun('post',_this.allUrl,function(obj){
                    console.log(obj.data)
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    body{ background:#fff}
    section{ text-align:left; padding:20px;  width:700px; margin-left:40px; margin-top: 40px; background:#fff; box-shadow:0 0 6px 6px rgba(0,0,0,0.2);}
    ul{ margin:20px auto; padding:5px 15px; border-bottom:1px dashed #ddd; padding-bottom: 15px;} 
    label{ color:#666; font-size:16px; font-weight:bold; text-align:left; margin-right:14px;}
    li{ width:45%;}
    input{ background-color:#fff; border:1px solid #ddd; width:100%;  height:30px; line-height:30px; padding-left: 4px; font-size:16px; font-weight:bold; width:70%;}
    input:focus{ border-color:green}
    button{ background-color:#ff5d31; color:#fff; padding:10px 60px; font-size:16px; border-radius:4px;}
</style>

