import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('pages/home/Home.vue')
const Search = () => import('pages/search/Search.vue')
const Order = () => import('pages/order/Order.vue')
const Profile = () => import('pages/profile/Profile.vue')
const Login = () => import('pages/login/Login.vue')
const Shop = () => import('pages/shop/Shop.vue')
const ShopGoods = () => import('pages/shop/shopGoods/ShopGoods.vue')
const ShopInfo = () => import('pages/shop/shopInfo/ShopInfo.vue')
const ShopRatings = () => import('pages/shop/shopRatings/ShopRatings.vue')

// 使用插件
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/shop_goods',
          component: ShopGoods
        },
        {
          path: '/shop/shop_info',
          component: ShopInfo
        },
        {
          path: '/shop/shop_ratings',
          component: ShopRatings
        },
        {
          path: '/',
          redirect: '/shop/shop_goods'
        }
      ]
    }
  ]
})
