import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import X5GMaps from 'x5-gmaps'
import App from './App';
import router from './router/Router';
import i18n from './i18n';
import VueMoment from 'vue-moment';
import Auth from './security/Authentication';
import Utils from './util';
import './security/index';
import './assets/styles/app.scss';
import './service/service-register';
import './components/GlobalComponentRegister';

Vue.use(ElementUI);
Vue.use(VueMoment);
locale.use(lang);
Vue.use(X5GMaps, process.env.VUE_APP_GG_MAP_KEY);
// default language for element ui

Vue.config.productionTip = false;
Vue.prototype.$utils = Utils;
Vue.prototype.$auth = Auth;

Vue.directive('click-outside', {
    bind(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            if (!(el === event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    },

    stopProp(event) {
        event.stopPropagation()
    }
})

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')
