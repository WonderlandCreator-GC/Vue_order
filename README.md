# Vue_order


## 1.项目描述  
&nbsp;&nbsp;&nbsp;&nbsp;此项目为一个前后端分离的点餐 Web App (SPA) 项目，使用了 Vue 全家桶+ES6+Webpack 等前端技术，包括APP登录、商家列表，商家详情, 商品列表,商品详情，购物车, 用户等多个功能子模块，采用模块化、组件化、工程化的模式开发。GitHub仓库包含项目前端部分源代码。

## 2.前端技术栈  
&nbsp;&nbsp;&nbsp;（1）使用 vue-router 开发SPA单页应用  
&nbsp;&nbsp;&nbsp;（2）封装网络请求模块request.js（基于axios）与后端进行数据交互  
&nbsp;&nbsp;&nbsp;（3）使用 vuex 管理应用组件状态。在vuex的action中发送网络请求异步获取后台数据，然后保存在vuex的state中，便于各组件获取后台数据或响应式修改数据  
&nbsp;&nbsp;&nbsp;（4）使用 better-scroll 实现商家列表页面纵向滑动效果及商家详情页的横向滑动（结合watch加nextTick来合理时机创建better-scroll实例）  
&nbsp;&nbsp;&nbsp;（5）使用 mint-ui 组件库构建组件的部分界面（如弹出提出框，退出登录按钮等）   
&nbsp;&nbsp;&nbsp;（6）使用 vue-lazyload 实现图片惰加载  
&nbsp;&nbsp;&nbsp;（7）使用 mockjs 模拟后台数据接口（仅mock商家详情页数据）

## 3.项目预览  
（1）主页  
&nbsp;&nbsp;&nbsp;![home](/shows/1.home)  
（2）搜索页面  
&nbsp;&nbsp;&nbsp;![search](/shows/2.search)  
（3）订单页面   
&nbsp;&nbsp;&nbsp;![order](/shows/3.order)    
（4）用户页面  
&nbsp;&nbsp;&nbsp;![profile](/shows/4.profile)    
（5）商家详情页面    
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商品列表页  
  &nbsp;&nbsp;&nbsp;![shopGoods](/shows/5.shopGoods)    
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商家评价页  
  &nbsp;&nbsp;&nbsp;![shopRatings](/shows/5.shopRatings)  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商家详情页  
  &nbsp;&nbsp;&nbsp;![shopInfo](/shows/5.shopInfo)  
（6）登录页面  
&nbsp;&nbsp;&nbsp;![login1](/shows/6.login1)
&nbsp;&nbsp;&nbsp;![login2](/shows/6.login2)
