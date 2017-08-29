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
					<h1 class="title">商品介绍</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split v-if="food.ratings"></split>
				<div class="ratings" v-if="food.ratings">
					<h1 class="title">商品评价</h1>
          <ratingSelect :ratings="food.ratings" :desc="desc" :selectType="selectType" :onlyContent="onlyContent" class="ratingSelect" v-on:ratingTypeSelect="type" v-on:onlyContentToggle="content"></ratingSelect>
          <ul class="showRatings" v-show="food.ratings && food.ratings.length">
            <li v-for="rateItem in food.ratings" v-show="needShow(rateItem.rateType,rateItem.text)" class="rateItem border-1px">
              <span class="rateTime">{{rateItem.rateTime}}</span>
              <div class="rateText">
                <span :class="{'icon-thumb_down':rateItem.rateType===1,'icon-thumb_up':rateItem.rateType===0}"></span>
                <span class="text" v-if="rateItem.text">{{rateItem.text}}</span>
              </div>
              <div class="userInfo">
                <span class="userName">{{rateItem.username}}</span><img class="avatar" :src="rateItem.avatar" width="12" height="12">
              </div>
            </li>
          </ul>
          <div class="noRatings" v-show="!food.ratings || !food.ratings.length">暂无评论</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	import editBtn from 'components/editBtn/editBtn.vue'
	import split from 'components/split/split.vue'
  import ratingSelect from 'components/ratingSelect/ratingSelect.vue'
	import Vue from 'vue'

//  const POSITIVE = 0
//  const NEGATIVE = 1
  const ALL = 2
  export default {
		data () {
			return {
				showFlag: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        selectType: ALL,
        onlyContent: true
			}
		},
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			show () {
        this.selectType = ALL
        this.onlyContent = false
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
//				console.log(event)
				if (!event._constructed) {
					return
				}
				Vue.set(this.food, 'count', 1)
			},
      type: function (data) {
			    this.selectType = data
          this.$nextTick(() => {
			        this.foodScroll.refresh()
          })
      },
      content (data) {
			    this.onlyContent = data
        this.$nextTick(() => {
          this.foodScroll.refresh()
        })
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return this.selectType === type
        }
      }

    },
		components: { editBtn, split, ratingSelect }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../../common/css/mixin.scss";
  .move-enter,.move-leave-active{
    transform: translate3D(100%,0,0);
  }
  .move-enter-active,.move-leave-active{
    transition: all 0.2s linear;
  }
	.food{
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		background: #fff;
		z-index: 30;
		width: 100%;
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
    .title{
      font-size: 14px;
      line-height: 14px;
      color: rgb(7,17,27);
      margin-bottom: 6px;
    }
	  .info{
	    padding: 18px;
	    .text{
		    font-size: 12px;
		    font-weight: 200;
		    color: rgb(77,85,93);
		    line-height: 24px;
        padding: 0 8px;
	    }
	  }
    .ratings{
      padding-top: 18px;
      .title{
        padding-left: 18px;
      }
      .showRatings{
        margin: 0 18px;
        .rateItem{
          padding: 16px 0;
          position: relative;
          @include border-1px(bottom,rgba(7,17,27,0.1));
          &:last-child{
            @include border-none();
          }
          .rateTime,.userInfo{
            font-size: 10px;
            color: rgb(147,153,159);
            line-height: 12px;
          }
          .rateTime{
            display: inline-block;
            margin-bottom: 6px;
          }
          .rateText{
            font-size: 0;
            .icon-thumb_down::before,.icon-thumb_up::before{
              font-size: 12px;
              line-height: 20px;
              margin-right: 4px;
            }
            .icon-thumb_down::before{
              color: rgb(147,153,159);
            }
            .icon-thumb_up::before{
              color: rgb(0,160,220);
            }
            .text{
              font-size: 12px;
              color: rgb(7,17,27);
              line-height: 16px;
            }
          }
          .userInfo{
            position: absolute;
            right: 18px;
            top: 16px;
            .userName{
              display: inline-block;
              vertical-align: top;
              margin-right: 6px;
            }
            .avatar{
              display: inline-block;
              vertical-align: top;
              border-radius: 50%;
            }
          }

        }

      }
      .noRatings{
        padding: 16px 18px;
        font-size: 12px;
        color: rgb(147,153,159);

      }
    }
	}
</style>
