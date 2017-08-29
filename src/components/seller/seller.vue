<template>
	<div class="seller" ref="sellerWrapper">
    <div class="sellerWrapper">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="starBox">
          <star :size="36" :score="seller.score" class="star"></star><span class="ratingCount">({{seller.ratingCount}})</span><span class="sellCount">月售{{seller.sellCount}}单</span>
        </div>
        <div class="deliveryInfo border-1px">
          <div class="minPrice"><span class="top">起送价</span><br><span class="deliveryData">{{seller.minPrice}}</span>元</div>
          <div class="deliveryPrice"><span class="top">商家配送</span><br><span class="deliveryData">{{seller.deliveryPrice}}</span>元</div>
          <div class="minPrice"><span class="top">平均配送时间</span><br><span class="deliveryData">{{seller.deliveryTime}}</span>分钟</div>
        </div>
        <div class="favorite">
          <span class="icon-favorite"></span><br>已收藏
        </div>
      </div>
      <split v-if="seller.bulletin"></split>
      <div class="supportsInfo">
        <div class="bulletin border-1px">
          <h1 class="title">公告与活动</h1>
          <p>{{seller.bulletin}}</p>
        </div>
        <ul class="supports">
          <li class="supportsItem border-1px" v-for="item in seller.supports">
            <span :class="classMap[item.type]" class="icon"></span><span class="desc">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split v-if="seller.pics"></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="picsWrapper">
          <ul class="picsList">
            <li v-for="item in seller.pics"><img :src="item" alt="" width="120" height="90"></li>
          </ul>
        </div>
      </div>
      <split v-if="seller.infos">
        <h1 class="title">商家信息</h1>
        <ul class="infosList">
          <li v-for="item in seller.infos">{{item}}</li>
        </ul>
      </split>
      <div class="infos"></div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import split from '../split/split.vue'
  import star from '../star/star.vue'
  import BScroll from 'better-scroll'
	export default {
	    data () {
	       return {
         }
      },
      created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      },
      mounted () {
        this.$nextTick(() => {
          this.sellerScroll = new BScroll(this.$refs.sellerWrapper, {click: true})
        })
      },
      props: {
        seller: {
          type: Object
        }
      },
      methods: {

      },
      components: {
	        split, star
      }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../common/css/mixin';
  .seller{
    position: absolute;
    top: 174px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .sellerWrapper{
      position: relative;
      h1.title{
        font-size: 14px;
        line-height: 14px;
        color: rgb(7,17,27);
      }
      .overview{
        padding: 18px;
        .starBox{
          font-size: 10px;
          color: rgb(77,85,93);
          margin: 8px 0 18px;
          .star{
            display: inline-block;
            vertical-align: top;
          }
          .ratingCount{
            margin: 0 12px 0 8px;
            vertical-align: top;
            line-height: 18px;
          }
          .sellCount{
            line-height: 18px;
          }
        }
        .deliveryInfo{
          display: flex;
          padding-top: 18px;
          @include border-1px(top,rgba(7,17,27,0.1));
          &>div{
            flex: 1;
            text-align: center;
            font-size: 10px;
            line-height: 10px;
            color: rgb(7,17,27);
            border-right: 1px solid rgba(7,17,27,0.1);
            &:last-child{
              border-right: none;
            }
            .top{
              color: rgb(147,153,159);
              display: inline-block;
              margin-bottom: 4px;
            }
            .deliveryData{
              font-size: 24px;
              font-weight: 200;
              color: rgb(7,17,27);
              line-height: 24px;
            }
          }
        }
        .favorite{
          position: absolute;
          right: 18px;
          top: 18px;
          text-align: center;
          font-size: 10px;
          color: rgb(77,85,93);
          line-height: 10px;
          .icon-favorite{
            display: inline-block;
            font-size: 24px;
            color: rgb(240,20,20);
            line-height: 24px;
            margin-bottom: 4px;
          }
        }
      }
      .supportsInfo{
        padding: 18px 18px 0 18px;
        .bulletin{
          @include border-1px(bottom,rgba(7,17,27,0.1));
          p{
            padding: 8px 12px 16px;
            font-size: 12px;
            line-height: 24px;
            font-weight: 200;
            color: rgb(240,20,20);
          }
        }
        ul.supports{
          .supportsItem{
            padding: 16px 12px;
            @include border-1px(bottom,rgba(7,17,27,0.1));
            &:last-child{
              @include border-none;
            }
            .icon{
              display: inline-block;
              vertical-align: top;
              width: 16px;
              height: 16px;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              &.decrease{
                @include bg-img('decrease_4');
              }
              &.discount{
                @include bg-img('discount_4');
              }
              &.invoice{
                @include bg-img('invoice_4');
              }
              &.guarantee{
                @include bg-img('guarantee_4');
              }
              &.special{
                @include bg-img('special_4');
              }
            }
            .desc{
              font-size: 12px;
              font-weight: 200;
              color: rgb(7,17,27);
              line-height: 16px;
            }
          }
        }
      }
      .pics{
        padding: 18px 0 18px 18px;
        .picsWrapper{
          margin-top: 12px;
          width: 100%;
          height: 90px;
          overflow: hidden;
          white-space: nowrap;
          .picsList{
            font-size: 0;
            &>li{
              display: inline-block;
              margin-right: 6px;
              width: 120px;
              height: 90px;
              &:last-child{
                margin: 0;
              }
            }
          }
        }
      }
    }
  }

</style>
