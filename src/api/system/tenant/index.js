import request from '@/utils/request';

/**
 * 查询tenant列表
 * @param params 查询条件
 */
export async function getTenantList() {
  const res = await request.get('/system/tenant/list');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加
 * @param data
 */
export async function addTenant(data) {
  const res = await request.post('/system/tenant/add', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改
 * @param data
 */
export async function updateTenant(data) {
  const res = await request.put('/system/tenant/update', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除
 * @param _id
 */
export async function removeTenant(_id) {
  const res = await request.delete('/system/tenant/remove?_id='+_id);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询Super的菜单数据
 */
export async function getSuperMenuList() {
  const res = await request.get('/system/tenant/superMenuList');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

