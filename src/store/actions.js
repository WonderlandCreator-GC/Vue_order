/*
异步更新state的多个方法对象
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

import { reqAdress, reqFoodCategory, reqShop, reqUserInfo, reqLogout, reqShopGoods, reqShopRatings, reqShopInfo, reqSearchShop } from '../api'

export default {
  // 异步获取地址
  async getAdress({ commit, state }) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAdress(geohash)
    // 如果请求成功，提交mutation
    if (result.code === 0) {
      const adress = result.data
      commit(RECEIVE_ADDRESS, { adress })
    }
  },
  // 异步获取食品分类列表
  async getCategorys({ commit }) {
    const result = await reqFoodCategory()
    // 如果请求成功，提交mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, { categorys })
    }
  },
  // 异步获取商家列表
  async getShops({ commit, state }) {
    const { latitude, longitude } = state
    const result = await reqShop(latitude, longitude)
    // 如果请求成功，提交mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },
  // 同步记录用户信息
  recordUerInfo({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },
  // 异步获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    const userInfo = result.data
    if (result.code === 0) {
      commit(RECEIVE_USER_INFO, { userInfo })
    }
  },
  // 异步退出登录
  async logout({ commit }) {
    const result = await reqLogout()
    if (result.code === 0) {
      // 成功退出登录后重置用户信息
      commit(RESET_USER_INFO)
    }
  },
  // 异步获取商家商品
  async getShopGoods({ commit }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const shopGoods = result.data
      commit(RECEIVE_SHOP_GOODS, { shopGoods })
      // 数据更新时通过回调函数告知组件
      callback && callback()
    }
  },
  // 异步获取商家评价
  async getShopRatings({ commit }, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const shopRatings = result.data
      commit(RECEIVE_SHOP_RATINGS, { shopRatings })
    }
    // 数据更新后通过调用回调函数通知组件
    callback && callback()
  },
  // 异步获取商家信息
  async getShopInfo({ commit }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const shopInfo = result.data
      commit(RECEIVE_SHOP_INFO, { shopInfo })
    }
  },
  // 同步更新food中的count值
  updateCount({ commit }, { isAddCount, food }) {
    if (isAddCount) {
      // 加count
      commit(INCRE_COUNT, { food })
    } else {
      // 减count
      commit(DECRE_COUNT, { food })
    }
  },
  // 同步清空购物车
  clearCart({ commit }) {
    commit(CLEAR_CART)
  },
  // 异步获取被搜索的商家列表
  async getSearchShops({ commit, state }, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    // 如果请求成功，提交mutation
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_Search_Shops, { searchShops })
    }
  }
}
