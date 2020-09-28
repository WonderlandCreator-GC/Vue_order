import Vue from 'vue'
import format from 'date-fns/format'
/*
自定义格式化时间的过滤器
value是要格式化的那个值，formatStr是格式化的规范，如果不传此参数就使用默认规范'YYYY-MM-DD HH:mm:ss'
*/
Vue.filter('dateFormat', (value, formatStr = 'yyyy-MM-dd hh:mm:ss') => format(value, formatStr))
