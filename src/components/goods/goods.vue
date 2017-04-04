<template>
	<div class="goods">
		<div class="menuWrapper" ref="menuWrapper">
			<ul class="menuList">
				<li v-for="(item,index) in goods" :class="{checked:index == currIndex}" @click="currIndex=index">
					<span class="menuText border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foodsWrapper" ref="foodsWrapper">
			<ul class="kindsList">
				<li v-for="(kind,index) in goods" class="kindItem">
					<h1 class="kindName">{{kind.name}}</h1>
					<ul class="foodsList">
						<li v-for="(food,index) in kind.foods" class="foodItem border-1px">
							<div class="icon"><img :src="food.icon" alt="pic of food" width="57" height="57"></div>
							<div class="info">
								<h2 class="foodName">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	const ERR_OK = 0
	export default {
		data () {
			return {
				goods: [],
				currIndex: 0
			}
		},
		props: {
			seller: {
				type: Object
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			this.$http.get('/api/goods').then((res) => {
				res = res.body
				if (res.errno === ERR_OK) {
					this.goods = res.data
					this.$nextTick(() => {
						this._initScroll()
					})
				}
			})
		},
		methods: {
			_initScroll () {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {})
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../common/css/mixin.scss";
	.goods{
	   display: flex;
	   position: absolute;
	   top: 174px;
	   bottom: 46px;
	   width: 100%;
	   overflow: hidden;
		.menuWrapper{
			flex: 0 0 80px;
			width: 80px;
			background: #f3f5f7;
		  /*overflow: auto;*/
			.menuList{
				li{
					display: table;
					padding: 0 12px;
					height: 54px;
				  width: 56px;
				  line-height: 14px;
				  .menuText{
					  display: table-cell;
					  width: 56px;
					  vertical-align: middle;
					  font-size: 12px;
					  color: #84878A;
				    @include border-1px(bottom,rgba(7,17,27,0.1));
					  .icon{
						  display: inline-block;
						  vertical-align: top;
						  width: 12px;
						  height: 12px;
						  margin-right: 2px;
						  background-size: 12px 12px;
						  background-repeat: no-repeat;
							&.decrease{
							 @include bg-img('decrease_3');
							 }
							&.discount{
							 @include bg-img('discount_3');
							 }
							&.invoice{
							 @include bg-img('invoice_3');
							 }
							&.guarantee{
							 @include bg-img('guarantee_3');
							 }
							&.special{
							 @include bg-img('special_3');
							 }
					  }
				  }
	        &.checked{
	          background: #FFFFFF;
		        .menuText{
			        color: #484C51;
		        }
	         }
				}
			}
		}
	  .foodsWrapper{
		  flex: 1;
		  .kindName{
			  height: 26px;
			  width: 100%;
			  padding-left: 14px;
			  background: #f3f5f7;
			  border-left: 2px solid #d9dde1;
			  font-size: 12px;
			  color: rgb(147,153,159);
			  line-height: 26px;
		  }
	    .foodItem{
		    display: flex;
		    margin: 18px;
		    padding-bottom: 18px;
	      @include border-1px(bottom,rgba(7,17,27,0.1));
	      &:last-child{
		       @include border-none;
		       margin-bottom: 0;
	       }
		    .icon{
			    flex: 0 0 57px;
			    margin-right: 10px;
		    }
	      .info{
	        flex: 1;
		      .foodName{
			      margin: 2px 0 8px 0;
			      font-size: 14px;
			      color: rgb(7,17,27);
			      line-height: 14px;
			      height: 14px;
		      }
	        .desc,.extra{
		        font-size: 10px;
		        color: rgb(147,153,159);
		        line-height: 10px;
	        }
	        .desc{
		        margin-bottom: 8px;
		        line-height: 12px;
	        }
	        .count{
		        margin-right: 12px;
	        }
	        .price{
		        line-height: 24px;
		        font-weight: 700;
		        .now{
			        margin-right: 8px;
			        font-size: 14px;
			        color: rgb(240,20,20);
		        }
	          .old{
		          text-decoration: line-through;
		          color: rgb(147,153,159);
		          font-size: 10px;
	          }
	        }

	      }
	    }
	  }
	}
	

</style>
