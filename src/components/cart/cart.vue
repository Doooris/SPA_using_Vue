<template>
	<div class="footer">
		<div class="cartWrapper" @click="toggleList">
			<div class="cartLeft">
				<div class="cartLogoWrapper">
					<div class="cartLogo" :class="{'highLight':totalCount>0}">
						<span class="icon-shopping_cart" :class="{'highLight':totalCount>0}"></span>
					</div>
					<div class="count" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryTime}}元</div>
			</div>
			<div class="cartRight" >
				<div class="pay" :class="{'highLight':totalPrice>=minPrice}">
					{{desc}}</div>
			  </div>
		</div>
		<transition name="fold">
			<div class="cartDetailWrapper" v-show="listShow">
				<div class="detailHeader">
					<span class="title">购物车</span>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="detailList" ref="detailList">
					<ul>
						<li v-for="food in selectFoods" class="listItem border-1px">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="editBtnWrapper">
								<editBtn :food="food"></editBtn>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="overLayer" v-show="listShow"></div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import editBtn from 'components/editBtn/editBtn.vue'
	import BScroll from 'better-scroll'
	export default {
		data () {
			return {
				fold: true
			}
		},
		props: {
			selectFoods: {
				type: Array,
				default () {
					return [
						{
							price: 5,
							count: 1
						}
					]
				}
			},
			deliveryTime: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		methods: {
			toggleList () {
				if (!this.totalCount) {
					return
				}
				this.fold = !this.fold
			},
			empty () {
				this.selectFoods.forEach((food) => {
					food.count = 0
				})
			}
		},
		computed: {
			totalPrice () {
				let totalPrice = 0
				this.selectFoods.forEach((food) => {
					totalPrice += food.price * food.count
				})
				return totalPrice
			},
			totalCount () {
				let totalCount = 0
				this.selectFoods.forEach((food) => {
					totalCount += food.count
				})
				return totalCount
			},
			desc () {
				if (this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`
				} else if (this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice
					return `还差￥${diff}起送`
				} else {
					return '去结算'
				}
			},
			listShow () {
				if (!this.totalCount) {
					this.fold = true
					return false
				}
				if (!this.fold) {
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScroll(this.$refs.detailList, {click: true})
						} else {
							this.scroll.refresh()
						}
					})
				}
				return !this.fold
			}
		},
		components: { editBtn }
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "../../common/css/mixin.scss";
	.footer{
		position: fixed;
		z-index: 50;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 48px;
	  box-sizing: border-box;
		.cartWrapper{
			display: flex;
			background: #141d27;
		  font-size: 0;
			.cartLeft{
			flex: 1;
				.cartLogoWrapper{
					display: inline-block;
					/*border: 1px solid red;*/
					position: relative;
					top: -10px;
					width: 56px;
					height: 56px;
					box-sizing: border-box;
					margin: 0 12px;
					padding: 6px;
					border-radius: 50%;
					background: #141d27;
				  vertical-align: top;
					.cartLogo{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background: #2B343C;
					  text-align: center;
					   &.highLight{
						   background: #00A0DC;
					   }
						.icon-shopping_cart{
							display: inline-block;
							font-size: 24px;
							line-height: 44px;
							color: #80858A;
							&.highLight{
		            color: #fff;
							 }
						}
					}
	        .count{
		        position: absolute;
		        top: 0;
		        right: 0;
		        height: 16px;
		        width: 24px;
		        line-height: 16px;
		        font-size: 9px;
		        font-weight: 700;
		        color: #fff;
		        background: rgb(240,20,20);
		        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
		        border-radius: 16px;
		        text-align: center;
	        }
				}
	      .price{
		      display: inline-block;
		      vertical-align: top;
		      margin-top: 12px;
		      padding-right: 12px;
		      box-sizing: border-box;
		      font-size: 16px;
		      color: rgba(255,255,255,0.4);
		      line-height: 24px;
		      font-weight: 700;
		      border-right: 1px solid rgba(255,255,255,0.1);
		      &.highLight{
		        color: #fff;
		       }
	      }
	      .desc{
		      display: inline-block;
		      vertical-align: top;
		      margin: 12px 0 0 12px;
          font-size: 10px;
		      line-height: 24px;
		      color: rgba(255,255,255,0.4);
	      }
			}
			.cartRight{
			  flex: 0 0 105px;
				width: 105px;
				.pay{
					vertical-align: top;
					text-align: center;
					padding: 0 8px;
					box-sizing: border-box;
					background: #2B343C;
					color: rgba(255,255,255,0.4);
					font-size: 12px;
					font-weight: 700;
					line-height: 48px;
					&.highLight{
						 background: #00A0DC;
		         color: #fff;
					 }
				}
			}
		}
	  .cartDetailWrapper{
		  /*border: 1px solid;*/
		  position: absolute;
		  box-sizing: border-box;
		  left: 0;
		  bottom: 48px;
		  width: 100%;
		  z-index: -1;
		  .detailHeader{
			  padding: 0 18px;
			  /*width: 100%;*/
			  height: 40px;
			  line-height: 40px;
			  background: #f3f5f7;
			  border-bottom: 1px solid rgba(7,17,27,0.1);
			  .title{
				  float: left;
				  font-size: 14px;
				  font-weight: 400;
				  color: rgb(7,17,27);
			  }
	      .empty{
		      float: right;
		      font-size: 12px;
		      font-weight: 400;
		      color: rgb(0,160,220);
	      }
		  }
	    .detailList{
		    padding: 0 18px;
		    max-height: 217px;
		    background: #fff;
		    overflow: hidden;
		    .listItem{
			    position: relative;
			    padding: 12px 0;
			    box-sizing: border-box;
			    @include border-1px(bottom,rgba(7,17,27,0.1));
			    .name{
				    font-size: 14px;
				    color: rgb(7,17,27);
				    line-height: 24px;
			    }
	        .price{
		        position: absolute;
		        right: 90px;
		        bottom: 12px;
		        line-height: 24px;
		        font-size: 14px;
		        font-weight: 700;
		        color: rgb(240,20,20);
	        }
	        .editBtnWrapper{
		        position: absolute;
		        right: 0;
		        bottom: 6px;
	        }
		    }
	    }
		&.fold-enter,&.fold-leave-active{
			 transform: translate3D(0,100%,0);
		 }
	  &.fold-enter-active,&.fold-leave-active{
		  transition: all 0.5s;
	 }
	  }
		.overLayer{
			position: fixed;
			z-index: -2;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(7,17,27,0.6);
			/*filter: blur(10px);*/
			/*backdrop-filter: blur(10px);*/
			&.fade-enter,&.fade-leave-active {
			  opacity: 0;
			}
	    &.fade-enter-active,&.fade-leave-active {
		    transition: all 0.5s linear;
	    }
		}
	}
</style>
