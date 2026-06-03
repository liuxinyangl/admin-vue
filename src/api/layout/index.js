import request from '@/utils/request';

/**
 * 获取当前登录的用户信息、菜单、权限、角色
 */
export async function getUserInfo() {
  const res = await request.get('/system/auth/user');
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/*
 * 获取租户表
 */
export async function getTenantData() {
  const res = await request.get('/system/user/tenantData');
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改当前登录的用户密码
 */
export async function updatePassword(data) {
  const res = await request.put('/system/auth/updateOldPassword', data);
  if (res.data.code === 0) {
    return res.data.message ?? '修改密码成功';
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询未读通知
 */
export async function getUnreadNotice() {
  return 11
}
