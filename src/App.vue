<template>
  <div id="app">
    <Vheader :seller="seller"></Vheader>
    <div class="tab border-1px">
        <router-link to="/goods" class="tab-item">商品</router-link>
        <router-link to="/ratings" class="tab-item">评价</router-link>
        <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { urlParse } from '../src/common/js/util.js'
  import Vheader from './components/header/header.vue'
  const ERR_OK = 0
  export default {
  	data () {
  		return {
       seller: {
           id: (() => {
               let queryParam = urlParse()
               console.log(queryParam)
               return queryParam.id
           })()
       }
		  }
	  },
    created () {
  		this.$http.get('/api/seller?id=' + this.seller.id).then((res) => {
  			res = res.body
			  if (res.errno === ERR_OK) {
  				this.seller = Object.assign({}, this.seller, res.data)
				  console.log(this.seller)
			  }
		  })
    },
    components: { Vheader }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "common/css/mixin.scss";
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
	  @include border-1px(bottom,rgba(7,17,27,0.1));
    .tab-item{
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: rgb(77,85,93);
    }
    .active{
      color: rgb(240,20,20);
    }
  }

</style>
