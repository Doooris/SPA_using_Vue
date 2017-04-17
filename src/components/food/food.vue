<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="foodContent">
				<div class="imageHeader">
					<img :src="food.image" alt="">
					<div class="back">
						<i class="icon-arrow_lift" @click="showFlag=false"></i>
					</div>
				</div>
				<div class="content">
					<h1>{{food.name}}</h1>
					<div class="detail">
						<span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span><span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="editBtnWrapper" v-show="food.count>0">
						<editBtn :food="food"></editBtn>
					</div>
					<div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addToCart($event)">加入购物车</div>
				</div>
				<split v-if="food.info"></split>
				<div class="info" v-if="food.info">
					<h1>商品介绍</h1>
					<div class="text">{{food.info}}</div>
				</div>
				<split v-if="food.ratings"></split>
				<div class="info" v-if="food.ratings">
					<h1>商品评价</h1>
					<div class="ratingsTag">
						<div class="all">全部<span>{{food.ratings.length}}</span></div>
						<div class="recommended">推荐<span>{{recommendedC}}</span></div>
						<div class="spitSlot">吐槽<span>{{spitSlotC}}</span></div>
					</div>
					<div class="onlycontent">
						<i class="icon-check_circle"></i>
						<span>只看有内容的评价</span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	import editBtn from 'components/editBtn/editBtn.vue'
	import split from 'components/split/split.vue'
	import Vue from 'vue'
	export default {
		data () {
			return {
				showFlag: false,
				recommendedC: 0,
				spitSlotC: 0
			}
		},
		props: {
			food: {
				type: Object
			}
		},
		computed: {
			recommended () {
				this.food.ratings.forEach(rating => {
					if (rating.rateType === 0) {
						this.recommendedC++
					}
				})
			},
			spitSlot () {
				this.food.ratings.forEach(rating => {
					if (rating.rateType === 1) {
						this.spitSlot++
					}
				})
			}
		},
		methods: {
			show () {
				this.showFlag = true
				this.$nextTick(() => {
					if (!this.foodScroll) {
						this.foodScroll = new BScroll(this.$refs.food, {click: true})
					} else {
						this.foodScroll.refresh()
					}
				})
			},
			addToCart (event) {
				console.log(event)
				if (!event._constructed) {
					return
				}
				Vue.set(this.food, 'count', 1)
			}
		},
		components: { editBtn, split }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.food{
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		background: #fff;
		z-index: 30;
		width: 100%;
		&.move-enter,&.move-leave-active{
		  transform: translate3D(100%,0,0);
		 }
	  &.move-enter-active,&.move-leave-active{
		  transition: all 0.2s linear;
	   }
	  .foodContent{
	     .imageHeader{
				 position: relative;
				 width: 100%;
				 height: 0;
				 padding-bottom: 100%;
				 img{
					 position: absolute;
					 left: 0;
					 top: 0;
					 width: 100%;
					 height: 100%;
				 }
				 .back{
					 position: absolute;
					 top: 10px;
					 left: 0;
					 .icon-arrow_lift{
						 display: block;
						 padding: 10px;
						 font-size: 20px;
						 color: #fff;
					 }
				 }
			 }
			.content{
				padding: 18px;
			  position: relative;
				h1{
					font-size: 14px;
					font-weight: 700;
					color: rgb(7,17,27);
					line-height: 14px;
				}
				.detail{
					margin: 8px 0 18px;
					height: 10px;
					span{
						font-size: 10px;
						color: rgb(147,153,159);
						line-height: 10px;
						&:first-child{
							margin-right: 12px;
						}
					}
				}
				.price{
					font-weight: 700;
					line-height: 24px;
					.now{
						font-size: 14px;
						color: rgb(240,20,20);
						margin-right: 8px;
					}
					.old{
						text-decoration: line-through;
						font-size: 10px;
						color: rgb(147,153,159);
					}
				}
				.editBtnWrapper{
					position: absolute;
					right: 12px;
					bottom: 12px;
				}
				.buy{
					position: absolute;
					right: 18px;
					bottom: 18px;
					z-index: 10;
					height: 24px;
					line-height: 24px;
					padding: 0 12px;
					box-sizing: border-box;
					font-size: 10px;
					border-radius: 12px;
					color: #fff;
					background: rgb(0,160,220);
				}
			}
	  }
	  .info{
	    padding: 18px;
		  h1{
			  font-size: 14px;
			  line-height: 14px;
			  color: rgb(7,17,27);
			  margin-bottom: 6px;
		  }
	    .text{
		    font-size: 12px;
		    font-weight: 200;
		    color: rgb(77,85,93);
		    line-height: 24px;
	    }
	  }
	}
</style>
