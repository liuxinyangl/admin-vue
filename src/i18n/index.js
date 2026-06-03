/**
 * 国际化配置
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { I18N_CACHE_NAME } from '@/config/setting';
import eleZhCN from 'ele-admin/es/lang/zh-CN';
import eleEn from 'ele-admin/es/lang/en';
import zhCN from './lang/zh_CN';
import en from './lang/en';

Vue.use(VueI18n);

const messages = {
  zh_CN: { ...eleZhCN, ...zhCN },
  en: { ...eleEn, ...en }
};

const i18n = new VueI18n({
  messages,
  silentTranslationWarn: true,
  // 默认语言
  locale: 'zh_CN', // localStorage.getItem(I18N_CACHE_NAME) || 'zh_CN'
});

export default i18n;
