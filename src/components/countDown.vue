<template>
    <span>{{st | setTime}}</span>
</template>
<script>
    export default {
        data() {
            return {
                st : 0
            }
        },
        props:[ 'seconds' ],
        mounted: function() {
            this.st = this.seconds;
            let count = setInterval(()=>{
                this.st --;
                if(this.st <= 0){
                    clearInterval(count);
                }
            },1000);
        },
        filters: {
            setTime: function(value) {
                let mm = Math.floor(value / 60);
                let ss = value % 60;
                let hh = Math.floor(mm / 60);
                mm = mm % 60;
                let day = Math.floor(hh / 24);
                hh = hh % 24;
                if(value <= 0){
                    return '已结束'
                }else{
                    return setv(day) + '天' + setv(hh) + '时' + setv(mm) + '分' + setv(ss) + '秒';
                }
            }  
        }
    }
    function setv(v){
        v = v < 10?'0' + v : v;
        return v;
    }
</script>