import request from '@/utils/request';

/**
 * 分页查询角色
 * @param params 查询条件
 */
export async function pageRoles(params) {
  const res = await request.get('/system/role/page', {
    params
  });
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 获取全部角色
 */
export async function listRoles() {
  const res = await request.get('/system/role/list');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加角色
 * @param data 角色信息
 */
export async function addRole(data) {
  const res = await request.post('/system/role/add', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改角色
 * @param data 角色信息
 */
export async function updateRole(data) {
  const res = await request.put('/system/role/update', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除角色
 */
export async function removeRole(_id, createUserId, roleCode) {
  const res = await request.delete('/system/role/remove', {
    params: {_id, createUserId, roleCode}
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 批量删除角色
 */
export async function removeRoles(_id, createUserId, roleCode) {
  const res = await request.delete('/system/role/removeBatch', {
    params:{_id, createUserId, roleCode}
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 获取权限内的全部菜单数据
 */
export async function getRoleMenuData(tenantId) {
  const res = await request.get('/system/menu/list', {
	  params: {tenantId}
  });
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 获取角色分配的菜单id
 */
export async function getRoleMenuIds(roleId) {
  const res = await request.get('/system/role/getRoleMenuIds', {
	  params: {roleId}
  });
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改角色分配的菜单id
 */
export async function setRoleMenuIds(roleId, menuIds, createUserId) {
  const res = await request.put('/system/role/setRoleMenuIds', {roleId, menuIds, createUserId});
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
