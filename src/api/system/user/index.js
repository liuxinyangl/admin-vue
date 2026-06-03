import request from '@/utils/request';

/**
 * 分页查询用户
 * @param params 查询条件
 */
export async function pageUsers(params) {
  const res = await request.get('/system/user/page', {
    params
  });
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询全部用户列表
 * @param params 查询条件
 */
export async function listUsers(params) {
  const res = await request.get('/system/user/list', {
    params
  });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 根据id查询用户
 * @param id 用户id
 */
export async function getUser(_id) {
  const res = await request.get('/system/user/detail', {
    params: {_id}
  });
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加用户
 * @param data 用户信息
 */
export async function addUser(data) {
  const res = await request.post('/system/user/add', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改用户
 * @param data 用户信息
 */
export async function updateUser(data) {
  const res = await request.put('/system/user/update', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改用户（无权限校验）
 * @param data 用户信息
 */
export async function updateUserNoAuth(data) {
  const res = await request.put('/system/user/updateNoAuth', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
/**
 * 删除用户
 * @param id 用户id
 */
export async function removeUser(_id, createUserId) {
  const res = await request.delete(`/system/user/remove`, {
    params: {_id, createUserId}
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 批量删除用户
 * @param data 用户id集合
 */
export async function removeUsers(_id, createUserId) {
  const res = await request.delete('/system/user/removeBatch', {
    params: {_id, createUserId}
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改用户状态
 * @param userId 用户id
 * @param status 状态
 */
export async function updateUserStatus(_id, createUserId, status) {
  const res = await request.put('/system/user/status', {
    _id,
	createUserId,
    status
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 重置用户密码
 * @param userId 用户id
 * @param password 密码
 * @returns {Promise<string>}
 */
export async function updateUserPassword(_id, createUserId, password="123456") {
  const res = await request.put('/system/user/resetPassword', {
    _id,
	createUserId,
	password
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 导入用户
 * @param file excel文件
 */
export async function importUsers(file) {
  // const formData = new FormData();
  // formData.append('file', file);
  // const res = await request.post('/system/user/import', formData);
  // if (res.data.code === 0) {
  //   return res.data.message;
  // }
  // return Promise.reject(new Error(res.data.message));
}

/**
 * 检查用户是否存在
 */
export async function checkExistence(username, value) {
  const res = await request.get('/system/user/existence', {
    params: {
		username: value
	}
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
