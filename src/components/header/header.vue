<template>
  <header>
	  <div class="headerTop">
		  <div class="avatar">
			  <img :src="seller.avatar" alt="pic of seller" width="64" height="64">
		  </div>
		  <div class="sellerInfo">
			  <div class="title">
				  <span class="brand"></span>
				  <span class="name">{{seller.name}}</span>
			  </div>
			  <div class="delivery">
				  {{seller.description}} / {{seller.deliveryTime}}分钟送达
			  </div>
			  <div v-if="seller.supports"  class="supports">
				  <span class="icon" :class="classMap[seller.supports[0].type]"></span>
				  <span class="supportDescription">{{seller.supports[0].description}}</span>
			  </div>
		  </div>
		  <div v-if="seller.supports" class="supportsCount">
			  <span class="count">{{seller.supports.length}}个</span>
			  <i class="icon-keyboard_arrow_right"></i>
		  </div>
	  </div>
	  <div class="headerBottom">
		  <span class="bulletin"></span><span class="bulletinInfo">{{seller.bulletin}}</span>
		  <i class="icon-keyboard_arrow_right"></i>
	  </div>
    <div class="background">
	    <img :src="seller.avatar" alt="pic of background" width="100%" height="100%">
    </div>
  </header>

</template>

<script type="es6">
  export default {
  	data () {
  		return {
//  			classMap: []
		  }
	  },
  	props: {
  		seller: {
  			type: Object
		  }
	  },
	  created () {
  		this.classMap = ['decrease','discount','special','invoice','guarantee']
	  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "../../common/css/mixin.scss";
	header{
		 position: relative;
		 color: #FFFFFF;
	   background: rgba(7,17,27,0.5);
		.headerTop{
			position: relative;
			padding: 24px 12px 18px 24px;
		  font-size: 0;
			.avatar{
				display: inline-block;
				vertical-align: top;
				img{
					border-radius: 2px;
				}
			}
	    .sellerInfo{
		    display: inline-block;
	      margin-left: 16px;
		    .title{
		      margin: 2px 0 8px 0;
					.brand{
						display: inline-block;
						vertical-align: top;
						width: 30px;
						height: 18px;
						@include bg-img('brand');
						background-size: 30px 18px;
						background-repeat: no-repeat;
					}
					.name{
						margin-left: 6px;
						font-size: 16px;
						font-weight: bold;
						line-height: 18px;
					}
		    }
	      .delivery{
		      margin-bottom: 10px;
		      font-size: 12px;
	      }
	      .supports{
		      font-size: 10px;
		      line-height: 12px;
		      .icon{
			      display: inline-block;
			      vertical-align: top;
			      width: 12px;
			      height: 12px;
			      margin-right: 4px;
			      background-size: 12px 12px;
			      background-repeat: no-repeat;
			      &.decrease{
		           @include bg-img('decrease_1');
			       }
						&.discount{
						 @include bg-img('discount_1');
						 }
						&.invoice{
						 @include bg-img('invoice_1');
						 }
						&.guarantee{
						 @include bg-img('guarantee_1');
						 }
						&.special{
						 @include bg-img('special_1');
						 }
		      }
	      }
	    }
	    .supportsCount{
		    position: absolute;
		    right: 12px;
		    bottom: 18px;
		    padding: 0 8px;
		    height: 24px;
		    line-height: 24px;
		    border-radius: 14px;
		    background: rgba(0,0,0,0.2);
		    text-align: center;
		    .count{
			    font-size: 10px;
			    margin-right: 2px;
		    }
	      .icon-keyboard_arrow_right{
		      font-size: 10px;
		      color: #FFFFFF;
	      }
	    }
		}
	  .headerBottom{
		  position: relative;
		  height: 28px;
		  line-height: 28px;
		  padding: 0 28px 0 12px;
		  white-space: nowrap;
		  overflow: hidden;
		  text-overflow: ellipsis;
	    background: rgba(7,17,27,0.2);
		  span.bulletin{
			  display: inline-block;
			  margin-top: 8px;
			  width: 22px;
			  height: 12px;
			  @include bg-img('bulletin');
			  background-size: 22px 12px;
			  background-repeat: no-repeat;
		  }
	    span.bulletinInfo{
		    vertical-align: top;
		    margin: 0 4px;
		    font-size: 10px;
	    }
			.icon-keyboard_arrow_right{
				position: absolute;
				right: 12px;
				font-size: 10px;
				line-height: 28px;
				color: #FFFFFF;
			}
		  
	  }
	  .background{
		  position: absolute;
		  left: 0;
		  top: 0;
		  width: 100%;
		  height: 100%;
		  z-index: -1;
      filter: blur(10px);
	  }
	}

</style>

