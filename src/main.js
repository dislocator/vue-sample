import Vue from 'vue'
import VueFire from 'vuefire'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/ja'
import App from './App.vue'
 
Vue.use(ElementUI, { locale })
Vue.use(VueFire)

// const firebaseApp = firebase.initializeApp({})
// const db = firebaseApp.database()
 
new Vue({
  el: '#app',
  render: h => h(App)
})
