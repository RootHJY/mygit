<template>
    <div class="searchBar ">  
        <router-link to="/search" class="search" > 
            <label class="cart icon-search"></label>
            <input type="text" :placeholder="$store.state.hotTxt" disabled="disabled" />
        </router-link>
    </div>
</div>
</template>
<script>
    export default {
        name: 'searchBar',
        data () {
            return {
                pageTitle: '搜索Bar'
            }
        },
        created () {

        },
        methods: {
        }
    }
</script>