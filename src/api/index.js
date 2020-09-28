/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import request from './request'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
export const reqAdress = geohash => request(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategory = () => request(BASE_URL + '/index_category')
// 3、根据经纬度获取商铺列表
export const reqShop = (latitude, longitude) => request(BASE_URL + '/shops', { latitude, longitude })
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => request(BASE_URL + '/search_shops', { geohash, keyword })
// 5、用户名密码登陆
export const reqPwdLogin = (name, pwd, captcha) => request(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'Post')
// 6、发送短信验证码
export const reqSendCode = phone => request(BASE_URL + '/sendcode', { phone })
// 7、手机号验证码登陆
export const reqSmsLogin = (phone, code) => request(BASE_URL + '/login_sms', { phone, code }, 'Post')
// 8、根据会话获取用户信息
export const reqUserInfo = () => request(BASE_URL + '/userinfo')
// 9、用户退出登录
export const reqLogout = () => request(BASE_URL + '/logout')

// 下面是被mock拦截的请求
// 10、获取商家商品数组
export const reqShopGoods = () => request('/shop_goods')
// 11、获取商家评价数组
export const reqShopRatings = () => request('/shop_ratings')
// 12、获取商家信息
export const reqShopInfo = () => request('/shop_info')
