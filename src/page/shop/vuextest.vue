<template>
    <div class="hello">  
        <div class="test" style="font-size:30px;">
            {{$store.state.count}}
    
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'hello',
        data () {
            return {
                msg: 'test'
            }
        },
        methods: {
            increment () {
                this.$store.commit('increment')
            },
            decrement () {
                this.$store.commit('decrement')
            }
        },
        computed: {
           count () {
                return this.$store.state.count
           }
        }
    }
</script>

