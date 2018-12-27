// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery'

import 'es6-promise/auto' //因为ie不支持promise
import store from "./vuex/store/store.js" //引入vuex的集中块。

import https from "./axios/axios.js"; //引入封装的axios  
Vue.prototype.https = https; //引入到原型上。

// 引入图片预览功能。
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)

//  图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    // error: 'dist/error.png',
    // loading: 'dist/loading.gif',
    attempt: 1,
    listenEvents: ['scroll']
})

// 引入mockjs
require('./mockjs/mock.js')

import VueParticles from 'vue-particles' //引入背景粒子。
Vue.use(VueParticles)

import Ripple from 'vue-ripple-directive' //使用渐变特效
Vue.directive('ripple', Ripple);


import * as filters from './utils/filters' //其中import * as filters from ‘./filters/filter.js’是导入filter.js文件中的所有过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
})

Vue.use(ElementUI)
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store,
    created() { // 为了解决刷新页面  vuex里面的值，丢失的问题。
        var val = this.$store.getters.bookList;
        if (val.length == 0) {
            var list = JSON.parse(localStorage.getItem("bookList"));
            this.$store.dispatch("assignment", list);
        }
    }
})