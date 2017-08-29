<template>
  <div class="ratingSelect">
    <div class="ratingType border-1px">
      <span @click="select(2,$event)" class="all ratingTab" :class="{active:type===2}">{{desc.all}} <span class="num">{{ratings.length}}</span></span><span @click="select(0,$event)" class="positive ratingTab" :class="{active:type===0}">{{desc.positive}}<span class="num">{{positives.length}}</span></span><span @click="select(1,$event)" class="negative ratingTab" :class="{active:type===1}">{{desc.negative}}<span class="num">{{negatives.length}}</span></span>
    </div>
    <div class="switch border-1px" v-if="ratings" :class="{'on':content}" @click="toggleContent($event)">
      <span class="icon-check_circle"></span><span class="text">只看有内容的评价</span>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
   export default{
      data () {
          return {
              type: this.selectType,
              content: this.onlyContent
          }
      },
       props: {
           ratings: {
               type: Array,
               default () {
                   return []
               }
           },
           selectType: {
               type: Number,
               default: ALL
           },
           onlyContent: {
               type: Boolean,
               default: false
           },
           desc: {
               type: Object,
               default () {
                   return {
                       all: '全部',
                       positive: '满意',
                       negative: '不满意'
                   }
               }
           }
       },
       methods: {
            select (type, event) {
                if (!event._constructed) {
                    return
                }
                this.type = type
                this.$emit('ratingTypeSelect', this.type)
            },
            toggleContent (event) {
              if (!event._constructed) {
                return
              }
              this.content = !this.content
              this.$emit('onlyContentToggle', this.content)
            }
       },
       computed: {
         // 我自己写的计算正面、负面评价的条数
//           positiveNum () {
//             let positiveNum = 0
//             this.ratings.forEach(ratings => {
//               if (ratings.rateType === POSITIVE) {
//                 positiveNum++
//               }
//             })
//             return positiveNum
//           },
//           negativeNum () {
//             let negativeNum = 0
//             this.ratings.forEach(ratings => {
//               if (ratings.rateType === NEGATIVE) {
//                 negativeNum++
//               }
//             })
//             return negativeNum
//           }
            positives () {
               return this.ratings.filter((rating) => {
                   return rating.rateType === POSITIVE
               })
            },
            negatives () {
               return this.ratings.filter((rating) => {
                 return rating.rateType === NEGATIVE
               })
             }

       }
   }
</script>
<style scoped lang="scss">
  @import "../../common/css/mixin.scss";
  .ratingSelect{
      margin-top: 18px;
      .ratingType{
                     margin: 0 18px;
                     @include border-1px(bottom,rgba(7,17,27,0.1));
                     .ratingTab{
                     display: inline-block;
                     padding: 8px 12px;
                     font-size: 12px;
                     line-height: 16px;
                     color: rgb(255,255,255);
                     border-radius: 2px;
                     margin-right: 8px;
                     margin-bottom: 18px;
                     &.active{
                     color: #fff;
                     }
                     .num{
                     font-size: 8px;
                     margin-left: 2px;
                     }
                     &.all{
                     background: rgba(0,160,220,0.2);
                     color: rgb(77,85,93);
                     &.active{
                     background: rgb(0,160,220);
                     color: #fff;
                     }
                     }
                     &.positive{
                     background: rgba(0,160,220,0.2);
                     color: rgb(77,85,93);
                     &.active{
                     background: rgb(0,160,220);
                     color: #fff;
                     }
                     }
                     &.negative{
                     background: rgba(77,85,93,0.2);
                     color: rgb(77,85,93);
                     &.active{
                     background: rgb(77,85,93);
                     color: #fff;
                     }
                     }
                     }

                     }
      .switch{
        padding: 12px 18px;
        line-height: 24px;
        color: rgb(147,153,159);
        @include border-1px(bottom,rgba(7,17,27,0.1));
        &.on{
          .icon-check_circle{
            color: #00c850;
          }
        }
        .icon-check_circle{
          font-size: 24px;
          margin-right: 4px;
        }
        .text{
          vertical-align: top;
          font-size: 12px;
        }
      }
  }


</style >
