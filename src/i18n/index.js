import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enMessage from '@/i18n/en';
import jpMessage from '@/i18n/jp';

Vue.use(VueI18n);
const key = "lang";
let currentLang = localStorage.getItem(key);
if (!currentLang) {
    currentLang = process.env.VUE_APP_DEFAULT_LANG;
}

const i18n = new VueI18n({
    locale: currentLang,
    messages: {
        en: enMessage,
        jp: jpMessage
    },
    fallbackLocale: "jp"
});


i18n.changeLang = (lang) => {
    console.log("change lang: " + lang);
    currentLang = lang;
    i18n.locale = lang;
    localStorage.setItem(key,currentLang);
};
i18n.getCurrentLang = () => {
    return currentLang;
};
export default i18n;
