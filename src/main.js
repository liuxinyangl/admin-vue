import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import permission from './utils/permission';
import {
	MAP_Webjs_Key,
	LICENSE_CODE
} from '@/config/setting';
import EleAdmin from 'ele-admin';
import VueClipboard from 'vue-clipboard2';
import i18n from './i18n';
import './mixins';
import './styles/index.scss';
import localforage from 'localforage';
Vue.config.productionTip = false;

localforage.config({
	name: process.env.VUE_APP_NAME + '-Store',
});
Vue.prototype.$localforage = localforage;



Vue.use(EleAdmin, {
	response: {
		dataName: 'list',
		countName: 'count',
	},
	request: {
		sortName: 'sort',
		orderName: 'order',
		pageName: 'page',
		limitName: 'limit',
	},
	mapKey: MAP_Webjs_Key,
	license: LICENSE_CODE,
	i18n: (key, value) => i18n.t(key, value)
});
Vue.use(permission);
Vue.use(VueClipboard);

new Vue({
	router,
	store,
	i18n,
	render: (h) => h(App)
}).$mount('#app');
