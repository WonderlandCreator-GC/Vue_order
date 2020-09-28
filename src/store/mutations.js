/*
直接更新state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_SHOP_INFO,
  INCRE_COUNT,
  DECRE_COUNT,
  CLEAR_CART,
  RECEIVE_Search_Shops
} from './mutation-types'
import Vue from 'vue'
export default {
  // 接收地址
  [RECEIVE_ADDRESS](state, { adress }) {
    state.address = adress
  },
  // 接收食品分类数组
  [RECEIVE_CATEGORYS](state, { categorys }) {
    state.categorys = categorys
  },
  // 接收商家数组
  [RECEIVE_SHOPS](state, { shops }) {
    state.shops = shops
  },
  // 接收用户信息
  [RECEIVE_USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo
  },
  // 重置用户信息
  [RESET_USER_INFO](state) {
    state.userInfo = {}
  },
  // 接收商家商品数组
  [RECEIVE_SHOP_GOODS](state, { shopGoods }) {
    state.shopGoods = shopGoods
  },
  // 接收商家评价数组
  [RECEIVE_SHOP_RATINGS](state, { shopRatings }) {
    state.shopRatings = shopRatings
  },
  // 接收商家信息
  [RECEIVE_SHOP_INFO](state, { shopInfo }) {
    state.shopInfo = shopInfo
  },
  // 加food中的count
  [INCRE_COUNT](state, { food }) {
    // 第一次点击加，此时food中还没有count属性，因此添加此属性及值
    if (!food.count) {
      Vue.set(food, 'count', 1)
      // 第一次添加时将带有count的food添加到vuex中的cartFoods中
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  // 减food中的count
  [DECRE_COUNT](state, { food }) {
    if (food.count) {
      food.count--
      // 经过food.count-- 减到0时
      if (food.count === 0) {
        // 把没有count属性的food从vuex中的cartFoods中删除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  // 清空购物车
  [CLEAR_CART](state) {
    // 先将cartFoods里面的所有food的count属性值置为0
    state.cartFoods.forEach(food => {
      food.count = 0
    })
    // 再将cartFoods清空
    state.cartFoods = []
  },
  // 接收被搜索的商家列表
  [RECEIVE_Search_Shops](state, { searchShops }) {
    state.searchShops = searchShops
  }
}
