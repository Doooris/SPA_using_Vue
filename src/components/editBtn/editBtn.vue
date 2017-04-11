<template>
	<div class="editBtn">
		<transition name="slide">
		  <div class="decreaseBtn icon-remove_circle_outline btn" @click="editCount(-1)" v-show="food.count>0"></div>
		</transition>
		<div class="count" v-show="food.count>0">{{food.count}}</div>
		<div class="increaseBtn icon-add_circle btn" @click="editCount(1)"></div>
	</div>

</template>

<script type="text/ecmascript-6">
	import Vue from 'vue'
	export default {
		created () {
			console.log(this.food)
		},
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			editCount (way) {
				if (way === 1) {
					if (!this.food.count) {
						Vue.set(this.food, 'count', 1)
						console.log(this.food.count)
					} else {
						this.food.count++
					}
				} else if (way === -1) {
					this.food.count--
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.editBtn{
		font-size: 0;
		.btn{
			display: inline-block;
			font-size: 24px;
			color: rgb(0,160,220);
			line-height: 24px;
			padding: 6px;
		}
		.slide-enter,.slide-leave-active{
			transform: translate3D(20px,0,0) rotate(180deg);
			opacity: 0
		}
		.slide-enter-active,.slide-leave-active{
			transition: all .4s linear;
		}
		/*.slide-leave{*/
			/*opacity: 0;*/
			/*transform: translate3D(20px,0,0);*/
		/*}*/
	  .count{
		  display: inline-block;
		  width: 6px;
		  vertical-align: top;
		  text-align: center;
		  padding-top: 6px;
		  font-size: 10px;
		  color: rgb(147,153,159);
		  line-height: 24px;
	  }
	}
</style>
