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
          <span class="icon-favorite" :class="{'active':favorite}" @click="toggleFavorite"></span>
          <span class="text">{{favoriteText}}</span>
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
        <div class="picsWrapper" ref="picsWrapper">
          <ul class="picsList" ref="picsList">
            <li v-for="item in seller.pics"><img :src="item" alt="" width="120" height="90"></li>
          </ul>
        </div>
      </div>
      <split v-if="seller.infos"></split>
      <div class="infos">
        <h1 class="title">商家信息</h1>
        <ul class="infosList">
          <li v-for="item in seller.infos" class="item border-1px">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import { saveToLocal, loadFromLocal } from '../../common/js/store.js'
  import split from '../split/split.vue'
  import star from '../star/star.vue'
  import BScroll from 'better-scroll'
	export default {
	    data () {
	       return {
	           favorite: (() => {
	             return loadFromLocal(this.seller.id, 'favorite', false)
             })()
         }
      },
      created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      },
      mounted () {
        this.$nextTick(() => {
          this._initSellerS()
          this._initPicS()
        })
      },
      props: {
        seller: {
          type: Object
        }
      },
      watch: {
	       'seller' () {
	           this._initSellerS()
             this._initPicS()
         }
      },
      methods: {
	        _initSellerS () {
	            if (!this.sellerScroll) {
                this.sellerScroll = new BScroll(this.$refs.sellerWrapper, {click: true})
              } else {
	                this.sellerScroll.refresh()
              }
          },
	        _initPicS () {
            if (this.seller.pics) {
              let picWidth = 120
              let margin = 6
              let width = (picWidth + margin) * this.seller.pics.length - margin
              this.$refs.picsList.style.width = width + 'px'
              this.$nextTick(() => {
                  if (!this.picsScroll) {
                    this.picsScroll = new BScroll(this.$refs.picsWrapper, {scrollX: true, eventPassthrough: 'vertical'})
                  } else {
                      this.picsScroll.refresh()
                  }
              })
            }
          },
          toggleFavorite (event) {
	            if (!event._constructed) {
	                return
              }
              this.favorite = !this.favorite
              saveToLocal(this.seller.id, 'favorite', this.favorite)
          }
      },
      computed: {
	        favoriteText () {
	            return this.favorite ? '已收藏' : '收藏'
          }
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
          right: 11px;
          top: 18px;
          text-align: center;
          font-size: 10px;
          width: 50px;
          .icon-favorite{
            display: block;
            font-size: 24px;
            line-height: 24px;
            margin-bottom: 4px;
            color: #d4d6d9;
            &.active{
              color: rgb(240,20,20);
            }
          }
          .text{
            color: rgb(77,85,93);
            font-size: 10px;
            line-height: 10px;
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
      .infos{
        padding: 18px;
        .infosList{
          margin-top: 12px;
          .item{
            padding: 16px 12px;
            @include border-1px(top,rgba(7,17,27,0.1));
            font-size: 12px;
            font-weight: 200;
            color: rgb(7,17,27);
            line-height: 16px;
          }
        }

      }
    }
  }

</style>
