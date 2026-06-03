import request from '@/utils/request';

/**
 * 分页查询机构
 * @param params 查询条件
 */
// export async function pageOrganizations(params) {
//   const res = await request.get('/system/organization/page', {
//     params
//   });
//   if (res.data.code === 0) {
//     return res.data.data;
//   }
//   return Promise.reject(new Error(res.data.message));
// }

/**
 * 查询全部机构
 * @param params 查询条件
 */
export async function listOrganizations() {
  const res = await request.get('/system/organization/list');
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加机构
 * @param data 机构信息
 */
export async function addOrganization(data) {
  const res = await request.post('/system/organization/add', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改机构
 * @param data 机构信息
 */
export async function updateOrganization(data) {
  const res = await request.put('/system/organization/update', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除机构
 * @param id 机构id
 */
export async function removeOrganization(_id, createUserId) {
  const res = await request.delete('/system/organization/remove?_id='+_id+'&createUserId='+createUserId);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 根据机构id，分页获取对应客户集合
 * @param _id 机构id
 */
export async function pageOrgUser(params) {
  const res = await request.get('/system/organization/pageUserByOrg', {
	  params
  });
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
