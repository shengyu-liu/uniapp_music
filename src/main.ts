import Vue from 'vue'
import App from './App.vue'
// import api from "./api/index"
import api from "./api/api"
import AudioVisual from 'vue-audio-visual'

Vue.use(AudioVisual)

Vue.config.productionTip = false
Vue.prototype.$api = api
new App().$mount()
