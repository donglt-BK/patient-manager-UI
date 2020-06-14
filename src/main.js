import Vue from 'vue';
import App from '@/App';
import router from '@/router/Router';
import ElementUI from 'element-ui';
import i18n from '@/i18n';
import VueMoment from 'vue-moment';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import Auth from '@/security/Authentication';
import Utils from '@/util';
import 'element-ui/lib/theme-chalk/index.css';
import './security/index';
import './util';
import './assets/styles/app.scss';
import './service/service-register';
import './components/GlobalComponentRegister';
import x5GMaps from 'x5-gmaps'

Vue.use(ElementUI);
Vue.use(VueMoment);
locale.use(lang);
Vue.use(x5GMaps,  process.env.VUE_APP_GG_MAP_KEY);
// default language for element ui

Vue.config.productionTip = false;
Vue.prototype.$utils = Utils;
Vue.prototype.$auth = Auth;

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')
