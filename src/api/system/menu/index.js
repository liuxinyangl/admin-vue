import request from '@/utils/request';

/**
 * 查询菜单列表
 * @param params 查询条件
 */
export async function listMenus(params) {
  const res = await request.get('/system/menu/page', {
    params
  });
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加菜单
 * @param data 菜单信息
 */
export async function addMenu(data) {
  const res = await request.post('/system/menu/add', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改菜单
 * @param data 菜单信息
 */
export async function updateMenu(data) {
  const res = await request.put('/system/menu/update', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除菜单
 * @param id 菜单id
 */
export async function removeMenu(_id, createUserId) {
  const res = await request.delete('/system/menu/remove', {
	  params: {_id, createUserId}
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
