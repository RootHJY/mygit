<template>
    <div class="time">
        <span>{{ h }}</span>:<span>{{ m }}</span>:<span>{{ s }}</span>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                st : 0,
                h: '',
                m: '',
                s: '',
            }
        },
        props:[ 'seconds'],
        mounted: function() {
            this.st = this.seconds;
            let count = setInterval(()=>{
                this.st --;
                if(this.st <= 0){
                    clearInterval(count);
                }
            },1000);
        },
        watch:{
            st:function() {
                let _this = this;
                let value = this.st;
                let mm = Math.floor(value / 60);
                let ss = value % 60;
                let hh = Math.floor(mm / 60);
                mm = mm % 60;
                let day = Math.floor(hh / 24);
                hh = hh % 24;
                if(value <= 0){
                    _this.h = '00';
                    _this.m = '00';
                    _this.s = '00';
                    _this.$emit('setMsg',false)
                }else{
                    _this.h = setv(hh);
                    _this.m = setv(mm);
                    _this.s = setv(ss);
                }
            }
        },
        methods: {
            
        },
        filters: {
            
        }
    }
    function setv(v){
        v = v < 10?'0' + v : v;
        return v;
    }
</script>