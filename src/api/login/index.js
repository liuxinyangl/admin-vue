import request from '@/utils/request';
import {
	setToken
} from '@/utils/token-util';

/**
 * 登录
 */
export async function login(data) {
	const res = await request.post('/system/auth/login', data);
	if (res.data.code === 0) {
		setToken(res.data.data.access_token, data.remember);
		return res.data.message;
	}
	return Promise.reject(new Error(res.data.message));
}

/**
 * 获取验证码
 */
export async function getCaptcha() {
	const res = await request.get('/system/auth/captcha');
	if (res.data.code === 0) {
		return res.data.data;
	}
	return Promise.reject(new Error(res.data.message));
}

/**
 * 退出登录，删除云端用户token维护
 */
export async function logoutAPI(token) {
	if (!token) return Promise.resolve();
	const res = await request.post('/system/auth/logout', {token});
	if (res.data.code === 0) {
		return Promise.resolve()
	}
	return Promise.reject(new Error(res.data.message));
}
