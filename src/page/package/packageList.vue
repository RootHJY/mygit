<template>
    <div class="packageBuy" v-if="productSetList">
        <ul class="tagList three clearfix">
            <li  v-for="(item,index) in productSetList" :class="{active:index == pIndex}" @click="showChild(index)">
                套餐<span v-if="index == 0">A:立减{{ item.costPrice - item.price }}元</span><span v-if="index == 1">B:立减{{ item.costPrice - item.price }}元</span><span v-if="index == 2">C:立减{{ item.costPrice - item.price }}元</span>
            </li>
        </ul>
        <div class="packageWrap" v-for="(item,i) in productSetList" v-show="pIndex == i">
            <ul class="clearfix">
                <li class="box good"  v-for="(list,index) in item.productList">
                    <router-link :to="'/shopDetails?id=' + list.id">
                        <img :src="list.image" alt="" />
                        <p>¥{{ list.price }}</p>
                    </router-link>
                </li>
                <li class="last">
                    <router-link :to="'/packageDetails?index=' + i +  '&id=' + id">
                        <div class="nPrice"><span>套餐价¥</span>{{ item.price }}</div>
                        <div class="oPrice">¥{{ item.costPrice }} </div>
                        <div class="btn"> 购买套餐 </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                pageTitle: '套餐',
                itemList: '',
                pIndex: 0
            }
        },
        components: {
            
        },
        props: ['productSetList', 'id'],
        created () {

        },
        methods: {
            showChild:function(i){
                this.pIndex = i
            }
        }
    }
</script>


