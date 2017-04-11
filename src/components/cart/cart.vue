<template>
	<div class="footer">
		<div class="cartWrapper">
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
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		mounted () {
			console.log(this.selectFoods)
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
			}
		}
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
		.cartWrapper{
			display: flex;
			/*height: 100%;*/
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
	}
</style>
