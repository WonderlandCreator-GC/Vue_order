<template>
  <div class="msite">
    <!--首页头部组件-->
    <header-top :title="address.name">
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo' : '/profile'" tag="span">
        <span class="header_login_text" v-if="!userInfo._id">登录 | 注册</span>
        <span class="header_login_text" v-else><i class="iconfont icon-person"></i></span>
      </router-link>
    </header-top>
    <div class="miste-content-wrapper">
      <div class="mstie-content">
        <!--首页导航-->
        <div class="msite_nav">
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in categoryArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(item1, index) in item" :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl + item1.image_url" />
                  </div>
                  <span>{{ item1.title }}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <!-- 使用svg显示界面加载提示页面 -->
          <img src="./images/home_back.svg" alt="back.svg" />
        </div>
        <!--首页附近商家列表组件-->
        <shop-list />
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import Bscroll from 'better-scroll'
import 'swiper/dist/css/swiper.min.css'
import { mapState } from 'vuex'

import HeaderTop from 'components/headreTop/HeaderTop'
import ShopList from 'components/shoplist/ShopList'
export default {
  data() {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  created() {
    // 获取地址
    this.$store.dispatch('getAdress')
    // 获取食品分类
    this.$store.dispatch('getCategorys')
    // 获取商家列表
    this.$store.dispatch('getShops')
  },
  watch: {
    // 当categorys数组中有数据, 在异步更新界面之前执行
    categorys(value) {
      // 界面更新就立即创建Swiper对象
      // 一旦完成界面更新, 立即调用回调函数(此条语句要写在数据更新之后)
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new Swiper('.swiper-container', {
          loop: true, // 可以循环轮播
          pagination: {
            // 如果需要分页器
            el: '.swiper-pagination',
            paginationClickable: true
          },
          autoplay: {
            disableOnInteraction: false,
            delay: 3000
          }
        })
      })

      this.scroll = new Bscroll('.miste-content-wrapper', {
        click: true
      })
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  computed: {
    // 从vuex中获取状态
    ...mapState(['address', 'categorys', 'userInfo']),
    /* 
    轮播图每个slide中包含8个元素，因此需要将categorys做进一步处理
    根据categorys一维数组生成一个二维数组,并且小数组中的元素个数最大是8
     */
    categoryArr() {
      const { categorys } = this
      // 准备空的二维数组
      const arr = []
      // 准备小数组（最大长度是8）
      let minArr = []
      // 遍历categorys
      categorys.forEach(item => {
        // 当小数组满8个元素时，重新创建一个空小数组
        if (minArr.length === 8) {
          minArr = []
        }
        // 如果小数组为空，将小数组添入大数组中
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        minArr.push(item)
      })
      return arr
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/mixins.styl"
.msite
  width 100%
  .miste-content-wrapper
    position fixed
    top: 45px
    bottom: 46px
    width: 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 15px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
