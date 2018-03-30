<template>
    <router-link to="/groupRules" class="groupGame">
        <div class="tip">拼团玩法</div>
        <div class="list justify">
            <ul>
                <li class="box">
                    <div class="icon">
                        <span class="icon-xq_cantuan">
                        <span class="path1"></span><span class="path2"></span><span class="path3"></span>
                        </span>
                    </div>
                    <p>开团/参加团</p>
                </li>
                <li class="box min">
                    <span class="icon-arrow"></span>
                </li>
                <li class="box">
                    <div class="icon">
                        <span class="icon-xq_invite">
                            <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span>
                        </span>
                    </div>
                    <p>支付成功</p>
                </li>
                <li class="box min">
                    <span class="icon-arrow"></span>
                </li>
                <li class="box">
                    <div class="icon">
                        <span class="icon-xq_pay">
                            <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span>
                        </span>
                    </div>
                    <p>邀请参团</p>
                </li>
                <li class="box min">
                    <span class="icon-arrow"></span>
                </li>
                <li class="box">
                    <div class="icon">
                        <span class="icon-xq_success">
                            <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span>
                        </span>
                    </div>
                    <p>人满成团</p>
                </li>
            </ul>
        </div>
    </router-link>
</template>
    
<script>
    export default {
        data () {
            return {
                pageTitle: '拼团玩法',
            }
        },
        components: {
            
        },
        created () {},
        methods: {}
    }
</script>


