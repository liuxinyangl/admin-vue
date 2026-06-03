import request from '@/utils/request';

/**
 * 分页查询登录日志
 * @param params 查询条件
 */
export async function pageLoginRecords(params) {
  const res = await request.get('/system/auth/log_inLog', {
    params
  });
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}


