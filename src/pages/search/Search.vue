<template>
  <section class="search">
    <!-- 头部区域(HeaderTop组件) -->
    <header-top title="搜索" />
    <!-- 搜索区域 -->
    <form class="search_form">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword" />
      <input type="submit" class="search_submit" @click.prevent="search" />
    </form>
    <!-- 搜索的商家列表区域 -->
    <section class="list" v-if="!noSearchShop">
      <ul class="list_container">
        <!-- 路径参数也可以写成'/shop?id'= + item.id -->
        <router-link :to="{ path: '/shop', query: { id: searchShop.id } }" class="list_li" tag="li" v-for="(searchShop, index) in searchShops" :key="index">
          <section class="item_left">
            <img :src="imgBaseUrl + searchShop.image_path" class="restaurant_img" />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{ searchShop.name }}</span>
              </p>
              <p>月售 {{ searchShop.month_sales || searchShop.recent_order_num }} 单</p>
              <p>{{ searchShop.delivery_fee || searchShop.float_minimum_order_amount }}元起送 / 距离 {{ searchShop.distance }}</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <!-- 未搜索到商家时的提示文本 -->
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import HeaderTop from 'components/headreTop/HeaderTop'
export default {
  data() {
    return {
      keyword: '', // 搜索关键词
      imgBaseUrl: 'http://cangdu.org:8001/img/', // 图片的基础路径
      noSearchShop: false // 控制未搜索到商家时的提示文本是否显示
    }
  },
  computed: {
    // 获取被搜索的商家列表
    ...mapState(['searchShops'])
  },
  methods: {
    // 搜索商家
    search() {
      // 得到搜索关键字
      const keyword = this.keyword.trim()
      // 进行搜索
      if (keyword) {
        this.$store.dispatch('getSearchShops', keyword)
      }
    }
  },
  watch: {
    // 监视searchShops(监视是否搜到了商家)
    searchShops(value) {
      if (!value.length) {
        // 如果没有搜到，将noSearchShop改为ture
        this.noSearchShop = true
      } else {
        this.noSearchShop = false
      }
    }
  },
  components: {
    HeaderTop
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.search
  width 100%
  height 100%
  overflow hidden
  .search_form
    clearFix()
    margin-top 45px
    background-color #fff
    padding 12px 8px
    input
      height 35px
      padding 0 4px
      border-radius 2px
      font-weight bold
      outline none
      &.search_input
        float left
        width 79%
        border 4px solid #f2f2f2
        font-size 14px
        color #333
        background-color #f2f2f2
      &.search_submit
        float right
        width 18%
        border 4px solid #02a774
        font-size 16px
        color #fff
        background-color #02a774

  .list
    .list_container
      background-color: #fff;
      .list_li
        display: flex;
        justify-content: center;
        padding: 10px
        border-bottom: 1px solid $bc;
        .item_left
          margin-right: 10px
          .restaurant_img
            width 50px
            height 50px
            display block
        .item_right
          font-size 12px
          flex 1
          .item_right_text
            p
              line-height 12px
              margin-bottom 6px
              &:last-child
                margin-bottom 0
  .search_none
    margin: 0 auto
    color: #333
    background-color: #fff
    text-align: center
    margin-top: 0.125rem
</style>
