/*
包含多个基于state的getter计算属性的对象
 */
export default {
  // 加入购物车的商品总数量
  totalCount(state) {
    return state.cartFoods.reduce((preTotal, food) => (preTotal += food.count), 0)
  },
  // 加入购物车的商品总价格
  totalPrice(state) {
    return state.cartFoods.reduce((preTotal, food) => (preTotal += food.count * food.price), 0)
  },
  // 满意的评价数目
  positiveSize(state) {
    return state.shopRatings.reduce((preTotal, rating) => (preTotal += rating.rateType === 0 ? 1 : 0), 0)
  }
}
