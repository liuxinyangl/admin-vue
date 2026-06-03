/**
 * axios 实例
 */
import axios from 'axios';
import router from '@/router';
import {
	MessageBox,
	Message
} from 'element-ui';
import {
	API_BASE_URL,
	TOKEN_HEADER_NAME,
	LAYOUT_PATH
} from '@/config/setting';
import {
	getToken,
	setToken
} from './token-util';
import {
	logout
} from './page-tab-util';

const service = axios.create({
	baseURL: API_BASE_URL
});

/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
	(config) => {
		const token = getToken();
		// 高德服务
		if (config.url.indexOf('restapi.amap.com') > -1) {
			return config
		}
		// 添加 token 到 header
		if (token && config.headers) {
			config.headers.common[TOKEN_HEADER_NAME] = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
	(res) => {
		// 登录过期
		if (res.data?.code === 401) {
			const currentPath = router.currentRoute.path;
			if (currentPath === LAYOUT_PATH) {
				logout(true);
			} else {
				MessageBox.alert('登录状态已失效, 请退出重新登录!', '系统提示', {
					confirmButtonText: '重新登录',
					callback: (action) => {
						if (action === 'confirm') {
							logout(false, currentPath);
						}
					},
					beforeClose: () => {
						MessageBox.close();
					}
				});
			}
			return Promise.reject(new Error(res.data.message));
		}
		// 弹出错误提示
		if (res.data?.code !== 0) {
			if (res.data?.message) {
				Message.error({
					message: res.data?.message,
					duration: 3000
				})
			}
		}
		// token自动续期
		const token = res.headers[TOKEN_HEADER_NAME.toLowerCase()];
		if (token) setToken(token);

		return res;
	},
	(error) => {
		var errMsg = error?.response?.data?.message;
		var errCode = error?.response?.data?.code;
		if (errMsg) {
			Message.error({
				message: `${errCode?'Code：'+errCode+'，':''} Msg：${errMsg}`,
				duration: 3000
			})
		}
		console.log(error)
		return Promise.reject(error);
	}
);

export default service;
