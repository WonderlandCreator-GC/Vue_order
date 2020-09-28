<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" v-for="(sc, index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>

<script>
// 定义类名常量
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'

export default {
  props: {
    // 根据使用评分星组件时传过来的评分score动态显示星星数目
    score: Number,
    // 根据使用评分星组件时传过来的size决定星星的大小（//2x图 3x图）
    size: Number
  },
  computed: {
    // starClasses是包含 决定星星是全星/半星/空星的类名 的数组
    // 类名on代表全星，half代表半星，off代表全星
    // 评分星计算机制：score的整数部分代表全星个数，小数部分>=0.5算半星，<0.5算空星，星星数最多五星
    starClasses() {
      const { score } = this
      // 声明一个数组用于装所有类名
      const scs = []

      // 首先向scs数组中添加n个CLASS_ON(对score取整)
      const scoreInteger = Math.floor(score)
      for (let i = 0; i < scoreInteger; i++) {
        scs.push(CLASS_ON)
      }

      // 然后向scs数组添加0/1个CLASS_HALF
      // if(score - scoreInteger >= 0.5) 这样写不准确，为去除浮点影响 => 总体乘10
      if (score * 10 - scoreInteger * 10 >= 5) {
        scs.push(CLASS_HALF)
      }

      // 最后向scs添加CLASS_OFF，直至总星数添至5
      while (scs.length < 5) {
        scs.push(CLASS_OFF)
      }

      return scs
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
 .star //2x图 3x图
   float left
   font-size 0
   .star-item
     display inline-block
     background-repeat no-repeat
   &.star-48
     .star-item
       width 20px
       height 20px
       margin-right 22px
       background-size 20px 20px
       &:last-child
         margin-right: 0
       &.on
         bg-image('./images/star48_on')
       &.half
         bg-image('./images/star48_half')
       &.off
         bg-image('./images/star48_off')
   &.star-36
     .star-item
       width 15px
       height 15px
       margin-right 6px
       background-size 15px 15px
       &:last-child
         margin-right 0
       &.on
         bg-image('./images/star36_on')
       &.half
         bg-image('./images/star36_half')
       &.off
         bg-image('./images/star36_off')
   &.star-24
     .star-item
       width 10px
       height 10px
       margin-right 3px
       background-size 10px 10px
       &:last-child
         margin-right 0
       &.on
         bg-image('./images/star24_on')
       &.half
         bg-image('./images/star24_half')
       &.off
         bg-image('./images/star24_off')
</style>
