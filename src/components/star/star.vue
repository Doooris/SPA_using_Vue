<template>
	<div class="star" :class="sizeType">
		<span class="starItem" v-for="(classItem, index) in classItems" :class="classItem" :key="index"></span>
	</div>

</template>

<script type="text/ecmascript-6">
	const LENGTH = 5
	const STAR_ON = 'on'
	const STAR_HALF = 'half'
	const STAR_OFF = 'off'
	export default {
		data () {
			return {

			}
		},
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			sizeType () {
				return 'star-' + this.size
			},
			classItems () {
				let result = []
				let score = Math.floor(this.score * 2) / 2
				let hasDecimal = score % 1 !== 0
				let integer = Math.floor(score)
				for (let i = 0; i < integer; i++) {
					result.push(STAR_ON)
				}
				if (hasDecimal) {
					result.push(STAR_HALF)
				}
				while (result.length < LENGTH) {
					result.push(STAR_OFF)
				}
				return result
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "../../common/css/mixin.scss";
	.star{
	   .starItem{
		   display: inline-block;
		   background-repeat: no-repeat;
	   }
	   &.star-48{
		    .starItem{
					 width: 20px;
					 height: 20px;
					 margin-right: 22px;
					 background-size: 20px 20px;
				&:last-child{
				 margin-right: 0;
				 }
				&.on{
				@include bg-img('star48_on')
				}
				&.half{
				 @include bg-img('star48_half')
				}
				&.off{
				 @include bg-img('star48_off')
				}
				 }
	   }
	   &.star-36{
				.starItem{
					width: 15px;
					height: 15px;
					margin-right: 6px;
					background-size: 15px 15px;
				&:last-child{
					 margin-right: 0;
				 }
				&.on{
				 @include bg-img('star36_on')
				 }
				&.half{
				 @include bg-img('star36_half')
				 }
				&.off{
				 @include bg-img('star36_off')
				 }
				}

	    }
	   &.star-24{
				.starItem{
					width: 10px;
					height: 10px;
					margin-right: 3px;
					background-size: 10px 10px;
				&:last-child{
					 margin-right: 0;
				 }
				&.on{
				 @include bg-img('star24_on')
				 }
				&.half{
				 @include bg-img('star24_half')
				 }
				&.off{
				 @include bg-img('star24_off')
				 }
				}

	   }
	}

</style>
