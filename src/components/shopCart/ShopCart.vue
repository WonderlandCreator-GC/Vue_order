<template>
  <div>
    <div class="shopcart">
      <!-- 购物车主体部分 -->
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{ highlight: totalCount }"><i class="iconfont icon-shopping_cart" :class="{ highlight: totalCount }"></i></div>
            <div class="num" v-if="totalCount">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{ highlight: totalCount }">￥{{ totalPrice }}</div>
          <div class="desc">另需配送费￥{{ shopInfo.deliveryPrice }}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{ payText }}</div>
        </div>
      </div>
      <!-- 购物车列表 -->
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <!-- 购物车加减控制组件 -->
                  <cart-control :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!-- 遮罩部分 -->
    <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import Bscroll from 'better-scroll'
import { mapState, mapGetters } from 'vuex'
import CartControl from 'components/cartControl/CartControl.vue'
export default {
  data() {
    return {
      // 控制购物车列表的显示与隐藏
      isShow: false
    }
  },
  computed: {
    ...mapState(['cartFoods', 'shopInfo']),
    ...mapGetters(['totalCount', 'totalPrice']),
    // 控制购物车右侧结算部分类名
    payClass() {
      const { totalPrice } = this
      const { minPrice } = this.shopInfo
      return totalPrice < minPrice ? 'not-enough' : 'enough'
    },
    // 控制购物车结算部分显示的文本
    payText() {
      const { totalPrice } = this
      // minPrice 为起送价
      const { minPrice } = this.shopInfo
      // 根据起送价与商品总价的关系判断结算部分要显示的文本
      if (totalPrice === 0) {
        return `￥${minPrice}元起送`
      } else if (totalPrice < minPrice) {
        return `还差￥${minPrice - totalPrice}元起送`
      } else {
        return '结算'
      }
    },
    // 控制购物车显示与隐藏
    listShow() {
      // 总数量为0时不显示购物车列表（解决在列表内totalCount减到0时列表不隐藏的问题）
      if (this.totalCount === 0) {
        // 同步将isShow设为false
        // 否则在列表内当totalCount减到0列表隐藏后，isShow仍为ture，下次无法正常打开列表
        this.setIsShow()
        // totalCount为0时listShow设置为false，使列表隐藏
        return false
      } else {
        // totalCount不为0时使用isShow判断
        return this.isShow
      }
    }
  },
  methods: {
    // 切换购物车列表的显示与隐藏
    toggleShow() {
      // 当totalCount为0时不需要更改isShow（当totalCount为0时点击购物车左侧区域不应该更改isShow）
      if (this.totalCount) {
        this.isShow = !this.isShow
      }
      // 创建列表滚动实例对象
      if (this.isShow) {
        this.$nextTick(() => {
          // 避免反复创建Bscroll的实例(即要求Bscroll的实例是单例)
          if (!this.scroll) {
            this.scroll = new Bscroll('.list-content', {
              click: true
            })
          } else {
            this.scroll.refresh() // 让滚动条刷新一下: 重新统计内容的高度
          }
        })
      }
    },
    // 将isShow设置为false
    setIsShow() {
      this.isShow = false
    },
    // 清空购物车
    clearCart() {
      MessageBox.confirm('确定清空购物车码?').then(
        action => {
          this.$store.dispatch('clearCart')
        },
        () => {
          return false
        }
      )
    }
  },
  components: {
    CartControl
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"

.shopcart
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px
  .content
    display flex
    background #141d27
    font-size 0
    color rgba(255, 255, 255, 0.4)
    .content-left
      flex 1
      .logo-wrapper
        display inline-block
        vertical-align top
        position relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        border-radius 50%
        background #141d27
        .logo
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background #2b343c
          &.highlight
            background $green
          .icon-shopping_cart
            line-height 44px
            font-size 24px
            color #80858a
            &.highlight
              color #fff
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight 700
          color #ffffff
          background rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display inline-block
        vertical-align top
        margin-top 5px
        line-height 24px
        padding-right 12px
        box-sizing border-box
        font-size 16px
        font-weight 700
        color #fff
        &.highlight
          color #fff
      .desc
        display inline-block
        vertical-align bottom
        margin-bottom 15px
        margin-left -45px
        font-size 10px
    .content-right
      flex 0 0 105px
      width 105px
      .pay
        height 48px
        line-height 48px
        text-align center
        font-size 12px
        font-weight 700
        color #fff
        &.not-enough
          background #2b333b
        &.enough
          background #00b43c
          color #fff
  .ball-container
    .ball
      position fixed
      left 32px
      bottom 22px
      z-index 200
      transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width 16px
        height 16px
        border-radius 50%
        background $green
        transition all 0.4s linear
  .shopcart-list
    position absolute
    left 0
    top 0
    z-index -1
    width 100%
    transform translateY(-100%)
    &.move-enter-active, &.move-leave-active
      transition transform .3s
    &.move-enter, &.move-leave-to
      transform translateY(0)
    .list-header
      height 40px
      line-height 40px
      padding 0 18px
      background #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .title
        float left
        font-size 14px
        color rgb(7, 17, 27)
      .empty
        float right
        font-size 12px
        color rgb(0, 160, 220)

    .list-content
      padding 0 18px
      max-height 217px
      overflow hidden
      background #fff
      .food
        position relative
        padding 12px 0
        box-sizing border-box
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          position absolute
          right 90px
          bottom 12px
          line-height 24px
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 6px

.list-mask
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 40
  backdrop-filter blur(10px)
  opacity 1
  background rgba(7, 17, 27, 0.6)
  &.fade-enter-active, &.fade-leave-active
    transition all 0.5s
  &.fade-enter, &.fade-leave-to
    opacity 0
    background rgba(7, 17, 27, 0)
</style>
