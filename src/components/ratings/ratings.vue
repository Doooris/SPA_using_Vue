<template>
	<div class="ratings" ref="ratingWrapper">
    <div class="ratingWrapper" >
      <div class="overview">
        <div class="overviewLeft">
          <div class="overallScore">{{seller.score}}</div>
          <span class="title">综合评分</span>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overviewRight">
          <div class="scoreWrapper">
            <span class="title">服务态度</span>
            <div class="star">
              <star :size="36" :score="seller.serviceScore"></star>
            </div>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="scoreWrapper">
            <span class="title">服务态度</span>
            <div class="star">
              <star :size="36" :score="seller.foodScore"></star>
            </div>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTimeWrapper scoreWrapper">
            <span class="title">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split v-if="ratings"></split>
      <ratingSelect :ratings="ratings" v-on:onlyContentToggle="content" v-on:ratingTypeSelect="type" :selectType="selectType" :onlyContent="onlyContent"></ratingSelect>
      <div class="showRatings">
        <ul>
          <li v-for="rateItem in ratings" v-show="needShow(rateItem.rateType,rateItem.text)" class="rateItem border-1px">
            <div class="avatar">
              <img :src="rateItem.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="title">{{rateItem.username}}</h1>
              <div class="starBox">
                <star class="star" :size="24" :score="rateItem.score"></star><span class="deliveryTime" v-if="rateItem.deliveryTime">{{rateItem.deliveryTime}}分钟送达</span>
              </div>
              <p class="text" v-if="rateItem.text">{{rateItem.text}}</p>
              <span :class="{'icon-thumb_down':rateItem.rateType===1,'icon-thumb_up':rateItem.rateType===0}"></span>
              <span class="recommend" v-if="rateItem.recommend" v-for="item in rateItem.recommend">{{item}}</span>
              <span class="rateTime">{{rateItem.rateTime}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star.vue'
  import split from 'components/split/split.vue'
  import ratingSelect from 'components/ratingSelect/ratingSelect.vue'
  import BScroll from 'better-scroll'
  const ALL = 2
  const ERR_OK = 0
	export default {
	    data () {
	        return {
              ratings: [],
              selectType: ALL,
              onlyContent: false
          }
      },
      props: {
	        seller: {
	            type: Object
          }
      },
      created () {
            this.$http.get('/api/ratings').then((res) => {
              res = res.body
              if (res.errno === ERR_OK) {
                this.ratings = res.data
                this.$nextTick(() => {
                if (!this.ratingScroll) {
                    this.ratingScroll = new BScroll(this.$refs.ratingWrapper, {click: true})
                  } else {
        	            this.ratingScroll.refresh()
                  }
                })
              }
            })
      },
      methods: {
        type (data) {
          this.selectType = data
          this.$nextTick(() => {
            this.ratingScroll.refresh()
          })
        },
        content (data) {
          this.onlyContent = data
          this.$nextTick(() => {
            this.ratingScroll.refresh()
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
      components: { star, split, ratingSelect }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../../common/css/mixin.scss";
  .ratings{
    position: absolute;
    top: 174px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .ratingWrapper{
      .overview{
        display: flex;
        padding: 18px 0;
        .title{
          display: inline-block;
          font-size: 12px;
          color: rgb(7,17,27);
          line-height: 12px;
          margin-bottom: 8px;
        }
        .overviewLeft{
          flex: 0 0 137px;
          padding: 6px 0;
          width: 137px;
          border-right: 1px solid rgba(7,17,27,0.1);
          text-align: center;
          @media only screen and (max-width: 320px) {
            flex: 0 0 120px;
            width: 120px;
          }
          .overallScore{
            font-size: 24px;
            color: rgb(255,153,0);
            line-height: 28px;
            margin-bottom: 6px;
          }
          .rankRate{
            font-size: 10px;
            color: rgb(147,153,159);
            line-height: 10px;
          }
        }
        .overviewRight{
          flex: 1;
          padding: 6px 0 6px 24px;
          @media only screen and (max-width: 360px) {
            padding-left: 10px;
            padding-right: 0;
          }
          .scoreWrapper{
            font-size: 0;
            .title{
              margin-right: 12px;
              line-height: 18px;
              @media only screen and (max-width: 360px) {
                margin-right: 5px;
              }
            }
            .star{
              display: inline-block;
              vertical-align: top;
            }
            .score{
              display: inline-block;
              font-size: 12px;
              color: rgb(255,153,0);
              line-height: 18px;
              margin-left: 12px;
              @media only screen and (max-width: 360px) {
                margin-left: 5px;
              }
            }
            .deliveryTime{
              font-size: 12px;
              color: rgb(147,153,159);
              line-height: 18px;
            }
          }
        }
      }
      .showRatings{
        .rateItem{
          margin: 0 18px;
          padding: 18px 0;
          @include border-1px(bottom,rgba(7,17,27,0.1));
          display: flex;
          .avatar{
            flex: 0 0 28px;
            width: 28px;
            img{
              border-radius: 50%;
            }
          }
          .content{
            flex: 1;
            position: relative;
            padding: 0 8px 0 12px;
            font-size: 0;
            .title{
              font-size: 10px;
              color: rgb(7,17,27);
              line-height: 12px;
            }
            .starBox{
              margin: 4px 0 6px;
              .star{
                display: inline-block;
              }
              .deliveryTime{
                display: inline-block;
                font-size: 10px;
                color: rgb(147,153,159);
                line-height: 12px;
                margin-left: 6px;
              }
            }
            .text{
              font-size: 12px;
              color: rgb(7,17,27);
              line-height: 18px;
              margin-bottom: 8px;
            }
            .icon-thumb_up{
              font-size: 12px;
              color: rgb(0,160,220);
              line-height: 16px;
              margin-right: 8px;
            }
            .icon-thumb_down{
              font-size: 12px;
              color: rgb(183,187,191);
              line-height: 16px;
              margin-right: 8px;
            }
            .recommend{
              display: inline-block;
              border: 1px solid rgba(7,17,27,0.1);
              padding: 0 6px;
              font-size: 9px;
              color: rgb(147,153,159);
              line-height: 16px;
              margin-right: 8px;
              margin-bottom: 4px;
              border-radius: 2px;
              background-color: rgb(255,255,255);
            }
            .rateTime{
              position: absolute;
              right: 0;
              top: 0;
              font-size: 10px;
              font-weight: 200;
              color: rgb(147,153,159);
              line-height: 12px;
            }
          }
        }
      }
    }
  }

</style>
