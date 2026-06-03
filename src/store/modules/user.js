/**
 * 登录状态管理
 */
import {
	formatMenus,
	toTreeData,
	formatTreeData
} from 'ele-admin';
import {
	USER_MENUS
} from '@/config/setting';
import {
	getUserInfo,
	getTenantData
} from '@/api/layout';

export default {
	namespaced: true,
	state: {
		// 当前登录用户信息
		info: null,
		// 当前登录用户的菜单
		menus: null,
		// 当前登录用户的权限
		authorities: [],
		// 当前登录用户的角色
		roles: [],
		// 租户数据
		tenantData: [],
	},
	mutations: {
		// 设置登录用户的信息
		setUserInfo(state, info) {
			state.info = info;
		},
		// 设置登录用户的菜单
		setMenus(state, menus) {
			state.menus = menus;
		},
		// 设置登录用户的权限
		setAuthorities(state, authorities) {
			state.authorities = authorities;
		},
		// 设置登录用户的角色
		setRoles(state, roles) {
			state.roles = roles;
		},
		// 设租户数据
		setTenantData(state, tenantData) {
			state.tenantData = tenantData;
		}
	},
	actions: {
		/**
		 * 请求用户信息、权限、角色、菜单
		 */
		async fetchUserInfo({
			commit
		}) {
			const result = await getUserInfo().catch(() => {});
			
			// 获取租户数据
			const tenantData = await getTenantData().catch(() => {});
			commit('setTenantData', tenantData);
			
			if (!result) {
				return {};
			}
			
			// 用户头像
			if(!result.avatar) {
				result.avatar = require("@/assets/avatar.png");
			}
			
			// 用户信息
			commit('setUserInfo', result);
			
			// 用户权限
			const authorities =
				result.authorities
				?.filter((d) => !!d.authority)
				?.map((d) => d.authority) ?? [];
			commit('setAuthorities', authorities);
			
			// 用户角色
			const roles = result.roles?.map((d) => d.roleCode) ?? [];
			commit('setRoles', roles);
			
			//额外的左侧菜单数据
			const EXTRA_MENUS = [
				{
					path: '/maintenance',
					meta: {
						title: '开源维护',
						icon: 'el-icon-connection'
					},
					children: [{
						path: '/maintenance/open-source',
						component: 'maintenance/open-source/index',
						meta: {
							title: '开源看板',
							icon: 'el-icon-data-analysis'
						}
					}]
				}
			];
			
			// 用户菜单, 过滤掉按钮类型并转为 children 形式
			const {
				menus,
				homePath
			} = formatMenus(
				USER_MENUS ??
				toTreeData({
					data: result.authorities?.filter((d) => d.menuType !== 1),
					idField: 'menuId',
					parentIdField: 'parentId'
				}).concat(EXTRA_MENUS) //添加额外的左侧菜单
			);
			commit('setMenus', menus);
			return {
				menus,
				homePath
			};
		},
		
		/**
		 * 更新用户信息
		 */
		setInfo({
			commit
		}, value) {
			commit('setUserInfo', value);
		},
		
		/**
		 * 更新菜单的badge
		 */
		setMenuBadge({
			commit,
			state
		}, {
			path,
			value,
			color
		}) {
			const menus = formatTreeData(state.menus, (m) => {
				if (path === m.path) {
					return {
						...m,
						meta: {
							...m.meta,
							badge: value,
							badgeColor: color
						}
					};
				}
				return m;
			});
			commit('setMenus', menus);
		}
	}
};
