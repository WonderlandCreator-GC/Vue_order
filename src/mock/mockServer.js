/*
使用mockjs提供mock数据接口
*/
import Mock from 'mockjs'
import data from './data.json'

// 返回商家商品shop_goods的接口
Mock.mock('/shop_goods', { code: 0, data: data.goods })
// 返回商家评价shop_ratings的接口
Mock.mock('/shop_ratings', { code: 0, data: data.ratings })
// 返回商家信息shop_info的接口
Mock.mock('/shop_info', { code: 0, data: data.info })
